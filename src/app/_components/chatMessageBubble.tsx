'use client';

import { TbAlertTriangle } from 'react-icons/tb';
import { Message } from '@/types/chat';

export const ChatMessageBubble = ({ message }: { message: Message }) => {
  const isUser = message.role === 'human';
  const isError = message.role === 'error';

  if (isError) {
    return (
      <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
        <div className="bg-destructive/10 border border-destructive/20 text-destructive p-3.5 rounded-2xl rounded-tl-sm max-w-[85%] text-sm flex items-start gap-2.5 shadow-sm">
          <TbAlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} ${
        !isUser ? 'animate-in fade-in slide-in-from-bottom-2 duration-300 ease-out' : ''
      }`}
    >
      <div
        className={
          isUser
            ? 'bg-violet-600 text-white p-3.5 rounded-2xl rounded-tr-sm max-w-[85%] text-sm shadow-sm'
            : 'bg-card text-foreground p-3.5 rounded-2xl rounded-tl-sm max-w-[85%] text-sm border shadow-sm flex flex-col gap-2'
        }
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  );
};
