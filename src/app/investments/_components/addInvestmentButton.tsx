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
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TbPlus, TbLoader2, TbCheck } from 'react-icons/tb';
import { Field, FieldLabel, FieldError } from '@/components/ui/field';
import { useState } from 'react';

export const AddInvestmentButton = () => {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState('ACOES');

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <TbPlus className="h-4 w-4" />
          Novo Aporte
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[450px]">
        <form>
          <DialogHeader>
            <DialogTitle>Registrar Investimento</DialogTitle>
            <DialogDescription>Adicione um novo ativo ou cota à sua carteira.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* 1. Categoria */}
            <Field className="grid gap-2">
              <FieldLabel htmlFor="category">Categoria do Investimento</FieldLabel>
              <Select value={category} onValueChange={(value) => setCategory(value)}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ACOES">Ações (B3)</SelectItem>
                  <SelectItem value="FIIS">Fundos Imobiliários (FIIs)</SelectItem>
                  <SelectItem value="CRIPTO">Criptomoedas</SelectItem>
                  <SelectItem value="RENDA_FIXA">Renda Fixa / Caixinhas</SelectItem>
                </SelectContent>
              </Select>
              <input type="hidden" name="category" value={category} />
            </Field>
            {category !== 'RENDA_FIXA' ? (
              <Field className="grid gap-2 relative">
                <FieldLabel htmlFor="ticker">Buscar Ativo</FieldLabel>
                <div className="relative">
                  <Input
                    name="ticker"
                    type="text"
                    placeholder="Digite o código (Ex: ITUB4, PETR4, BTC)..."
                  />
                  <TbLoader2 className="absolute right-3 top-2 h-4 w-4 animate-spin text-muted-foreground" />
                </div>
                {/* MOCK: Lista de Resultados do Autocomplete (Visual) */}
                {/*
                <div className="absolute top-[72px] z-50 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none">
                  <div className="p-1 max-h-48 overflow-y-auto">
                    <button
                      type="button"

                      className="flex w-full items-center justify-between px-3 py-2 text-sm rounded-sm hover:bg-accent opacity-60 cursor-not-allowed"
                    >
                      <div className="flex flex-col items-start">
                        <span className="font-semibold">ITUB4</span>
                        <span className="text-xs text-muted-foreground">ITAU UNIBANCO PN</span>
                      </div>
                      <span className="font-medium text-xs">R$ 34.20</span>
                    </button>
                  </div>
                </div>
                
                MOCK: Tag de Ativo Selecionado (Visual)
                <div className="flex items-center gap-2 rounded-md bg-primary/10 p-2 text-xs text-primary font-medium mt-1">
                  <TbCheck className="h-4 w-4" />
                  <span>ITAU UNIBANCO PN (ITUB4) selecionado.</span>
                </div>
            */}
              </Field>
            ) : (
              <Field className="grid gap-2">
                <FieldLabel htmlFor="customName">Nome do Título / Aplicação</FieldLabel>
                <Input name="customName" placeholder="Ex: CDB NuBank 100% CDI, Tesouro Selic..." />
              </Field>
            )}

            {/* 4. Quantidade e Preço Unitário */}
            <div className="grid grid-cols-2 gap-4">
              <Field className="grid gap-2">
                <FieldLabel htmlFor="quantity">Quantidade</FieldLabel>
                <Input name="quantity" type="number" step="any" placeholder="Ex: 100" />
              </Field>

              <Field className="grid gap-2">
                <FieldLabel htmlFor="price">Preço Pago (Unidade)</FieldLabel>
                <Input name="price" type="number" step="0.01" placeholder="Ex: 34.20" />
              </Field>
            </div>

            {/* 5. Data do Aporte */}
            <Field className="grid gap-2">
              <FieldLabel htmlFor="date">Data da Operação</FieldLabel>
              <Input name="date" type="date" />
            </Field>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="gap-2">
              <TbLoader2 className="h-4 w-4 animate-spin" />
              Salvando...
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
