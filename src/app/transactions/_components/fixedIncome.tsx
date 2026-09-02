'use client';

import { Button } from '@/components/ui/button';
import { TbCalendarCheck } from 'react-icons/tb';

export const FixedIncome = () => {
  return (
    <Button
      variant="outline"
      className="gap-2 border-primary/20 bg-primary/5 hover:bg-primary/10 cursor-pointer"
    >
      <TbCalendarCheck className="h-4 w-4 text-primary" />
      <span className="hidden sm:inline">Renda Fixa / Salário</span>
    </Button>
  );
};
