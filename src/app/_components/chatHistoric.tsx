import { TbMessage } from 'react-icons/tb';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

export const ChatHistoric = () => {
  return (
    <ScrollArea className="flex-1 p-4 bg-background">
      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-1">
        Conversas Recentes
      </h3>
      <div className="space-y-2">
        {[
          { id: 1, title: 'Análise de dividendos de Agosto', date: 'Hoje' },
          { id: 2, title: 'Comparação de gastos mensais', date: 'Há 2 dias' },
        ].map((chat) => (
          <Button
            key={chat.id}
            variant="outline"
            className="w-full justify-start h-auto py-3 px-4 text-left font-normal border-border/60 hover:bg-muted/40 transition-colors"
          >
            <TbMessage className="h-4 w-4 mr-3 text-muted-foreground shrink-0" />
            <div className="flex flex-col gap-0.5 overflow-hidden">
              <span className="text-sm font-medium truncate">{chat.title}</span>
              <span className="text-xs text-muted-foreground">{chat.date}</span>
            </div>
          </Button>
        ))}
      </div>
    </ScrollArea>
  );
};
