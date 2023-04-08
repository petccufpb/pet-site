/*
  Warnings:

  - Added the required column `snsId` to the `MemberContact` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MemberContact" ADD COLUMN     "snsId" TEXT NOT NULL;
