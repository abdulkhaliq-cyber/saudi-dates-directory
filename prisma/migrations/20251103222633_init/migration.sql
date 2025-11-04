-- CreateTable
CREATE TABLE "businesses" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "address" TEXT,
    "city" TEXT NOT NULL,
    "region" TEXT,
    "postalCode" TEXT,
    "country" TEXT NOT NULL DEFAULT 'Saudi Arabia',
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "phone" TEXT,
    "email" TEXT,
    "website" TEXT,
    "googleMapsId" TEXT,
    "googleMapsUrl" TEXT,
    "placeId" TEXT,
    "rating" DOUBLE PRECISION,
    "reviewCount" INTEGER DEFAULT 0,
    "priceLevel" INTEGER,
    "businessHours" TEXT,
    "images" TEXT[],
    "categories" TEXT[],
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "keywords" TEXT[],
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "businesses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cities" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "region" TEXT,
    "description" TEXT,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "businessCount" INTEGER NOT NULL DEFAULT 0,
    "population" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "authorName" TEXT,
    "googleReviewId" TEXT,
    "reviewDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "businesses_slug_key" ON "businesses"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "businesses_googleMapsId_key" ON "businesses"("googleMapsId");

-- CreateIndex
CREATE UNIQUE INDEX "businesses_placeId_key" ON "businesses"("placeId");

-- CreateIndex
CREATE INDEX "businesses_city_idx" ON "businesses"("city");

-- CreateIndex
CREATE INDEX "businesses_slug_idx" ON "businesses"("slug");

-- CreateIndex
CREATE INDEX "businesses_rating_idx" ON "businesses"("rating");

-- CreateIndex
CREATE INDEX "businesses_isActive_idx" ON "businesses"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "cities_name_key" ON "cities"("name");

-- CreateIndex
CREATE UNIQUE INDEX "cities_slug_key" ON "cities"("slug");

-- CreateIndex
CREATE INDEX "cities_slug_idx" ON "cities"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "reviews_googleReviewId_key" ON "reviews"("googleReviewId");

-- CreateIndex
CREATE INDEX "reviews_businessId_idx" ON "reviews"("businessId");

-- CreateIndex
CREATE INDEX "reviews_rating_idx" ON "reviews"("rating");

-- AddForeignKey
ALTER TABLE "businesses" ADD CONSTRAINT "businesses_city_fkey" FOREIGN KEY ("city") REFERENCES "cities"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "businesses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
