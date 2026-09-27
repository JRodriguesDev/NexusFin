import { Card } from '@/components/ui/card';

export const GraphicLoading = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <Card className="lg:col-span-2 h-[300px] flex items-center justify-center text-sm text-muted-foreground">
        Carregando fluxo de caixa...
      </Card>
      <Card className="h-[300px] flex items-center justify-center text-sm text-muted-foreground">
        Carregando alocação...
      </Card>
    </div>
  );
};
