'use client';

import { Mic, PhoneOff, Settings2, Ear, Activity, CircleDashed } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function LiveTalkPage() {
    const [status, setStatus] = useState<'idle' | 'listening' | 'speaking'>('idle');
    const [transcript, setTranscript] = useState('Guten Tag! Wie kann ich dir heute helfen?');

    // Simulate AI conversation states
    useEffect(() => {
        let timer1: any, timer2: any;
        if (status === 'listening') {
            setTranscript('...');
            timer1 = setTimeout(() => {
                setTranscript('Ich möchte Deutsch üben.');
                timer2 = setTimeout(() => {
                    setStatus('speaking');
                    setTranscript('Sehr gerne! Worüber möchtest du sprechen?');
                }, 1500);
            }, 2000);
        } else if (status === 'speaking') {
            timer1 = setTimeout(() => {
                setStatus('idle');
            }, 3000);
        }
        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, [status]);

    return (
        <div className="flex flex-col h-screen bg-slate-900 overflow-hidden relative">
            {/* Background elements */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pink-500/10 rounded-full blur-[120px] transition-opacity duration-1000 ${status !== 'idle' ? 'opacity-100' : 'opacity-30'}`} />
            
            {/* Header */}
            <div className="absolute top-0 left-0 w-full p-6 flex items-center justify-between z-10">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-rose-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(244,63,94,0.8)]" />
                    <span className="text-white font-bold tracking-widest text-sm uppercase">Live Session</span>
                </div>
                <button className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors backdrop-blur-md">
                    <Settings2 className="w-5 h-5" />
                </button>
            </div>

            {/* Central Circle Visuals */}
            <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-6">
                
                <div className="relative flex items-center justify-center mb-16">
                    {/* Ring Animations */}
                    {status === 'speaking' && (
                        <>
                            <div className="absolute w-[200px] h-[200px] rounded-full border border-pink-400/30 animate-[ping_2s_ease-in-out_infinite]" />
                            <div className="absolute w-[300px] h-[300px] rounded-full border border-pink-400/20 animate-[ping_2.5s_ease-in-out_infinite]" />
                        </>
                    )}
                    {status === 'listening' && (
                        <CircleDashed className="absolute w-[180px] h-[180px] text-white/20 animate-[spin_4s_linear_infinite]" />
                    )}

                    {/* AI Avatar / Center Node */}
                    <div className={`w-32 h-32 rounded-full flex items-center justify-center shadow-2xl relative z-10 transition-all duration-500 ${status === 'speaking' ? 'bg-gradient-to-tr from-pink-500 to-rose-400 scale-110 shadow-pink-500/50' : 'bg-slate-800 border-4 border-slate-700'}`}>
                        {status === 'speaking' ? <Activity className="w-12 h-12 text-white animate-pulse" /> : <Ear className="w-12 h-12 text-slate-500" />}
                    </div>
                </div>

                {/* Status Text & Transcript */}
                <div className="text-center max-w-2xl h-32">
                    <p className={`text-sm font-bold tracking-widest uppercase mb-4 transition-colors ${status === 'listening' ? 'text-blue-400' : status === 'speaking' ? 'text-pink-400' : 'text-slate-500'}`}>
                        {status === 'listening' ? "Đang nghe bạn nói..." : status === 'speaking' ? "Anna đang trả lời..." : "Sẵn sàng giao tiếp"}
                    </p>
                    <p className="text-2xl md:text-3xl font-medium text-white/90 leading-relaxed font-sans">
                        {transcript}
                    </p>
                </div>
            </div>

            {/* Bottom Controls */}
            <div className="mb-12 flex items-center justify-center gap-8 relative z-10">
                <button 
                    onClick={() => setStatus(status === 'listening' ? 'idle' : 'listening')}
                    className={`w-20 h-20 rounded-full flex items-center justify-center shadow-xl transition-all ${status === 'listening' ? 'bg-white text-slate-900 scale-110' : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-md border border-white/10'}`}
                >
                    <Mic className={`w-8 h-8 ${status === 'listening' ? 'animate-bounce' : ''}`} />
                </button>

                <button 
                    className="w-16 h-16 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center shadow-lg transition-all"
                >
                    <PhoneOff className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
}
