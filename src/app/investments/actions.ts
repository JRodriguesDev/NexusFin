'use server';

import { brapiErrors } from '@/lib/brapi/error';
import { searchQuotes } from '@/services/brapi/search';
import { ResponseActionType } from '@/types/response';
import { BrapiStockListResponseType } from '@/types/brapi';
import {
  SearchInvestimentCategoryType,
  InvestimentType,
  InvestimentFormType,
} from '@/types/investiments';
import { createInvestimentSchema } from '@/lib/validations/investiment';
import { prismaErrors } from '@/lib/prisma/error';
import { createInvestiment } from '@/services/DAL/investiment';
import { getInvestiments } from '@/services/DAL/investiment';
import { InvestimentSearchParamsType } from '@/types/investiments';

export const searchStockAction = async (
  query: string,
  category: SearchInvestimentCategoryType
): Promise<ResponseActionType<BrapiStockListResponseType>> => {
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
  _prevState: InvestimentFormType,
  form: FormData
): Promise<InvestimentFormType> => {
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

export const getInvestimentAction = async (
  filters: InvestimentSearchParamsType
): Promise<ResponseActionType<InvestimentType[]>> => {
  const params: InvestimentSearchParamsType = {
    search: filters.search?.trim() || undefined,
    category: filters.category || undefined,
  };

  try {
    const response = await getInvestiments(params);
    return {
      success: true,
      data: response,
    };
  } catch (error) {
    return {
      success: false,
      message: prismaErrors(error) ?? 'Error Interno',
    };
  }
};
