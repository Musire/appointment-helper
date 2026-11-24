/*
  Warnings:

  - You are about to drop the column `isActive` on the `StoreHour` table. All the data in the column will be lost.
  - You are about to drop the column `label` on the `StoreHour` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[storeConfigId,day]` on the table `StoreHour` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `day` to the `StoreHour` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StoreHour" DROP COLUMN "isActive",
DROP COLUMN "label",
ADD COLUMN     "day" TEXT NOT NULL,
ALTER COLUMN "start" DROP NOT NULL,
ALTER COLUMN "end" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "StoreHour_storeConfigId_day_key" ON "StoreHour"("storeConfigId", "day");
