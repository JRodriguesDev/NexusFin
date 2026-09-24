'use server';

import { getMoneyKpip } from '@/services/DAL/overview';
import { calculateChange } from '@/lib/utils';
import { prismaErrors } from '@/lib/prisma/error';
import { ResponseActionType } from '@/types/response';
import { MoneyKpisData } from '@/types/overview';

export const moneyKpipsAction = async (): Promise<ResponseActionType<MoneyKpisData>> => {
  try {
    const response = await getMoneyKpip();
    const { totalIncome, totalExpense, prevIncome, prevExpense, totalInvested } = response;
    const incomeChange = calculateChange(totalIncome, prevIncome);
    const expenseChange = calculateChange(totalExpense, prevExpense);
    const balance = totalIncome - totalExpense;
    const savingsPercentage =
      totalIncome > 0 && balance > 0 ? Math.round((balance / totalIncome) * 100) : 0;

    return {
      success: true,
      data: {
        totalIncome,
        totalExpense,
        incomeChange,
        expenseChange,
        balance,
        savingsPercentage,
        totalInvested,
      },
    };
  } catch (error) {
    return { success: false, message: prismaErrors(error) ?? 'Error Interno' };
  }
};
