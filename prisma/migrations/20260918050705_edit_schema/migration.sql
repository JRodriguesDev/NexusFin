-- CreateEnum
CREATE TYPE "InvestimentCategory" AS ENUM ('stock', 'fund', 'bdr', 'fixed_income');

-- CreateTable
CREATE TABLE "investiments" (
    "id" TEXT NOT NULL,
    "logo" TEXT,
    "ticker" TEXT,
    "name" TEXT NOT NULL,
    "category" "InvestimentCategory" NOT NULL,
    "dateOperation" TIMESTAMP(3) NOT NULL,
    "quantity" DECIMAL(18,8) NOT NULL DEFAULT 0,
    "price" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "investiments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "investiments_category_idx" ON "investiments"("category");
