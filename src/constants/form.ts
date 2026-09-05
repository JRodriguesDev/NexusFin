import { TransactionType } from '@/types/form';

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
