'use server';

import { FixedIncomeType } from '@/types/form';
import { fixedIncomeSchema } from '@/lib/validations/transaction';

export const createTransactionAction = async (
  _prevState: FixedIncomeType,
  form: FormData
): Promise<FixedIncomeType> => {
  await new Promise((r) => setTimeout(r, 1000));
  const validationFields = fixedIncomeSchema.safeParse({
    description: form.get('description'),
    amount: form.get('amount'),
    day: form.get('day'),
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
        day: errors.day?.[0],
        category: errors.category?.[0],
        isRecurrence: errors.isRecurrence?.[0],
      },
    };
  }
  console.log(validationFields.data);

  return {
    success: true,
  };
};
