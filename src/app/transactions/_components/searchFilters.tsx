'use client';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TbSearch, TbFilter } from 'react-icons/tb';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { startTransition, useState, useEffect } from 'react';

export const SearchFilters = () => {
  const [search, setSearch] = useState('');
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const handlerFilter = (key: string, value?: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    startTransition(() => {
      router.replace(`${pathName}?${params.toString()}`);
    });
  };

  useEffect(() => {
    const currentSearch = searchParams.get('search') ?? '';
    if (currentSearch === search) return;
    const timeout = setTimeout(() => {
      handlerFilter('search', search);
    }, 750);

    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full sm:max-w-xs">
        <TbSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar por descrição..."
          className="pl-9 bg-background cursor-text"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-2">
        <Select onValueChange={(value) => handlerFilter('category', value)}>
          <SelectTrigger id="category" className="h-9 w-[200px] cursor-pointer text-sm gap-2">
            <TbFilter className="h-3.5 w-3.5 text-muted-foreground" />
            <SelectValue placeholder="Filtrar por Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="" className="cursor-pointer">
              Todas as Categorias
            </SelectItem>
            <SelectItem value="SALARY" className="cursor-pointer">
              Salário
            </SelectItem>
            <SelectItem value="OTHER_INCOME" className="cursor-pointer">
              Outros Ganhos
            </SelectItem>
            <SelectItem value="FOOD" className="cursor-pointer">
              Alimentação
            </SelectItem>
            <SelectItem value="UTILITIES" className="cursor-pointer">
              Contas
            </SelectItem>
            <SelectItem value="ENTERTAINMENT" className="cursor-pointer">
              Lazer
            </SelectItem>
            <SelectItem value="HEALTH" className="cursor-pointer">
              Saúde
            </SelectItem>
            <SelectItem value="TRANSPORT" className="cursor-pointer">
              Transporte
            </SelectItem>
            <SelectItem value="OTHER" className="cursor-pointer">
              Outros
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
