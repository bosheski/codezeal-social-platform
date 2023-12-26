/*
  Warnings:

  - You are about to drop the column `slug` on the `Post` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Post_slug_key";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "slug";
