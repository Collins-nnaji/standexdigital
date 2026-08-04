-- CreateEnum
CREATE TYPE "WritingLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');

-- CreateTable
CREATE TABLE "WritingChallengeAttempt" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "skillFocus" TEXT NOT NULL,
    "level" "WritingLevel" NOT NULL,
    "title" TEXT NOT NULL,
    "brief" TEXT NOT NULL,
    "targetWords" INTEGER,
    "text" TEXT NOT NULL,
    "score" INTEGER,
    "strengths" JSONB NOT NULL,
    "improvements" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WritingChallengeAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "WritingChallengeAttempt_accountId_createdAt_idx" ON "WritingChallengeAttempt"("accountId", "createdAt" DESC);

-- AddForeignKey
ALTER TABLE "WritingChallengeAttempt" ADD CONSTRAINT "WritingChallengeAttempt_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "StudioAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

