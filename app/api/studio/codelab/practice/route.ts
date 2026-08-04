import { NextResponse } from "next/server";
import {
  createChatCompletionsRequest,
  isLlmConfigured,
  llmMissingConfigMessage,
} from "@/lib/llm-client";
import { SAMPLE_SCHEMA } from "@/lib/code-lab/runtimes";
import {
  fromDbLanguage,
  fromDbLevel,
  getCodeLabAccountId,
  toDbLanguage,
  toDbLevel,
} from "@/lib/code-lab/server-helpers";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const MAX_LIST = 100;

function serialize(item: {
  id: string;
  language: import("@prisma/client").CodeLabLanguage;
  level: import("@prisma/client").CodeLabLevel;
  moduleId: string | null;
  topic: string;
  prompt: string;
  starterCode: string | null;
  status: import("@prisma/client").CodeLabPracticeStatus;
  createdAt: Date;
  updatedAt: Date;
}) {
  return {
    id: item.id,
    language: fromDbLanguage(item.language),
    level: fromDbLevel(item.level),
    moduleId: item.moduleId,
    topic: item.topic,
    prompt: item.prompt,
    starterCode: item.starterCode ?? "",
    status: item.status.toLowerCase(),
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
  };
}

export async function GET(request: Request) {
  const accountId = await getCodeLabAccountId();
  if (!accountId) return NextResponse.json({ error: "Sign in first." }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const language = searchParams.get("language");

  const items = await prisma.codeLabPracticeItem.findMany({
    where: { accountId, ...(language ? { language: toDbLanguage(language) } : {}) },
    orderBy: { updatedAt: "desc" },
    take: MAX_LIST,
    include: { attempts: { orderBy: { createdAt: "desc" }, take: 1 } },
  });

  return NextResponse.json({
    items: items.map((item) => ({
      ...serialize(item),
      lastAttempt: item.attempts[0]
        ? { passed: item.attempts[0].passed, feedback: item.attempts[0].feedback ?? "" }
        : null,
    })),
  });
}

/** Difficulty shapes what's generated, not just the wording. */
function levelInstructions(level: string) {
  if (level === "beginner") {
    return "Keep scope small — one concept, one clear expected output. Provide starter code with the surrounding structure already written and a TODO comment marking exactly what to fill in. State the expected input/output explicitly.";
  }
  if (level === "advanced") {
    return "Pose a realistic, slightly ambiguous scenario the learner must scope themselves. No starter code — return an empty string for it. Expect them to consider at least one edge case or performance concern without being told to.";
  }
  return "Combine two related ideas from the topic. Starter code may include only the function/query signature, not the logic. Mention one edge case to watch for, but do not solve it for them.";
}

function buildPrompt(input: { language: string; topic: string; level: string; focus: string }) {
  const context =
    input.language === "sql"
      ? `\nThe learner's database already contains these tables:\n${SAMPLE_SCHEMA}\n`
      : "\nSolutions must run on a plain Python interpreter with no third-party packages.\n";

  return `Write one practice scenario on "${input.topic}" in ${input.language} for a ${input.level} learner.
${context}${input.focus ? `\nFocus especially on: "${input.focus}"\n` : ""}
${levelInstructions(input.level)}

Output JSON only:
{ "title": string, "prompt": string, "starterCode": string }

Rules:
- "prompt" is the task itself: what to build/query and what "done" looks like. 2-5 sentences.
- "starterCode" is runnable ${input.language} scaffolding per the difficulty rule above, or "" if none.
- No markdown fences anywhere.`;
}

export async function POST(request: Request) {
  const accountId = await getCodeLabAccountId();
  if (!accountId) return NextResponse.json({ error: "Sign in first." }, { status: 401 });

  if (!isLlmConfigured()) {
    return NextResponse.json({ error: llmMissingConfigMessage() }, { status: 503 });
  }

  let body: { language?: string; topic?: string; level?: string; moduleId?: string; focus?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const language = body.language === "sql" ? "sql" : "python";
  const level = body.level === "advanced" || body.level === "intermediate" ? body.level : "beginner";
  const topic = (body.topic ?? "").trim().slice(0, 200);
  const focus = (body.focus ?? "").trim().slice(0, 300);
  if (!topic) return NextResponse.json({ error: "Pick a topic." }, { status: 400 });

  try {
    const { url, init } = createChatCompletionsRequest({
      temperature: 0.5,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You design short, realistic coding exercises for learners. Return strict JSON only. Never output markdown fences.",
        },
        { role: "user", content: buildPrompt({ language, topic, level, focus }) },
      ],
    });

    const res = await fetch(url, init);
    if (!res.ok) {
      console.error("[codelab/practice] upstream error", res.status, await res.text());
      return NextResponse.json({ error: "The practice service is unavailable." }, { status: 502 });
    }

    const data = await res.json();
    const raw = data?.choices?.[0]?.message?.content;
    if (typeof raw !== "string") {
      return NextResponse.json({ error: "The practice service returned no content." }, { status: 502 });
    }

    const parsed = JSON.parse(raw) as { title?: string; prompt?: string; starterCode?: string };
    if (!parsed.prompt) {
      return NextResponse.json({ error: "The scenario could not be generated." }, { status: 502 });
    }

    const item = await prisma.codeLabPracticeItem.create({
      data: {
        accountId,
        language: toDbLanguage(language),
        level: toDbLevel(level),
        moduleId: body.moduleId ?? null,
        topic: parsed.title?.slice(0, 200) || topic,
        prompt: parsed.prompt.slice(0, 4000),
        starterCode: parsed.starterCode?.slice(0, 4000) || null,
      },
    });

    return NextResponse.json({ item: serialize(item) }, { status: 201 });
  } catch (err) {
    console.error("[codelab/practice] failed", err);
    return NextResponse.json({ error: "The scenario could not be generated." }, { status: 500 });
  }
}
