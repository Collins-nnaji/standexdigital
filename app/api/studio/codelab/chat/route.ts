import { NextResponse } from "next/server";
import {
  createChatCompletionsRequest,
  isLlmConfigured,
  llmMissingConfigMessage,
} from "@/lib/llm-client";
import {
  fromDbLanguage,
  getCodeLabAccountId,
  toDbLanguage,
} from "@/lib/code-lab/server-helpers";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const HISTORY_LIMIT = 60;
const CONTEXT_MESSAGES = 16;
const MAX_MESSAGE_LENGTH = 4000;
const MAX_CODE_LENGTH = 6000;

export async function GET(request: Request) {
  const accountId = await getCodeLabAccountId();
  if (!accountId) return NextResponse.json({ error: "Sign in first." }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const language = toDbLanguage(searchParams.get("language") ?? "python");

  const messages = await prisma.codeLabChatMessage.findMany({
    where: { accountId, language },
    orderBy: { createdAt: "asc" },
    take: HISTORY_LIMIT,
  });

  return NextResponse.json({
    messages: messages.map((m) => ({
      id: m.id,
      role: m.role.toLowerCase(),
      content: m.content,
      createdAt: m.createdAt.toISOString(),
    })),
  });
}

export async function DELETE(request: Request) {
  const accountId = await getCodeLabAccountId();
  if (!accountId) return NextResponse.json({ error: "Sign in first." }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const language = toDbLanguage(searchParams.get("language") ?? "python");

  await prisma.codeLabChatMessage.deleteMany({ where: { accountId, language } });
  return NextResponse.json({ ok: true });
}

function systemPrompt(language: string, level: string) {
  return `You are a patient, precise programming tutor helping someone learn ${language}. The learner's self-described level is ${level} — calibrate depth accordingly, but never condescend.

For every answer:
- Explain the "why", not just the "what".
- Give at least one concrete, runnable ${language} example when relevant.
- When useful, mention a real-world use case: where this actually shows up in production code.
- If the question is vague, ask one clarifying question instead of guessing.
- Keep answers focused — a few tight paragraphs and a code block beat a wall of text.
- Never fabricate APIs or behavior; say so if you're unsure.

Format in plain text with markdown code fences for code. No filler like "Great question!".`;
}

export async function POST(request: Request) {
  const accountId = await getCodeLabAccountId();
  if (!accountId) return NextResponse.json({ error: "Sign in first." }, { status: 401 });

  if (!isLlmConfigured()) {
    return NextResponse.json({ error: llmMissingConfigMessage() }, { status: 503 });
  }

  let body: {
    language?: string;
    level?: "beginner" | "intermediate" | "advanced";
    message?: string;
    code?: string;
  };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const language = body.language === "sql" ? "sql" : "python";
  const dbLanguage = toDbLanguage(language);
  const level = body.level === "advanced" || body.level === "intermediate" ? body.level : "beginner";
  const message = (body.message ?? "").trim().slice(0, MAX_MESSAGE_LENGTH);
  const code = (body.code ?? "").trim().slice(0, MAX_CODE_LENGTH);

  if (!message) {
    return NextResponse.json({ error: "Write a message first." }, { status: 400 });
  }

  const history = await prisma.codeLabChatMessage.findMany({
    where: { accountId, language: dbLanguage },
    orderBy: { createdAt: "desc" },
    take: CONTEXT_MESSAGES,
  });
  history.reverse();

  const userTurn = code
    ? `${message}\n\nHere's the code I'm looking at:\n\`\`\`${language}\n${code}\n\`\`\``
    : message;

  try {
    const { url, init } = createChatCompletionsRequest({
      temperature: 0.4,
      messages: [
        { role: "system", content: systemPrompt(language, level) },
        ...history.map((m) => ({
          role: m.role === "USER" ? ("user" as const) : ("assistant" as const),
          content: m.content,
        })),
        { role: "user", content: userTurn },
      ],
    });

    const res = await fetch(url, init);
    if (!res.ok) {
      console.error("[codelab/chat] upstream error", res.status, await res.text());
      return NextResponse.json({ error: "The tutor is unavailable right now." }, { status: 502 });
    }

    const data = await res.json();
    const reply = data?.choices?.[0]?.message?.content;
    if (typeof reply !== "string" || !reply.trim()) {
      return NextResponse.json({ error: "The tutor returned no reply." }, { status: 502 });
    }

    const [userMsg, assistantMsg] = await prisma.$transaction([
      prisma.codeLabChatMessage.create({
        data: { accountId, language: dbLanguage, role: "USER", content: message },
      }),
      prisma.codeLabChatMessage.create({
        data: { accountId, language: dbLanguage, role: "ASSISTANT", content: reply.trim() },
      }),
    ]);

    return NextResponse.json({
      userMessage: { id: userMsg.id, role: "user", content: userMsg.content, createdAt: userMsg.createdAt.toISOString() },
      reply: { id: assistantMsg.id, role: "assistant", content: assistantMsg.content, createdAt: assistantMsg.createdAt.toISOString() },
      language: fromDbLanguage(dbLanguage),
    });
  } catch (err) {
    console.error("[codelab/chat] failed", err);
    return NextResponse.json({ error: "The tutor could not respond." }, { status: 500 });
  }
}
