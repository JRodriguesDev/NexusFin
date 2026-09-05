'use server';

import { FixedIncomeType } from '@/types/form';
import { fixedIncomeSchema } from '@/lib/validations/transaction';
import { createTransaction, getTransactions } from '@/services/DAL/transaction';
import { prismaErrors } from '@/lib/prisma/error';
import { ResponseAction } from '@/types/response';
import { Transaction } from '@/types/transactions';
import { updateTag } from 'next/cache';

export const createTransactionAction = async (
  _prevState: FixedIncomeType,
  form: FormData
): Promise<FixedIncomeType> => {
  const validationFields = fixedIncomeSchema.safeParse({
    type: form.get('type'),
    description: form.get('description'),
    amount: form.get('amount'),
    recurringDay: form.get('recurringDay'),
    category: form.get('category'),
    isRecurrence: form.get('isRecurrence'),
  });

  if (!validationFields.success) {
    const errors = validationFields.error.flatten().fieldErrors;
    return {
      success: false,
      errors: {
        description: errors.description?.[0],
        amount: errors.amount?.[0],
        recurringDay: errors.recurringDay?.[0],
        category: errors.category?.[0],
        isRecurrence: errors.isRecurrence?.[0],
      },
    };
  }

  try {
    await createTransaction(validationFields.data);
  } catch (error) {
    return { success: false, message: prismaErrors(error) ?? 'Error Interno' };
  }

  updateTag('transactions');
  return {
    success: true,
  };
};

export const getTransactionsAction = async (): Promise<ResponseAction<Transaction[]>> => {
  try {
    const transactions = await getTransactions();
    return { success: true, data: transactions };
  } catch (error) {
    return { success: false, message: prismaErrors(error) ?? 'Error Interno' };
  }
};
