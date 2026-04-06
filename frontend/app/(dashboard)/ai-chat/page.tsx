'use client';

import { Bot, Send, Mic, Volume2, Languages, Lightbulb, AlertCircle } from 'lucide-react';
import { useState } from 'react';

export default function AiChatPage() {
    const [messages, setMessages] = useState<any[]>([
        {
            id: 1,
            role: 'bot',
            content: 'Hallo! Mein Name ist Anna, ich bin deine Deutschlehrerin. Wie geht es dir?',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        }
    ]);

    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userText = input.trim();
        setInput('');

        const newMsg: any = {
            id: messages.length + 1,
            role: 'user',
            content: userText,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        };
        
        setMessages(prev => [...prev, newMsg]);
        setIsLoading(true);

        try {
            const conversationLog = messages.map(m => (m.role === 'user' ? 'Lernende/r: ' : 'Lehrerin: ') + m.content);

            const res = await fetch('http://localhost:3054/api/v1/ai/chat/german', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userInput: userText,
                    conversationLog,
                    topic: 'Chào hỏi cơ bản hằng ngày',
                    level: 'A1'
                })
            });

            if (res.ok) {
                const data = await res.json();
                
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
                setMessages(prev => [...prev, {
                    id: Date.now(),
                    role: 'bot',
                    content: data.nextPhrase || "...",
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
                }]);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-slate-50">
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
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                        {msg.role === 'user' && msg.suggestion && (
                            <div className="bg-violet-600 rounded-[1.5rem] rounded-tr-sm p-1 max-w-[80%] mb-2 shadow-sm">
                                <div className="px-4 pt-2 text-white/90 text-sm font-medium line-through decoration-rose-400 decoration-2 mb-2">
                                    {msg.suggestion.original}
                                </div>
                                <div className="bg-white rounded-[1.2rem] p-5">
                                    <div className="flex items-center gap-2 text-violet-600 font-black text-xs uppercase mb-3">
                                        <Lightbulb className="w-4 h-4" /> Gợi ý tự nhiên hơn
                                    </div>
                                    <div className="text-slate-800 font-bold text-lg mb-3">
                                        {msg.suggestion.better}
                                    </div>
                                    <ul className="list-disc pl-5 text-sm font-medium text-slate-600">
                                        <li>{msg.suggestion.reason}</li>
                                    </ul>
                                </div>
                            </div>
                        )}

                        <div className={`max-w-[80%] ${msg.role === 'user' && msg.suggestion ? 'opacity-0 h-0 w-0 overflow-hidden m-0 p-0' : ''}`}>
                            <div className={`p-5 rounded-[1.5rem] shadow-sm ${msg.role === 'user' ? 'bg-violet-600 text-white rounded-tr-sm' : 'bg-white border border-slate-200 text-slate-800 rounded-tl-sm'}`}>
                                <div className={`text-[15px] font-medium leading-relaxed ${msg.role === 'user' ? '' : 'tracking-wide'}`}>
                                    {msg.content}
                                </div>
                                {msg.role === 'bot' && (
                                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100">
                                        <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-violet-600 text-white shadow-md hover:bg-violet-700 transition-colors">
                                            <Volume2 className="w-4 h-4" />
                                        </button>
                                        <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-500 text-white shadow-md hover:bg-slate-600 transition-colors">
                                            <Languages className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className={`text-[11px] font-bold text-slate-400 mt-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                                {msg.time}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Input Bar */}
            <div className="bg-white border-t border-slate-200 p-4 shrink-0">
                <form onSubmit={handleSend} className="max-w-4xl mx-auto flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-[2rem] p-2 pr-3">
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
