'use client';

import { useState, useRef, useEffect } from 'react';
import { Volume2, Languages } from 'lucide-react';
import { AiMessage, GrammarResult, GrammarCorrection, useAIChatStore } from '@/lib/store';
import GrammarTooltip from './GrammarTooltip';
import { aiAPI } from '@/lib/api';

interface Props {
  message: AiMessage;
  grammar?: GrammarResult;
}

export default function MessageBubble({ message, grammar }: Props) {
  const isBot = message.role === 'assistant';
  const [activeCorrection, setActiveCorrection] = useState<GrammarCorrection | null>(null);
  
  // TTS State
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingProps, setPlayingProps] = useState<{ charIndex: number, length: number } | null>(null);
  const highlightTimerRef = useRef<NodeJS.Timeout | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const { updateMessage, personaId } = useAIChatStore();
  
  // Theme color based on persona could be passed, but we can default to violet / blue
  const themeColor = '#8b5cf6'; // Violet-500 fallback

  useEffect(() => {
    return () => {
      if (highlightTimerRef.current) clearInterval(highlightTimerRef.current);
      if (isPlaying && typeof window !== 'undefined') window.speechSynthesis?.cancel();
    };
  }, [isPlaying]);

  const playText = (text: string) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      if (highlightTimerRef.current) {
        clearInterval(highlightTimerRef.current);
        highlightTimerRef.current = null;
      }
      setPlayingProps(null);
      setIsPlaying(true);

      const wordPositions: {start: number, length: number}[] = [];
      const regex = /[^\s]+/g;
      let match;
      while ((match = regex.exec(text)) !== null) {
        wordPositions.push({ start: match.index, length: match[0].length });
      }
      if (wordPositions.length === 0) {
        setIsPlaying(false);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'de-DE';
      utterance.rate = 0.9;
      const msPerWord = 280;
      let wordIndex = 0;

      utterance.onstart = () => {
        wordIndex = 0;
        if (wordPositions[0]) {
          setPlayingProps({ charIndex: wordPositions[0].start, length: wordPositions[0].length });
        }
        highlightTimerRef.current = setInterval(() => {
          wordIndex++;
          if (wordIndex < wordPositions.length) {
            const wp = wordPositions[wordIndex];
            setPlayingProps({ charIndex: wp.start, length: wp.length });
          } else {
            if (highlightTimerRef.current) { clearInterval(highlightTimerRef.current); highlightTimerRef.current = null; }
          }
        }, msPerWord);
      };

      utterance.onend = () => {
        if (highlightTimerRef.current) { clearInterval(highlightTimerRef.current); highlightTimerRef.current = null; }
        setPlayingProps(null);
        setIsPlaying(false);
        utteranceRef.current = null;
      };

      utterance.onerror = () => {
        if (highlightTimerRef.current) { clearInterval(highlightTimerRef.current); highlightTimerRef.current = null; }
        setPlayingProps(null);
        setIsPlaying(false);
        utteranceRef.current = null;
      };

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleTranslate = async () => {
    if (message.isTranslating || message.translation) return;
    updateMessage(message.id, { isTranslating: true });
    
    try {
      const data = await aiAPI.translate(message.content);
      if (data && data.translation) {
        updateMessage(message.id, { translation: data.translation, isTranslating: false });
      } else {
        updateMessage(message.id, { isTranslating: false });
      }
    } catch {
      updateMessage(message.id, { isTranslating: false });
    }
  };

  // Render text with grammar annotations if any, OR with TTS highlighting
  const renderContent = () => {
    const text = message.content;
    
    // Playing TTS takes precedence for highlighting currently spoken word
    if (isPlaying && playingProps) {
        return (
            <>
                {text.substring(0, playingProps.charIndex)}
                <span className="bg-amber-300 text-amber-900 rounded-[4px] px-1 font-bold shadow-sm transition-all duration-150">
                    {text.substring(playingProps.charIndex, playingProps.charIndex + playingProps.length)}
                </span>
                {text.substring(playingProps.charIndex + playingProps.length)}
            </>
        );
    }

    if (!grammar || !grammar.hasError || grammar.corrections.length === 0) {
      return text;
    }

    let result: React.ReactNode[] = [];
    let lastIndex = 0;

    // For simplicity, we just try to find exact matches of 'original' text.
    grammar.corrections.forEach((corr, idx) => {
      const matchIdx = text.toLowerCase().indexOf(corr.original.toLowerCase(), lastIndex);
      if (matchIdx !== -1) {
        result.push(text.substring(lastIndex, matchIdx));
        
        let decoration = 'decoration-rose-500 underline-offset-4 decoration-2';
        if (corr.severity === 'warning') decoration = 'decoration-amber-500 decoration-dashed decoration-2';
        else if (corr.severity === 'suggestion') decoration = 'decoration-blue-500 decoration-dotted decoration-2';

        result.push(
          <span 
            key={`corr-${idx}`} 
            className={`relative inline-block cursor-help underline ${decoration} bg-white/20 rounded-sm px-0.5`}
            onMouseEnter={() => setActiveCorrection(corr)}
            onMouseLeave={() => setActiveCorrection(null)}
          >
            {text.substring(matchIdx, matchIdx + corr.original.length)}
            {activeCorrection === corr && <GrammarTooltip correction={corr} />}
          </span>
        );
        lastIndex = matchIdx + corr.original.length;
      }
    });

    result.push(text.substring(lastIndex));
    return result.length > 0 ? result : text;
  };

  return (
    <div className={`flex w-full mb-6 ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div className={`flex flex-col relative max-w-[80%] ${isBot ? 'items-start' : 'items-end'}`}>
        <div className={`w-full p-4 rounded-[1.5rem] shadow-sm ${
          isBot ? 'bg-white border border-slate-200 text-slate-800 rounded-tl-sm' : 'bg-violet-600 text-white rounded-tr-sm'
        }`}>
          <div className="text-[15px] font-medium leading-relaxed whitespace-pre-wrap">
            {renderContent()}
          </div>
          
          {!message.isStreaming && message.id !== 'streaming' && (
            <div className={`mt-4 pt-3 flex flex-col gap-3 ${isBot ? 'border-t border-slate-100' : 'border-t border-violet-500/50'}`}>
              {message.translation && (
                <div className={`italic border-l-4 p-3 rounded-r-lg text-sm font-medium ${isBot ? 'bg-slate-50 text-slate-700 border-violet-500' : 'bg-white/20 text-white border-white'}`}>
                  {message.translation}
                </div>
              )}
              
              <div className={`flex items-center gap-2 ${!isBot && 'justify-end'}`}>
                <button
                  type="button"
                  onClick={() => playText(message.content)}
                  className={`w-9 h-9 flex items-center justify-center rounded-xl shadow-md transition-colors ${
                    !isBot ? 'text-violet-600 bg-white hover:bg-slate-50' : 'text-white'
                  }`}
                  style={isBot ? { backgroundColor: isPlaying ? '#f59e0b' : themeColor } : (isPlaying ? { backgroundColor: '#f59e0b', color: 'white' } : {})}
                >
                  <Volume2 className="w-4 h-4" />
                </button>
                <button
                  onClick={handleTranslate}
                  disabled={message.isTranslating || !!message.translation}
                  className={`w-9 h-9 flex items-center justify-center rounded-xl shadow-md transition-colors disabled:opacity-50 ${
                    !isBot ? 'bg-white text-violet-600 hover:bg-slate-50' : 'bg-slate-500 text-white hover:bg-slate-600'
                  }`}
                  title="Dịch câu này"
                >
                  {message.isTranslating ? (
                    <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    <Languages className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
