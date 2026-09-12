import { brapi } from '@/lib/brapi/brapi';
import { BrapiQuoteTypes } from '@/types/brapi';

export const searchQuotes = async (query: string, type: BrapiQuoteTypes) => {
  const response = await brapi.quote.list({
    search: query,
    type: type,
    limit: 5,
  });
  return response.stocks;
};
