-- CreateTable
CREATE TABLE `Task` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `status` ENUM('TODO', 'IN_PROGRESS', 'DONE', 'BACKLOG', 'CANCELLED') NULL,
    `assignee` ENUM('RONIT', 'TEJAS', 'VANSITA', 'YASH', 'AYUSH') NULL,
    `priority` ENUM('URGENT', 'HIGH', 'MEDIUM', 'LOW') NULL,
    `project` ENUM('PERSONAL', 'WORK', 'COLLEGE', 'OTHER') NULL,
    `dueDate` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tag` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` ENUM('BUG', 'FEATURE', 'ENHANCEMENT', 'REFACTOR', 'TEST', 'DESIGN', 'DOCUMENTATION', 'RESEARCH', 'OTHER') NOT NULL,
    `taskID` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Tag` ADD CONSTRAINT `Tag_taskID_fkey` FOREIGN KEY (`taskID`) REFERENCES `Task`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
