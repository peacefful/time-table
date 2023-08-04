-- DropForeignKey
ALTER TABLE "institutions" DROP CONSTRAINT "institutions_directorId_fkey";

-- DropForeignKey
ALTER TABLE "timeTables" DROP CONSTRAINT "timeTables_groupId_fkey";

-- DropForeignKey
ALTER TABLE "tutors" DROP CONSTRAINT "tutors_institutionId_fkey";

-- AddForeignKey
ALTER TABLE "institutions" ADD CONSTRAINT "institutions_directorId_fkey" FOREIGN KEY ("directorId") REFERENCES "directors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tutors" ADD CONSTRAINT "tutors_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "institutions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timeTables" ADD CONSTRAINT "timeTables_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;
