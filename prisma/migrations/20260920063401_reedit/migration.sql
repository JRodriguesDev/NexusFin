/*
  Warnings:

  - The values [fixed_income] on the enum `InvestimentCategory` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "InvestimentCategory_new" AS ENUM ('stock', 'fund', 'bdr', 'fixedIncome');
ALTER TABLE "investiments" ALTER COLUMN "category" TYPE "InvestimentCategory_new" USING ("category"::text::"InvestimentCategory_new");
ALTER TYPE "InvestimentCategory" RENAME TO "InvestimentCategory_old";
ALTER TYPE "InvestimentCategory_new" RENAME TO "InvestimentCategory";
DROP TYPE "public"."InvestimentCategory_old";
COMMIT;
