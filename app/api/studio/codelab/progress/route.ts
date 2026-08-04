import { NextResponse } from "next/server";
import { fromDbLanguage, fromDbLevel, getCodeLabAccountId } from "@/lib/code-lab/server-helpers";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  const accountId = await getCodeLabAccountId();
  if (!accountId) return NextResponse.json({ error: "Sign in first." }, { status: 401 });

  const [lessons, practiceItems, errors] = await Promise.all([
    prisma.codeLabLesson.findMany({
      where: { accountId },
      select: { language: true, level: true, topic: true, moduleId: true, createdAt: true },
    }),
    prisma.codeLabPracticeItem.findMany({
      where: { accountId },
      select: { language: true, status: true, topic: true, moduleId: true },
    }),
    prisma.codeLabErrorLog.findMany({
      where: { accountId },
      select: { language: true, topic: true, createdAt: true },
    }),
  ]);

  type TopicKey = string;
  const byTopic = new Map<
    TopicKey,
    {
      language: "python" | "sql";
      moduleId: string | null;
      topic: string;
      lessonsCount: number;
      practiceOpen: number;
      practicePassed: number;
      practiceNeedsReview: number;
      errorCount: number;
      lastLevel: "beginner" | "intermediate" | "advanced";
      lastActivityAt: string;
    }
  >();

  const keyFor = (language: string, moduleId: string | null, topic: string) =>
    `${language}::${moduleId ?? topic}`;

  for (const l of lessons) {
    const language = fromDbLanguage(l.language);
    const key = keyFor(language, l.moduleId, l.topic);
    const entry = byTopic.get(key) ?? {
      language,
      moduleId: l.moduleId,
      topic: l.topic,
      lessonsCount: 0,
      practiceOpen: 0,
      practicePassed: 0,
      practiceNeedsReview: 0,
      errorCount: 0,
      lastLevel: fromDbLevel(l.level),
      lastActivityAt: l.createdAt.toISOString(),
    };
    entry.lessonsCount += 1;
    if (l.createdAt.toISOString() > entry.lastActivityAt) {
      entry.lastActivityAt = l.createdAt.toISOString();
      entry.lastLevel = fromDbLevel(l.level);
    }
    byTopic.set(key, entry);
  }

  for (const p of practiceItems) {
    const language = fromDbLanguage(p.language);
    const key = keyFor(language, p.moduleId, p.topic);
    const entry = byTopic.get(key) ?? {
      language,
      moduleId: p.moduleId,
      topic: p.topic,
      lessonsCount: 0,
      practiceOpen: 0,
      practicePassed: 0,
      practiceNeedsReview: 0,
      errorCount: 0,
      lastLevel: "beginner" as const,
      lastActivityAt: new Date(0).toISOString(),
    };
    if (p.status === "PASSED") entry.practicePassed += 1;
    else if (p.status === "NEEDS_REVIEW") entry.practiceNeedsReview += 1;
    else entry.practiceOpen += 1;
    byTopic.set(key, entry);
  }

  for (const e of errors) {
    if (!e.topic) continue;
    const language = fromDbLanguage(e.language);
    const key = keyFor(language, null, e.topic);
    const entry = byTopic.get(key);
    if (entry) entry.errorCount += 1;
  }

  const topics = Array.from(byTopic.values()).sort((a, b) => (a.lastActivityAt < b.lastActivityAt ? 1 : -1));

  return NextResponse.json({
    topics,
    totals: {
      lessons: lessons.length,
      practicePassed: practiceItems.filter((p) => p.status === "PASSED").length,
      practiceNeedsReview: practiceItems.filter((p) => p.status === "NEEDS_REVIEW").length,
      errors: errors.length,
    },
  });
}
