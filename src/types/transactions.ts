import {
  Transaction as PrismaTransaction,
  TransactionCategory as PrismaTransactionCategory,
  TransactionType as PrismaTransactionType,
} from '@/generated/prisma/client';

export type TransactionType = PrismaTransactionType;
export type TransactionCategory = PrismaTransactionCategory;
export type Transaction = Pick<
  PrismaTransaction,
  'id' | 'type' | 'date' | 'description' | 'category' | 'isRecurrence' | 'recurringDay' | 'amount'
>;

export type ManageTransactionType = 'INCOME' | 'EXPENSE';
