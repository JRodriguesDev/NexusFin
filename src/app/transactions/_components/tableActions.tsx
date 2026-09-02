'use client';

import { Button } from '@/components/ui/button';
import { TbDotsVertical } from 'react-icons/tb';

export const TableActions = () => {
  return (
    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground cursor-pointer">
      <TbDotsVertical className="h-4 w-4" />
    </Button>
  );
};
