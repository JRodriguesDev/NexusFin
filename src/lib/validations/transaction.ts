import { z } from 'zod';

export const fixedIncomeSchema = z.object({
  description: z
    .string()
    .trim()
    .min(3, 'Descrição deve ter no mínimo 3 caracteres')
    .max(255, 'Descrição muito longa'),

  amount: z.coerce.number().positive('O valor deve ser maior que zero'),

  day: z.coerce.number().int().min(1, 'Dia inválido').max(31, 'Dia inválido'),

  category: z.enum(['SALARY', 'OTHER_INCOME'], { message: 'Categoria Invalida' }),
});

export type FixedIncomeInput = z.infer<typeof fixedIncomeSchema>;
