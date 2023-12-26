/*
  Warnings:

  - You are about to drop the `Follows` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Follows" DROP CONSTRAINT "Follows_followerId_fkey";

-- DropForeignKey
ALTER TABLE "Follows" DROP CONSTRAINT "Follows_followingId_fkey";

-- DropTable
DROP TABLE "Follows";

-- CreateTable
CREATE TABLE "Categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoriesToPost" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_UserFollowedCategories" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Categories_name_key" ON "Categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoriesToPost_AB_unique" ON "_CategoriesToPost"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoriesToPost_B_index" ON "_CategoriesToPost"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserFollowedCategories_AB_unique" ON "_UserFollowedCategories"("A", "B");

-- CreateIndex
CREATE INDEX "_UserFollowedCategories_B_index" ON "_UserFollowedCategories"("B");

-- AddForeignKey
ALTER TABLE "_CategoriesToPost" ADD CONSTRAINT "_CategoriesToPost_A_fkey" FOREIGN KEY ("A") REFERENCES "Categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoriesToPost" ADD CONSTRAINT "_CategoriesToPost_B_fkey" FOREIGN KEY ("B") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFollowedCategories" ADD CONSTRAINT "_UserFollowedCategories_A_fkey" FOREIGN KEY ("A") REFERENCES "Categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFollowedCategories" ADD CONSTRAINT "_UserFollowedCategories_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
