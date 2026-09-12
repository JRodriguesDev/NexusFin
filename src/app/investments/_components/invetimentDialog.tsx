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
import { TbPlus, TbLoader2 } from 'react-icons/tb';
import { Field, FieldLabel } from '@/components/ui/field';
import { useState, useEffect, useTransition, useRef } from 'react';
import { searchStockAction } from '../actions';
import { ResponseAction } from '@/types/response';
import { BrapiStockListResponse } from '@/types/brapi';
import { InvestimentCategoryType } from '@/types/investiments';

export const InvestimentDialog = () => {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<InvestimentCategoryType>('stock');
  const [ticker, setTicker] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [logo, setLogo] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const isSelectRef = useRef(false);

  const [isPending, startTransition] = useTransition();
  const [response, setResponse] = useState<ResponseAction<BrapiStockListResponse>>({
    success: false,
  });

  // Debounce para busca
  useEffect(() => {
    if (isSelectRef.current) {
      isSelectRef.current = false;
      return;
    }

    if (!ticker.trim()) return;

    const timeout = setTimeout(() => {
      startTransition(async () => {
        const data = await searchStockAction(ticker, category);
        setResponse(data);
        setShowDropdown(true);
      });
    }, 500);

    return () => clearTimeout(timeout);
  }, [ticker]);

  // Função disparada ao clicar no item do autocomplete
  const handleSelectStock = (logo?: string, stock?: string, name?: string, closePrice?: number) => {
    isSelectRef.current = true;
    if (logo) setLogo(logo);
    if (stock) setTicker(stock);
    if (name) setName(name);
    if (closePrice) setPrice(closePrice.toString());
    setShowDropdown(false);
  };

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
              <Select
                value={category}
                onValueChange={(value) => setCategory(value as InvestimentCategoryType)}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="stock">Ações (B3)</SelectItem>
                  <SelectItem value="fund">Fundos Imobiliários (FIIs)</SelectItem>
                  <SelectItem value="cripto">Criptomoedas</SelectItem>
                  <SelectItem value="bdr">BDRs (Ações Internacionais)</SelectItem>
                  <SelectItem value="fixed_income">Renda Fixa / Caixinhas</SelectItem>
                </SelectContent>
              </Select>
              <input type="hidden" name="category" value={category} />
            </Field>

            {/* 2. Campo de Busca com Dropdown */}
            <Field className="grid gap-2 relative">
              <FieldLabel htmlFor="ticker">Buscar Ativo</FieldLabel>
              <div className="relative">
                <Input
                  name="ticker"
                  type="text"
                  value={ticker}
                  placeholder="Digite o código (Ex: ITUB4, PETR4, BTC)..."
                  disabled={isPending}
                  onChange={(e) => {
                    const ticker = e.target.value;
                    setTicker(ticker);
                    if (!ticker.trim()) setShowDropdown(false);
                  }}
                  onFocus={() => ticker && setShowDropdown(true)}
                />
                {isPending && (
                  <TbLoader2 className="absolute right-3 top-2.5 h-4 w-4 animate-spin text-muted-foreground" />
                )}
              </div>

              {/* Autocomplete List */}
              {showDropdown &&
                response.success &&
                (() => {
                  const data = response.data;
                  if (!data || data.length === 0) return null;

                  return (
                    <div className="absolute top-[72px] z-50 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none">
                      <div className="p-1 max-h-48 overflow-y-auto">
                        {data.map((el) => (
                          <button
                            key={el.stock}
                            type="button"
                            // eslint-disable-next-line react-hooks/refs
                            onClick={() => handleSelectStock(el.logo, el.stock, el.name, el.close)}
                            className="flex w-full items-center justify-between px-3 py-2 text-sm rounded-sm hover:bg-accent cursor-pointer transition-colors"
                          >
                            <div className="flex flex-col items-start text-left">
                              <span className="font-semibold">{el.stock}</span>
                              <span className="text-xs text-muted-foreground">{el.name}</span>
                            </div>
                            <span className="font-medium text-xs">R$ {el.close}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })()}
            </Field>

            <Field className="grid gap-2">
              <FieldLabel htmlFor="customName">Nome do Título / Aplicação</FieldLabel>
              <Input
                name="name"
                type="text"
                placeholder="Ex: CDB NuBank 100% CDI, Tesouro Selic..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isPending}
              />
              {isPending && (
                <TbLoader2 className="absolute right-3 top-2.5 h-4 w-4 animate-spin text-muted-foreground" />
              )}
              <input name="logo" type="hidden" value={logo} />
            </Field>

            {/* 3. Quantidade e Preço Unitário */}
            <div className="grid grid-cols-2 gap-4">
              <Field className="grid gap-2">
                <FieldLabel htmlFor="quantity">Quantidade</FieldLabel>
                <Input name="quantity" type="number" step="any" placeholder="Ex: 100" />
              </Field>

              <Field className="grid gap-2">
                <FieldLabel htmlFor="price">Preço Pago (Unidade)</FieldLabel>
                <Input
                  name="price"
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Ex: 34.20"
                />
              </Field>
            </div>

            {/* 4. Data do Aporte */}
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
              Salvar Aporte
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
