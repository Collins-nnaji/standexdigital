import { NextResponse } from "next/server";
import { fromWritingLevel, getStudioAccountId } from "@/lib/writing-lab/server-helpers";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const MAX_LIST = 30;

export async function GET() {
  const accountId = await getStudioAccountId();
  if (!accountId) {
    return NextResponse.json({ signedIn: false, attempts: [] });
  }

  const attempts = await prisma.writingChallengeAttempt.findMany({
    where: { accountId },
    orderBy: { createdAt: "desc" },
    take: MAX_LIST,
  });

  return NextResponse.json({
    signedIn: true,
    attempts: attempts.map((a) => ({
      id: a.id,
      skillFocus: a.skillFocus,
      level: fromWritingLevel(a.level),
      title: a.title,
      score: a.score,
      createdAt: a.createdAt.toISOString(),
    })),
  });
}
