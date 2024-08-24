/*
  Warnings:

  - Made the column `date` on table `Paycheck` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Paycheck" ALTER COLUMN "date" SET NOT NULL;
