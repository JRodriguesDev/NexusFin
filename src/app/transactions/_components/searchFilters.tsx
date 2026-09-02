'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TbSearch, TbFilter } from 'react-icons/tb';

export const SearchFilters = () => {
  return (
    <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full sm:max-w-xs">
        <TbSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Buscar por descrição..." className="pl-9 bg-background cursor-text" />
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="gap-2 text-xs cursor-pointer">
          <TbFilter className="h-3.5 w-3.5" />
          <span>Filtrar por Categoria</span>
        </Button>
      </div>
    </div>
  );
};
