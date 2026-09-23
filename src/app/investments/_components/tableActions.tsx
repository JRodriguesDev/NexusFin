'use client';

import { Button } from '@/components/ui/button';
import { TbTrash, TbEdit, TbDotsVertical } from 'react-icons/tb';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { InvestimentType } from '@/types/investiments';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { deleteInvestimentAction } from '../actions';
import { EditInvestimentDialog } from './editInvestimentDialog';

export const TableActions = ({ investiment }: { investiment: InvestimentType }) => {
  const router = useRouter();

  const handleDelete = async () => {
    const response = await deleteInvestimentAction(investiment.id);
    if (!response.success) return toast.error('Erro ao excluir Investimento');
    toast.success('Investimento excluído com sucesso');
    router.refresh();
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground cursor-pointer"
          >
            <span className="sr-only">Abrir menu</span>
            <TbDotsVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <EditInvestimentDialog
            investiment={investiment}
            trigger={
              <DropdownMenuItem
                className="gap-2 cursor-pointer"
                onSelect={(e) => e.preventDefault()}
              >
                <TbEdit className="h-4 w-4 text-muted-foreground" />
                Editar
              </DropdownMenuItem>
            }
          />
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="gap-2 text-rose-500 focus:text-rose-500 cursor-pointer"
            onClick={() => handleDelete()}
          >
            <TbTrash className="h-4 w-4" />
            Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
