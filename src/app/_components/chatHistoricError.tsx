import { TbAlertCircle } from 'react-icons/tb';

export const ChatHistoricError = ({ error }: { error: string }) => {
  return (
    <div className="flex items-center gap-2 p-3 rounded-lg border border-destructive/20 bg-destructive/10 text-destructive text-xs font-medium">
      <TbAlertCircle className="h-4 w-4 shrink-0" />
      <span>{error}</span>
    </div>
  );
};
