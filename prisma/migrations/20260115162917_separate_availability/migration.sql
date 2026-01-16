/*
  Warnings:

  - You are about to drop the column `staffId` on the `StaffAvailability` table. All the data in the column will be lost.
  - Made the column `userId` on table `Appointment` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `storeStaffId` to the `StaffAvailability` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `dayOfWeek` on the `StaffAvailability` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "DayOfWeek" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_staffId_fkey";

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_userId_fkey";

-- DropForeignKey
ALTER TABLE "StaffAvailability" DROP CONSTRAINT "StaffAvailability_staffId_fkey";

-- DropIndex
DROP INDEX "StaffAvailability_staffId_dayOfWeek_idx";

-- AlterTable
ALTER TABLE "Appointment" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "StaffAvailability" DROP COLUMN "staffId",
ADD COLUMN     "storeStaffId" TEXT NOT NULL,
DROP COLUMN "dayOfWeek",
ADD COLUMN     "dayOfWeek" "DayOfWeek" NOT NULL;

-- CreateIndex
CREATE INDEX "StaffAvailability_storeStaffId_dayOfWeek_idx" ON "StaffAvailability"("storeStaffId", "dayOfWeek");

-- AddForeignKey
ALTER TABLE "StaffAvailability" ADD CONSTRAINT "StaffAvailability_storeStaffId_fkey" FOREIGN KEY ("storeStaffId") REFERENCES "StoreStaff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "StoreStaff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
