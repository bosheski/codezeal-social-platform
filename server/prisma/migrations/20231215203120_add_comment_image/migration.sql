/*
  Warnings:

  - You are about to drop the column `image` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "image_url" TEXT;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "image",
ADD COLUMN     "image_url" TEXT;
