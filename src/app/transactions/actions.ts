'use server';

import { TransactionType } from '@/types/form';
import { createTransactionSchema, updateTransactionSchema } from '@/lib/validations/transaction';
import {
  createTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
} from '@/services/DAL/transaction';
import { prismaErrors } from '@/lib/prisma/error';
import { ResponseAction } from '@/types/response';
import { Transaction } from '@/types/transactions';
import { updateTag } from 'next/cache';
import { TransactionSearchParams } from '@/types/transactions';

export const createTransactionAction = async (
  _prevState: TransactionType,
  form: FormData
): Promise<TransactionType> => {
  const validationFields = createTransactionSchema.safeParse({
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

export const getTransactionsAction = async (
  params: TransactionSearchParams
): Promise<ResponseAction<Transaction[]>> => {
  const safeParams = params ?? ({} as TransactionSearchParams);
  const filters: TransactionSearchParams = {
    ...safeParams,
    search: safeParams.search?.trim() || undefined,
    category: safeParams.category || undefined,
  };
  try {
    const transactions = await getTransactions(filters);
    return { success: true, data: transactions };
  } catch (error) {
    console.log(error);
    return { success: false, message: prismaErrors(error) ?? 'Error Interno' };
  }
};

export const deleteTransactionAction = async (id: string): Promise<ResponseAction> => {
  try {
    await deleteTransaction(id);
  } catch (error) {
    return { success: false, message: prismaErrors(error) ?? 'Error Interno' };
  }
  updateTag('transactions');
  return { success: true };
};

export const updateTransactionAction = async (
  _prevState: TransactionType,
  form: FormData
): Promise<TransactionType> => {
  const validationFields = updateTransactionSchema.safeParse({
    id: form.get('id'),
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
    await updateTransaction(validationFields.data);
  } catch (error) {
    return { success: false, message: prismaErrors(error) ?? 'Error Interno' };
  }

  updateTag('transactions');
  return {
    success: true,
  };
};
