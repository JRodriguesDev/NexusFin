export type Message = {
  id: string;
  role: 'user' | 'assistant' | 'error';
  content: string;
};

export type Tools = 'get_transactions' | 'get_investments' | 'web_search';

export type ChatStreamEvent =
  | { type: 'status'; message: string }
  | { type: 'response'; success: true; message: string }
  | { type: 'error'; success: false; message: string };
