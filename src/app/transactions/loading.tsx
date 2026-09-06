import { TbLoader3, TbReceipt } from 'react-icons/tb';

const Loading = () => {
  return (
    <div className="flex min-h-[400px] w-full flex-col items-center justify-center gap-4 p-8">
      {/* Ícone de Fundo */}
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary animate-pulse">
        <TbReceipt className="h-8 w-8 text-primary" />
      </div>

      {/* Bloco de Texto */}
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-base font-medium text-foreground tracking-tight">
          Carregando transações...
        </h3>
        <p className="text-xs text-muted-foreground">
          Buscando e filtrando seus registros financeiros
        </p>
      </div>

      {/* Spinner Centralizado Embaixo do Texto */}
      <TbLoader3 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
};

export default Loading;
