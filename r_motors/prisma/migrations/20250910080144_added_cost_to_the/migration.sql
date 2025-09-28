-- CreateEnum
CREATE TYPE "public"."ProductAvailability" AS ENUM ('Available', 'Pending', 'Sold');

-- AlterTable
ALTER TABLE "public"."Product" ADD COLUMN     "productAvailability" "public"."ProductAvailability" NOT NULL DEFAULT 'Available';
