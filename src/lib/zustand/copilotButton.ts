import { create } from 'zustand';
import { CopilotStore } from '@/types/zustand';

export const useCopilotStore = create<CopilotStore>((set) => ({
  view: 'chat',
  currentSessionId: null,
  setView: (view) => set({ view }),
  setCurrentSessionId: (currentSessionId) => set({ currentSessionId }),
  handleNewChat: () => set({ currentSessionId: null, view: 'chat' }),
}));
