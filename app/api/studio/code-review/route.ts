import { NextResponse } from "next/server";
import {
  createChatCompletionsRequest,
  isLlmConfigured,
  llmMissingConfigMessage,
} from "@/lib/llm-client";

export const runtime = "nodejs";

type ReviewPayload = {
  language?: "python" | "sql";
  code?: string;
};

type ReviewFinding = {
  severity: "high" | "medium" | "low" | "praise";
  title: string;
  detail: string;
  line?: number;
};

type ReviewOutput = {
  summary: string;
  findings: ReviewFinding[];
};

const MAX_CODE_LENGTH = 20000;

function buildPrompt(language: string, code: string) {
  return `Review the following ${language} code. The author is learning, so explain the reasoning behind each point rather than only naming the problem.

Output JSON only:
{
  "summary": string,
  "findings": [
    { "severity": "high" | "medium" | "low" | "praise", "title": string, "detail": string, "line": number | null }
  ]
}

Rules:
- "summary" is one or two sentences on the overall state of the code.
- Order findings most important first. Use "high" only for real correctness or security problems.
- Include at most one "praise" finding, and only when something is genuinely well done.
- "line" is the 1-indexed line the finding refers to, or null if it applies broadly.
- Cover correctness, readability, and performance. Do not invent problems; if the code is sound, say so.
- Return at most 8 findings. No markdown fences.

\`\`\`${language}
${code}
\`\`\``;
}

export async function POST(request: Request) {
  if (!isLlmConfigured()) {
    return NextResponse.json({ error: llmMissingConfigMessage() }, { status: 503 });
  }

  let body: ReviewPayload;
  try {
    body = (await request.json()) as ReviewPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const language = body.language === "sql" ? "sql" : "python";
  const code = body.code?.trim() ?? "";

  if (!code) {
    return NextResponse.json({ error: "There is no code to review." }, { status: 400 });
  }
  if (code.length > MAX_CODE_LENGTH) {
    return NextResponse.json(
      { error: "That snippet is too long to review. Try a smaller selection." },
      { status: 413 },
    );
  }

  try {
    const { url, init } = createChatCompletionsRequest({
      temperature: 0.2,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You are a precise, encouraging senior engineer reviewing code for someone who is learning. Return strict JSON only. Never output markdown fences.",
        },
        { role: "user", content: buildPrompt(language, code) },
      ],
    });

    const res = await fetch(url, init);
    if (!res.ok) {
      const detail = await res.text();
      console.error("[studio/code-review] upstream error", res.status, detail);
      return NextResponse.json({ error: "The review service is unavailable." }, { status: 502 });
    }

    const data = await res.json();
    const raw = data?.choices?.[0]?.message?.content;
    if (typeof raw !== "string") {
      return NextResponse.json({ error: "The review service returned no content." }, { status: 502 });
    }

    let parsed: ReviewOutput;
    try {
      parsed = JSON.parse(raw) as ReviewOutput;
    } catch {
      console.error("[studio/code-review] unparseable model output");
      return NextResponse.json({ error: "The review could not be read." }, { status: 502 });
    }

    const findings = Array.isArray(parsed.findings) ? parsed.findings.slice(0, 8) : [];
    return NextResponse.json({
      summary: typeof parsed.summary === "string" ? parsed.summary : "",
      findings,
    });
  } catch (err) {
    console.error("[studio/code-review] failed", err);
    return NextResponse.json({ error: "The review could not be completed." }, { status: 500 });
  }
}
