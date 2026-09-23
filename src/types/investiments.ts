import { Investiment, InvestimentCategory } from '@/generated/prisma/client';
import { FormType } from './form';

export type InvestimentType = Omit<
  Investiment,
  'createdAt' | 'updatedAt' | 'price' | 'quantity'
> & {
  price: number;
  quantity: number;
};

export type InvestimentCategoryType = InvestimentCategory;

export type SearchInvestimentCategoryType = Exclude<InvestimentCategoryType, 'fixed_income'>;

export type SelectedStockType = {
  ticker?: string;
  name?: string;
  price?: string | number;
  logo?: string;
};

export type InvestimentFormType = FormType & {
  errors?: {
    ticker?: string;
    name?: string;
    quantity?: string;
    price?: string;
    date?: string;
  };
};

export type InvestimentSearchParamsType = {
  search?: string;
  category: SearchInvestimentCategoryType;
};
