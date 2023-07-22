-- CreateTable
CREATE TABLE "institution" (
    "id" SERIAL NOT NULL,
    "appellation" TEXT NOT NULL,

    CONSTRAINT "institution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "directors" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "directorId" INTEGER NOT NULL,

    CONSTRAINT "directors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "groups" (
    "id" SERIAL NOT NULL,
    "groupName" TEXT NOT NULL,
    "course" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,

    CONSTRAINT "groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "students" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "studentId" INTEGER NOT NULL,

    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timeTable" (
    "id" SERIAL NOT NULL,
    "timeTableId" INTEGER NOT NULL,

    CONSTRAINT "timeTable_pkey" PRIMARY KEY ("id")
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
CREATE UNIQUE INDEX "directors_directorId_key" ON "directors"("directorId");

-- CreateIndex
CREATE UNIQUE INDEX "timeTable_timeTableId_key" ON "timeTable"("timeTableId");

-- AddForeignKey
ALTER TABLE "directors" ADD CONSTRAINT "directors_directorId_fkey" FOREIGN KEY ("directorId") REFERENCES "institution"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "directors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timeTable" ADD CONSTRAINT "timeTable_timeTableId_fkey" FOREIGN KEY ("timeTableId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "monday" ADD CONSTRAINT "monday_timeTableId_fkey" FOREIGN KEY ("timeTableId") REFERENCES "timeTable"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tuesday" ADD CONSTRAINT "tuesday_timeTableId_fkey" FOREIGN KEY ("timeTableId") REFERENCES "timeTable"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wednesday" ADD CONSTRAINT "wednesday_timeTableId_fkey" FOREIGN KEY ("timeTableId") REFERENCES "timeTable"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "thursday" ADD CONSTRAINT "thursday_timeTableId_fkey" FOREIGN KEY ("timeTableId") REFERENCES "timeTable"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friday" ADD CONSTRAINT "friday_timeTableId_fkey" FOREIGN KEY ("timeTableId") REFERENCES "timeTable"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saturday" ADD CONSTRAINT "saturday_timeTableId_fkey" FOREIGN KEY ("timeTableId") REFERENCES "timeTable"("id") ON DELETE CASCADE ON UPDATE CASCADE;
