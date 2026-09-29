import { TbLoader2 } from 'react-icons/tb';

export const StatusIndicator = ({ message }: { message: string }) => {
  return (
    <div className="flex items-center gap-2.5 p-3.5 bg-card text-muted-foreground border rounded-2xl rounded-tl-sm max-w-[85%] text-xs shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
      <TbLoader2 className="h-4 w-4 animate-spin text-violet-600 shrink-0" />
      <span className="font-medium animate-pulse">{message}</span>
    </div>
  );
};
