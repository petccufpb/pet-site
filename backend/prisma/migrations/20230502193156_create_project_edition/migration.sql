-- CreateTable
CREATE TABLE "ProjectEdition" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "number" DOUBLE PRECISION NOT NULL,
    "projectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectEdition_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProjectEdition" ADD CONSTRAINT "ProjectEdition_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
