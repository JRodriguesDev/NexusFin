import { ChatGoogle } from '@langchain/google';
import 'dotenv/config';
import { createAgent } from 'langchain';
import { webSearchTool } from './tools/webSearch';

const model = new ChatGoogle({
  model: 'gemini-3.5-flash-lite',
});

// 4. Criando o agente com o modelo e as ferramentas
export const agent = createAgent({
  model: model,
  tools: [webSearchTool],
});
