/*
  Warnings:

  - You are about to drop the column `image_url` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `image_url` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "image_url",
ADD COLUMN     "media_url" TEXT;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "image_url",
ADD COLUMN     "media_url" TEXT;
