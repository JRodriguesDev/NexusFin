import { ChatGoogle } from '@langchain/google';
import { webSearchTool } from './tools';
import 'dotenv/config';

export const getChatModel = () => {
  return new ChatGoogle({
    model: 'gemini-3.5-flash-lite',
    apiKey: process.env.GOOGLE_API_KEY,
    temperature: 0.7,
    streamUsage: true,
    tools: [webSearchTool],
  });
};
