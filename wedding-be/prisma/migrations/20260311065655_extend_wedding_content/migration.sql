-- AlterTable
ALTER TABLE "Wedding" ADD COLUMN     "brideBank" TEXT,
ADD COLUMN     "brideBankAccount" TEXT,
ADD COLUMN     "brideBankName" TEXT,
ADD COLUMN     "brideDescription" TEXT,
ADD COLUMN     "brideFullName" TEXT,
ADD COLUMN     "brideImageUrl" TEXT,
ADD COLUMN     "brideName" TEXT,
ADD COLUMN     "brideParents" TEXT,
ADD COLUMN     "ceremonyTime" TEXT,
ADD COLUMN     "ceremonyVenueAddress" TEXT,
ADD COLUMN     "ceremonyVenueName" TEXT,
ADD COLUMN     "groomBank" TEXT,
ADD COLUMN     "groomBankAccount" TEXT,
ADD COLUMN     "groomBankName" TEXT,
ADD COLUMN     "groomDescription" TEXT,
ADD COLUMN     "groomFullName" TEXT,
ADD COLUMN     "groomImageUrl" TEXT,
ADD COLUMN     "groomName" TEXT,
ADD COLUMN     "groomParents" TEXT,
ADD COLUMN     "heroMessage" TEXT,
ADD COLUMN     "monogram" TEXT,
ADD COLUMN     "receptionTime" TEXT,
ADD COLUMN     "videoId" TEXT;

-- CreateTable
CREATE TABLE "GalleryPhoto" (
    "id" SERIAL NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "alt" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "weddingId" INTEGER NOT NULL,

    CONSTRAINT "GalleryPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoveStoryEvent" (
    "id" SERIAL NOT NULL,
    "dateLabel" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "weddingId" INTEGER NOT NULL,

    CONSTRAINT "LoveStoryEvent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GalleryPhoto" ADD CONSTRAINT "GalleryPhoto_weddingId_fkey" FOREIGN KEY ("weddingId") REFERENCES "Wedding"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoveStoryEvent" ADD CONSTRAINT "LoveStoryEvent_weddingId_fkey" FOREIGN KEY ("weddingId") REFERENCES "Wedding"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
