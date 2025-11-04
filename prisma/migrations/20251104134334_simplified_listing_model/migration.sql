/*
  Warnings:

  - You are about to drop the `businesses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `reviews` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."businesses" DROP CONSTRAINT "businesses_city_fkey";

-- DropForeignKey
ALTER TABLE "public"."reviews" DROP CONSTRAINT "reviews_businessId_fkey";

-- DropTable
DROP TABLE "public"."businesses";

-- DropTable
DROP TABLE "public"."cities";

-- DropTable
DROP TABLE "public"."reviews";

-- CreateTable
CREATE TABLE "Listing" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT,
    "city" TEXT,
    "phone" TEXT,
    "website" TEXT,
    "rating" DOUBLE PRECISION,
    "mapsUrl" TEXT,
    "address" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Listing_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Listing_name_key" ON "Listing"("name");
