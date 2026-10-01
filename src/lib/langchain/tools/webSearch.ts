import { tool } from 'langchain';
import { tavily } from '@tavily/core';
import { z } from 'zod';
import 'dotenv/config';

const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY });

export const webSearchTool = tool(
  async ({ query }) => {
    try {
      const response = await tvly.search(query, { searchDepth: 'basic', maxResults: 3 });
      return JSON.stringify(response.results);
    } catch (error) {
      return JSON.stringify({
        error: true,
        message: 'Erro interno ao consultar banco de dados de transações.',
      });
    }
  },
  {
    name: 'web_search',
    description: 'Busca notícias, cotações financeiras e dados em tempo real na internet.',
    schema: z.object({
      query: z
        .string()
        .describe(
          'O termo de busca otimizado para encontrar dados financeiros ou notícias recentes.'
        ),
    }),
  }
);
