/*
  Warnings:

  - A unique constraint covering the columns `[userName]` on the table `profile` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `profile_userName_key` ON `profile`(`userName`);
