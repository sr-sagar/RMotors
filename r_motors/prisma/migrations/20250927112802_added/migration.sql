/*
  Warnings:

  - Added the required column `productPriceBeforeDiscount` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Product" ADD COLUMN     "productPriceBeforeDiscount" DECIMAL(65,30) NOT NULL;
