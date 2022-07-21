/*
  Warnings:

  - You are about to alter the column `valuation` on the `house` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `house` MODIFY `valuation` INTEGER NOT NULL;
