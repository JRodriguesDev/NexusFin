import { TbMessage, TbDotsVertical, TbPencil, TbTrash } from 'react-icons/tb';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState, useEffect } from 'react';
import { ChatSessionType } from '@/types/chat';
import { historicMessagesAction, deleteSessionAction } from '../actions';
import { useCopilotStore } from '@/lib/zustand/copilotButton';
import { ChatHistoricError } from './chatHistoricError';
import { toast } from 'sonner';
import { RenameSessionDialog } from './renameSessionDialog';

export const ChatHistoric = () => {
  const [chats, setChats] = useState<ChatSessionType[]>([]);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState({ message: '', error: false });
  const setCurrentSessionId = useCopilotStore((state) => state.setCurrentSessionId);
  const setView = useCopilotStore((state) => state.setView);

  const handleSelectChat = (chatId: string) => {
    setCurrentSessionId(chatId);
    setView('chat');
  };

  const handleRenameSession = (id: string, newTitle: string) => {
    setChats((prevChats) =>
      prevChats.map((chat) => (chat.id === id ? { ...chat, title: newTitle } : chat))
    );
  };

  const handleDeleteSession = async (id: string) => {
    const response = await deleteSessionAction(id);
    if (!response?.success)
      return toast.error(`Não foi possivel apagar a sessao: ${response?.message}`);
    toast.success('Sessão Apagada com Sucesso');
    setChats((prevChats) => prevChats.filter((chat) => chat.id !== id));
  };

  useEffect(() => {
    const loadSessions = async () => {
      setisLoading(true);
      const sessions = await historicMessagesAction();
      setisLoading(false);
      if (!sessions.success || !sessions.data)
        return setError({ error: true, message: sessions.message || '' });
      setChats(sessions.data);
    };

    loadSessions();
  }, []);

  return (
    <div className="flex flex-col h-full max-h-[550px] w-full p-4 bg-background overflow-hidden">
      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-1 shrink-0">
        Conversas Recentes
      </h3>

      <ScrollArea className="flex-1 w-full min-h-0">
        {isLoading ? (
          <div className="text-xs text-muted-foreground p-2">Carregando histórico...</div>
        ) : error.error ? (
          <ChatHistoricError error={error.message} />
        ) : chats.length === 0 ? (
          <div className="text-xs text-muted-foreground p-2">Nenhuma conversa encontrada.</div>
        ) : (
          <div className="space-y-2 pr-3">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className="group relative flex items-center justify-between w-full p-3 rounded-lg border border-border/60 hover:bg-muted/40 transition-colors cursor-pointer"
              >
                {/* ÍCONE E TEXTO DA CONVERSA */}
                <div
                  className="flex items-center gap-3 overflow-hidden pr-2"
                  onClick={() => handleSelectChat(chat.id)}
                >
                  <TbMessage className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div className="flex flex-col gap-0.5 overflow-hidden">
                    <span className="text-sm font-medium truncate">{chat.title}</span>
                  </div>
                </div>

                {/* DROPDOWN DE AÇÕES */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity shrink-0"
                    >
                      <TbDotsVertical className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    <RenameSessionDialog
                      id={chat.id}
                      onSuccess={(newTitle) => handleRenameSession(chat.id, newTitle)}
                    >
                      <DropdownMenuItem
                        className="cursor-pointer gap-2"
                        onSelect={(e) => e.preventDefault()}
                      >
                        <TbPencil className="h-4 w-4" />
                        Renomear
                      </DropdownMenuItem>
                    </RenameSessionDialog>

                    <DropdownMenuItem
                      className="cursor-pointer gap-2 text-destructive focus:text-destructive"
                      onClick={() => handleDeleteSession(chat.id)}
                    >
                      <TbTrash className="h-4 w-4" />
                      Deletar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};
