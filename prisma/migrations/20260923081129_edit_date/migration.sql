/*
  Warnings:

  - You are about to drop the column `recurring_day` on the `transactions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "recurring_day",
ALTER COLUMN "date" DROP DEFAULT;
