/*
  Warnings:

  - A unique constraint covering the columns `[directorId]` on the table `institutions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "institutions_directorId_key" ON "institutions"("directorId");
