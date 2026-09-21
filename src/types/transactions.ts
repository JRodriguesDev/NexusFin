import type {
  Transaction as PrismaTransaction,
  TransactionCategory as PrismaTransactionCategory,
  TransactionType as PrismaTransactionType,
} from '@/generated/prisma/client';
import { FormType } from './form';

export type TransactionType = PrismaTransactionType;
export type TransactionCategory = PrismaTransactionCategory;
export type Transaction = Omit<PrismaTransaction, 'amount' | 'createdAt' | 'updatedAt'> & {
  amount: number;
};

export type TransactionSearchParamsType = {
  search?: string;
  category?: TransactionCategory;
  month: number;
  year: number;
};

export type TransactionFormType = FormType & {
  errors?: {
    description?: string;
    amount?: string;
    recurringDay?: string;
    isRecurrence?: string;
    category?: string;
  };
};
