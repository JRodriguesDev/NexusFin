import { Investiment, InvestimentCategory } from '@/generated/prisma/client';

export type InvestimentType = Omit<
  Investiment,
  'createdAt' | 'updatedAt' | 'price' | 'quantity'
> & {
  price: number;
  quantity: number;
};
export type InvestimentCategoryType = InvestimentCategory;
export type SearchInvestimentCategory = Exclude<InvestimentCategoryType, 'fixed_income'>;
export type SelectedStockType = {
  ticker?: string;
  name?: string;
  price?: string | number;
  logo?: string;
};
