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
import { Field, FieldLabel, FieldError } from '@/components/ui/field';
import { useState, useEffect, useTransition, useRef, useActionState } from 'react';
import { searchStockAction } from '../actions';
import { ResponseAction } from '@/types/response';
import { BrapiStockListResponse } from '@/types/brapi';
import { InvestimentCategoryType } from '@/types/investiments';
import { SelectedStockType } from '@/types/investiments';
import { addInvestimentAction } from '../actions';
import { InvestimentResponse } from '@/constants/form';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export const InvestimentDialog = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [state, formAction, pending] = useActionState(addInvestimentAction, InvestimentResponse);
  const [category, setCategory] = useState<InvestimentCategoryType>('stock');
  const [tickerQuery, setTickerQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const isSelectRef = useRef(false);
  const [selectedStock, setSelectedStock] = useState<SelectedStockType>();
  const [isPending, startTransition] = useTransition();
  const [searchResponse, setSearchResponse] = useState<ResponseAction<BrapiStockListResponse>>({
    success: false,
    data: [],
  });

  useEffect(() => {
    if (state.success) {
      toast.success(`${tickerQuery} Adicionado`);
      setOpen(false);
      router.refresh();
    }
  }, [state]);

  // Debounce para busca
  useEffect(() => {
    if (isSelectRef.current) {
      isSelectRef.current = false;
      return;
    }

    if (!tickerQuery.trim() || category === 'fixed_income') {
      setSearchResponse({ success: true, data: [] });
      return;
    }

    const timeout = setTimeout(() => {
      startTransition(async () => {
        const data = await searchStockAction(tickerQuery, category);
        setSearchResponse(data);
        setShowDropdown(true);
      });
    }, 500);

    return () => clearTimeout(timeout);
  }, [tickerQuery, category]);

  // Função disparada ao clicar no item do autocomplete
  const handleSelectStock = (stock: SelectedStockType) => {
    isSelectRef.current = true;
    setTickerQuery(stock.ticker ?? tickerQuery);
    setSelectedStock({
      name: stock.name,
      price: stock.price?.toString() || '',
      logo: stock.logo || '',
    });
    setShowDropdown(false);
    setSearchResponse({ success: true, data: [] });
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      setTickerQuery('');
      setSelectedStock(undefined);
      setShowDropdown(false);
      setCategory('stock');
      setSearchResponse({ success: false, data: [] });
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <TbPlus className="h-4 w-4" />
          Novo Aporte
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[450px]">
        <form action={formAction}>
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
                  <SelectItem value="bdr">BDRs (Ações Internacionais)</SelectItem>
                  <SelectItem value="fixed_income">Renda Fixa / Caixinhas</SelectItem>
                </SelectContent>
              </Select>
              <input type="hidden" name="category" value={category} />
            </Field>
            {/* 2. Campo de Busca com Dropdown */}
            {category !== 'fixed_income' && (
              <Field className="grid gap-2 relative">
                <FieldLabel htmlFor="ticker">Buscar Ativo</FieldLabel>
                <div className="relative">
                  <Input
                    name="ticker"
                    type="text"
                    key={selectedStock?.ticker || 'ticker'}
                    value={tickerQuery}
                    placeholder="Digite o código (Ex: ITUB4, PETR4, BTC)..."
                    disabled={isPending || pending}
                    onChange={(e) => setTickerQuery(e.target.value)}
                    onFocus={() => tickerQuery && setShowDropdown(true)}
                  />
                  {isPending && (
                    <TbLoader2 className="absolute right-3 top-2.5 h-4 w-4 animate-spin text-muted-foreground" />
                  )}
                </div>

                {/* Autocomplete List */}
                {showDropdown && (searchResponse.data?.length ?? 0) > 0 && (
                  <div className="absolute top-[72px] z-50 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none">
                    <div className="p-1 max-h-48 overflow-y-auto">
                      {searchResponse.data!.map((el) => (
                        <button
                          key={el.stock}
                          type="button"
                          // eslint-disable-next-line react-hooks/refs
                          onClick={() =>
                            handleSelectStock({
                              logo: el.logo,
                              ticker: el.stock,
                              name: el.name,
                              price: el.close,
                            })
                          }
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
                )}
                {!state.success && state.errors?.ticker && (
                  <FieldError>{state.errors.ticker}</FieldError>
                )}
              </Field>
            )}

            <Field className="grid gap-2">
              <FieldLabel htmlFor="customName">Nome do Título / Aplicação</FieldLabel>
              <Input
                key={selectedStock?.name || 'name'}
                name="name"
                type="text"
                disabled={pending}
                placeholder="Ex: CDB NuBank 100% CDI, Tesouro Selic..."
                defaultValue={selectedStock?.name || ''}
              />
              <input name="logo" type="hidden" value={selectedStock?.logo || ''} />
              {!state.success && state.errors?.name && <FieldError>{state.errors.name}</FieldError>}
            </Field>

            {/* 3. Quantidade e Preço Unitário */}
            <div className="grid grid-cols-2 gap-4">
              <Field className="grid gap-2">
                <FieldLabel htmlFor="quantity">Quantidade</FieldLabel>
                <Input
                  name="quantity"
                  type="number"
                  step="any"
                  placeholder="Ex: 100"
                  disabled={pending}
                />
                {!state.success && state.errors?.quantity && (
                  <FieldError>{state.errors.quantity}</FieldError>
                )}
              </Field>

              <Field className="grid gap-2">
                <FieldLabel htmlFor="price">Preço Pago (Unidade)</FieldLabel>
                <Input
                  name="price"
                  type="number"
                  step="0.01"
                  key={selectedStock?.price || 'price'}
                  defaultValue={selectedStock?.price || ''}
                  placeholder="Ex: 34.20"
                  disabled={pending}
                />
                {!state.success && state.errors?.price && (
                  <FieldError>{state.errors.price}</FieldError>
                )}
              </Field>
            </div>

            {/* 4. Data do Aporte */}
            <Field className="grid gap-2">
              <FieldLabel htmlFor="date">Data da Operação</FieldLabel>
              <Input name="date" type="date" disabled={pending} />
            </Field>
            {!state.success && state.errors?.date && <FieldError>{state.errors.date}</FieldError>}
            {!state.success && state.message && <FieldError>{state.message}</FieldError>}
            {!searchResponse.success && <FieldError>{searchResponse.message}</FieldError>}
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
              Salvar Aporte
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
