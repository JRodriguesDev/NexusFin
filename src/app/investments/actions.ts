'use server';

import { brapiErrors } from '@/lib/brapi/error';
import { searchQuotes } from '@/services/brapi/search';
import { ResponseAction } from '@/types/response';
import { BrapiStockListResponse } from '@/types/brapi';
import { SearchInvestimentCategory } from '@/types/investiments';
import { InvestimentType } from '@/types/form';
import { createInvestimentSchema } from '@/lib/validations/investiment';
import { prismaErrors } from '@/lib/prisma/error';
import { createInvestiment } from '@/services/DAL/investiment';

export const searchStockAction = async (
  query: string,
  category: SearchInvestimentCategory
): Promise<ResponseAction<BrapiStockListResponse>> => {
  const clearQuery = query.trim();
  if (clearQuery === '') return { success: true, data: [] };
  try {
    const data = await searchQuotes(query, category);
    return {
      success: true,
      data: data ?? [],
    };
  } catch (error) {
    return {
      success: false,
      message: brapiErrors(error) ?? 'Error Interno',
    };
  }
};

export const addInvestimentAction = async (
  _prevState: InvestimentType,
  form: FormData
): Promise<InvestimentType> => {
  const validationFields = createInvestimentSchema.safeParse({
    category: form.get('category'),
    ticker: form.get('ticker'),
    logo: form.get('logo'),
    name: form.get('name'),
    quantity: form.get('quantity'),
    price: form.get('price'),
    dateOperation: form.get('date'),
  });

  if (!validationFields.success) {
    const errors = validationFields.error.flatten().fieldErrors;
    return {
      success: false,
      errors: {
        ticker: errors.ticker?.[0],
        name: errors.name?.[0],
        quantity: errors.quantity?.[0],
        price: errors.price?.[0],
        date: errors.dateOperation?.[0],
      },
    };
  }
  try {
    await createInvestiment(validationFields.data);
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: prismaErrors(error) ?? 'Error Interno',
    };
  }
};
