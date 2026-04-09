'use client';

import { useState, useEffect } from 'react';
import { useAIChatStore } from '@/lib/store';

interface PersonaInfo {
  id: string;
  name: string;
  title: string;
  avatar: string;
  cefrTarget: string;
  topicAffinities: string[];
}

const TOPICS_BY_LEVEL: Record<string, string[]> = {
  'A1-A2': ['Begrüßung', 'Familie', 'Essen & Trinken', 'Wetter', 'Wohnung', 'Einkaufen', 'Farben & Zahlen', 'Tiere'],
  'B1-B2': ['Reisen', 'Arbeit & Beruf', 'Gesundheit', 'Hobbys', 'Technologie', 'Umwelt', 'Stadtleben', 'Kochen'],
  'C1': ['Politik', 'Wirtschaft', 'Wissenschaft', 'Bewerbungsgespräch', 'Präsentationen', 'Aktuelle Ereignisse'],
};

export default function PersonaSelector() {
  const [personas, setPersonas] = useState<PersonaInfo[]>([]);
  const [selectedPersona, setSelectedPersona] = useState<PersonaInfo | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedCefr, setSelectedCefr] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { setSession } = useAIChatStore();

  useEffect(() => {
    fetch('/api/ai/personas')
      .then(res => res.json())
      .then(data => setPersonas(data))
      .catch(console.error);
  }, []);

  const handleStartSession = async () => {
    if (!selectedPersona || !selectedTopic || !selectedCefr) return;
    
    setIsLoading(true);
    try {
      const res = await fetch('/api/ai/session/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          personaId: selectedPersona.id,
          topic: selectedTopic,
          cefrLevel: selectedCefr,
          userId: 'default-user',
        })
      });
      const data = await res.json();
      setSession(data.sessionId, selectedPersona.id, selectedTopic, selectedCefr, data.openingMessage, data.suggestions);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 items-center justify-center p-6 space-y-6">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-lg border border-slate-100 p-8">
        <h1 className="text-3xl font-black text-slate-800 mb-2">Wähle deinen Partner</h1>
        <p className="text-slate-500 mb-8 font-medium">Bắt đầu hội thoại bằng cách thiết lập 3 bước dưới đây.</p>
        
        {/* Step 1: Persona */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-violet-700 mb-4 bg-violet-50 inline-block px-3 py-1 rounded-full text-sm">Bước 1: Chọn người trò chuyện</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {personas.map(p => (
              <button
                key={p.id}
                onClick={() => { setSelectedPersona(p); setSelectedTopic(null); setSelectedCefr(p.cefrTarget); }}
                className={`flex flex-col items-center p-6 rounded-2xl border-2 transition-all ${selectedPersona?.id === p.id ? 'border-violet-500 bg-violet-50 shadow-md' : 'border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50'}`}
              >
                <div className="text-5xl mb-4 bg-white w-20 h-20 rounded-2xl shadow-sm flex items-center justify-center border border-slate-100">{p.avatar}</div>
                <div className="font-black text-slate-800 text-lg">{p.name}</div>
                <div className="text-sm font-medium text-slate-500 mt-1">{p.title}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Topic */}
        {selectedPersona && (
          <div className="mb-8 animate-fade-in-up">
            <h2 className="text-lg font-bold text-amber-600 mb-4 bg-amber-50 inline-block px-3 py-1 rounded-full text-sm">Bước 2: Chủ đề nói chuyện</h2>
            <div className="flex flex-wrap gap-2">
              {selectedPersona.topicAffinities.map(t => (
                 <button 
                  key={t}
                  onClick={() => setSelectedTopic(t)}
                  className={`px-4 py-2 font-bold rounded-xl outline-none transition-all ${selectedTopic === t ? 'bg-amber-500 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                 >
                   {t}
                 </button>
              ))}
              <div className="w-full flex items-center text-xs font-bold text-slate-400 mt-2 uppercase tracking-wide">
                <span>Hoặc chọn từ thư viện chủ đề:</span>
              </div>
              {TOPICS_BY_LEVEL['A1-A2'].slice(0, 4).map(t => (
                <button 
                  key={t}
                  onClick={() => setSelectedTopic(t)}
                  className={`px-3 py-1.5 text-sm font-bold rounded-lg transition-all ${selectedTopic === t ? 'bg-slate-800 text-white shadow-sm' : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100'}`}
                 >
                   {t}
                 </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Action */}
        {selectedPersona && selectedTopic && (
          <div className="flex items-center justify-between border-t border-slate-100 pt-6 animate-fade-in-up">
            <div>
              <div className="text-sm font-bold text-emerald-600 mb-1">Bước 3: Xác nhận độ khó</div>
              <select 
                value={selectedCefr || 'A1'} 
                onChange={(e) => setSelectedCefr(e.target.value)}
                className="bg-emerald-50 border border-emerald-100 text-emerald-800 text-sm rounded-lg font-bold px-3 py-2 outline-none cursor-pointer focus:ring-2 focus:ring-emerald-200"
              >
                <option value="A1">Niveau A1 (Sơ cấp)</option>
                <option value="A2">Niveau A2 (Cơ bản)</option>
                <option value="B1">Niveau B1 (Trung cấp)</option>
                <option value="B2">Niveau B2 (Trung cao)</option>
                <option value="C1">Niveau C1 (Cao cấp)</option>
              </select>
            </div>

            <button
              onClick={handleStartSession}
              disabled={isLoading}
              className="px-8 py-3 bg-violet-600 hover:bg-violet-700 text-white font-black rounded-xl shadow-lg shadow-violet-200 transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100 flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Đang thiết lập...
                </>
              ) : (
                'Bắt đầu Chat 🚀'
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
