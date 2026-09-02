'use client';

import { useState } from 'react';
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
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const FixedIncome = () => {
  const [open, setOpen] = useState(false);

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
        <div className="space-y-4 pt-2">
          {/* Campo: Descrição */}
          <div className="space-y-2">
            <Label htmlFor="description">Descrição do Ganho</Label>
            <Input id="description" placeholder="Ex: Salário Empresa X, Pro-labore..." />
          </div>

          {/* Grid: Valor e Dia do Recebimento */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="amount">Valor Mensal (R$)</Label>
              <Input id="amount" type="number" step="0.01" placeholder="0,00" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="day">Dia do Crédito</Label>
              <Input id="day" type="number" min={1} max={31} placeholder="Ex: 5" />
            </div>
          </div>

          {/* Campo: Categoria */}
          <div className="space-y-2">
            <Label htmlFor="category">Categoria</Label>
            <Select defaultValue="Salário">
              <SelectTrigger id="category">
                <SelectValue placeholder="Selecione a categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Salário">Salário</SelectItem>
                <SelectItem value="Outros">Outros Ganhos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Ações do Rodapé */}
          <div className="flex items-center justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="button" className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white">
              <TbPlus className="h-4 w-4" />
              Salvar Renda Fixa
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
