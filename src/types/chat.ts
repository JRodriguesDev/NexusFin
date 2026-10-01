export type Message = {
  id: string;
  role: 'human' | 'assistant' | 'error';
  content: string;
};

export type Tools = 'get_transactions' | 'get_investments' | 'web_search';

export type ChatStreamEvent =
  | { type: 'status'; message: string }
  | { type: 'response'; success: true; message: string; summary?: string }
  | { type: 'error'; success: false; message: string };
