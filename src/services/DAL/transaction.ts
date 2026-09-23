import 'server-only';

import { prisma } from '@/lib/prisma/prisma';
import { cacheTag } from 'next/cache';
import { CreateTransactionSchema, UpdateTransactionSchema } from '@/lib/validations/transaction';
import { TransactionSearchParamsType } from '@/types/transactions';

export const createTransaction = async (data: CreateTransactionSchema) => {
  await prisma.transaction.create({
    data: data,
    select: {
      description: true,
    },
  });
};

export const getTransactions = async (filters: TransactionSearchParamsType) => {
  'use cache';
  cacheTag('transactions');

  const { search, category, month, year } = filters;
  const now = new Date();

  const parsedYear = year && !isNaN(Number(year)) ? Number(year) : now.getFullYear();
  const parsedMonth = month && !isNaN(Number(month)) ? Number(month) : now.getMonth() + 1;

  const startDate = new Date(parsedYear, parsedMonth - 1, 1, 0, 0, 0, 0);
  const endDate = new Date(parsedYear, parsedMonth, 0, 23, 59, 59, 999);

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
