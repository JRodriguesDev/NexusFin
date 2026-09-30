/* eslint-disable func-style */
import { createReactAgent } from '@langchain/langgraph/prebuilt';
import { getChatModel } from '@/lib/langchain/langchain';
import { availableTools } from '@/lib/langchain/tools';

export async function* runChat(userMessage: string) {
  const model = getChatModel();

  // 1. O LangGraph cria a máquina de estados (Agente ReAct)
  const agent = createReactAgent({
    llm: model,
    tools: availableTools,
  });

  yield { type: 'status', message: 'Pensando...' };

  // 2. Executamos o fluxo do agente
  const eventStream = await agent.streamEvents(
    { messages: [{ role: 'user', content: userMessage }] },
    { version: 'v2' }
  );

  let fullResponse = '';

  for await (const event of eventStream) {
    // Quando o agente decide acionar a busca no DuckDuckGo
    if (event.event === 'on_tool_start') {
      yield { type: 'status', message: `Buscando dados na internet (${event.name})...` };
    }

    // Quando o Gemini gera o texto final com base nos dados encontrados
    if (event.event === 'on_chat_model_stream' && event.data?.chunk?.content) {
      const text = event.data.chunk.content.toString();
      if (text) {
        fullResponse += text;
      }
    }
  }

  yield { type: 'response', message: fullResponse };
}
