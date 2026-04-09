import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'STUDENT' | 'ADMIN' | 'TEACHER';
  avatar?: string;
  bio?: string;
}

interface AuthStore {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  login: (user: User) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
      login: (user) => set({ user }),
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({
        user: state.user,
      }),
    },
  ),
);

interface DashboardStore {
  selectedCourse: string | null;
  setSelectedCourse: (courseId: string | null) => void;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  selectedCourse: null,
  setSelectedCourse: (courseId) => set({ selectedCourse: courseId }),
}));

// --- AI Chat Module V2 ---

export interface AiMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  isStreaming?: boolean;
  translation?: string;
  isTranslating?: boolean;
}

export interface GrammarCorrection {
  original: string;
  corrected: string;
  type: string;
  explanation: string;
  severity: 'error' | 'warning' | 'suggestion';
}

export interface GrammarResult {
  hasError: boolean;
  corrections: GrammarCorrection[];
}

interface AIChatStore {
  // Session
  sessionId: string | null;
  personaId: string | null;
  topic: string | null;
  cefrLevel: string;

  // Messages
  messages: AiMessage[];
  isStreaming: boolean;
  streamingContent: string;

  // Real-time features
  suggestions: string[];
  pendingSuggestions: boolean;
  grammarMap: Record<string, GrammarResult>;

  // Actions
  setSession: (sessionId: string, personaId: string, topic: string, cefrLevel: string, openingMessage: string, suggestions: string[]) => void;
  appendMessage: (message: AiMessage) => void;
  setStreaming: (isStreaming: boolean) => void;
  updateStreamingContent: (content: string) => void;
  setSuggestions: (suggestions: string[]) => void;
  setPendingSuggestions: (pending: boolean) => void;
  setGrammarResult: (messageId: string, result: GrammarResult) => void;
  updateMessage: (messageId: string, updates: Partial<AiMessage>) => void;
  resetSession: () => void;
}

export const useAIChatStore = create<AIChatStore>((set) => ({
  sessionId: null,
  personaId: null,
  topic: null,
  cefrLevel: 'A1',
  messages: [],
  isStreaming: false,
  streamingContent: '',
  suggestions: [],
  pendingSuggestions: false,
  grammarMap: {},

  setSession: (sessionId, personaId, topic, cefrLevel, openingMessage, suggestions) => set({
    sessionId, personaId, topic, cefrLevel, 
    messages: [{ id: Date.now().toString(), role: 'assistant', content: openingMessage }],
    suggestions,
    isStreaming: false,
    streamingContent: '',
    grammarMap: {},
  }),
  appendMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  setStreaming: (isStreaming) => set({ isStreaming }),
  updateStreamingContent: (content) => set((state) => ({ streamingContent: state.streamingContent + content })),
  setSuggestions: (suggestions) => set({ suggestions }),
  setPendingSuggestions: (pending) => set({ pendingSuggestions: pending }),
  setGrammarResult: (messageId, result) => set((state) => ({
    grammarMap: { ...state.grammarMap, [messageId]: result }
  })),
  updateMessage: (messageId, updates) => set((state) => ({
    messages: state.messages.map(m => m.id === messageId ? { ...m, ...updates } : m)
  })),
  resetSession: () => set({
    sessionId: null, personaId: null, topic: null, 
    messages: [], isStreaming: false, streamingContent: '', 
    suggestions: [], pendingSuggestions: false, grammarMap: {}
  })
}));
