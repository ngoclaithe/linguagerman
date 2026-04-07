'use client';

import { Bot, Send, Mic, Volume2, Languages, Lightbulb, AlertCircle, User } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { aiAPI } from '@/lib/api';

export interface AiSuggestion {
    original: string;
    better: string;
    reason: string;
}

export interface AiMessage {
    id: string | number;
    role: 'bot' | 'user';
    content: string;
    time: string;
    suggestion?: AiSuggestion;
    translation?: string;
    isTranslating?: boolean;
}

export default function AiChatPage() {
    const [messages, setMessages] = useState<AiMessage[]>([]);
    const [playingProps, setPlayingProps] = useState<{ id: string | number, charIndex: number, length: number } | null>(null);
    const chatEndRef = useRef<HTMLDivElement>(null);
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
    const highlightTimerRef = useRef<NodeJS.Timeout | null>(null);
    const [isSuggesting, setIsSuggesting] = useState(false);
    const [suggestions, setSuggestions] = useState<{german: string, vietnamese: string}[]>([]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Cleanup highlight timer on unmount
    useEffect(() => {
        return () => {
            if (highlightTimerRef.current) clearInterval(highlightTimerRef.current);
        };
    }, []);

    const playText = (id: string | number, text: string) => {
        if (typeof window !== 'undefined' && window.speechSynthesis) {
            // Stop any current playback
            window.speechSynthesis.cancel();
            if (highlightTimerRef.current) {
                clearInterval(highlightTimerRef.current);
                highlightTimerRef.current = null;
            }
            setPlayingProps(null);

            // Pre-compute word positions: [{start, length}, ...]
            const wordPositions: {start: number, length: number}[] = [];
            const regex = /[^\s]+/g;
            let match;
            while ((match = regex.exec(text)) !== null) {
                wordPositions.push({ start: match.index, length: match[0].length });
            }

            if (wordPositions.length === 0) return;

            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'de-DE';
            utterance.rate = 0.9;

            // Estimate ~250ms per word at rate 0.9 for German
            const msPerWord = 280;
            let wordIndex = 0;

            utterance.onstart = () => {
                wordIndex = 0;
                if (wordPositions[0]) {
                    setPlayingProps({ id, charIndex: wordPositions[0].start, length: wordPositions[0].length });
                }

                // Timer-based word advancement
                highlightTimerRef.current = setInterval(() => {
                    wordIndex++;
                    if (wordIndex < wordPositions.length) {
                        const wp = wordPositions[wordIndex];
                        setPlayingProps({ id, charIndex: wp.start, length: wp.length });
                    } else {
                        // Reached end of words, clear timer
                        if (highlightTimerRef.current) {
                            clearInterval(highlightTimerRef.current);
                            highlightTimerRef.current = null;
                        }
                    }
                }, msPerWord);
            };

            utterance.onend = () => {
                if (highlightTimerRef.current) {
                    clearInterval(highlightTimerRef.current);
                    highlightTimerRef.current = null;
                }
                setPlayingProps(null);
                utteranceRef.current = null;
                (window as any)._tts = null;
            };

            utterance.onerror = () => {
                if (highlightTimerRef.current) {
                    clearInterval(highlightTimerRef.current);
                    highlightTimerRef.current = null;
                }
                setPlayingProps(null);
                utteranceRef.current = null;
                (window as any)._tts = null;
            };

            // Prevent Chrome GC from killing the utterance
            utteranceRef.current = utterance;
            (window as any)._tts = utterance;
            window.speechSynthesis.speak(utterance);
        }
    };

    const handleSuggest = async () => {
        if (isLoading || isSuggesting) return;
        setIsSuggesting(true);
        try {
            const conversationLog = messages.map(m => (m.role === 'user' ? 'Lernende/r: ' : 'Lehrerin: ') + m.content);
            const data = await aiAPI.suggestReplies({
                conversationLog,
                topic: 'Chào hỏi cơ bản hằng ngày',
                level: 'A1'
            });
            if (data && data.suggestions) {
                setSuggestions(data.suggestions);
            }
        } catch (error) {
            console.error("Lỗi lấy đề xuất:", error);
        } finally {
            setIsSuggesting(false);
        }
    };

    const handleTranslate = async (id: string | number, text: string) => {
        setMessages(prev => prev.map(m => m.id === id ? { ...m, isTranslating: true } : m));
        try {
            const data = await aiAPI.translate(text);
            if (data && data.translation) {
                setMessages(prev => prev.map(m => m.id === id ? { ...m, translation: data.translation, isTranslating: false } : m));
            } else {
                setMessages(prev => prev.map(m => m.id === id ? { ...m, isTranslating: false } : m));
            }
        } catch (error) {
            console.error("Lỗi dịch:", error);
            setMessages(prev => prev.map(m => m.id === id ? { ...m, isTranslating: false } : m));
        }
    };

    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userText = input.trim();
        setInput('');

        const newMsg: AiMessage = {
            id: messages.length + 1,
            role: 'user',
            content: userText,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        };
        
        setMessages(prev => [...prev, newMsg]);
        setIsLoading(true);

        try {
            const conversationLog = messages.map(m => (m.role === 'user' ? 'Lernende/r: ' : 'Lehrerin: ') + m.content);

            const data = await aiAPI.chatGerman({
                userInput: userText,
                conversationLog,
                topic: 'Chào hỏi cơ bản hằng ngày',
                level: 'A1'
            });

            if (data) {
                
                // Update User message with grammar correction suggestion if provided by AI
                if (data.suggestion && data.suggestion !== '' && data.explanation && data.explanation !== '') {
                    setMessages(prev => {
                        const newArr = [...prev];
                        const currentIdx = newArr.findIndex(m => m.id === newMsg.id);
                        if (currentIdx > -1) {
                            newArr[currentIdx] = {
                                ...newArr[currentIdx],
                                suggestion: {
                                    original: userText,
                                    better: data.suggestion,
                                    reason: data.explanation
                                }
                            };
                        }
                        return newArr;
                    });
                }

                // Push Bot Response
                const botMsgId = Date.now();
                const nextPhrase = data.nextPhrase || "...";
                setMessages(prev => [...prev, {
                    id: botMsgId,
                    role: 'bot',
                    content: nextPhrase,
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
                }]);
                
                // Tự động phát âm
                playText(botMsgId, nextPhrase);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-slate-50 relative">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shrink-0">
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-xl font-black text-slate-800">Trò chuyện hằng ngày</h1>
                        <span className="px-3 py-1 bg-violet-100 text-violet-600 font-bold rounded-full text-xs">Sơ cấp</span>
                    </div>
                    <p className="text-sm font-medium text-slate-500 mt-1">Chào hỏi và trò chuyện ngắn đơn giản.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-slate-100 text-slate-600 font-bold rounded-xl text-sm flex items-center gap-2 hover:bg-slate-200 transition-colors">
                        <Bot className="w-4 h-4" /> Goethe
                    </button>
                    <button className="px-4 py-2 border border-slate-200 text-slate-600 font-bold rounded-xl text-sm hover:bg-slate-50 transition-colors">Đổi chủ đề</button>
                    <button className="px-4 py-2 border border-slate-200 text-slate-600 font-bold rounded-xl text-sm hover:bg-slate-50 transition-colors">1x</button>
                    <button className="px-4 py-2 text-rose-500 font-bold rounded-xl text-sm flex items-center gap-2 hover:bg-rose-50 transition-colors border border-transparent hover:border-rose-100">
                        <AlertCircle className="w-4 h-4" /> Báo lỗi đề
                    </button>
                </div>
            </div>

            {/* Context Prompt */}
            <div className="bg-violet-50 border border-violet-100 mx-6 mt-4 p-3 rounded-xl flex items-center gap-2 shrink-0">
                <div className="p-1.5 bg-violet-100 rounded-lg text-violet-600">
                    <Bot className="w-4 h-4" />
                </div>
                <span className="font-bold text-violet-600 text-sm">Ngữ cảnh:</span>
                <span className="text-slate-600 text-sm font-medium">Bạn đang luyện chào hỏi hằng ngày và trò chuyện cơ bản.</span>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-2">
                {messages.map((msg) => {
                    const isPlaying = playingProps?.id === msg.id;

                    return (
                    <div key={msg.id} className={`flex w-full mb-6 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {/* Bot Avatar */}
                        {msg.role === 'bot' && (
                            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center shrink-0 text-indigo-600 mr-3 shadow-sm border border-indigo-200 mt-auto">
                                <Bot className="w-6 h-6" />
                            </div>
                        )}

                        <div className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} max-w-[80%]`}>
                            {msg.role === 'user' && msg.suggestion && (
                                <div className="bg-violet-600 rounded-[1.5rem] rounded-tr-sm p-1 w-full mb-2 shadow-sm">
                                    <div className="px-4 pt-2 text-white/90 text-[15px] font-medium line-through decoration-rose-400 decoration-2 mb-2">
                                        {msg.suggestion.original}
                                    </div>
                                    <div className="bg-white rounded-[1.2rem] p-4 text-[15px]">
                                        <div className="flex items-center gap-2 text-violet-600 font-bold text-xs uppercase mb-2">
                                            <Lightbulb className="w-4 h-4" /> Gợi ý tự nhiên hơn
                                        </div>
                                        <div className="text-slate-800 font-bold mb-2">
                                            {msg.suggestion.better}
                                        </div>
                                        <ul className="list-disc pl-5 text-[14px] font-medium text-slate-600">
                                            <li>{msg.suggestion.reason}</li>
                                        </ul>
                                    </div>
                                </div>
                            )}

                            <div className={`w-full ${msg.role === 'user' && msg.suggestion ? 'opacity-0 h-0 overflow-hidden m-0 p-0' : ''}`}>
                                <div className={`p-5 rounded-[1.5rem] shadow-sm ${msg.role === 'user' ? 'bg-violet-600 text-white rounded-tr-sm' : 'bg-white border border-slate-200 text-slate-800 rounded-tl-sm'}`}>
                                    <div className={`text-[15px] font-medium leading-relaxed ${msg.role === 'user' ? '' : 'tracking-wide'}`}>
                                        {isPlaying && playingProps ? (
                                            <>
                                                {msg.content.substring(0, playingProps.charIndex)}
                                                <span className="bg-amber-300 text-amber-900 rounded-[4px] px-1 font-bold shadow-sm transition-all duration-150">
                                                    {msg.content.substring(playingProps.charIndex, playingProps.charIndex + playingProps.length)}
                                                </span>
                                                {msg.content.substring(playingProps.charIndex + playingProps.length)}
                                            </>
                                        ) : (
                                            msg.content
                                        )}
                                    </div>
                                    {msg.role === 'bot' && (
                                        <div className="mt-4 pt-4 border-t border-slate-100 space-y-4">
                                            {msg.translation && (
                                                <div className="bg-slate-50 text-slate-700 italic border-l-4 border-indigo-400 p-3 rounded-r-lg text-sm font-medium">
                                                    {msg.translation}
                                                </div>
                                            )}
                                            <div className="flex items-center gap-2">
                                                <button 
                                                    type="button"
                                                    onClick={() => playText(msg.id, msg.content)}
                                                    className={`w-9 h-9 flex items-center justify-center rounded-xl shadow-md transition-colors ${isPlaying ? 'bg-amber-400 text-amber-900 hover:bg-amber-500' : 'bg-violet-600 text-white hover:bg-violet-700'}`}>
                                                    <Volume2 className="w-4 h-4" />
                                                </button>
                                                <button 
                                                    onClick={() => !msg.isTranslating && handleTranslate(msg.id, msg.content)}
                                                    className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-500 text-white shadow-md hover:bg-slate-600 transition-colors disabled:opacity-50">
                                                    {msg.isTranslating ? (
                                                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                                    ) : (
                                                        <Languages className="w-4 h-4" />
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className={`text-[11px] font-bold text-slate-400 mt-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                                    {msg.time}
                                </div>
                            </div>
                        </div>

                        {/* User Avatar */}
                        {msg.role === 'user' && (
                            <div className="w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center shrink-0 text-white ml-3 shadow-sm mt-auto">
                                <User className="w-6 h-6" />
                            </div>
                        )}
                    </div>
                )})}
                <div ref={chatEndRef} />
            </div>

            {/* Suggestion List Overlay if active */}
            {suggestions.length > 0 && (
                <div className="absolute bottom-[80px] left-0 right-0 px-4 z-20 flex justify-center pb-2 pointer-events-none">
                    <div className="bg-white/95 backdrop-blur-md rounded-[1.5rem] shadow-2xl border border-violet-100 p-4 w-full max-w-2xl animate-fade-in-up pointer-events-auto ring-1 ring-black/5">
                        <div className="flex justify-between items-center mb-3 px-2">
                            <h4 className="text-[13px] font-black text-violet-600 flex items-center gap-2 uppercase tracking-wide">
                                <Lightbulb className="w-4 h-4 text-amber-500" /> AI Đề Xuất Trả Lời
                            </h4>
                            <button onClick={() => setSuggestions([])} className="text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-full p-1 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                        <div className="space-y-2">
                            {suggestions.map((sug, i) => (
                                <button
                                    key={i}
                                    onClick={() => {
                                        setInput(sug.german);
                                        setSuggestions([]);
                                    }}
                                    className="w-full text-left p-3 rounded-xl hover:bg-violet-50 transition-colors group border border-transparent hover:border-violet-100 block"
                                >
                                    <div className="font-bold text-slate-800 text-[15px] group-hover:text-violet-700 transition-colors">
                                        {sug.german}
                                    </div>
                                    <div className="text-sm font-medium text-slate-500 mt-0.5">
                                        {sug.vietnamese}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Input Bar */}
            <div className="bg-white border-t border-slate-200 p-4 shrink-0">
                <form onSubmit={handleSend} className="max-w-4xl mx-auto flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-[2rem] p-2 pr-3 relative">
                    <button type="button" className="w-12 h-12 flex items-center justify-center rounded-full text-slate-400 hover:text-violet-600 hover:bg-violet-50 transition-colors">
                        <Mic className="w-6 h-6" />
                    </button>
                    <input 
                        type="text" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Nhập tin nhắn bằng tiếng Đức..." 
                        className="flex-1 bg-transparent border-none outline-none text-slate-800 font-medium placeholder:text-slate-400"
                    />
                    
                    {/* Add Suggestion Button */}
                    <button 
                        type="button"
                        onClick={handleSuggest}
                        disabled={isSuggesting || isLoading}
                        title="Đề xuất câu trả lời"
                        className="w-10 h-10 flex items-center justify-center rounded-full text-amber-500 hover:bg-amber-50 transition-colors disabled:opacity-50"
                    >
                        {isSuggesting ? (
                            <span className="w-4 h-4 border-2 border-slate-200 border-t-amber-500 rounded-full animate-spin"></span>
                        ) : (
                            <Lightbulb className="w-5 h-5" />
                        )}
                    </button>

                    <button 
                        type="submit"
                        disabled={!input.trim()}
                        className="w-12 h-12 flex items-center justify-center rounded-full bg-violet-600 text-white hover:bg-violet-700 transition-colors disabled:opacity-50 disabled:hover:bg-violet-600 shadow-md"
                    >
                        <Send className="w-5 h-5 ml-1" />
                    </button>
                </form>
            </div>
        </div>
    );
}

// Add simple CSS animation to the file
const styles = `
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up {
  animation: fadeInUp 0.3s ease-out forwards;
}
`;
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}
