import { ChatSession } from '@/generated/prisma/client';

export type ChatSessionType = Pick<ChatSession, 'id' | 'title'>;

export type Message = {
  id: string;
  role: 'human' | 'assistant' | 'error';
  content: string;
};

export type Tools = 'get_transactions' | 'get_investments' | 'web_search';

export type ChatStreamEvent =
  | { type: 'status'; message: string }
  | { type: 'response'; success: true; message: string; summary?: string }
  | { type: 'error'; success: false; message: string }
  | { type: 'sessionCreated'; sessionId: string; summary?: string };

export type ResponseMessagesHistoric = {
  session: {
    id: string;
    summary: string | null;
  } | null;
  messages: {
    id: string;
    role: Message['role'];
    content: string;
  }[];
};
