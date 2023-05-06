-- CreateTable
CREATE TABLE "ProjectParticipation" (
    "id" TEXT NOT NULL,
    "editionId" TEXT NOT NULL,
    "participantId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectParticipation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectParticipant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "matricula" INTEGER NOT NULL,
    "course" TEXT NOT NULL,
    "university" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectParticipant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProjectParticipant_email_key" ON "ProjectParticipant"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectParticipant_phoneNumber_key" ON "ProjectParticipant"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectParticipant_matricula_key" ON "ProjectParticipant"("matricula");

-- AddForeignKey
ALTER TABLE "ProjectParticipation" ADD CONSTRAINT "ProjectParticipation_editionId_fkey" FOREIGN KEY ("editionId") REFERENCES "ProjectEdition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectParticipation" ADD CONSTRAINT "ProjectParticipation_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "ProjectParticipant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
