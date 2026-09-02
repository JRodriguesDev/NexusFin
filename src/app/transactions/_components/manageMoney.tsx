'use client';

import { Button } from '@/components/ui/button';
import { TbMinus, TbPlus } from 'react-icons/tb';

export const ManageMoney = () => {
  return (
    <>
      <Button
        variant="outline"
        className="gap-2 border-red-500/20 text-red-500 hover:bg-red-500/10 cursor-pointer"
      >
        <TbMinus className="h-4 w-4" />
        <span>Despesa</span>
      </Button>

      {/* Botão Adicionar / Receita */}
      <Button className="gap-2 bg-emerald-600 text-white hover:bg-emerald-700 cursor-pointer">
        <TbPlus className="h-4 w-4" />
        <span>Receita</span>
      </Button>
    </>
  );
};
