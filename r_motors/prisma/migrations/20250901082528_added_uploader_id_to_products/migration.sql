/*
  Warnings:

  - Added the required column `productUploaderId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Product" ADD COLUMN     "productUploaderId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Product" ADD CONSTRAINT "Product_productUploaderId_fkey" FOREIGN KEY ("productUploaderId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
