/*
  Warnings:

  - You are about to drop the column `currTotalBudget` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "currTotalBudget";

-- CreateTable
CREATE TABLE "Paycheck" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "amount" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Paycheck_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Paycheck" ADD CONSTRAINT "Paycheck_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
