-- DropForeignKey
ALTER TABLE "groups" DROP CONSTRAINT "groups_tutorId_fkey";

-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_timeTableId_fkey";

-- DropForeignKey
ALTER TABLE "tutors" DROP CONSTRAINT "tutors_institutionId_fkey";

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "institutions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tutors" ADD CONSTRAINT "tutors_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_timeTableId_fkey" FOREIGN KEY ("timeTableId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;
