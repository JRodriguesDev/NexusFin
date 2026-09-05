'use client';

import { useState, useActionState, useEffect } from 'react';
import { TbPencil, TbReceiptTax } from 'react-icons/tb';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldGroup, FieldLabel, FieldError } from '@/components/ui/field';
import { cn } from '@/lib/utils';
import { transactionDialogConfig } from '@/constants/transaction';
import { Transaction } from '@/types/transactions';
import { TransactionResponse } from '@/constants/form';
import { updateTransactionAction } from '../actions';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const EditTransactionDialog = ({
  transaction,
  trigger,
}: {
  transaction: Transaction;
  trigger: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState(transaction.category);
  const [isRecurrence, setIsRecurrence] = useState(transaction.isRecurrence);
  const currentDialogType = transactionDialogConfig[transaction.type];
  const [state, formAction, pending] = useActionState(updateTransactionAction, TransactionResponse);
  const router = useRouter();

  useEffect(() => {
    if (state) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCategory(transaction.category);
      setIsRecurrence(transaction.isRecurrence);
    }

    if (state.success) {
      toast.success('Transação Editada com sucesso');
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOpen(false);
      router.refresh();
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg font-bold">
            <TbReceiptTax className={cn('h-5 w-5', currentDialogType.iconColor)} />
            Editar {currentDialogType.title}
          </DialogTitle>
          <DialogDescription>Altere os detalhes da transação selecionada abaixo.</DialogDescription>
        </DialogHeader>

        {/* Formulário Visual */}
        <FieldGroup>
          <form className="space-y-4 pt-2" action={formAction}>
            {/* Campo: Descrição */}
            <Field className="space-y-2">
              <FieldLabel>{currentDialogType.descriptionLabel}</FieldLabel>
              <Input
                type="text"
                name="description"
                disabled={pending}
                defaultValue={transaction.description}
                placeholder={currentDialogType.placeholder}
              />
              <input type="hidden" name="id" value={transaction.id} />
              {!state.success && state.errors?.description && (
                <FieldError>{state.errors!.description}</FieldError>
              )}
            </Field>

            {/* Grid: Valor e Dia */}
            <div className="grid grid-cols-2 gap-3">
              <Field className="space-y-2">
                <FieldLabel>{currentDialogType.amountLabel}</FieldLabel>
                <Input
                  disabled={pending}
                  name="amount"
                  type="number"
                  step="0.01"
                  defaultValue={transaction.amount}
                  placeholder="0,00"
                />
                {!state.success && state.errors?.amount && (
                  <FieldError>{state.errors!.amount}</FieldError>
                )}
              </Field>

              <Field className="space-y-2">
                <FieldLabel>{currentDialogType.dayLabel}</FieldLabel>
                <Input
                  disabled={pending}
                  name="recurringDay"
                  type="number"
                  min={1}
                  max={31}
                  defaultValue={transaction.recurringDay ?? ''}
                  placeholder="Ex: 5"
                />
                {!state.success && state.errors?.recurringDay && (
                  <FieldError>{state.errors!.recurringDay}</FieldError>
                )}
              </Field>
            </div>

            {/* Campo: Categoria */}
            <Field className="space-y-2">
              <FieldLabel>Categoria</FieldLabel>
              <Select
                value={category}
                onValueChange={(value) => setCategory(value as typeof transaction.category)}
                disabled={pending}
              >
                <SelectTrigger id="category" className="cursor-pointer">
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
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
              <input type="hidden" name="category" value={category} />
              {!state.success && state.errors?.category && (
                <FieldError>{state.errors!.category}</FieldError>
              )}
            </Field>

            {/* Campo: Transação Recorrente */}
            <Field>
              <div className="flex items-center space-x-2 pt-1">
                <Checkbox
                  checked={isRecurrence}
                  onCheckedChange={(checked) => setIsRecurrence(!!checked)}
                  disabled={pending}
                />
                <FieldLabel className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                  Repetir todo mês (Transação Recorrente)
                </FieldLabel>
                <input type="hidden" name="isRecurrence" value={isRecurrence ? 'true' : 'false'} />
              </div>
              {!state.success && state.errors?.isRecurrence && (
                <FieldError>{state.errors!.isRecurrence}</FieldError>
              )}
            </Field>

            {!state.success && state.message && <FieldError>{state.message}</FieldError>}

            {/* Ações do Rodapé */}
            <div className="flex items-center justify-end gap-2 pt-4">
              <Button
                className="cursor-pointer"
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={pending}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className={cn('gap-2 cursor-pointer', currentDialogType.buttonClass)}
                disabled={pending}
              >
                <TbPencil className="h-4 w-4" />
                Salvar Alterações
              </Button>
            </div>
          </form>
        </FieldGroup>
      </DialogContent>
    </Dialog>
  );
};
