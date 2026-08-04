import { cookies } from "next/headers";
import { CodeLabLanguage, CodeLabLevel } from "@prisma/client";
import { CODELAB_COOKIE, readCodeLabSession } from "@/lib/codelab-auth";
import { prisma } from "@/lib/prisma";

/** Resolves the signed-in Code Lab account from the request cookies, or null. */
export async function getCodeLabAccountId(): Promise<string | null> {
  const store = await cookies();
  return readCodeLabSession(store.get(CODELAB_COOKIE)?.value);
}

export async function requireCodeLabAccount() {
  const accountId = await getCodeLabAccountId();
  if (!accountId) return null;
  const account = await prisma.studioAccount.findUnique({ where: { id: accountId } });
  return account;
}

export function toDbLanguage(language: string): CodeLabLanguage {
  return language === "sql" ? CodeLabLanguage.SQL : CodeLabLanguage.PYTHON;
}

export function fromDbLanguage(language: CodeLabLanguage): "python" | "sql" {
  return language === CodeLabLanguage.SQL ? "sql" : "python";
}

export function toDbLevel(level: string): CodeLabLevel {
  if (level === "advanced") return CodeLabLevel.ADVANCED;
  if (level === "intermediate") return CodeLabLevel.INTERMEDIATE;
  return CodeLabLevel.BEGINNER;
}

export function fromDbLevel(level: CodeLabLevel): "beginner" | "intermediate" | "advanced" {
  if (level === CodeLabLevel.ADVANCED) return "advanced";
  if (level === CodeLabLevel.INTERMEDIATE) return "intermediate";
  return "beginner";
}
