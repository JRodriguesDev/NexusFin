'use client';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const SearchFilters = () => {
  return (
    <div className="flex flex-1 items-center gap-3 sm:max-w-xs">
      <Input placeholder="Buscar ativo ou ticker..." />
      <Select>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Categoria" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="stock">Ações</SelectItem>
          <SelectItem value="fund">FIIs</SelectItem>
          <SelectItem value="bdr">BDRs</SelectItem>
          <SelectItem value="fixed_income">Renda Fixa</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
