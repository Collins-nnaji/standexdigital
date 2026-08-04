import { NextResponse } from "next/server";
import { getCodeLabAccountId, toDbLanguage, toDbLevel } from "@/lib/code-lab/server-helpers";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const accountId = await getCodeLabAccountId();
  if (!accountId) return NextResponse.json({ error: "Sign in first." }, { status: 401 });
  const { id } = await params;

  const existing = await prisma.codeLabLessonPlan.findUnique({ where: { id } });
  if (!existing || existing.accountId !== accountId) {
    return NextResponse.json({ error: "Plan not found." }, { status: 404 });
  }

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

  const updated = await prisma.codeLabLessonPlan.update({
    where: { id },
    data: {
      ...(body.title !== undefined ? { title: body.title.trim().slice(0, 120) } : {}),
      ...(body.description !== undefined ? { description: body.description.trim().slice(0, 1000) || null } : {}),
      ...(body.language !== undefined ? { language: toDbLanguage(body.language) } : {}),
      ...(body.level !== undefined ? { level: toDbLevel(body.level) } : {}),
      ...(body.moduleIds !== undefined
        ? { moduleIds: body.moduleIds.filter((m) => typeof m === "string").slice(0, 50) }
        : {}),
    },
  });

  return NextResponse.json({ ok: true, id: updated.id });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const accountId = await getCodeLabAccountId();
  if (!accountId) return NextResponse.json({ error: "Sign in first." }, { status: 401 });
  const { id } = await params;

  const existing = await prisma.codeLabLessonPlan.findUnique({ where: { id } });
  if (!existing || existing.accountId !== accountId) {
    return NextResponse.json({ error: "Plan not found." }, { status: 404 });
  }

  await prisma.codeLabLessonPlan.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
