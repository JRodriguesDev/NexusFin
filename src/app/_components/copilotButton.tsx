'use client';

import { TbSparkles, TbHistory, TbPlus } from 'react-icons/tb';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Chat } from './chat';
import { ChatHistoric } from './chatHistoric';
import { useCopilotStore } from '@/lib/zustand/copilotButton';

export const CopilotButton = () => {
  const { view, setView, handleNewChat } = useCopilotStore();

  return (
    <Sheet>
      {/* O seu botão original exato como Trigger */}
      <SheetTrigger asChild>
        <Button className="relative gap-2 overflow-hidden bg-gradient-to-r from-violet-600 to-indigo-600 font-medium text-white shadow-md hover:from-violet-500 hover:to-indigo-500 transition-all duration-300 hover:shadow-violet-500/20 cursor-pointer">
          <TbSparkles className="h-4 w-4 animate-pulse text-amber-300" />
          <span className="hidden sm:inline">Copiloto IA</span>
          <span className="sm:hidden">IA</span>
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-md md:max-w-lg flex flex-col h-full p-0 border-l border-border/50">
        {/* CABEÇALHO - Adicionado pr-12 para afastar os botões do "X" nativo */}
        <SheetHeader className="p-4 pr-12 border-b flex flex-row items-center justify-between space-y-0 bg-card">
          <SheetTitle className="flex items-center gap-2 text-lg font-semibold">
            <TbSparkles className="text-violet-500" />
            Nexus Copilot
          </SheetTitle>
          <div className="flex gap-2">
            <Button
              variant={view === 'history' ? 'secondary' : 'ghost'}
              size="icon"
              onClick={() => setView('history')}
              title="Histórico de Conversas"
              className="h-8 w-8"
            >
              <TbHistory className="h-4 w-4" />
            </Button>
            <Button
              variant={view === 'chat' ? 'secondary' : 'ghost'}
              size="icon"
              onClick={() => handleNewChat()}
              title="Novo Chat"
              className="h-8 w-8"
            >
              <TbPlus className="h-4 w-4" />
            </Button>
          </div>
        </SheetHeader>

        {/* CORPO DO PAINEL */}
        {view === 'chat' ? <Chat /> : <ChatHistoric />}
      </SheetContent>
    </Sheet>
  );
};
