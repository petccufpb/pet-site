/*
  Warnings:

  - You are about to drop the column `email` on the `ProjectSpeaker` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "ProjectSpeaker_email_key";

-- AlterTable
ALTER TABLE "ProjectSpeaker" DROP COLUMN "email";
