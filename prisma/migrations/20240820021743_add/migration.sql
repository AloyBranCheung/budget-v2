/*
  Warnings:

  - A unique constraint covering the columns `[categoryId]` on the table `Images` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Images" ADD COLUMN     "categoryId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Images_categoryId_key" ON "Images"("categoryId");

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
