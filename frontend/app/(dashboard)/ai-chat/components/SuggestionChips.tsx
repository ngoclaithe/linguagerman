'use client';

import { useAIChatStore } from '@/lib/store';
import { Lightbulb } from 'lucide-react';

interface Props {
  onSelect: (text: string) => void;
}

export default function SuggestionChips({ onSelect }: Props) {
  const { suggestions, pendingSuggestions } = useAIChatStore();

  if (suggestions.length === 0 && !pendingSuggestions) return null;

  return (
    <div className="absolute bottom-[84px] left-0 right-0 px-6 z-20 flex justify-center pb-2 pointer-events-none">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-violet-100 p-3 w-full max-w-3xl animate-fade-in-up pointer-events-auto">
        <div className="flex items-center gap-2 mb-2 px-1">
          <Lightbulb className="w-4 h-4 text-amber-500" />
          <span className="text-xs font-black uppercase tracking-wider text-slate-500">Gợi ý AI</span>
        </div>
        
        {pendingSuggestions ? (
          <div className="flex gap-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex-1 h-14 bg-slate-100 rounded-xl animate-pulse cursor-wait"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {suggestions.map((sug, i) => (
              <button
                key={i}
                onClick={() => onSelect(sug.german)}
                className="px-4 py-2 bg-slate-50 border border-slate-200 hover:border-violet-300 hover:bg-violet-50 transition-all rounded-xl shadow-sm text-left flex flex-col items-start gap-0.5 overflow-hidden group"
              >
                <span className="text-slate-800 text-[14px] font-bold group-hover:text-violet-700 w-full whitespace-nowrap overflow-hidden text-ellipsis">
                  {sug.german}
                </span>
                <span className="text-slate-500 text-[12px] font-medium w-full whitespace-nowrap overflow-hidden text-ellipsis">
                  {sug.vietnamese}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
