import { z } from 'zod';
import { TransactionCategory, TransactionType } from '@/generated/prisma/client';
import { Prisma } from '@/generated/prisma/client';

export const createTransactionSchema = z.object({
  type: z.nativeEnum(TransactionType),
  description: z
    .string()
    .trim()
    .min(3, 'Descrição deve ter no mínimo 3 caracteres')
    .max(255, 'Descrição muito longa'),
  amount: z.coerce
    .number()
    .positive('O valor deve ser maior que zero')
    .transform((value) => new Prisma.Decimal(value)),
  date: z
    .string()
    .min(1, 'Requer Data')
    .transform((date) => new Date(date)),
  category: z.nativeEnum(TransactionCategory, { message: 'Categoria Invalida' }),
});

export const updateTransactionSchema = z.object({
  id: z.string(),
  description: z
    .string()
    .trim()
    .min(3, 'Descrição deve ter no mínimo 3 caracteres')
    .max(255, 'Descrição muito longa'),
  amount: z.coerce
    .number()
    .positive('O valor deve ser maior que zero')
    .transform((value) => new Prisma.Decimal(value)),
  date: z
    .string()
    .min(1, 'Requer Data')
    .transform((date) => new Date(date)),
  category: z.nativeEnum(TransactionCategory, { message: 'Categoria Invalida' }),
});

export type CreateTransactionSchema = z.infer<typeof createTransactionSchema>;
export type UpdateTransactionSchema = z.infer<typeof updateTransactionSchema>;
