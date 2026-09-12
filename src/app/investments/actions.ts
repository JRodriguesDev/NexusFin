'use server';

import { brapiErrors } from '@/lib/brapi/error';
import { searchQuotes } from '@/services/brapi/quotes';
import { ResponseAction } from '@/types/response';
import { BrapiStockListResponse } from '@/types/brapi';
import { InvestimentCategoryType } from '@/types/investiments';

export const searchStockAction = async (
  query: string,
  category: InvestimentCategoryType
): Promise<ResponseAction<BrapiStockListResponse>> => {
  const clearQuery = query.trim();
  if (clearQuery === '') return { success: true, data: [] };
  try {
    if (category !== 'fixed_income' && category !== 'cripto') {
      const data = await searchQuotes(query, category);
      return {
        success: true,
        data: data,
      };
    }
    return { success: false };
  } catch (error) {
    return {
      success: false,
      message: brapiErrors(error) ?? 'Error Interno',
    };
  }
};
