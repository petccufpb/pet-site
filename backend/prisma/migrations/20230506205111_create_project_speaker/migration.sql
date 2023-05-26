/*
  Warnings:

  - Added the required column `speakerId` to the `ProjectEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `ProjectEvent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProjectEvent" ADD COLUMN     "speakerId" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ProjectSpeaker" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "photoUrl" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectSpeaker_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProjectSpeaker_email_key" ON "ProjectSpeaker"("email");

-- AddForeignKey
ALTER TABLE "ProjectEvent" ADD CONSTRAINT "ProjectEvent_speakerId_fkey" FOREIGN KEY ("speakerId") REFERENCES "ProjectSpeaker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
