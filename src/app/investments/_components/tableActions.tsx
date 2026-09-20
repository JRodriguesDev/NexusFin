'use client';

import { Button } from '@/components/ui/button';
import { TbTrash, TbEdit, TbDotsVertical } from 'react-icons/tb';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const TableActions = () => {
  return (
    <td className="p-4 text-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Abrir menu</span>
            <TbDotsVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Ações</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="gap-2 cursor-pointer">
            <TbEdit className="h-4 w-4" />
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2 cursor-pointer text-destructive focus:text-destructive">
            <TbTrash className="h-4 w-4" />
            Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </td>
  );
};
