/*
  Warnings:

  - You are about to drop the column `email` on the `Invite` table. All the data in the column will be lost.
  - You are about to drop the column `expiresAt` on the `Invite` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `Invite` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[storeId,userId]` on the table `Invite` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `invitedBy` to the `Invite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Invite` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "InviteStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'REVOKED');

-- DropIndex
DROP INDEX "Invite_token_key";

-- AlterTable
ALTER TABLE "Invite" DROP COLUMN "email",
DROP COLUMN "expiresAt",
DROP COLUMN "token",
ADD COLUMN     "invitedBy" TEXT NOT NULL,
ADD COLUMN     "status" "InviteStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Invite_userId_idx" ON "Invite"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Invite_storeId_userId_key" ON "Invite"("storeId", "userId");

-- AddForeignKey
ALTER TABLE "Invite" ADD CONSTRAINT "Invite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
