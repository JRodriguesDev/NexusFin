import 'server-only';

import { prisma } from '@/lib/prisma/prisma';
import { cacheTag } from 'next/cache';
import { FixedIncomeInput } from '@/lib/validations/transaction';

export const createTransaction = async (data: FixedIncomeInput) => {
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
