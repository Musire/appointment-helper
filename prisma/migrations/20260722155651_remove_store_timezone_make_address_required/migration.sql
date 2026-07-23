/*
  Warnings:

  - You are about to drop the column `timezone` on the `Store` table. All the data in the column will be lost.
  - Made the column `address` on table `Store` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Store" DROP COLUMN "timezone",
ALTER COLUMN "address" SET NOT NULL;
