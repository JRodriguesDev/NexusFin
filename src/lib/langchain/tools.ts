import { tool } from '@langchain/core/tools';
import { z } from 'zod';
import { search, SafeSearchType } from 'duck-duck-scrape';

export const webSearchTool = tool(
  async ({ query }) => {
    try {
      // Configuração para evitar o disparo do sistema anti-bot
      const searchResults = await search(query, {
        safeSearch: SafeSearchType.OFF,
      });

      if (!searchResults.results || searchResults.results.length === 0) {
        return 'Nenhum resultado encontrado para esta pesquisa.';
      }

      // Mapeia os 3 primeiros resultados usando 'description' em vez de 'snippet'
      const topResults = searchResults.results.slice(0, 3).map((result) => ({
        title: result.title,
        description: result.description,
        url: result.url,
      }));

      return JSON.stringify(topResults);
    } catch (error) {
      console.error('Erro na busca DuckDuckGo:', error);
      return 'Não foi possível obter resultados no momento.';
    }
  },
  {
    name: 'web_search',
    description:
      'Pesquisa informações e cotações financeiras atualizadas na internet em tempo real.',
    schema: z.object({
      query: z.string().describe('Termo simples de busca. Ex: "cotacao dolar real hoje"'),
    }),
  }
);

export const availableTools = [webSearchTool];
