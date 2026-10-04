import { brapi } from '@/lib/brapi/brapi';
import { SearchInvestimentCategoryType } from '@/types/investiments';

export const searchQuotes = async (query: string, type: SearchInvestimentCategoryType) => {
  const response = await brapi.quote.list({
    search: query,
    type: type,
    limit: 5,
  });

  return response.stocks;
};
