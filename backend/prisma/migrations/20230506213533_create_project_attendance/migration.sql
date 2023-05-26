-- CreateTable
CREATE TABLE "ProjectAttendance" (
    "id" TEXT NOT NULL,
    "participantId" TEXT NOT NULL,
    "eventId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectAttendance_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProjectAttendance" ADD CONSTRAINT "ProjectAttendance_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "ProjectParticipant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectAttendance" ADD CONSTRAINT "ProjectAttendance_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "ProjectEvent"("id") ON DELETE SET NULL ON UPDATE CASCADE;
