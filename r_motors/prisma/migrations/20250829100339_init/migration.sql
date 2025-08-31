-- CreateEnum
CREATE TYPE "public"."OrderStatus" AS ENUM ('Delivered', 'Pending', 'Canceled', 'Dispatched');

-- AlterTable
ALTER TABLE "public"."Order" ADD COLUMN     "orderStatus" "public"."OrderStatus" NOT NULL DEFAULT 'Pending';
