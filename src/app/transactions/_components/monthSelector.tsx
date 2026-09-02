'use client';

import { Button } from '@/components/ui/button';
import { TbChevronLeft, TbChevronRight } from 'react-icons/tb';

export const MonthSelector = () => {
  const currentMonth = 'Setembro 2026';

  return (
    <div className="flex items-center rounded-lg border border-border bg-card shadow-sm">
      <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer">
        <TbChevronLeft className="h-4 w-4" />
      </Button>
      <span className="px-3 text-xs font-semibold sm:text-sm">{currentMonth}</span>
      <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer">
        <TbChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};
