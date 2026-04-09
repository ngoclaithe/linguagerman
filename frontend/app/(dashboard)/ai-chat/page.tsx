'use client';

import { useAIChatStore } from '@/lib/store';
import PersonaSelector from './components/PersonaSelector';
import ChatWindow from './components/ChatWindow';

export default function AiChatPage() {
  const { sessionId } = useAIChatStore();

  // If no active session, show the selector
  if (!sessionId) {
    return <PersonaSelector />;
  }

  // Otherwise, render the active chat
  return <ChatWindow />;
}
