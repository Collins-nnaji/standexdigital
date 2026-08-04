import { NextResponse } from "next/server";
import {
  createChatCompletionsRequest,
  isLlmConfigured,
  llmMissingConfigMessage,
} from "@/lib/llm-client";
import {
  fromDbLanguage,
  fromDbLevel,
  getCodeLabAccountId,
  toDbLanguage,
  toDbLevel,
} from "@/lib/code-lab/server-helpers";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const MAX_LIST = 50;
const MAX_CODE_LENGTH = 8000;
const MAX_ERROR_LENGTH = 4000;

export async function GET(request: Request) {
  const accountId = await getCodeLabAccountId();
  if (!accountId) return NextResponse.json({ error: "Sign in first." }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const language = searchParams.get("language");

  const logs = await prisma.codeLabErrorLog.findMany({
    where: { accountId, ...(language ? { language: toDbLanguage(language) } : {}) },
    orderBy: { createdAt: "desc" },
    take: MAX_LIST,
  });

  return NextResponse.json({
    errors: logs.map((e) => ({
      id: e.id,
      language: fromDbLanguage(e.language),
      level: fromDbLevel(e.level),
      topic: e.topic,
      code: e.code,
      errorText: e.errorText,
      explanation: e.explanation ?? "",
      createdAt: e.createdAt.toISOString(),
    })),
  });
}

function levelExplainNote(level: string) {
  if (level === "beginner") {
    return "Explain in plain language, step by step: what the error means, exactly why this code triggers it, and the specific fix. Assume no prior error-reading experience.";
  }
  if (level === "advanced") {
    return "Be concise: name the root cause and the fix in a couple of sentences. Skip basics they'd already know.";
  }
  return "Explain the root cause and the fix, briefly. You can assume basic familiarity with the language.";
}

/** Saves a failed run to the learner's error log and explains it at their level. */
export async function POST(request: Request) {
  const accountId = await getCodeLabAccountId();
  if (!accountId) return NextResponse.json({ error: "Sign in first." }, { status: 401 });

  let body: { language?: string; level?: string; topic?: string; code?: string; errorText?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const language = body.language === "sql" ? "sql" : "python";
  const level = body.level === "advanced" || body.level === "intermediate" ? body.level : "beginner";
  const code = (body.code ?? "").trim().slice(0, MAX_CODE_LENGTH);
  const errorText = (body.errorText ?? "").trim().slice(0, MAX_ERROR_LENGTH);
  const topic = (body.topic ?? "").trim().slice(0, 200) || null;

  if (!code || !errorText) {
    return NextResponse.json({ error: "Nothing to explain." }, { status: 400 });
  }

  let explanation = "";
  if (isLlmConfigured()) {
    try {
      const { url, init } = createChatCompletionsRequest({
        temperature: 0.2,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content:
              "You explain programming errors to learners, clearly and without jargon they haven't seen. Return strict JSON only. Never output markdown fences.",
          },
          {
            role: "user",
            content: `${language} code:
\`\`\`${language}
${code}
\`\`\`

It failed with this error:
\`\`\`
${errorText}
\`\`\`

${levelExplainNote(level)}

Output JSON only: { "explanation": string }`,
          },
        ],
      });

      const res = await fetch(url, init);
      if (res.ok) {
        const data = await res.json();
        const raw = data?.choices?.[0]?.message?.content;
        if (typeof raw === "string") {
          const parsed = JSON.parse(raw) as { explanation?: string };
          explanation = (parsed.explanation ?? "").slice(0, 4000);
        }
      } else {
        console.error("[codelab/errors] upstream error", res.status, await res.text());
      }
    } catch (err) {
      console.error("[codelab/errors] explain failed", err);
    }
  }

  const log = await prisma.codeLabErrorLog.create({
    data: {
      accountId,
      language: toDbLanguage(language),
      level: toDbLevel(level),
      topic,
      code,
      errorText,
      explanation: explanation || null,
    },
  });

  if (!explanation && !isLlmConfigured()) {
    return NextResponse.json({
      id: log.id,
      explanation: "",
      warning: llmMissingConfigMessage(),
    });
  }

  return NextResponse.json({ id: log.id, explanation });
}
