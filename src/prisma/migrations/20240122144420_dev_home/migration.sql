-- CreateEnum
CREATE TYPE "TRACK_PRIVACY" AS ENUM ('private', 'restricted', 'public');

-- CreateTable
CREATE TABLE "Track" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "audioFile" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "albumId" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "release" TIMESTAMP(3) NOT NULL,
    "albumArtWork" TEXT,
    "albumArtWorkName" TEXT,
    "description" TEXT,
    "tags" TEXT[],
    "privacy" "TRACK_PRIVACY" NOT NULL DEFAULT 'public',

    CONSTRAINT "Track_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Album" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
