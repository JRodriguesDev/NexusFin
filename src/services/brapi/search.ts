import { brapi } from '@/lib/brapi/brapi';
import { SearchInvestimentCategory } from '@/types/investiments';

export const searchQuotes = async (query: string, type: SearchInvestimentCategory) => {
  const response = await brapi.quote.list({
    search: query,
    type: type,
    limit: 5,
  });

  return response.stocks;
};
