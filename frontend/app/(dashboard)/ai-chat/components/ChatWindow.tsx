'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, ArrowLeft } from 'lucide-react';
import { useAIChatStore } from '@/lib/store';
import { useChat } from '../hooks/useChat';
import MessageBubble from './MessageBubble';
import SuggestionChips from './SuggestionChips';

export default function ChatWindow() {
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  const { 
    messages, 
    isStreaming, 
    streamingContent, 
    grammarMap, 
    personaId, 
    cefrLevel,
    resetSession
  } = useAIChatStore();
  
  const { sendMessage } = useChat();

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingContent]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isStreaming) return;
    sendMessage(input.trim());
    setInput('');
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 relative">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-4">
          <button onClick={resetSession} className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-500 transition-colors border border-slate-200">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg font-black text-slate-800 capitalize">{personaId?.replace('_', ' ')}</h1>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wide">Online</p>
            </div>
          </div>
        </div>
        <div className="px-3 py-1 bg-violet-100 text-violet-700 font-black rounded-lg text-xs uppercase tracking-wider border border-violet-200">
          {cefrLevel}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="max-w-4xl mx-auto flex flex-col w-full">
          {messages.map((msg) => (
            <MessageBubble 
              key={msg.id} 
              message={msg} 
              grammar={grammarMap[msg.id]} 
            />
          ))}

          {/* Streaming Bubble */}
          {isStreaming && (
            <MessageBubble 
              message={{ id: 'streaming', role: 'assistant', content: streamingContent || '...' }} 
            />
          )}
          <div ref={chatEndRef} />
        </div>
      </div>

      <SuggestionChips onSelect={(text) => setInput(text)} />

      {/* Input Area */}
      <div className="bg-white border-t border-slate-200 p-4 shrink-0 z-30 relative">
        <form onSubmit={handleSend} className="max-w-4xl mx-auto flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-[2rem] p-2 pr-2 relative shadow-inner">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Schreibe eine Nachricht..."
            className="flex-1 bg-transparent border-none outline-none text-slate-800 font-medium placeholder:text-slate-400 px-4"
            disabled={isStreaming}
          />
          <button
            type="submit"
            disabled={!input.trim() || isStreaming}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-violet-600 hover:bg-violet-700 text-white transition-all disabled:opacity-50 disabled:hover:bg-violet-600 shadow-md transform active:scale-95"
          >
            {isStreaming ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              <Send className="w-5 h-5 ml-1" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
