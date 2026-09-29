-- Blocks new check-ins until the index exists, so no duplicate slips in between the DELETE and the CREATE INDEX
LOCK TABLE "ProjectAttendance" IN SHARE ROW EXCLUSIVE MODE;

-- Remove duplicate attendances, keeping the oldest record of each (participantId, eventId) pair
DELETE FROM "ProjectAttendance" a
USING "ProjectAttendance" b
WHERE a."participantId" = b."participantId"
  AND a."eventId" = b."eventId"
  AND (a."createdAt", a."id") > (b."createdAt", b."id");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectAttendance_participantId_eventId_key" ON "ProjectAttendance"("participantId", "eventId");
