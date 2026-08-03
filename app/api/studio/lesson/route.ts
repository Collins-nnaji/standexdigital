import { NextResponse } from "next/server";
import {
  createChatCompletionsRequest,
  isLlmConfigured,
  llmMissingConfigMessage,
} from "@/lib/llm-client";
import { SAMPLE_SCHEMA } from "@/lib/code-lab/runtimes";

export const runtime = "nodejs";

type LessonPayload = {
  language?: "python" | "sql";
  topic?: string;
  level?: "beginner" | "intermediate" | "advanced";
  /** Optional free-text steer, e.g. "focus on real examples". */
  request?: string;
};

const MAX_REQUEST_LENGTH = 500;

function buildPrompt(input: {
  language: string;
  topic: string;
  level: string;
  request: string;
}) {
  const sqlContext =
    input.language === "sql"
      ? `\nThe learner's database already contains these tables, so every example must run against them unchanged:\n${SAMPLE_SCHEMA}\n`
      : "\nExamples must run on a plain Python interpreter with no third-party packages installed (no pandas, no numpy, no network access).\n";

  return `Write a short, practical lesson on "${input.topic}" in ${input.language} for a ${input.level} learner.
${sqlContext}${input.request ? `\nThe learner also asked: "${input.request}"\n` : ""}
Output JSON only:
{
  "title": string,
  "explanation": string,
  "keyPoints": string[],
  "example": string,
  "exampleNote": string,
  "exercise": string
}

Rules:
- "explanation" is 2-4 short paragraphs in plain language, separated by \\n\\n. Assume a ${input.level} level and do not condescend.
- "keyPoints" holds 3-5 concise takeaways.
- "example" is runnable ${input.language} code only — no markdown fences, no commentary outside comments.
- The example must run exactly as written and print or return something visible.
- "exampleNote" is one sentence on what the example demonstrates.
- "exercise" is one small task for the learner to try by modifying the example.
- No markdown fences anywhere.`;
}

export async function POST(request: Request) {
  if (!isLlmConfigured()) {
    return NextResponse.json({ error: llmMissingConfigMessage() }, { status: 503 });
  }

  let body: LessonPayload;
  try {
    body = (await request.json()) as LessonPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const language = body.language === "sql" ? "sql" : "python";
  const topic = body.topic?.trim() ?? "";
  const level =
    body.level === "advanced" || body.level === "intermediate" ? body.level : "beginner";
  const userRequest = (body.request ?? "").trim().slice(0, MAX_REQUEST_LENGTH);

  if (!topic) {
    return NextResponse.json({ error: "Pick a topic to learn." }, { status: 400 });
  }

  try {
    const { url, init } = createChatCompletionsRequest({
      temperature: 0.4,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You are a patient programming teacher. Explain clearly and concisely, and always give runnable examples. Return strict JSON only. Never output markdown fences.",
        },
        { role: "user", content: buildPrompt({ language, topic, level, request: userRequest }) },
      ],
    });

    const res = await fetch(url, init);
    if (!res.ok) {
      const detail = await res.text();
      console.error("[studio/lesson] upstream error", res.status, detail);
      return NextResponse.json({ error: "The lesson service is unavailable." }, { status: 502 });
    }

    const data = await res.json();
    const raw = data?.choices?.[0]?.message?.content;
    if (typeof raw !== "string") {
      return NextResponse.json({ error: "The lesson service returned no content." }, { status: 502 });
    }

    try {
      const parsed = JSON.parse(raw);
      return NextResponse.json({
        title: typeof parsed.title === "string" ? parsed.title : topic,
        explanation: typeof parsed.explanation === "string" ? parsed.explanation : "",
        keyPoints: Array.isArray(parsed.keyPoints) ? parsed.keyPoints.slice(0, 6) : [],
        example: typeof parsed.example === "string" ? parsed.example : "",
        exampleNote: typeof parsed.exampleNote === "string" ? parsed.exampleNote : "",
        exercise: typeof parsed.exercise === "string" ? parsed.exercise : "",
      });
    } catch {
      console.error("[studio/lesson] unparseable model output");
      return NextResponse.json({ error: "The lesson could not be read." }, { status: 502 });
    }
  } catch (err) {
    console.error("[studio/lesson] failed", err);
    return NextResponse.json({ error: "The lesson could not be generated." }, { status: 500 });
  }
}
