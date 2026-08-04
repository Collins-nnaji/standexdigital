import { CodeLabLanguage, CodeLabLevel } from "@prisma/client";
import { getStudioAccountId, requireStudioAccount } from "@/lib/studio-account";

/**
 * Code Lab reads/writes the shared Studio account (see lib/studio-account.ts) —
 * these names are kept for the existing Code Lab API routes.
 */
export const getCodeLabAccountId = getStudioAccountId;
export const requireCodeLabAccount = requireStudioAccount;

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
