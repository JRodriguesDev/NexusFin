import 'server-only';

import { prisma } from '@/lib/prisma/prisma';
import { Transaction } from '@/types/transactions';

type CreateTransaction = Pick<
  Transaction,
  'type' | 'description' | 'category' | 'amount' | 'isRecurrence' | 'recurringDay'
>;

export const createTransaction = async (data: CreateTransaction) => {
  await prisma.transaction.create({
    data: data,
    select: {
      description: true,
    },
  });
};
