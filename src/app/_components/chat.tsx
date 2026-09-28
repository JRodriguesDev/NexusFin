import { TbSend } from 'react-icons/tb';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

export const Chat = () => {
  return (
    <>
      <ScrollArea className="flex-1 p-4 bg-muted/20">
        <div className="flex flex-col gap-6">
          <div className="flex justify-end">
            <div className="bg-violet-600 text-white p-3.5 rounded-2xl rounded-tr-sm max-w-[85%] text-sm shadow-sm">
              Quais foram meus maiores gastos este mês?
            </div>
          </div>

          <div className="flex justify-start">
            <div className="bg-card p-3.5 rounded-2xl rounded-tl-sm max-w-[85%] text-sm border shadow-sm flex flex-col gap-2">
              <p>
                Baseado nos seus lançamentos, seu maior gasto foi com <strong>Alimentação</strong>,
                totalizando R$ 1.250,40.
              </p>
            </div>
          </div>
        </div>
      </ScrollArea>

      <div className="p-4 border-t bg-card">
        <div className="relative flex items-end bg-background border rounded-xl overflow-hidden shadow-sm focus-within:ring-1 focus-within:ring-violet-500">
          <textarea
            placeholder="Pergunte sobre suas finanças..."
            className="w-full min-h-[52px] max-h-[120px] resize-none bg-transparent px-4 py-3.5 text-sm placeholder:text-muted-foreground focus:outline-none"
            rows={1}
          />
          <div className="p-2">
            <Button
              size="icon"
              className="h-9 w-9 bg-violet-600 hover:bg-violet-700 shrink-0 rounded-lg"
            >
              <TbSend className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
