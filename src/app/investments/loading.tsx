import { TbLoader3, TbTrendingUp } from 'react-icons/tb';

const Loading = () => {
  return (
    <div className="flex min-h-[400px] w-full flex-col items-center justify-center gap-4 p-8">
      {/* Ícone de Fundo com destaque em Azul (padrão de Investimentos) */}
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500 animate-pulse">
        <TbTrendingUp className="h-8 w-8 text-blue-500" />
      </div>

      {/* Bloco de Texto */}
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-base font-medium text-foreground tracking-tight">
          Carregando investimentos...
        </h3>
        <p className="text-xs text-muted-foreground">
          Atualizando cotações e consolidando sua carteira
        </p>
      </div>

      {/* Spinner Centralizado */}
      <TbLoader3 className="h-8 w-8 animate-spin text-blue-500" />
    </div>
  );
};

export default Loading;
