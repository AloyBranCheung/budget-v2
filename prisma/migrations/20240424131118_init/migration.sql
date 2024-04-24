-- CreateTable
CREATE TABLE "Images" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "bytes" BYTEA NOT NULL,

    CONSTRAINT "Images_pkey" PRIMARY KEY ("id")
);
