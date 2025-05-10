/*
  Warnings:

  - Added the required column `type` to the `OnRampTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('received', 'sent');

-- AlterTable
ALTER TABLE "OnRampTransaction" ADD COLUMN     "type" "TransactionType" NOT NULL;
