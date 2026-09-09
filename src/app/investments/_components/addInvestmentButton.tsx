'use client';

import { useState, useEffect } from 'react';
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

interface BrapiSearchResult {
  stock: string;
  name: string;
  close: number; // Preço de fechamento/atual
  logo: string;
}

export const AddInvestmentButton = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Formulário
  const [category, setCategory] = useState<string>('ACOES');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAsset, setSelectedAsset] = useState<BrapiSearchResult | null>(null);
  const [customName, setCustomName] = useState('');

  // Quantidade e Preço
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  // Estados de busca da Brapi
  const [searchResults, setSearchResults] = useState<BrapiSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Determina se a categoria usa cotação de bolsa (API)
  const isMarketAsset = ['ACOES', 'FIIS', 'CRIPTO'].includes(category);

  // Efeito de Debounce para busca na API da Brapi
  useEffect(() => {
    if (!isMarketAsset || searchQuery.trim().length < 2 || selectedAsset) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        // Chamada à API da Brapi (Substitua TOKEN pelo seu token em produção)
        const response = await fetch(
          `https://brapi.dev/api/quote/list?search=${searchQuery}&limit=5`
        );
        const data = await response.json();

        if (data.stocks) {
          setSearchResults(data.stocks);
        }
      } catch (error) {
        console.error('Erro ao buscar ativos na Brapi:', error);
      } finally {
        setIsSearching(false);
      }
    }, 400); // 400ms de debounce

    return () => clearTimeout(timer);
  }, [searchQuery, isMarketAsset, selectedAsset]);

  const handleSelectStock = (stock: BrapiSearchResult) => {
    setSelectedAsset(stock);
    setSearchQuery(stock.stock);
    setPrice(stock.close ? String(stock.close) : '');
    setSearchResults([]);
  };

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    setSelectedAsset(null);
    setSearchQuery('');
    setCustomName('');
    setPrice('');
    setQuantity('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = {
        name: isMarketAsset ? selectedAsset?.name || searchQuery : customName,
        ticker: isMarketAsset ? selectedAsset?.stock || searchQuery.toUpperCase() : null,
        category,
        quantity: Number(quantity),
        price: Number(price),
        date,
      };

      console.log('Payload para a Server Action:', payload);

      // Limpeza do Modal
      setOpen(false);
      setSelectedAsset(null);
      setSearchQuery('');
      setCustomName('');
      setQuantity('');
      setPrice('');
    } catch (error) {
      console.error('Erro ao registrar aporte:', error);
    } finally {
      setIsLoading(false);
    }
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
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Registrar Investimento</DialogTitle>
            <DialogDescription>Adicione um novo ativo ou cota à sua carteira.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* 1. Seleção da Categoria */}
            <div className="grid gap-2">
              <Label htmlFor="category">Categoria do Investimento</Label>
              <Select value={category} onValueChange={handleCategoryChange}>
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
            </div>

            {/* 2. Campo Dinâmico: Autocomplete da Brapi OU Nome Manual */}
            {isMarketAsset ? (
              <div className="grid gap-2 relative">
                <Label htmlFor="ticker">Buscar Ativo (Brapi API)</Label>
                <div className="relative">
                  <Input
                    id="ticker"
                    placeholder="Digite o código (Ex: ITUB4, PETR4, BTC)..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      if (selectedAsset) setSelectedAsset(null);
                    }}
                    required
                  />
                  {isSearching && (
                    <TbLoader2 className="absolute right-3 top-3 h-4 w-4 animate-spin text-muted-foreground" />
                  )}
                </div>

                {/* Lista de Sugestões do Autocomplete */}
                {searchResults.length > 0 && !selectedAsset && (
                  <div className="absolute top-[72px] z-50 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in fade-in-0 zoom-in-95">
                    <div className="p-1 max-h-48 overflow-y-auto">
                      {searchResults.map((item) => (
                        <button
                          key={item.stock}
                          type="button"
                          onClick={() => handleSelectStock(item)}
                          className="flex w-full items-center justify-between px-3 py-2 text-sm rounded-sm hover:bg-accent hover:text-accent-foreground cursor-pointer"
                        >
                          <div className="flex flex-col items-start">
                            <span className="font-semibold">{item.stock}</span>
                            <span className="text-xs text-muted-foreground line-clamp-1">
                              {item.name}
                            </span>
                          </div>
                          <span className="font-medium text-xs">
                            R$ {item.close ? item.close.toFixed(2) : '--'}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tag de Confirmação do Ativo Selecionado */}
                {selectedAsset && (
                  <div className="flex items-center gap-2 rounded-md bg-primary/10 p-2 text-xs text-primary font-medium">
                    <TbCheck className="h-4 w-4" />
                    <span>
                      {selectedAsset.name} ({selectedAsset.stock}) selecionado.
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <div className="grid gap-2">
                <Label htmlFor="customName">Nome do Título / Aplicação</Label>
                <Input
                  id="customName"
                  placeholder="Ex: CDB NuBank 100% CDI, Tesouro Selic..."
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  required
                />
              </div>
            )}

            {/* 3. Quantidade e Preço Unitário */}
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="quantity">Quantidade</Label>
                <Input
                  id="quantity"
                  type="number"
                  step="any"
                  placeholder={isMarketAsset ? 'Ex: 100' : 'Ex: 1 (ou valor)'}
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="price">
                  {isMarketAsset ? 'Preço Pago (Unidade)' : 'Valor do Aporte (R$)'}
                </Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  placeholder="Ex: 32.50"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* 4. Data do Aporte */}
            <div className="grid gap-2">
              <Label htmlFor="date">Data da Operação</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading} className="gap-2">
              {isLoading ? (
                <>
                  <TbLoader2 className="h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                'Confirmar Aporte'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
