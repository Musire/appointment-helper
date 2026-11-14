-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "actorId" TEXT,
ADD COLUMN     "cancelledAt" TIMESTAMP(3),
ADD COLUMN     "completedAt" TIMESTAMP(3),
ADD COLUMN     "duration" INTEGER,
ADD COLUMN     "noshowAt" TIMESTAMP(3),
ADD COLUMN     "notes" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "startedAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "AppointmentBreak" (
    "id" TEXT NOT NULL,
    "appointmentId" TEXT NOT NULL,
    "startsAt" TIMESTAMP(3) NOT NULL,
    "endsAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AppointmentBreak_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AppointmentBreak_appointmentId_idx" ON "AppointmentBreak"("appointmentId");

-- AddForeignKey
ALTER TABLE "AppointmentBreak" ADD CONSTRAINT "AppointmentBreak_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
