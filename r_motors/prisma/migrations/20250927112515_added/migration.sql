/*
  Warnings:

  - Added the required column `productLocation` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productTotalMiles` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productYear` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."ProductTransmission" AS ENUM ('Automatic', 'Manual', 'Hybrid');

-- AlterTable
ALTER TABLE "public"."Product" ADD COLUMN     "productLocation" TEXT NOT NULL,
ADD COLUMN     "productTotalMiles" TEXT NOT NULL,
ADD COLUMN     "productTransmission" "public"."ProductTransmission" NOT NULL DEFAULT 'Manual',
ADD COLUMN     "productYear" TEXT NOT NULL;
