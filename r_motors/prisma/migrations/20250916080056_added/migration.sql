-- AlterEnum
ALTER TYPE "public"."OrderStatus" ADD VALUE 'Self_Pickup';

-- AlterTable
ALTER TABLE "public"."Order" ADD COLUMN     "deliveryDate" TEXT NOT NULL DEFAULT 'Not Available';
