/* eslint-disable func-style */
import { agent } from '@/lib/langchain/langchain';
import { extractChunkText, stripMarkdown } from '@/helpers/chat';

export async function* runChat(userMessage: string) {
  const agentInstance = agent;

  // 1. Notifica o início do raciocínio
  yield { type: 'status', message: 'Pensando...' };

  // 2. Executa o agente escutando os eventos do Grafo
  const eventStream = await agentInstance.streamEvents(
    { messages: [{ role: 'user', content: userMessage }] },
    { version: 'v2' }
  );

  let fullResponse = '';

  for await (const event of eventStream) {
    // Quando o agente decide acionar ferramentas (como o Tavily)
    if (event.event === 'on_tool_start') {
      yield {
        type: 'status',
        message: `Buscando dados na internet (${event.name})...`,
      };
    }

    // Captura a geração incremental da resposta
    if (event.event === 'on_chat_model_stream' && event.data?.chunk?.content) {
      const text = extractChunkText(event.data.chunk.content);

      if (text) {
        fullResponse += text;
      }
    }
  }

  // 3. Emite a resposta final acumulada já limpa
  yield { type: 'response', message: stripMarkdown(fullResponse).trim() };
}
