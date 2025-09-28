-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "userBio" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "userLocation" TEXT NOT NULL DEFAULT '';
