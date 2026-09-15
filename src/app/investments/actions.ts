'use server';

import { brapiErrors } from '@/lib/brapi/error';
import { searchQuotes } from '@/services/brapi/search';
import { ResponseAction } from '@/types/response';
import { BrapiStockListResponse } from '@/types/brapi';
import { SearchInvestimentCategory } from '@/types/investiments';

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
      data: data,
    };
  } catch (error) {
    return {
      success: false,
      message: brapiErrors(error) ?? 'Error Interno',
    };
  }
};
