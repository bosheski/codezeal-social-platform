/*
  Warnings:

  - You are about to drop the `_CategoriesToPost` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoryId` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Made the column `content` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "_CategoriesToPost" DROP CONSTRAINT "_CategoriesToPost_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoriesToPost" DROP CONSTRAINT "_CategoriesToPost_B_fkey";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "categoryId" TEXT NOT NULL,
ALTER COLUMN "content" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" SET NOT NULL;

-- DropTable
DROP TABLE "_CategoriesToPost";

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
