import { TransactionType, InvestimentType } from '@/types/form';

export const TransactionResponse: TransactionType = {
  success: false,
  errors: {
    description: undefined,
    amount: undefined,
    recurringDay: undefined,
    isRecurrence: undefined,
    category: undefined,
  },
};

export const InvestimentResponse: InvestimentType = {
  success: false,
  errors: {
    ticker: undefined,
    name: undefined,
    quantity: undefined,
    price: undefined,
    date: undefined,
  },
};
