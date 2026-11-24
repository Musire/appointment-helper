/*
  Warnings:

  - Added the required column `start` to the `StoreHour` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end` to the `StoreHour` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StoreHour" DROP COLUMN "start",
ADD COLUMN     "start" INTEGER NOT NULL,
DROP COLUMN "end",
ADD COLUMN     "end" INTEGER NOT NULL;
