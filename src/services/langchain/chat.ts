/* eslint-disable func-style */
import { agent } from '@/lib/langchain/langchain';
import { extractChunkText, stripMarkdown, prepareMessagesWindow } from '@/helpers/chat';
import { TOOL_STATUS_MAP } from '@/constants/chat';
import { Tools } from '@/types/chat';
import { ChatStreamEvent, Message } from '@/types/chat';
import { generateConversationSummary } from '@/lib/langchain/utils/summary';

export async function* runChat(
  history: Message[],
  currentSummary: string
): AsyncGenerator<ChatStreamEvent> {
  const agentInstance = agent;
  // 1. Notifica o início do raciocínio
  yield { type: 'status', message: 'Pensando...' };

  try {
    let updateSummary = currentSummary;
    const expiredCount = history.length - 10;
    const expiredBlocks = expiredCount > 0 ? Math.floor(expiredCount / 10) : 0;
    if (expiredBlocks > 0 && expiredCount % 10 <= 1) {
      yield { type: 'status', message: 'Sincronizando e resumindo contexto antigo...' };
      const oldMessages = history.slice(0, expiredCount);
      if (oldMessages.length > 0) {
        updateSummary = await generateConversationSummary(oldMessages, currentSummary);
      }
    }

    const formattedMessages = prepareMessagesWindow(history, 10, updateSummary);
    // 2. Executa o agente escutando os eventos do Grafo
    const eventStream = await agentInstance.streamEvents(
      { messages: formattedMessages },
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
    yield {
      type: 'response',
      success: true,
      summary: updateSummary,
      message: stripMarkdown(fullResponse).trim(),
    };
  } catch (error) {
    console.error(error);
    yield {
      type: 'error',
      success: false,
      message: 'Ocorreu uma falha temporária no processamento da IA. Tente novamente.',
    };
  }
}
