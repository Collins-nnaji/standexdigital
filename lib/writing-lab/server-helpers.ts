import { WritingLevel } from "@prisma/client";

export { getCodeLabAccountId as getStudioAccountId } from "@/lib/code-lab/server-helpers";

export function toWritingLevel(level: string): WritingLevel {
  if (level === "advanced") return WritingLevel.ADVANCED;
  if (level === "intermediate") return WritingLevel.INTERMEDIATE;
  return WritingLevel.BEGINNER;
}

export function fromWritingLevel(level: WritingLevel): "beginner" | "intermediate" | "advanced" {
  if (level === WritingLevel.ADVANCED) return "advanced";
  if (level === WritingLevel.INTERMEDIATE) return "intermediate";
  return "beginner";
}
