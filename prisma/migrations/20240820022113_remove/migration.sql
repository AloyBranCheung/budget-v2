/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Images` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tagId]` on the table `Images` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Images" DROP CONSTRAINT "Images_categoryId_fkey";

-- DropIndex
DROP INDEX "Images_categoryId_key";

-- AlterTable
ALTER TABLE "Images" DROP COLUMN "categoryId",
ADD COLUMN     "tagId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Images_tagId_key" ON "Images"("tagId");

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE SET NULL ON UPDATE CASCADE;
