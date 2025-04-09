/*
  Warnings:

  - A unique constraint covering the columns `[editionId,eventId,speaker]` on the table `ProjectCertificateTemplate` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "ProjectCertificateTemplate_editionId_key";

-- DropIndex
DROP INDEX "ProjectCertificateTemplate_eventId_key";

-- CreateIndex
CREATE UNIQUE INDEX "ProjectCertificateTemplate_editionId_eventId_speaker_key" ON "ProjectCertificateTemplate"("editionId", "eventId", "speaker");
