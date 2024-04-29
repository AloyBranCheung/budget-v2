-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_paycheckId_fkey";

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_paycheckId_fkey" FOREIGN KEY ("paycheckId") REFERENCES "Paycheck"("id") ON DELETE CASCADE ON UPDATE CASCADE;
