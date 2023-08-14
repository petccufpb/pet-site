-- DropForeignKey
ALTER TABLE "ProjectCertificate" DROP CONSTRAINT "ProjectCertificate_editionId_fkey";

-- AlterTable
ALTER TABLE "ProjectCertificate" ALTER COLUMN "editionId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ProjectCertificate" ADD CONSTRAINT "ProjectCertificate_editionId_fkey" FOREIGN KEY ("editionId") REFERENCES "ProjectEdition"("id") ON DELETE SET NULL ON UPDATE CASCADE;
