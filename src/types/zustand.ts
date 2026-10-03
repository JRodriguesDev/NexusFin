export type CopilotStore = {
  view: 'chat' | 'history';
  currentSessionId: string | null;
  setView: (view: 'chat' | 'history') => void;
  setCurrentSessionId: (id: string | null) => void;
  handleNewChat: () => void;
};
