'use server';

import { FixedIncomeType } from '@/types/form';
import { fixedIncomeSchema } from '@/lib/validations/transaction';
import { createTransaction } from '@/services/DAL/transaction';
import { prismaErrors } from '@/lib/prisma/error';

export const createTransactionAction = async (
  _prevState: FixedIncomeType,
  form: FormData
): Promise<FixedIncomeType> => {
  await new Promise((r) => setTimeout(r, 1000));
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

  console.log(validationFields.data);

  try {
    await createTransaction(validationFields.data);
  } catch (error) {
    return { success: false, message: prismaErrors(error) ?? 'Error Interno' };
  }

  return {
    success: true,
  };
};
