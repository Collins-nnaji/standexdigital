import { NextResponse } from "next/server";
import {
  createChatCompletionsRequest,
  isLlmConfigured,
  llmMissingConfigMessage,
} from "@/lib/llm-client";
import { getStudioAccountId, toWritingLevel } from "@/lib/writing-lab/server-helpers";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

type FeedbackPayload = {
  title?: string;
  brief?: string;
  skillFocus?: string;
  level?: "beginner" | "intermediate" | "advanced";
  targetWords?: number | null;
  text?: string;
};

const MAX_TEXT_LENGTH = 8000;

function levelGradingNote(level: string) {
  if (level === "beginner") {
    return "The writer is a beginner. Be encouraging. Name one or two concrete improvements with a short example of how to say it better — don't just describe the problem abstractly.";
  }
  if (level === "advanced") {
    return "The writer is advanced. Be direct and exacting — hold them to the constraint (word limit, audience conflict) exactly as stated, and call out anything a skilled editor would flag.";
  }
  return "The writer is at an intermediate level. Explain what's working and what isn't, with enough specificity that they know exactly what to change.";
}

function buildPrompt(input: { skillFocus: string; level: string; title: string; brief: string; targetWords: number | null; text: string }) {
  return `A writer attempted this challenge, focused on "${input.skillFocus}":
Title: ${input.title}
Brief: ${input.brief}
${input.targetWords ? `Target length: ~${input.targetWords} words\n` : ""}
Their submission:
"""
${input.text}
"""

${levelGradingNote(input.level)}

Output JSON only:
{ "score": number, "strengths": string[], "improvements": string[], "note": string }

Rules:
- "score" is 0-100, judged against the brief and the ${input.skillFocus} skill specifically — not general grammar.
- "strengths" holds 1-3 short, specific things done well (empty array if truly none).
- "improvements" holds 1-4 short, specific, actionable changes — not vague advice like "be clearer".
- "note" is one sentence, direct, no hedging.
- No markdown fences.`;
}

export async function POST(request: Request) {
  if (!isLlmConfigured()) {
    return NextResponse.json({ error: llmMissingConfigMessage() }, { status: 503 });
  }

  let body: FeedbackPayload;
  try {
    body = (await request.json()) as FeedbackPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const title = (body.title ?? "").trim().slice(0, 160) || "Writing challenge";
  const brief = (body.brief ?? "").trim().slice(0, 1200);
  const skillFocus = (body.skillFocus ?? "clarity").trim().slice(0, 60);
  const level = body.level === "advanced" || body.level === "intermediate" ? body.level : "beginner";
  const targetWords = typeof body.targetWords === "number" ? body.targetWords : null;
  const text = (body.text ?? "").trim().slice(0, MAX_TEXT_LENGTH);

  if (!brief || !text) {
    return NextResponse.json({ error: "Nothing to grade yet." }, { status: 400 });
  }

  try {
    const { url, init } = createChatCompletionsRequest({
      temperature: 0.2,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You are a precise, fair writing coach. Return strict JSON only. Never output markdown fences.",
        },
        { role: "user", content: buildPrompt({ skillFocus, level, title, brief, targetWords, text }) },
      ],
    });

    const res = await fetch(url, init);
    if (!res.ok) {
      console.error("[writing-challenges/feedback] upstream error", res.status, await res.text());
      return NextResponse.json({ error: "The feedback service is unavailable." }, { status: 502 });
    }

    const data = await res.json();
    const raw = data?.choices?.[0]?.message?.content;
    if (typeof raw !== "string") {
      return NextResponse.json({ error: "The feedback service returned no content." }, { status: 502 });
    }

    const parsed = JSON.parse(raw) as { score?: number; strengths?: string[]; improvements?: string[]; note?: string };
    const score = Number.isFinite(parsed.score) ? Math.max(0, Math.min(100, Math.round(parsed.score as number))) : null;
    const strengths = Array.isArray(parsed.strengths) ? parsed.strengths.filter((s) => typeof s === "string").slice(0, 5) : [];
    const improvements = Array.isArray(parsed.improvements) ? parsed.improvements.filter((s) => typeof s === "string").slice(0, 5) : [];
    const note = typeof parsed.note === "string" ? parsed.note.slice(0, 400) : "";

    let saved = false;
    let id: string | null = null;

    const accountId = await getStudioAccountId();
    if (accountId) {
      const attempt = await prisma.writingChallengeAttempt.create({
        data: {
          accountId,
          skillFocus,
          level: toWritingLevel(level),
          title,
          brief,
          targetWords,
          text,
          score,
          strengths,
          improvements,
        },
      });
      saved = true;
      id = attempt.id;
    }

    return NextResponse.json({ score, strengths, improvements, note, saved, id });
  } catch (err) {
    console.error("[writing-challenges/feedback] failed", err);
    return NextResponse.json({ error: "The submission could not be graded." }, { status: 500 });
  }
}
