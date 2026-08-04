-- CreateEnum
CREATE TYPE "CodeLabChatRole" AS ENUM ('USER', 'ASSISTANT');

-- CreateTable
CREATE TABLE "CodeLabChatMessage" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "language" "CodeLabLanguage" NOT NULL,
    "role" "CodeLabChatRole" NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CodeLabChatMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CodeLabChatMessage_accountId_language_createdAt_idx" ON "CodeLabChatMessage"("accountId", "language", "createdAt");

-- AddForeignKey
ALTER TABLE "CodeLabChatMessage" ADD CONSTRAINT "CodeLabChatMessage_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "StudioAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

