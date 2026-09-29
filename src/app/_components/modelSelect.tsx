'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { aiModels } from '@/constants/chat';
import { useState } from 'react';

export const ModelSelect = ({ isStreaming }: { isStreaming: boolean }) => {
  const [selectedProvider, setSelectedProvider] = useState<'gemini' | 'openai'>('gemini');
  const [selectedModel, setSelectedModel] = useState<string>('gemini-2.5-flash');

  // Atualiza o modelo padrão caso o usuário mude de provedor
  const handleProviderChange = (provider: 'gemini' | 'openai') => {
    setSelectedProvider(provider);
    setSelectedModel(aiModels[provider].models[0].id);
  };

  return (
    <div className="flex items-center justify-center p-3 border-b bg-card/50 backdrop-blur gap-2">
      <div className="flex items-center gap-2">
        {/* Seletor de Provedor */}
        <Select
          value={selectedProvider}
          onValueChange={(val) => handleProviderChange(val as 'gemini' | 'openai')}
          disabled={isStreaming}
        >
          <SelectTrigger className="w-[140px] h-8 text-xs font-medium">
            <SelectValue placeholder="Provedor" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gemini">Google Gemini</SelectItem>
            <SelectItem value="openai">OpenAI</SelectItem>
          </SelectContent>
        </Select>

        {/* Seletor de Modelo do Provedor Selecionado */}
        <Select value={selectedModel} onValueChange={setSelectedModel} disabled={isStreaming}>
          <SelectTrigger className="w-[160px] h-8 text-xs">
            <SelectValue placeholder="Modelo" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel className="text-[10px]">
                Modelos {aiModels[selectedProvider].name}
              </SelectLabel>
              {aiModels[selectedProvider].models.map((m) => (
                <SelectItem key={m.id} value={m.id} className="text-xs">
                  {m.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
