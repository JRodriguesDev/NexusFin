'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Field, FieldLabel, FieldError } from '@/components/ui/field';
import { useState, useEffect } from 'react';
import { TbLoader2 } from 'react-icons/tb';
import { InvestimentType } from '@/types/investiments';
import { useActionState } from 'react';
import { InvestimentResponse } from '@/constants/investiment';
import { updateInvestimentAction } from '../actions';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const EditInvestimentDialog = ({
  investiment,
  trigger,
}: {
  investiment: InvestimentType;
  trigger: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState(updateInvestimentAction, InvestimentResponse);
  const router = useRouter();

  useEffect(() => {
    console.log(state);
    if (state.success) {
      toast.success('Investimento Editado com sucesso');
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOpen(false);
      router.refresh();
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="sm:max-w-[450px]">
        <form action={formAction}>
          <DialogHeader>
            <DialogTitle>Editar Investimento</DialogTitle>
            <DialogDescription>
              Atualize as informações do seu aporte na carteira.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* 1. Categoria (TRAVADA / DESABILITADA) */}
            <Field className="grid gap-2">
              <FieldLabel htmlFor="edit-category">Categoria do Investimento</FieldLabel>
              <Select defaultValue={investiment.category} disabled>
                <SelectTrigger id="edit-category" className="bg-muted/50 cursor-not-allowed">
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="stock">Ações (B3)</SelectItem>
                  <SelectItem value="fund">Fundos Imobiliários (FIIs)</SelectItem>
                  <SelectItem value="bdr">BDRs (Ações Internacionais)</SelectItem>
                  <SelectItem value="fixedIncome">Renda Fixa / Caixinhas</SelectItem>
                </SelectContent>
              </Select>
              <input type="hidden" name="id" value={investiment.id} />
            </Field>

            {/* 3. Nome do Título (EDITÁVEL) */}
            <Field className="grid gap-2">
              <FieldLabel htmlFor="edit-name">Nome do Título / Aplicação</FieldLabel>
              <Input
                id="edit-name"
                name="name"
                type="text"
                defaultValue={investiment.name}
                placeholder="Ex: CDB NuBank 100% CDI, Tesouro Selic..."
                disabled={pending}
              />
              {!state.success && state.errors?.name && <FieldError>{state.errors.name}</FieldError>}
            </Field>

            {/* 4. Quantidade e Preço Unitário (EDITÁVEIS) */}
            <div className="grid grid-cols-2 gap-4">
              <Field className="grid gap-2">
                <FieldLabel htmlFor="edit-quantity">Quantidade</FieldLabel>
                <Input
                  id="edit-quantity"
                  name="quantity"
                  type="number"
                  step="any"
                  defaultValue={investiment.quantity}
                  placeholder="Ex: 100"
                  disabled={pending}
                />
                {!state.success && state.errors?.quantity && (
                  <FieldError>{state.errors.quantity}</FieldError>
                )}
              </Field>

              <Field className="grid gap-2">
                <FieldLabel htmlFor="edit-price">Preço Pago (Unidade)</FieldLabel>
                <Input
                  id="edit-price"
                  name="price"
                  type="number"
                  step="0.01"
                  defaultValue={investiment.price}
                  placeholder="Ex: 34.20"
                  disabled={pending}
                />
                {!state.success && state.errors?.price && (
                  <FieldError>{state.errors.price}</FieldError>
                )}
              </Field>
            </div>

            {/* 5. Data da Operação (EDITÁVEL) */}
            <Field className="grid gap-2">
              <FieldLabel htmlFor="edit-date">Data da Operação</FieldLabel>
              <Input
                id="edit-date"
                name="date"
                type="date"
                defaultValue={new Date(investiment.dateOperation).toISOString().split('T')[0]}
                disabled={pending}
              />
            </Field>
            {!state.success && state.errors?.date && <FieldError>{state.errors.date}</FieldError>}
            {!state.success && state.message && <FieldError>{state.message}</FieldError>}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={pending}
            >
              Cancelar
            </Button>
            <Button type="submit" className="gap-2" disabled={pending}>
              {pending && <TbLoader2 className="h-4 w-4 animate-spin" />}
              Salvar Alterações
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
