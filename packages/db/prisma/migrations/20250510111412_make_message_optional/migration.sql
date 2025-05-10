/*
  Warnings:

  - Added the required column `message` to the `p2pTransfer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OnRampTransaction" ADD COLUMN "message" TEXT;

-- AlterTable
ALTER TABLE "p2pTransfer" ADD COLUMN "message" TEXT;
