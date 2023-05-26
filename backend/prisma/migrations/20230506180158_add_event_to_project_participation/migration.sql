-- DropForeignKey
ALTER TABLE "ProjectParticipation" DROP CONSTRAINT "ProjectParticipation_editionId_fkey";

-- AlterTable
ALTER TABLE "ProjectParticipation" ADD COLUMN     "eventId" TEXT,
ALTER COLUMN "editionId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ProjectParticipation" ADD CONSTRAINT "ProjectParticipation_editionId_fkey" FOREIGN KEY ("editionId") REFERENCES "ProjectEdition"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectParticipation" ADD CONSTRAINT "ProjectParticipation_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "ProjectEvent"("id") ON DELETE SET NULL ON UPDATE CASCADE;
