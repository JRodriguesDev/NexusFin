'use client';

import { useState, useActionState } from 'react';
import { TbReceiptTax, TbPlus } from 'react-icons/tb';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { Spinner } from '@/components/ui/spinner';
import { Field, FieldGroup, FieldLabel, FieldError } from '@/components/ui/field';
import { createFixedIncomeAction } from '../actions';
import { formFixedIncome } from '@/constants/form';

export const FixedIncome = () => {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState('SALARY');
  const [state, formAction, pending] = useActionState(createFixedIncomeAction, formFixedIncome);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Botão Gatilho no Cabeçalho */}
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 text-xs font-medium">
          <TbReceiptTax className="h-4 w-4 text-emerald-500" />
          Renda Fixa / Salário
        </Button>
      </DialogTrigger>

      {/* Conteúdo do Modal */}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg font-bold">
            <TbReceiptTax className="h-5 w-5 text-emerald-500" />
            Configurar Renda Fixa Mensal
          </DialogTitle>
          <DialogDescription>
            Cadastre seu salário ou ganhos fixos que entram automaticamente todo mês.
          </DialogDescription>
        </DialogHeader>

        {/* Formulário Visual */}
        <FieldGroup>
          <form className="space-y-4 pt-2" action={formAction}>
            {/* Campo: Descrição */}
            <Field className="space-y-2">
              <FieldLabel>Descrição do Ganho</FieldLabel>
              <Input
                type="text"
                name="description"
                disabled={pending}
                placeholder="Ex: Salário Empresa X, Pro-labore..."
              />
              {!state.success && <FieldError>{state.errors!.description}</FieldError>}
            </Field>

            {/* Grid: Valor e Dia do Recebimento */}
            <div className="grid grid-cols-2 gap-3">
              <Field className="space-y-2">
                <FieldLabel>Valor Mensal (R$)</FieldLabel>
                <Input
                  name="amount"
                  type="number"
                  step="0.01"
                  placeholder="0,00"
                  disabled={pending}
                />
                {!state.success && <FieldError>{state.errors!.amount}</FieldError>}
              </Field>

              <Field className="space-y-2">
                <FieldLabel>Dia do Crédito</FieldLabel>
                <Input
                  name="day"
                  type="number"
                  min={1}
                  max={31}
                  placeholder="Ex: 5"
                  disabled={pending}
                />
                {!state.success && <FieldError>{state.errors!.day}</FieldError>}
              </Field>
            </div>

            {/* Campo: Categoria */}
            <Field className="space-y-2">
              <FieldLabel>Categoria</FieldLabel>
              <Select
                value={category}
                onValueChange={(value) => setCategory(value)}
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
                </SelectContent>
              </Select>
              <input type="hidden" name="category" value={category} />
              {!state.success && <FieldError>{state.errors!.category}</FieldError>}
            </Field>

            {/* Ações do Rodapé */}
            <div className="flex items-center justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={pending}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white"
                disabled={pending}
              >
                <TbPlus className="h-4 w-4" />
                {pending ? <Spinner /> : 'Salvar Renda'}
              </Button>
            </div>
          </form>
        </FieldGroup>
      </DialogContent>
    </Dialog>
  );
};
