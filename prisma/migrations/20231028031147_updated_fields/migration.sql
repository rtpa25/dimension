/*
  Warnings:

  - You are about to alter the column `name` on the `Tag` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `VarChar(191)`.
  - You are about to drop the column `assignee` on the `Task` table. All the data in the column will be lost.
  - You are about to alter the column `status` on the `Task` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `VarChar(191)`.
  - You are about to alter the column `priority` on the `Task` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(3))` to `VarChar(191)`.
  - You are about to alter the column `project` on the `Task` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(4))` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `Tag` MODIFY `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Task` DROP COLUMN `assignee`,
    MODIFY `status` VARCHAR(191) NULL,
    MODIFY `priority` VARCHAR(191) NULL,
    MODIFY `project` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `taskId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `Task`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
