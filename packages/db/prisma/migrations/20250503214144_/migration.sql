/*
  Warnings:

  - You are about to drop the column `type` on the `OnRampTransaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "OnRampTransaction" DROP COLUMN "type";

-- DropEnum
DROP TYPE "TransactionType";
