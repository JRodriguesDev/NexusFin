import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Decimal } from '@prisma/client/runtime/client';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const dateFormat = (date: Date) => {
  const d = new Date(date);
  const formatted = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(d);

  return formatted;
};

export const formatCurrency = (value: Decimal) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value.toNumber());
};
