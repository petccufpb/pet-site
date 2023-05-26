-- CreateTable
CREATE TABLE "ProjectCertificate" (
    "id" TEXT NOT NULL,
    "participantId" TEXT NOT NULL,
    "editionId" TEXT NOT NULL,
    "eventId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectCertificate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectCertificateTemplate" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "backgroundUrl" TEXT NOT NULL,
    "editionId" TEXT,
    "eventId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectCertificateTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProjectCertificateTemplate_editionId_key" ON "ProjectCertificateTemplate"("editionId");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectCertificateTemplate_eventId_key" ON "ProjectCertificateTemplate"("eventId");

-- AddForeignKey
ALTER TABLE "ProjectCertificate" ADD CONSTRAINT "ProjectCertificate_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "ProjectParticipant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectCertificate" ADD CONSTRAINT "ProjectCertificate_editionId_fkey" FOREIGN KEY ("editionId") REFERENCES "ProjectEdition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectCertificate" ADD CONSTRAINT "ProjectCertificate_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "ProjectEvent"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectCertificateTemplate" ADD CONSTRAINT "ProjectCertificateTemplate_editionId_fkey" FOREIGN KEY ("editionId") REFERENCES "ProjectEdition"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectCertificateTemplate" ADD CONSTRAINT "ProjectCertificateTemplate_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "ProjectEvent"("id") ON DELETE SET NULL ON UPDATE CASCADE;
