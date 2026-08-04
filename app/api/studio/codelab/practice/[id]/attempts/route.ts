import { NextResponse } from "next/server";
import {
  createChatCompletionsRequest,
  isLlmConfigured,
  llmMissingConfigMessage,
} from "@/lib/llm-client";
import { fromDbLevel, getCodeLabAccountId } from "@/lib/code-lab/server-helpers";
import { prisma, prismaDb } from "@/lib/prisma";

export const runtime = "nodejs";

const MAX_CODE_LENGTH = 8000;

/** How strict grading feedback should be, by level. */
function levelGradingNote(level: string) {
  if (level === "beginner") {
    return "The learner is a beginner — if it fails, explain the fix step by step and point at the exact line.";
  }
  if (level === "advanced") {
    return "The learner is advanced — be terse. If it passes but misses an edge case or is inefficient, say so.";
  }
  return "The learner is at an intermediate level — explain what's wrong and why, without spelling out the full fix.";
}

function buildPrompt(input: { language: string; level: string; task: string; code: string }) {
  return `A learner attempted this ${input.language} task:
"${input.task}"

Their submission:
\`\`\`${input.language}
${input.code}
\`\`\`

Judge whether it correctly and completely solves the task. ${levelGradingNote(input.level)}

Output JSON only:
{ "passed": boolean, "feedback": string }

Rules:
- "passed" is true only if the code would actually run and satisfy the task as stated.
- "feedback" is 1-4 sentences, direct and specific to this submission.
- No markdown fences.`;
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const accountId = await getCodeLabAccountId();
  if (!accountId) return NextResponse.json({ error: "Sign in first." }, { status: 401 });

  if (!isLlmConfigured()) {
    return NextResponse.json({ error: llmMissingConfigMessage() }, { status: 503 });
  }

  const { id } = await params;
  const item = await prisma.codeLabPracticeItem.findUnique({ where: { id } });
  if (!item || item.accountId !== accountId) {
    return NextResponse.json({ error: "Scenario not found." }, { status: 404 });
  }

  let body: { code?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const code = (body.code ?? "").trim();
  if (!code) return NextResponse.json({ error: "There is no code to submit." }, { status: 400 });
  if (code.length > MAX_CODE_LENGTH) {
    return NextResponse.json({ error: "That submission is too long." }, { status: 413 });
  }

  const language = item.language === "SQL" ? "sql" : "python";
  const level = fromDbLevel(item.level);

  try {
    const { url, init } = createChatCompletionsRequest({
      temperature: 0.1,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You are a precise, fair grader for a learner's coding exercise. Return strict JSON only. Never output markdown fences.",
        },
        { role: "user", content: buildPrompt({ language, level, task: item.prompt, code }) },
      ],
    });

    const res = await fetch(url, init);
    if (!res.ok) {
      console.error("[codelab/attempts] upstream error", res.status, await res.text());
      return NextResponse.json({ error: "The grading service is unavailable." }, { status: 502 });
    }

    const data = await res.json();
    const raw = data?.choices?.[0]?.message?.content;
    if (typeof raw !== "string") {
      return NextResponse.json({ error: "The grading service returned no content." }, { status: 502 });
    }

    const parsed = JSON.parse(raw) as { passed?: boolean; feedback?: string };
    const passed = Boolean(parsed.passed);
    const feedback = (parsed.feedback ?? "").slice(0, 2000);

    const [attempt] = await prismaDb.$transaction([
      prismaDb.codeLabAttempt.create({
        data: { accountId, practiceItemId: item.id, code: code.slice(0, MAX_CODE_LENGTH), passed, feedback },
      }),
      prismaDb.codeLabPracticeItem.update({
        where: { id: item.id },
        data: { status: passed ? "PASSED" : "NEEDS_REVIEW" },
      }),
    ]);

    return NextResponse.json({ passed, feedback, attemptId: attempt.id });
  } catch (err) {
    console.error("[codelab/attempts] failed", err);
    return NextResponse.json({ error: "The submission could not be graded." }, { status: 500 });
  }
}
