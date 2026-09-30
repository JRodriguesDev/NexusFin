export const stripMarkdown = (text: string): string => {
  return (
    text
      // Remove negritos, itálicos e sublinhados (***, **, *, __, _)
      .replace(/(\*\*|__)(.*?)\1/g, '$2')
      .replace(/(\*|_)(.*?)\1/g, '$2')
      // Remove títulos (### Título -> Título)
      .replace(/^#{1,6}\s+/gm, '')
      // Remove divisores horizontais (--- ou ***)
      .replace(/^[-*]{3,}\s*$/gm, '')
      // Remove marcadores de lista (* item, - item, + item)
      .replace(/^\s*[\*\-\+]\s+/gm, '')
      // Remove numeração de listas (1. item -> item)
      .replace(/^\s*\d+\.\s+/gm, '')
      // Remove sintaxe de links ([texto](url) -> texto)
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      // Remove marcadores de código em bloco ou inline (`código`)
      .replace(/`([^`]+)`/g, '$1')
      // Normaliza múltiplas quebras de linha em excesso
      .replace(/\n{3,}/g, '\n\n')
  );
};

export const extractChunkText = (content: unknown): string => {
  if (typeof content === 'string') {
    return content;
  }

  // Caso o content venha como um Array de objetos do LangChain/Gemini
  if (Array.isArray(content)) {
    return content
      .map((item) => {
        if (typeof item === 'string') return item;
        if (typeof item === 'object' && item !== null && 'text' in item) {
          return (item as { text: string }).text || '';
        }
        return '';
      })
      .join('');
  }

  return '';
};
