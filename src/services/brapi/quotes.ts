import { brapi } from '@/lib/brapi/brapi';

export const searchQuotes = async (query: string) => {
  const response = await brapi.quote.list({
    search: query,
    limit: 5,
  });
  return response.stocks;
};
