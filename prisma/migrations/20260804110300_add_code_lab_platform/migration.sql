-- CreateEnum
CREATE TYPE "CodeLabLanguage" AS ENUM ('PYTHON', 'SQL');

-- CreateEnum
CREATE TYPE "CodeLabLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');

-- CreateEnum
CREATE TYPE "CodeLabPracticeStatus" AS ENUM ('OPEN', 'PASSED', 'NEEDS_REVIEW');

-- CreateTable
CREATE TABLE "StudioAccount" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "firstNameKey" TEXT NOT NULL,
    "surnameHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudioAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CodeLabLessonPlan" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "language" "CodeLabLanguage" NOT NULL,
    "level" "CodeLabLevel" NOT NULL,
    "moduleIds" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CodeLabLessonPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CodeLabLesson" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "language" "CodeLabLanguage" NOT NULL,
    "level" "CodeLabLevel" NOT NULL,
    "moduleId" TEXT,
    "topic" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "explanation" TEXT NOT NULL,
    "keyPoints" JSONB NOT NULL,
    "example" TEXT NOT NULL,
    "exampleNote" TEXT,
    "exercise" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CodeLabLesson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CodeLabPracticeItem" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "language" "CodeLabLanguage" NOT NULL,
    "level" "CodeLabLevel" NOT NULL,
    "moduleId" TEXT,
    "topic" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "starterCode" TEXT,
    "status" "CodeLabPracticeStatus" NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CodeLabPracticeItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CodeLabAttempt" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "practiceItemId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "passed" BOOLEAN,
    "feedback" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CodeLabAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CodeLabErrorLog" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "language" "CodeLabLanguage" NOT NULL,
    "level" "CodeLabLevel" NOT NULL,
    "topic" TEXT,
    "code" TEXT NOT NULL,
    "errorText" TEXT NOT NULL,
    "explanation" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CodeLabErrorLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StudioAccount_firstNameKey_key" ON "StudioAccount"("firstNameKey");

-- CreateIndex
CREATE INDEX "CodeLabLessonPlan_accountId_idx" ON "CodeLabLessonPlan"("accountId");

-- CreateIndex
CREATE INDEX "CodeLabLesson_accountId_language_createdAt_idx" ON "CodeLabLesson"("accountId", "language", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "CodeLabPracticeItem_accountId_status_idx" ON "CodeLabPracticeItem"("accountId", "status");

-- CreateIndex
CREATE INDEX "CodeLabAttempt_practiceItemId_createdAt_idx" ON "CodeLabAttempt"("practiceItemId", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "CodeLabErrorLog_accountId_createdAt_idx" ON "CodeLabErrorLog"("accountId", "createdAt" DESC);

-- AddForeignKey
ALTER TABLE "CodeLabLessonPlan" ADD CONSTRAINT "CodeLabLessonPlan_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "StudioAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CodeLabLesson" ADD CONSTRAINT "CodeLabLesson_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "StudioAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CodeLabPracticeItem" ADD CONSTRAINT "CodeLabPracticeItem_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "StudioAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CodeLabAttempt" ADD CONSTRAINT "CodeLabAttempt_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "StudioAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CodeLabAttempt" ADD CONSTRAINT "CodeLabAttempt_practiceItemId_fkey" FOREIGN KEY ("practiceItemId") REFERENCES "CodeLabPracticeItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CodeLabErrorLog" ADD CONSTRAINT "CodeLabErrorLog_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "StudioAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

