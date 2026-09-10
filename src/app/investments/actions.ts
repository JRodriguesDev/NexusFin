'use server';

import { brapiErrors } from '@/lib/brapi/error';
import { searchQuotes } from '@/services/brapi/quotes';
import { ResponseAction } from '@/types/response';
import { BrapiStockListResponse } from '@/types/brapi';

export const searchStockAction = async (
  query: string
): Promise<ResponseAction<BrapiStockListResponse>> => {
  const clearQuery = query.trim();
  if (clearQuery === '') return { success: true, data: [] };
  try {
    const quotes = await searchQuotes(clearQuery);
    return {
      success: true,
      data: quotes,
    };
  } catch (error) {
    return {
      success: false,
      message: brapiErrors(error) ?? 'Error Interno',
    };
  }
};
