import { Asset, AssetTransaction, AssetCategory } from '@/generated/prisma/client';

export type InvestimentType = Omit<Asset, 'createdAt' | 'updatedAt'>;
export type InvestimentTransactionType = Omit<AssetTransaction, 'createdAt' | 'updatedAt'>;
export type InvestimentCategoryType = AssetCategory;
export type SearchInvestimentCategory = Exclude<InvestimentCategoryType, 'fixed_income'>;
export type SelectedStockType = {
  ticker?: string;
  name?: string;
  price?: string | number;
  logo?: string;
};
