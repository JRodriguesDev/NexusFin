'use server';

import { getMoneyKpip, getGraphicData, getSummaryTablesData } from '@/services/DAL/overview';
import { calculateChange } from '@/lib/utils';
import { prismaErrors } from '@/lib/prisma/error';
import { ResponseActionType } from '@/types/response';
import { MoneyKpisData, GraphicsData, SummaryTablesData } from '@/types/overview';
import { monthNames } from '@/constants/overview';
import { runChat } from '@/services/langchain/chat';
import { renameSessionSchema } from '@/lib/validations/chat';
import {
  ChatStreamEvent,
  Message,
  ChatSessionType,
  ResponseMessagesHistoric,
  RenameSessionType,
} from '@/types/chat';
import {
  createMessage,
  getSessions,
  getSessionMessages,
  deleteSession,
  renameSession,
} from '@/services/DAL/chat';

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

export const graphicsDataAction = async (): Promise<ResponseActionType<GraphicsData>> => {
  try {
    const { formattedTransactions, formattedInvestiments } = await getGraphicData();

    const now = new Date();
    const monthlyMap = new Map<string, { month: string; income: number; expense: number }>();

    // 1. Inicializa os últimos 6 meses com 0
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${d.getMonth()}`;
      monthlyMap.set(key, { month: monthNames[d.getMonth()], income: 0, expense: 0 });
    }

    // 2. Processa as transações com a data CORRETA (tx.date)
    formattedTransactions.forEach((tx) => {
      const txDate = new Date(tx.date); // <-- Corrigido: usando a data da transação
      const key = `${txDate.getFullYear()}-${txDate.getMonth()}`;

      if (monthlyMap.has(key)) {
        const monthData = monthlyMap.get(key)!;
        if (tx.type === 'INCOME') monthData.income += tx.amount;
        if (tx.type === 'EXPENSE') monthData.expense += tx.amount;
      }
    });

    const cashFlow = Array.from(monthlyMap.values());

    // 3. Total dos investimentos
    const grandTotal = Object.values(formattedInvestiments).reduce(
      (acc, amount) => acc + amount,
      0
    );

    // 4. Formatação por Categoria
    const investimentByCategory = Object.entries(formattedInvestiments).map(
      ([category, amount]) => {
        const percentVal = grandTotal > 0 ? Math.round((amount / grandTotal) * 100) : 0;
        return {
          name: category,
          amount,
          percent: `${percentVal}%`,
        };
      }
    );

    // 5. Agrupamento por Nível de Risco (Usando formattedInvestiments original)
    let lowRisk = 0;
    let mediumRisk = 0;
    let highRisk = 0;

    Object.entries(formattedInvestiments).forEach(([category, amount]) => {
      const catUpper = category.toUpperCase();
      if (catUpper.includes('FIXEDINCOME')) {
        lowRisk += amount;
      } else if (catUpper.includes('FUND')) {
        mediumRisk += amount;
      } else {
        highRisk += amount;
      }
    }); // <-- O loop do forEach FECHA AQUI!

    // 6. Montagem da lista de riscos (FORA do loop)
    const riskList = [
      { name: 'Baixo Risco', amount: lowRisk },
      { name: 'Médio Risco', amount: mediumRisk },
      { name: 'Alto Risco', amount: highRisk },
    ];

    const investimentByRisk = riskList
      .filter((risk) => risk.amount > 0)
      .map((risk) => {
        const percentVal = grandTotal > 0 ? Math.round((risk.amount / grandTotal) * 100) : 0;
        return {
          name: risk.name,
          amount: risk.amount,
          percent: `${percentVal}%`,
        };
      });

    // 7. Retorno final da Action (FORA de qualquer loop)
    return {
      success: true,
      data: {
        cashFlow,
        investimentByCategory,
        investimentByRisk,
      },
    };
  } catch (error) {
    return { success: false, message: prismaErrors(error) ?? 'Erro Interno' };
  }
};

export const summaryTableDataAction = async (): Promise<ResponseActionType<SummaryTablesData>> => {
  try {
    const data = await getSummaryTablesData();
    return {
      success: true,
      data: data,
    };
  } catch (error) {
    return { success: false, message: prismaErrors(error) ?? 'Erro Interno' };
  }
};

// eslint-disable-next-line func-style
export async function* sendMessageAction(
  sessionId: string | null,
  messages: Message[],
  summary: string
): AsyncGenerator<ChatStreamEvent> {
  if (messages.length <= 0) return;
  const cleanMessages = messages.filter((msg) => msg.role !== 'error');
  let IaResponseText = '';
  let updatedSummary = summary;
  for await (const event of runChat(cleanMessages, summary)) {
    if (event.type === 'response') {
      IaResponseText = event.message;
      if (event.summary !== undefined) {
        updatedSummary = event.summary;
      }
    }
    yield event;
  }
  if (IaResponseText) {
    const userMessage = cleanMessages[cleanMessages.length - 1];
    try {
      const response = await createMessage(sessionId, userMessage, IaResponseText, updatedSummary);
      yield {
        type: 'sessionCreated',
        sessionId: response,
      };
    } catch (error) {
      console.error(error);
      yield {
        type: 'error',
        success: false,
        message: 'Ocorreu uma falha temporária ao salvar mesagens no banco.',
      };
    }
  }
}

export const historicMessagesAction = async (): Promise<ResponseActionType<ChatSessionType[]>> => {
  try {
    const response = await getSessions();
    return {
      success: true,
      data: response,
    };
  } catch (error) {
    return { success: false, message: prismaErrors(error) ?? 'Erro Interno' };
  }
};

export const sessionMessagesAction = async (
  sessionId: string
): Promise<ResponseActionType<ResponseMessagesHistoric>> => {
  try {
    const response = await getSessionMessages(sessionId);
    return {
      success: true,
      data: response,
    };
  } catch (error) {
    return { success: false, message: prismaErrors(error) ?? 'Erro Interno' };
  }
};

export const deleteSessionAction = async (id: string): Promise<ResponseActionType> => {
  try {
    await deleteSession(id);
    return { success: true };
  } catch (error) {
    return { success: false, message: prismaErrors(error) ?? 'Erro Interno' };
  }
};

export const renameSessionAction = async (
  _prevState: RenameSessionType,
  form: FormData
): Promise<RenameSessionType> => {
  const validationField = renameSessionSchema.safeParse({
    id: form.get('id'),
    title: form.get('title'),
  });
  if (!validationField.success) {
    const error = validationField.error.flatten().fieldErrors;
    return {
      success: false,
      errors: {
        title: error.title?.[0],
      },
    };
  }

  try {
    await renameSession(validationField.data);
    return { success: true };
  } catch (error) {
    return { success: false, message: prismaErrors(error) ?? 'Erro Interno' };
  }
};
