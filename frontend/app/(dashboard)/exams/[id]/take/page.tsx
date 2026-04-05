'use client';

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
    Clock, 
    ChevronLeft, 
    ChevronRight, 
    Play, 
    Pause, 
    CheckCircle2, 
    AlertCircle,
    Send,
    Volume2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { examsAPI } from "@/lib/api";

type QuestionType = 'CHOICE' | 'FILL' | 'LISTENING';

interface Question {
    id: string;
    type: QuestionType;
    question: string;
    audioUrl?: string;
    options?: string[];
    correctAnswer: string;
}

interface Exam {
    id: string;
    title: string;
    duration: number;
    questions: Question[];
}

export default function ExamTakePage() {
    const params = useParams();
    const router = useRouter();
    const [exam, setExam] = useState<Exam | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [timeLeft, setTimeLeft] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isPlayingAudio, setIsPlayingAudio] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const fetchExam = async () => {
            try {
                const data = await examsAPI.getOne(params.id as string);
                setExam(data);
                setTimeLeft(data.duration * 60);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch exam", error);
                router.push('/exams');
            }
        };
        fetchExam();
    }, [params.id, router]);

    useEffect(() => {
        if (timeLeft <= 0 || loading) return;
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleSubmit();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft, loading]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleAnswerChange = (questionId: string, value: string) => {
        setAnswers(prev => ({ ...prev, [questionId]: value }));
    };

    const handleSubmit = async () => {
        if (!exam || isSubmitting) return;
        setIsSubmitting(true);
        try {
            await examsAPI.submit(exam.id, answers);
            router.push(`/exams/${exam.id}/result`);
        } catch (error) {
            console.error("Submission failed", error);
            setIsSubmitting(false);
        }
    };

    const toggleAudio = () => {
        if (!audioRef.current) return;
        if (isPlayingAudio) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlayingAudio(!isPlayingAudio);
    };

    if (loading || !exam) return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-[#C53030] border-t-transparent rounded-full"
            />
        </div>
    );

    const currentQuestion = exam.questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / exam.questions.length) * 100;

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
            {/* Exam Header */}
            <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-2xl border-b border-slate-200/50">
                <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-lg">
                            <Clock className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-lg font-black text-slate-900 leading-none mb-1">{exam.title}</h1>
                            <p className={`text-sm font-bold ${timeLeft < 300 ? 'text-red-500 animate-pulse' : 'text-slate-400'}`}>
                                {formatTime(timeLeft)} cn li
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="px-6 py-3 bg-[#C53030] text-white rounded-2xl font-black flex items-center gap-2 hover:bg-[#A12727] transition-all shadow-lg active:scale-95 disabled:opacity-50"
                    >
                        <Send className="w-4 h-4" />
                        Np bi
                    </button>
                </div>
                {/* Progress Bar */}
                <div className="h-1.5 w-full bg-slate-100">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="h-full bg-[#C53030]"
                    />
                </div>
            </div>

            <main className="flex-1 container mx-auto px-6 py-12 max-w-4xl">
                <div className="mb-12 flex items-center justify-between">
                    <h2 className="text-3xl font-black text-slate-900">
                        Cu hi {currentQuestionIndex + 1}
                        <span className="text-slate-300 text-xl font-medium ml-3">/ {exam.questions.length}</span>
                    </h2>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentQuestion.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="bg-white rounded-[2.5rem] p-8 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-100"
                    >
                        {/* Question Content */}
                        <div className="mb-10">
                            {currentQuestion.type === 'LISTENING' && currentQuestion.audioUrl && (
                                <div className="mb-8 p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-center gap-6">
                                    <button
                                        onClick={toggleAudio}
                                        className="w-16 h-16 rounded-full bg-[#C53030] text-white flex items-center justify-center hover:scale-105 transition-all shadow-lg active:scale-95"
                                    >
                                        {isPlayingAudio ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                                    </button>
                                    <div>
                                        <p className="font-black text-slate-900 mb-1">Nghe on hi thoi</p>
                                        <p className="text-sm text-slate-400 font-medium">Click  pht m thanh</p>
                                    </div>
                                    <audio 
                                        ref={audioRef} 
                                        src={currentQuestion.audioUrl} 
                                        onEnded={() => setIsPlayingAudio(false)}
                                        className="hidden" 
                                    />
                                </div>
                            )}
                            <div className="text-2xl font-bold text-slate-800 leading-relaxed">
                                {currentQuestion.question}
                            </div>
                        </div>

                        {/* Answers Area */}
                        <div className="space-y-4">
                            {currentQuestion.type === 'CHOICE' || currentQuestion.type === 'LISTENING' ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {currentQuestion.options?.map((option, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleAnswerChange(currentQuestion.id, option)}
                                            className={`group p-6 rounded-3xl border-2 text-left transition-all relative overflow-hidden ${
                                                answers[currentQuestion.id] === option
                                                ? "border-[#C53030] bg-[#C53030]/5 text-[#C53030]"
                                                : "border-slate-100 hover:border-slate-200 text-slate-600"
                                            }`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm border-2 transition-all ${
                                                    answers[currentQuestion.id] === option
                                                    ? "bg-[#C53030] border-[#C53030] text-white"
                                                    : "bg-slate-50 border-slate-100 text-slate-400 group-hover:bg-slate-100"
                                                }`}>
                                                    {String.fromCharCode(65 + idx)}
                                                </div>
                                                <span className="font-bold text-lg">{option}</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Nhp p n ca bn..."
                                        value={answers[currentQuestion.id] || ''}
                                        onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                                        className="w-full p-8 bg-slate-50 border-4 border-slate-100 rounded-3xl text-xl font-bold text-slate-900 focus:outline-none focus:border-[#C53030]/30 transition-all"
                                    />
                                    <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-20">
                                        <AlertCircle className="w-8 h-8" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="mt-12 flex items-center justify-between">
                    <button
                        onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                        disabled={currentQuestionIndex === 0}
                        className="px-8 py-4 bg-white border border-slate-100 text-slate-600 rounded-2xl font-black flex items-center gap-3 hover:bg-slate-900 hover:text-white transition-all shadow-xl shadow-slate-200/50 disabled:opacity-30 disabled:pointer-events-none active:scale-95"
                    >
                        <ChevronLeft className="w-5 h-5" />
                        Trc
                    </button>
                    
                    <button
                        onClick={() => setCurrentQuestionIndex(prev => Math.min(exam.questions.length - 1, prev + 1))}
                        disabled={currentQuestionIndex === exam.questions.length - 1}
                        className="px-8 py-4 bg-white border border-slate-100 text-slate-600 rounded-2xl font-black flex items-center gap-3 hover:bg-slate-900 hover:text-white transition-all shadow-xl shadow-slate-200/50 disabled:opacity-30 disabled:pointer-events-none active:scale-95"
                    >
                        Sau
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </main>

            {/* Questions Grid (Quick Nav) */}
            <div className="bg-white border-t border-slate-200/50 p-6">
                <div className="container mx-auto max-w-4xl">
                    <div className="flex flex-wrap gap-2 justify-center">
                        {exam.questions.map((q, idx) => (
                            <button
                                key={q.id}
                                onClick={() => setCurrentQuestionIndex(idx)}
                                className={`w-10 h-10 rounded-xl font-bold text-sm transition-all flex items-center justify-center border-2 ${
                                    currentQuestionIndex === idx
                                    ? "bg-slate-900 border-slate-900 text-white shadow-lg scale-110"
                                    : answers[q.id]
                                    ? "bg-emerald-50 border-emerald-500 text-emerald-600"
                                    : "bg-slate-50 border-slate-100 text-slate-400 hover:border-slate-300"
                                }`}
                            >
                                {idx + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
