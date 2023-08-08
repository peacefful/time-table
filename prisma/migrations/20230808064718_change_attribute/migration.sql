/*
  Warnings:

  - You are about to drop the column `tutorId` on the `groups` table. All the data in the column will be lost.
  - You are about to drop the column `timeTableId` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `institutionId` on the `tutors` table. All the data in the column will be lost.
  - Added the required column `institutionId` to the `groups` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupId` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupId` to the `tutors` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "groups" DROP CONSTRAINT "groups_tutorId_fkey";

-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_timeTableId_fkey";

-- DropForeignKey
ALTER TABLE "tutors" DROP CONSTRAINT "tutors_institutionId_fkey";

-- AlterTable
ALTER TABLE "groups" DROP COLUMN "tutorId",
ADD COLUMN     "institutionId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "students" DROP COLUMN "timeTableId",
ADD COLUMN     "groupId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "tutors" DROP COLUMN "institutionId",
ADD COLUMN     "groupId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "institutions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tutors" ADD CONSTRAINT "tutors_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;
