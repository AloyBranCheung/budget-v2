/*
  Warnings:

  - Added the required column `auth0Id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "auth0Id" TEXT NOT NULL;
