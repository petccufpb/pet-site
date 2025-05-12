DROP INDEX "ProjectCertificateTemplate_editionId_eventId_speaker_key";

CREATE TYPE "ProjectCertificateKind" AS ENUM ('minicurso', 'palestra');
ALTER TABLE "ProjectCertificateTemplate" ADD COLUMN "kind" "ProjectCertificateKind";
UPDATE "ProjectCertificateTemplate" SET "kind" = 'minicurso' WHERE "speaker" = TRUE;
ALTER TABLE "ProjectCertificateTemplate" DROP COLUMN "speaker";

CREATE UNIQUE INDEX "ProjectCertificateTemplate_editionId_eventId_kind_key" ON "ProjectCertificateTemplate"("editionId", "eventId", "kind");
