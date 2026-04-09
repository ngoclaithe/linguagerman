'use client';

import { useState } from 'react';
import { AiMessage, GrammarResult, GrammarCorrection } from '@/lib/store';
import GrammarTooltip from './GrammarTooltip';

interface Props {
  message: AiMessage;
  grammar?: GrammarResult;
}

export default function MessageBubble({ message, grammar }: Props) {
  const isBot = message.role === 'assistant';
  const [activeCorrection, setActiveCorrection] = useState<GrammarCorrection | null>(null);

  // Render text with grammar annotations if any
  const renderContent = () => {
    if (!grammar || !grammar.hasError || grammar.corrections.length === 0) {
      return message.content;
    }

    let result: React.ReactNode[] = [];
    let lastIndex = 0;
    const text = message.content;

    // For simplicity, we just try to find exact matches of 'original' text.
    // In a robust app, grammar response should include start/end indices.
    grammar.corrections.forEach((corr, idx) => {
      const matchIdx = text.toLowerCase().indexOf(corr.original.toLowerCase(), lastIndex);
      if (matchIdx !== -1) {
        // Push preceding text
        result.push(text.substring(lastIndex, matchIdx));
        
        // Determine style based on severity
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

    // Push remaining text
    result.push(text.substring(lastIndex));
    return result.length > 0 ? result : message.content;
  };

  return (
    <div className={`flex w-full mb-6 ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div className={`flex flex-col relative max-w-[80%] ${isBot ? 'items-start' : 'items-end'}`}>
        <div className={`p-4 rounded-[1.5rem] shadow-sm text-[15px] font-medium leading-relaxed ${
          isBot ? 'bg-white border border-slate-200 text-slate-800 rounded-tl-sm' : 'bg-violet-600 text-white rounded-tr-sm'
        }`}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
