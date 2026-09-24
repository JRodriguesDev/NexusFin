import { TbAlertTriangle } from 'react-icons/tb';
import { Card } from '@/components/ui/card';

export const CardErrorState = ({ message }: { message: string }) => {
  return (
    <Card className="p-4 flex items-center gap-3 border-destructive/20 bg-destructive/5 text-destructive">
      <div className="p-2 rounded-lg bg-destructive/10 text-destructive shrink-0">
        <TbAlertTriangle className="h-5 w-5" />
      </div>
      <div>
        <h4 className="text-sm font-semibold">Erro ao carregar dados</h4>
        <p className="text-xs opacity-90">{message}</p>
      </div>
    </Card>
  );
};
