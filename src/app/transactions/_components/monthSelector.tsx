'use client';

import { Button } from '@/components/ui/button';
import { TbChevronLeft, TbChevronRight } from 'react-icons/tb';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useState, useEffect, startTransition } from 'react';
import { dateFilterFormat } from '@/lib/utils';

export const MonthSelector = () => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const [date, setDate] = useState(dateFilterFormat());

  const handleMonthChange = (offset: number) => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + offset);
    setDate(newDate);
  };

  const formattedMonth = date.toLocaleDateString('pt-BR', {
    month: 'long',
    year: 'numeric',
  });

  useEffect(() => {
    const stateMonth = (date.getMonth() + 1).toString();
    const stateYear = date.getFullYear().toString();
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      params.set('month', stateMonth);
      params.set('year', stateYear);

      startTransition(() => {
        router.replace(`${pathName}?${params.toString()}`);
      });
    }, 500);
    return () => clearTimeout(timeout);
  }, [date]);

  const currentMonth = formattedMonth.charAt(0).toUpperCase() + formattedMonth.slice(1);

  return (
    <div className="flex items-center rounded-lg border border-border bg-card shadow-sm">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 cursor-pointer shrink-0"
        onClick={() => handleMonthChange(-1)}
      >
        <TbChevronLeft className="h-4 w-4" />
      </Button>

      <span className="min-w-[145px] text-center px-2 text-xs font-semibold sm:text-sm select-none">
        {currentMonth}
      </span>

      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 cursor-pointer shrink-0"
        onClick={() => handleMonthChange(1)}
      >
        <TbChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};
