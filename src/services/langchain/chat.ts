/* eslint-disable func-style */
import { agent } from '@/lib/langchain/langchain';
import { extractChunkText, stripMarkdown } from '@/helpers/chat';
import { TOOL_STATUS_MAP } from '@/constants/chat';
import { Tools } from '@/types/chat';
import { ChatStreamEvent } from '@/types/chat';

export async function* runChat(userMessage: string): AsyncGenerator<ChatStreamEvent> {
  const agentInstance = agent;
  // 1. Notifica o início do raciocínio
  yield { type: 'status', message: 'Pensando...' };

  try {
    // 2. Executa o agente escutando os eventos do Grafo
    const eventStream = await agentInstance.streamEvents(
      { messages: [{ role: 'user', content: userMessage }] },
      { version: 'v2', recursionLimit: 5 }
    );

    let fullResponse = '';

    for await (const event of eventStream) {
      // Quando o agente decide acionar ferramentas (como o Tavily)
      if (event.event === 'on_tool_start') {
        const toolName = event.name as Tools;
        const friendlyMessage = TOOL_STATUS_MAP[toolName] || 'Consultando informações...';

        yield {
          type: 'status',
          message: `${friendlyMessage}`,
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
    yield { type: 'response', success: true, message: stripMarkdown(fullResponse).trim() };
  } catch (error) {
    yield {
      type: 'error',
      success: false,
      message: 'Ocorreu uma falha temporária no processamento da IA. Tente novamente.',
    };
  }
}
