/*
  Warnings:

  - You are about to drop the column `uuid` on the `directors` table. All the data in the column will be lost.
  - You are about to drop the column `uuid` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `uuid` on the `tutors` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "directors" DROP COLUMN "uuid";

-- AlterTable
ALTER TABLE "students" DROP COLUMN "uuid";

-- AlterTable
ALTER TABLE "tutors" DROP COLUMN "uuid";
