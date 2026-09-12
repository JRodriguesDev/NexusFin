import { brapi } from '@/lib/brapi/brapi';

export const searchCripto = async (query: string) => {
  const response = await brapi.v2.crypto.listAvailable({
    search: query,
  });

  return response.coins;
};
