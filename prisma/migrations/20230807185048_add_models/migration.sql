-- CreateTable
CREATE TABLE "directors" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "directors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "institutions" (
    "id" SERIAL NOT NULL,
    "appellation" TEXT NOT NULL,
    "directorId" INTEGER NOT NULL,

    CONSTRAINT "institutions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tutors" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "institutionId" INTEGER NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "tutors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "groups" (
    "id" SERIAL NOT NULL,
    "groupName" TEXT NOT NULL,
    "course" INTEGER NOT NULL,
    "tutorId" INTEGER NOT NULL,

    CONSTRAINT "groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timeTables" (
    "id" SERIAL NOT NULL,
    "groupId" INTEGER NOT NULL,

    CONSTRAINT "timeTables_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "students" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "timeTableId" INTEGER NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "monday" (
    "id" SERIAL NOT NULL,
    "subject" TEXT NOT NULL,
    "office" INTEGER NOT NULL,
    "teacher" TEXT NOT NULL,
    "beginning" TEXT NOT NULL,
    "end" TEXT NOT NULL,
    "timeTableId" INTEGER NOT NULL,

    CONSTRAINT "monday_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tuesday" (
    "id" SERIAL NOT NULL,
    "subject" TEXT NOT NULL,
    "office" INTEGER NOT NULL,
    "teacher" TEXT NOT NULL,
    "beginning" TEXT NOT NULL,
    "end" TEXT NOT NULL,
    "timeTableId" INTEGER NOT NULL,

    CONSTRAINT "tuesday_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wednesday" (
    "id" SERIAL NOT NULL,
    "subject" TEXT NOT NULL,
    "office" INTEGER NOT NULL,
    "teacher" TEXT NOT NULL,
    "beginning" TEXT NOT NULL,
    "end" TEXT NOT NULL,
    "timeTableId" INTEGER NOT NULL,

    CONSTRAINT "wednesday_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "thursday" (
    "id" SERIAL NOT NULL,
    "subject" TEXT NOT NULL,
    "office" INTEGER NOT NULL,
    "teacher" TEXT NOT NULL,
    "beginning" TEXT NOT NULL,
    "end" TEXT NOT NULL,
    "timeTableId" INTEGER NOT NULL,

    CONSTRAINT "thursday_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "friday" (
    "id" SERIAL NOT NULL,
    "subject" TEXT NOT NULL,
    "office" INTEGER NOT NULL,
    "teacher" TEXT NOT NULL,
    "beginning" TEXT NOT NULL,
    "end" TEXT NOT NULL,
    "timeTableId" INTEGER NOT NULL,

    CONSTRAINT "friday_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "saturday" (
    "id" SERIAL NOT NULL,
    "subject" TEXT NOT NULL,
    "office" INTEGER NOT NULL,
    "teacher" TEXT NOT NULL,
    "beginning" TEXT NOT NULL,
    "end" TEXT NOT NULL,
    "timeTableId" INTEGER NOT NULL,

    CONSTRAINT "saturday_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "institutions_directorId_key" ON "institutions"("directorId");

-- CreateIndex
CREATE UNIQUE INDEX "timeTables_groupId_key" ON "timeTables"("groupId");

-- AddForeignKey
ALTER TABLE "institutions" ADD CONSTRAINT "institutions_directorId_fkey" FOREIGN KEY ("directorId") REFERENCES "directors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tutors" ADD CONSTRAINT "tutors_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "institutions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "tutors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timeTables" ADD CONSTRAINT "timeTables_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_timeTableId_fkey" FOREIGN KEY ("timeTableId") REFERENCES "timeTables"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "monday" ADD CONSTRAINT "monday_timeTableId_fkey" FOREIGN KEY ("timeTableId") REFERENCES "timeTables"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tuesday" ADD CONSTRAINT "tuesday_timeTableId_fkey" FOREIGN KEY ("timeTableId") REFERENCES "timeTables"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wednesday" ADD CONSTRAINT "wednesday_timeTableId_fkey" FOREIGN KEY ("timeTableId") REFERENCES "timeTables"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "thursday" ADD CONSTRAINT "thursday_timeTableId_fkey" FOREIGN KEY ("timeTableId") REFERENCES "timeTables"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friday" ADD CONSTRAINT "friday_timeTableId_fkey" FOREIGN KEY ("timeTableId") REFERENCES "timeTables"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saturday" ADD CONSTRAINT "saturday_timeTableId_fkey" FOREIGN KEY ("timeTableId") REFERENCES "timeTables"("id") ON DELETE CASCADE ON UPDATE CASCADE;
