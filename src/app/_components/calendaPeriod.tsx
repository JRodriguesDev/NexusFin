'use client';

import { TbCalendar } from 'react-icons/tb';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const CalendarPeriod = () => {
  return (
    <div className="flex items-center gap-2">
      <TbCalendar className="h-4 w-4 text-muted-foreground" />
      <Select value={'month'}>
        <SelectTrigger className="w-[180px] h-9 text-xs">
          <SelectValue placeholder="Selecione o período" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="month">Mês Atual (Setembro)</SelectItem>
          <SelectItem value="last_month">Mês Anterior</SelectItem>
          <SelectItem value="quarter">Último Trimestre</SelectItem>
          <SelectItem value="year">Ano de 2026</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
