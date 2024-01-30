/*
  Warnings:

  - A unique constraint covering the columns `[participantId,editionId]` on the table `ProjectParticipation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[participantId,eventId]` on the table `ProjectParticipation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ProjectParticipation_participantId_editionId_key" ON "ProjectParticipation"("participantId", "editionId");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectParticipation_participantId_eventId_key" ON "ProjectParticipation"("participantId", "eventId");
