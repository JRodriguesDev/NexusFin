import { HumanMessage } from '@langchain/core/messages';
import { Message } from '@/types/chat';
import { model } from '../langchain';

export const generateConversationSummary = async (
  oldMessages: Message[],
  existingSummary = ''
): Promise<string> => {
  if (oldMessages.length === 0) return existingSummary;
  console.log(oldMessages);
  const formattedHistory = oldMessages
    .map((msg) => `${msg.role === 'human' ? 'Usuário' : 'Assistente'}: ${msg.content}`)
    .join('\n');

  const prompt = `
Sua tarefa é criar ou atualizar um resumo conciso e objetivo do histórico de conversa entre um usuário e um assistente financeiro.

Resumo anterior:
"${existingSummary || 'Nenhum resumo anterior.'}"

Novas mensagens a serem incorporadas:
${formattedHistory}

Diretrizes:
1. Mantenha apenas fatos financeiros relevantes (ex: preferências, valores de investimentos citados, metas, nome do usuário).
2. Não inclua conversas banais ou cumprimentos.
3. Responda APENAS com o texto do resumo atualizado em português, sem formatações extras.
`;

  const response = await model.invoke([new HumanMessage(prompt)]);
  return typeof response.content === 'string' ? response.content.trim() : '';
};
