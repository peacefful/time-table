/*
  Warnings:

  - You are about to drop the column `timeTableId` on the `friday` table. All the data in the column will be lost.
  - You are about to drop the column `timeTableId` on the `monday` table. All the data in the column will be lost.
  - You are about to drop the column `timeTableId` on the `saturday` table. All the data in the column will be lost.
  - You are about to drop the column `timeTableId` on the `thursday` table. All the data in the column will be lost.
  - You are about to drop the column `timeTableId` on the `tuesday` table. All the data in the column will be lost.
  - You are about to drop the column `timeTableId` on the `wednesday` table. All the data in the column will be lost.
  - You are about to drop the `timeTables` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[groupId]` on the table `friday` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[groupId]` on the table `monday` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[groupId]` on the table `saturday` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[groupId]` on the table `thursday` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[groupId]` on the table `tuesday` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[groupId]` on the table `wednesday` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `groupId` to the `friday` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupId` to the `monday` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupId` to the `saturday` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupId` to the `thursday` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupId` to the `tuesday` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupId` to the `wednesday` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "friday" DROP CONSTRAINT "friday_timeTableId_fkey";

-- DropForeignKey
ALTER TABLE "monday" DROP CONSTRAINT "monday_timeTableId_fkey";

-- DropForeignKey
ALTER TABLE "saturday" DROP CONSTRAINT "saturday_timeTableId_fkey";

-- DropForeignKey
ALTER TABLE "thursday" DROP CONSTRAINT "thursday_timeTableId_fkey";

-- DropForeignKey
ALTER TABLE "timeTables" DROP CONSTRAINT "timeTables_groupId_fkey";

-- DropForeignKey
ALTER TABLE "tuesday" DROP CONSTRAINT "tuesday_timeTableId_fkey";

-- DropForeignKey
ALTER TABLE "wednesday" DROP CONSTRAINT "wednesday_timeTableId_fkey";

-- AlterTable
ALTER TABLE "friday" DROP COLUMN "timeTableId",
ADD COLUMN     "groupId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "monday" DROP COLUMN "timeTableId",
ADD COLUMN     "groupId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "saturday" DROP COLUMN "timeTableId",
ADD COLUMN     "groupId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "thursday" DROP COLUMN "timeTableId",
ADD COLUMN     "groupId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "tuesday" DROP COLUMN "timeTableId",
ADD COLUMN     "groupId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "wednesday" DROP COLUMN "timeTableId",
ADD COLUMN     "groupId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "timeTables";

-- CreateIndex
CREATE UNIQUE INDEX "friday_groupId_key" ON "friday"("groupId");

-- CreateIndex
CREATE UNIQUE INDEX "monday_groupId_key" ON "monday"("groupId");

-- CreateIndex
CREATE UNIQUE INDEX "saturday_groupId_key" ON "saturday"("groupId");

-- CreateIndex
CREATE UNIQUE INDEX "thursday_groupId_key" ON "thursday"("groupId");

-- CreateIndex
CREATE UNIQUE INDEX "tuesday_groupId_key" ON "tuesday"("groupId");

-- CreateIndex
CREATE UNIQUE INDEX "wednesday_groupId_key" ON "wednesday"("groupId");

-- AddForeignKey
ALTER TABLE "monday" ADD CONSTRAINT "monday_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tuesday" ADD CONSTRAINT "tuesday_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wednesday" ADD CONSTRAINT "wednesday_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "thursday" ADD CONSTRAINT "thursday_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friday" ADD CONSTRAINT "friday_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saturday" ADD CONSTRAINT "saturday_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;
