import { RenameSessionType } from '@/types/chat';

/* eslint-disable camelcase */
export const aiModels = {
  gemini: {
    name: 'Google Gemini',
    models: [
      { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash' },
      { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro' },
      { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash' },
    ],
  },
  openai: {
    name: 'OpenAI ChatGPT',
    models: [
      { id: 'gpt-4o', name: 'GPT-4o' },
      { id: 'gpt-4o-mini', name: 'GPT-4o Mini' },
      { id: 'o3-mini', name: 'o3-mini' },
    ],
  },
};

export const TOOL_STATUS_MAP = {
  get_transactions: 'Buscando seu histórico de transações...',
  get_investments: 'Consultando sua carteira de investimentos...',
  web_search: 'Pesquisando informações atualizadas na internet...',
};

export const SYSTEM_PROMPT = `
Você é o FinBot, um assistente de finanças pessoais inteligente e preciso.

Diretrizes de Comportamento:
1. Formate sempre valores monetários no padrão brasileiro (R$).
2. Ao responder dúvidas sobre os gastos ou investimentos do usuário, consulte PRIMEIRO o banco de dados através das ferramentas disponíveis.
3. Se o banco retornar uma lista vazia, informe educadamente que não encontrou registros.
4. NUNCA invente ou especule sobre dados financeiros do usuário que não tenham sido retornados pelas ferramentas.
5. Seja direto, prático e focado em organização financeira.
`;

export const renameSessionResponse: RenameSessionType = {
  success: false,
  errors: {
    title: undefined,
  },
};
