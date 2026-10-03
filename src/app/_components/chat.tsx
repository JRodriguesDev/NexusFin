'use client';

import { useState, useEffect } from 'react';
import { TbSend } from 'react-icons/tb';
import { Button } from '@/components/ui/button';
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from '@/components/ui/message-scroller';
import { Message } from '@/types/chat';
import { ModelSelect } from './modelSelect';
import { StatusIndicator } from './statusIndicator';
import { sendMessageAction, sessionMessagesAction } from '../actions';
import { Spinner } from '@/components/ui/spinner';
import { ChatMessageBubble } from './chatMessageBubble';
import { useCopilotStore } from '@/lib/zustand/copilotButton';

export const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState('');

  const currentSessionId = useCopilotStore((state) => state.currentSessionId);
  const setCurrentSessionId = useCopilotStore((state) => state.setCurrentSessionId);

  useEffect(() => {
    (async () => {
      if (currentSessionId) {
        const data = await sessionMessagesAction(currentSessionId);
        setSummary(data.session?.summary || '');
        setMessages(data.messages);
      } else {
        setMessages([]);
        setSummary('');
      }
    })();
  }, [currentSessionId]);

  const simulateStreamingResponse = async (userText: string) => {
    setIsStreaming(true);
    const userId = crypto.randomUUID();
    const assistantId = crypto.randomUUID();

    const newUserMessage: Message = { id: userId, role: 'human', content: userText };
    const updateHistoric = [...messages, newUserMessage];

    // 1. Adiciona a mensagem do usuário na tela
    setMessages(updateHistoric);

    // 2. Inicia a Server Action Geradora
    setLoading(true);
    const stream = await sendMessageAction(currentSessionId, updateHistoric, summary);

    for await (const chunk of stream) {
      if (chunk.type === 'sessionCreated') {
        setCurrentSessionId(chunk.sessionId);
      }

      // Quando a Action envia status, atualiza a mensagem do spinner
      if (chunk.type === 'status') {
        setStatusMessage(chunk.message);
      }

      if (chunk.type === 'error') {
        setStatusMessage(null);
        setLoading(false);
        setMessages((prev) => [
          ...prev,
          { id: crypto.randomUUID(), role: 'error', content: chunk.message },
        ]);
        break;
      }

      // Quando a Action envia a resposta final
      if (chunk.type === 'response') {
        // Remove o indicador de status
        setSummary(chunk.summary || '');
        setStatusMessage(null);
        setLoading(false);

        // Cria o balão da IA
        setMessages((prev) => [...prev, { id: assistantId, role: 'assistant', content: '' }]);

        const words = chunk.message.split(' ');
        let currentText = '';

        // Executa a animação de digitação
        for (let i = 0; i < words.length; i++) {
          await new Promise((resolve) => setTimeout(resolve, 40));
          currentText += (i === 0 ? '' : ' ') + words[i];

          setMessages((prev) =>
            prev.map((msg) => (msg.id === assistantId ? { ...msg, content: currentText } : msg))
          );
        }
      }
    }
    setStatusMessage(null);
    setIsStreaming(false);
  };

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || isStreaming) return;

    const textToSend = inputValue.trim();
    setInputValue('');

    simulateStreamingResponse(textToSend);
  };

  return (
    <div className="flex flex-col h-[600px] w-full max-w-2xl mx-auto border rounded-xl overflow-hidden bg-background">
      {/* Cabeçalho de Seleção de Modelo e Provedor */}
      <ModelSelect isStreaming={isStreaming} />

      {/* Área das Mensagens com Scroll */}
      <MessageScrollerProvider>
        <MessageScroller className="flex-1 bg-muted/20">
          <MessageScrollerViewport className="scroll-smooth">
            <MessageScrollerContent aria-busy={isStreaming} className="p-4 flex flex-col gap-6">
              {messages.map((msg) => (
                <MessageScrollerItem
                  key={msg.id}
                  messageId={msg.id}
                  scrollAnchor={msg.role === 'human'}
                >
                  <ChatMessageBubble message={msg} />
                </MessageScrollerItem>
              ))}

              {/* Indicador de Status dinâmico durante o carregamento das ferramentas */}
              {statusMessage && (
                <MessageScrollerItem messageId="status-loading">
                  <div className="flex justify-start">
                    <StatusIndicator message={statusMessage} />
                  </div>
                </MessageScrollerItem>
              )}
            </MessageScrollerContent>
          </MessageScrollerViewport>

          <MessageScrollerButton />
        </MessageScroller>
      </MessageScrollerProvider>

      {/* Input de Mensagem */}
      <div className="p-4 border-t bg-card">
        <form
          onSubmit={handleSend}
          className="relative flex items-end bg-background border rounded-xl overflow-hidden shadow-sm focus-within:ring-1 focus-within:ring-violet-500"
        >
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Digite sua mensagem..."
            disabled={isStreaming}
            className="w-full min-h-[52px] max-h-[120px] resize-none bg-transparent px-4 py-3.5 text-sm placeholder:text-muted-foreground focus:outline-none disabled:opacity-50"
            rows={1}
          />
          <div className="p-2 flex-shrink-0 cursor-pointer">
            <Button
              type="submit"
              size="icon"
              disabled={!inputValue.trim() || isStreaming || loading}
              className="h-9 w-9 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 shrink-0 rounded-lg transition-all"
            >
              {loading ? <Spinner /> : <TbSend className="h-4 w-4" />}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
