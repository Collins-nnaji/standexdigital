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

function serialize(plan: {
  id: string;
  title: string;
  description: string | null;
  language: import("@prisma/client").CodeLabLanguage;
  level: import("@prisma/client").CodeLabLevel;
  moduleIds: unknown;
  createdAt: Date;
  updatedAt: Date;
}) {
  return {
    id: plan.id,
    title: plan.title,
    description: plan.description ?? "",
    language: fromDbLanguage(plan.language),
    level: fromDbLevel(plan.level),
    moduleIds: Array.isArray(plan.moduleIds) ? (plan.moduleIds as string[]) : [],
    createdAt: plan.createdAt.toISOString(),
    updatedAt: plan.updatedAt.toISOString(),
  };
}

export async function GET() {
  const accountId = await getCodeLabAccountId();
  if (!accountId) return NextResponse.json({ error: "Sign in first." }, { status: 401 });

  const plans = await prisma.codeLabLessonPlan.findMany({
    where: { accountId },
    orderBy: { updatedAt: "desc" },
  });
  return NextResponse.json({ plans: plans.map(serialize) });
}

export async function POST(request: Request) {
  const accountId = await getCodeLabAccountId();
  if (!accountId) return NextResponse.json({ error: "Sign in first." }, { status: 401 });

  let body: {
    title?: string;
    description?: string;
    language?: string;
    level?: string;
    moduleIds?: string[];
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const title = (body.title ?? "").trim().slice(0, 120);
  if (!title) return NextResponse.json({ error: "Give the plan a title." }, { status: 400 });

  const moduleIds = Array.isArray(body.moduleIds) ? body.moduleIds.filter((m) => typeof m === "string").slice(0, 50) : [];

  const plan = await prisma.codeLabLessonPlan.create({
    data: {
      accountId,
      title,
      description: (body.description ?? "").trim().slice(0, 1000) || null,
      language: toDbLanguage(body.language ?? "python"),
      level: toDbLevel(body.level ?? "beginner"),
      moduleIds,
    },
  });

  return NextResponse.json({ plan: serialize(plan) }, { status: 201 });
}
