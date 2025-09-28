/*
  Warnings:

  - Added the required column `productCost` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `productPrice` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."Product" ADD COLUMN     "productCost" DECIMAL(65,30) NOT NULL,
DROP COLUMN "productPrice",
ADD COLUMN     "productPrice" DECIMAL(65,30) NOT NULL;
