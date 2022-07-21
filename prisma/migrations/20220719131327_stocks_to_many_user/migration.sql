/*
  Warnings:

  - You are about to drop the column `userId` on the `stocks` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `stocks` DROP FOREIGN KEY `stocks_userId_fkey`;

-- AlterTable
ALTER TABLE `stocks` DROP COLUMN `userId`;

-- CreateTable
CREATE TABLE `_StocksToUser` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_StocksToUser_AB_unique`(`A`, `B`),
    INDEX `_StocksToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_StocksToUser` ADD CONSTRAINT `_StocksToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `stocks`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_StocksToUser` ADD CONSTRAINT `_StocksToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
