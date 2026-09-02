'use client';

import { Button } from '@/components/ui/button';
import { TbSparkles } from 'react-icons/tb';

export const CopilotButton = () => {
  return (
    <Button className="relative gap-2 overflow-hidden bg-gradient-to-r from-violet-600 to-indigo-600 font-medium text-white shadow-md hover:from-violet-500 hover:to-indigo-500 transition-all duration-300 hover:shadow-violet-500/20 cursor-pointer">
      <TbSparkles className="h-4 w-4 animate-pulse text-amber-300" />
      <span className="hidden sm:inline">Copiloto IA</span>
      <span className="sm:hidden">IA</span>
    </Button>
  );
};
