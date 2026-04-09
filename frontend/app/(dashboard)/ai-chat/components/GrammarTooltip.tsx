'use client';

import { GrammarCorrection } from '@/lib/store';

interface Props {
  correction: GrammarCorrection;
}

export default function GrammarTooltip({ correction }: Props) {
  const getSeverityColors = (severity: string) => {
    switch(severity) {
      case 'error': return 'bg-rose-50 border-rose-200 text-rose-700';
      case 'warning': return 'bg-amber-50 border-amber-200 text-amber-700';
      default: return 'bg-blue-50 border-blue-200 text-blue-700';
    }
  };

  return (
    <div className={`absolute bottom-full left-0 mb-2 w-64 p-3 rounded-xl border shadow-xl z-50 animate-fade-in-up ${getSeverityColors(correction.severity)}`}>
      <div className="text-xs font-bold uppercase tracking-wide opacity-50 mb-1">{correction.type}</div>
      <div className="font-bold text-[15px] mb-2 line-through opacity-70 decoration-2">{correction.original}</div>
      <div className="font-black text-[16px] mb-2">{correction.corrected}</div>
      <div className="text-sm font-medium opacity-90">{correction.explanation}</div>
      {/* Little triangle pointer */}
      <div className={`absolute top-full left-4 -mt-[1px] w-3 h-3 border-b border-r transform rotate-45 ${getSeverityColors(correction.severity).split(' ')[0]} ${getSeverityColors(correction.severity).split(' ')[1]}`}></div>
    </div>
  );
}
