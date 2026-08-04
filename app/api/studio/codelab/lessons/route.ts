import { NextResponse } from "next/server";
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

export async function GET(request: Request) {
  const accountId = await getCodeLabAccountId();
  if (!accountId) return NextResponse.json({ error: "Sign in first." }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const language = searchParams.get("language");

  const lessons = await prisma.codeLabLesson.findMany({
    where: { accountId, ...(language ? { language: toDbLanguage(language) } : {}) },
    orderBy: { createdAt: "desc" },
    take: MAX_LIST,
  });

  return NextResponse.json({
    lessons: lessons.map((l) => ({
      id: l.id,
      language: fromDbLanguage(l.language),
      level: fromDbLevel(l.level),
      moduleId: l.moduleId,
      topic: l.topic,
      title: l.title,
      explanation: l.explanation,
      keyPoints: Array.isArray(l.keyPoints) ? (l.keyPoints as string[]) : [],
      example: l.example,
      exampleNote: l.exampleNote ?? "",
      exercise: l.exercise ?? "",
      createdAt: l.createdAt.toISOString(),
    })),
  });
}

export async function POST(request: Request) {
  const accountId = await getCodeLabAccountId();
  if (!accountId) return NextResponse.json({ error: "Sign in first." }, { status: 401 });

  let body: {
    language?: string;
    level?: string;
    moduleId?: string;
    topic?: string;
    title?: string;
    explanation?: string;
    keyPoints?: string[];
    example?: string;
    exampleNote?: string;
    exercise?: string;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!body.topic || !body.title) {
    return NextResponse.json({ error: "Missing lesson content." }, { status: 400 });
  }

  const lesson = await prisma.codeLabLesson.create({
    data: {
      accountId,
      language: toDbLanguage(body.language ?? "python"),
      level: toDbLevel(body.level ?? "beginner"),
      moduleId: body.moduleId ?? null,
      topic: body.topic.slice(0, 200),
      title: body.title.slice(0, 200),
      explanation: (body.explanation ?? "").slice(0, 8000),
      keyPoints: Array.isArray(body.keyPoints) ? body.keyPoints.slice(0, 10) : [],
      example: (body.example ?? "").slice(0, 8000),
      exampleNote: (body.exampleNote ?? "").slice(0, 1000) || null,
      exercise: (body.exercise ?? "").slice(0, 2000) || null,
    },
  });

  return NextResponse.json({ id: lesson.id }, { status: 201 });
}
