'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TbDotsVertical, TbPencil, TbTrash } from 'react-icons/tb';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Transaction } from '@/types/transactions';
import { deleteTransactionAction } from '../actions';
import { EditTransactionDialog } from './editTransationDialog';

export const TableActions = ({ transaction }: { transaction: Transaction }) => {
  const router = useRouter();

  const handleDelete = async () => {
    const response = await deleteTransactionAction(transaction.id);
    if (!response.success) return toast.error('Erro ao excluir Transação');
    toast.success('Transação excluída com sucesso');
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
            <TbDotsVertical className="h-4 w-4" />
            <span className="sr-only">Abrir menu de ações</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-40">
          <EditTransactionDialog
            transaction={transaction}
            trigger={
              <DropdownMenuItem
                className="gap-2 cursor-pointer"
                onSelect={(e) => e.preventDefault()}
              >
                <TbPencil className="h-4 w-4 text-muted-foreground" />
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
