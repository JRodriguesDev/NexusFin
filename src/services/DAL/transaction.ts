import 'server-only';

import { prisma } from '@/lib/prisma/prisma';
import { cacheTag } from 'next/cache';
import { CreateTransactionSchema, UpdateTransactionSchema } from '@/lib/validations/transaction';

export const createTransaction = async (data: CreateTransactionSchema) => {
  await prisma.transaction.create({
    data: data,
    select: {
      description: true,
    },
  });
};

export const getTransactions = async () => {
  'use cache';
  cacheTag('transactions');
  const transactions = await prisma.transaction.findMany({
    orderBy: { date: 'desc' },
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
