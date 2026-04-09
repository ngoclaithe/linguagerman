import { useCallback } from 'react';
import { useAIChatStore } from '@/lib/store';

export function useChat() {
  const { 
    sessionId, personaId, topic, cefrLevel,
    appendMessage, setStreaming, updateStreamingContent, 
    setSuggestions, setPendingSuggestions, setGrammarResult,
    messages
  } = useAIChatStore();

  const sendMessage = useCallback(async (content: string) => {
    if (!sessionId || !personaId) return;

    // Add user message to UI immediately
    const userMessageId = Date.now().toString();
    appendMessage({ id: userMessageId, role: 'user', content });

    // Reset suggestions
    setSuggestions([]);
    setPendingSuggestions(true);
    setStreaming(true);

    try {
      const response = await fetch('/api/ai/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'text/event-stream',
        },
        body: JSON.stringify({
          sessionId,
          userId: 'default-user', // Should come from auth context
          message: content,
          personaId,
          topic,
          cefrLevel,
        }),
      });

      if (!response.body) throw new Error('No readable stream');
      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        let currentEvent = '';
        for (const line of lines) {
          if (line.startsWith('event: ')) {
            currentEvent = line.substring(7).trim();
          } else if (line.startsWith('data: ')) {
            const dataStr = line.substring(6).trim();
            if (!dataStr) continue;

            try {
              const data = JSON.parse(dataStr);
              
              switch (currentEvent) {
                case 'chat:token':
                   updateStreamingContent(data.token);
                   break;
                case 'chat:done':
                   // Streaming finished
                   appendMessage({ id: Date.now().toString(), role: 'assistant', content: data.fullMessage });
                   setStreaming(false);
                   const state = useAIChatStore.getState();
                   // Clear streaming content after adding final message
                   useAIChatStore.setState({ streamingContent: '' });
                   break;
                case 'suggestions':
                   setSuggestions(data.items);
                   setPendingSuggestions(false);
                   break;
                case 'grammar':
                   setGrammarResult(userMessageId, data);
                   break;
              }
            } catch (e) {
              console.error('Error parsing SSE data', dataStr);
            }
          }
        }
      }
    } catch (error) {
      console.error('SSE Error:', error);
      setStreaming(false);
      setPendingSuggestions(false);
    }
  }, [sessionId, personaId, topic, cefrLevel, appendMessage, setStreaming, updateStreamingContent, setSuggestions, setPendingSuggestions, setGrammarResult]);

  return { sendMessage };
}
