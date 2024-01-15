/*
  Warnings:

  - Added the required column `profileImage` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileImageName` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnail` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnailName` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('user', 'admin', 'staff');

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "private" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "profileImage" TEXT NOT NULL,
ADD COLUMN     "profileImageName" TEXT NOT NULL,
ADD COLUMN     "thumbnail" TEXT NOT NULL,
ADD COLUMN     "thumbnailName" TEXT NOT NULL,
ALTER COLUMN "bio" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userType" "UserType" NOT NULL DEFAULT 'user';
