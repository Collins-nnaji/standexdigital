import { NextResponse } from "next/server";
import {
  createChatCompletionsRequest,
  isLlmConfigured,
  llmMissingConfigMessage,
} from "@/lib/llm-client";

export const runtime = "nodejs";

type ChallengePayload = {
  skillFocus?: string;
  level?: "beginner" | "intermediate" | "advanced";
  topic?: string;
};

const MAX_TOPIC_LENGTH = 200;

function levelInstructions(level: string) {
  if (level === "beginner") {
    return "Keep the brief to one clear, concrete task with an obvious audience and purpose. Suggest a generous word count (120-200 words) and spell out exactly what the piece needs to accomplish.";
  }
  if (level === "advanced") {
    return "Give a realistic, slightly constrained scenario — competing priorities, a tricky audience, or a tight word limit (60-100 words) that forces hard choices. Do not spell out the structure; let them figure it out.";
  }
  return "Combine two requirements (e.g. a tone plus a structural constraint). Suggest a moderate word count (100-160 words). State the goal but not the approach.";
}

function buildPrompt(input: { skillFocus: string; level: string; topic: string }) {
  return `Design one short writing challenge focused on the skill "${input.skillFocus}", for a ${input.level} writer.
${input.topic ? `\nBase it on this topic/context: "${input.topic}"\n` : ""}
${levelInstructions(input.level)}

Output JSON only:
{ "title": string, "brief": string, "targetWords": number }

Rules:
- "title" is short and specific, not generic (not "Practice persuasion" — say what they're actually writing).
- "brief" is 2-4 sentences: the scenario, the audience, and what "done" looks like. No meta-commentary about difficulty level.
- "targetWords" is a single integer per the difficulty rule above.
- No markdown fences anywhere.`;
}

export async function POST(request: Request) {
  if (!isLlmConfigured()) {
    return NextResponse.json({ error: llmMissingConfigMessage() }, { status: 503 });
  }

  let body: ChallengePayload;
  try {
    body = (await request.json()) as ChallengePayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const skillFocus = (body.skillFocus ?? "clarity").trim().slice(0, 60);
  const level = body.level === "advanced" || body.level === "intermediate" ? body.level : "beginner";
  const topic = (body.topic ?? "").trim().slice(0, MAX_TOPIC_LENGTH);

  try {
    const { url, init } = createChatCompletionsRequest({
      temperature: 0.6,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You design short, realistic writing exercises for people improving a specific skill. Return strict JSON only. Never output markdown fences.",
        },
        { role: "user", content: buildPrompt({ skillFocus, level, topic }) },
      ],
    });

    const res = await fetch(url, init);
    if (!res.ok) {
      console.error("[writing-challenges] upstream error", res.status, await res.text());
      return NextResponse.json({ error: "The challenge service is unavailable." }, { status: 502 });
    }

    const data = await res.json();
    const raw = data?.choices?.[0]?.message?.content;
    if (typeof raw !== "string") {
      return NextResponse.json({ error: "The challenge service returned no content." }, { status: 502 });
    }

    const parsed = JSON.parse(raw) as { title?: string; brief?: string; targetWords?: number };
    if (!parsed.brief) {
      return NextResponse.json({ error: "The challenge could not be generated." }, { status: 502 });
    }

    return NextResponse.json({
      title: parsed.title?.slice(0, 160) || "Writing challenge",
      brief: parsed.brief.slice(0, 1200),
      targetWords: Number.isFinite(parsed.targetWords) ? Math.round(parsed.targetWords as number) : null,
      skillFocus,
      level,
    });
  } catch (err) {
    console.error("[writing-challenges] failed", err);
    return NextResponse.json({ error: "The challenge could not be generated." }, { status: 500 });
  }
}
