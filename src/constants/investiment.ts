import { InvestimentFormType } from '@/types/investiments';

export const InvestimentResponse: InvestimentFormType = {
  success: false,
  errors: {
    ticker: undefined,
    name: undefined,
    quantity: undefined,
    price: undefined,
    date: undefined,
  },
};

export const categoryLabels = {
  stock: 'Ações',
  fund: 'FIIs',
  bdr: 'BDRs',
  fixedIncome: 'Renda Fixa',
};
