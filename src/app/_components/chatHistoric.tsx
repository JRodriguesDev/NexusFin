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
import { historicMessagesAction } from '../actions';

export const ChatHistoric = ({ onSelectChat }: { onSelectChat: (id: string) => void }) => {
  const [chats, setChats] = useState<ChatSessionType[]>([]);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    const loadSessions = async () => {
      setisLoading(true);
      const sessions = await historicMessagesAction();
      setChats(sessions);
      setisLoading(false);
    };

    loadSessions();
  }, []);

  return (
    <ScrollArea className="flex-1 p-4 bg-background">
      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-1">
        Conversas Recentes
      </h3>

      {isLoading ? (
        <div className="text-xs text-muted-foreground p-2">Carregando histórico...</div>
      ) : chats.length === 0 ? (
        <div className="text-xs text-muted-foreground p-2">Nenhuma conversa encontrada.</div>
      ) : (
        <div className="space-y-2">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => onSelectChat?.(chat.id)}
              className="group relative flex items-center justify-between w-full p-3 rounded-lg border border-border/60 hover:bg-muted/40 transition-colors cursor-pointer"
            >
              {/* ÍCONE E TEXTO DA CONVERSA */}
              <div className="flex items-center gap-3 overflow-hidden pr-2">
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
                    onClick={(e) => e.stopPropagation()}
                  >
                    <TbDotsVertical className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem className="cursor-pointer gap-2">
                    <TbPencil className="h-4 w-4" />
                    Renomear
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer gap-2 text-destructive focus:text-destructive">
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
  );
};
