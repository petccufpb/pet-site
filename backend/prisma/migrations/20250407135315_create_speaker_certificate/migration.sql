-- DropForeignKey
ALTER TABLE "ProjectCertificate" DROP CONSTRAINT "ProjectCertificate_participantId_fkey";

-- AlterTable
ALTER TABLE "ProjectCertificate" ADD COLUMN     "speakerId" TEXT,
ALTER COLUMN "participantId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ProjectCertificateTemplate" ADD COLUMN     "speaker" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "ProjectCertificate" ADD CONSTRAINT "ProjectCertificate_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "ProjectParticipant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectCertificate" ADD CONSTRAINT "ProjectCertificate_speakerId_fkey" FOREIGN KEY ("speakerId") REFERENCES "ProjectSpeaker"("id") ON DELETE SET NULL ON UPDATE CASCADE;
