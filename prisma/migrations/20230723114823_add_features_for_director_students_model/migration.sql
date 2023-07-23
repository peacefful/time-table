/*
  Warnings:

  - Added the required column `password` to the `directors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `students` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "directors" ADD COLUMN     "password" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "students" ADD COLUMN     "password" INTEGER NOT NULL;
