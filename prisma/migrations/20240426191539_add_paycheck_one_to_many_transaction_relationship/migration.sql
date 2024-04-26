/*
  Warnings:

  - Added the required column `paycheckId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "paycheckId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_paycheckId_fkey" FOREIGN KEY ("paycheckId") REFERENCES "Paycheck"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
