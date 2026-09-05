import { z } from 'zod';
import { TransactionCategory, TransactionType } from '@/generated/prisma/client';
import { Prisma } from '@/generated/prisma/client';

export const fixedIncomeSchema = z.object({
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
  recurringDay: z.coerce.number().int().min(1, 'Dia inválido').max(31, 'Dia inválido'),
  category: z.nativeEnum(TransactionCategory, { message: 'Categoria Invalida' }),
  isRecurrence: z
    .enum(['true', 'false'], { message: 'Valor de recorrência inválido' })
    .transform((val) => val === 'true'),
});

export type FixedIncomeInput = z.infer<typeof fixedIncomeSchema>;
