import 'server-only';

import { prisma } from '@/lib/prisma/prisma';
import { cacheTag } from 'next/cache';
import { CreateTransactionSchema, UpdateTransactionSchema } from '@/lib/validations/transaction';
import { TransactionSearchParams } from '@/types/transactions';

export const createTransaction = async (data: CreateTransactionSchema) => {
  await prisma.transaction.create({
    data: data,
    select: {
      description: true,
    },
  });
};

export const getTransactions = async (params: TransactionSearchParams) => {
  'use cache';
  cacheTag('transactions');

  const { search, category, month, year } = params;
  const startDate = new Date(year, month - 1, 1, 0, 0, 0, 0);
  const endDate = new Date(year, month, 0, 23, 59, 59, 999);
  const transactions = await prisma.transaction.findMany({
    orderBy: { date: 'desc' },
    where: {
      description: search
        ? {
            contains: search,
            mode: 'insensitive',
          }
        : undefined,
      category: category,
      date: {
        gte: startDate,
        lte: endDate,
      },
    },
    omit: {
      createdAt: true,
      updatedAt: true,
    },
  });

  return transactions.map((el) => ({
    ...el,
    amount: Number(el.amount),
  }));
};

export const deleteTransaction = async (id: string) => {
  await prisma.transaction.delete({
    where: { id: id },
  });
};

export const updateTransaction = async (transaction: UpdateTransactionSchema) => {
  const { id, ...data } = transaction;
  await prisma.transaction.update({
    where: { id: id },
    data: data,
  });
};
