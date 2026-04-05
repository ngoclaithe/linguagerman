'use client';

import { useEffect, useState, useRef, use } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    Clock,
    CheckCircle,
    XCircle,
    AlertCircle,
    Trophy,
    RotateCcw,
    Check,
    Play,
    Pause,
    FileText,
    Shield,
    Timer,
    Send,
    Volume2,
    Type,
    HelpCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { examsAPI, getImageUrl } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/toast";

export default function ExamSessionPage({ params }: { params: Promise<{ id: string }> }) {
    const { id: examId } = use(params);
    const toast = useToast();
    const router = useRouter();
    const [exam, setExam] = useState<any>(null);
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<{
        [key: string]: string;
    }>({});
    const [showResults, setShowResults] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Timer & start state
    const [examStarted, setExamStarted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const hasAutoSubmitted = useRef(false);

    // Audio
    const [isPlayingAudio, setIsPlayingAudio] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // --- LocalStorage helpers ---
    const STORAGE_KEY = `exam_session_${examId}`;

    const saveSession = (data: { answers: Record<string, string>; questionIdx: number; startedAt: number }) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        }
    };

    const loadSession = (): { answers: Record<string, string>; questionIdx: number; startedAt: number } | null => {
        if (typeof window === 'undefined') return null;
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return null;
            return JSON.parse(raw);
        } catch { return null; }
    };

    const clearSession = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(STORAGE_KEY);
        }
    };

    // --- Fetch exam & restore session ---
    useEffect(() => {
        const fetchExam = async () => {
            try {
                const data = await examsAPI.getOne(examId);
                setExam(data);

                const durationSec = (data.duration || 60) * 60;
                const saved = loadSession();

                if (saved && saved.startedAt) {
                    // Restore session
                    const elapsed = Math.floor((Date.now() - saved.startedAt) / 1000);
                    const remaining = Math.max(0, durationSec - elapsed);

                    if (remaining > 0) {
                        // Session still valid
                        setSelectedAnswers(saved.answers || {});
                        setCurrentQuestionIdx(saved.questionIdx || 0);
                        setTimeLeft(remaining);
                        setExamStarted(true);
                    } else {
                        // Time expired while away
                        clearSession();
                        setTimeLeft(durationSec);
                    }
                } else {
                    setTimeLeft(durationSec);
                }
            } catch (error) {
                console.error("Failed to fetch exam", error);
            } finally {
                setLoading(false);
            }
        };
        fetchExam();
    }, [examId]);

    // --- Persist answers & question index to localStorage ---
    useEffect(() => {
        if (!examStarted || showResults) return;
        const saved = loadSession();
        if (saved) {
            saveSession({ ...saved, answers: selectedAnswers, questionIdx: currentQuestionIdx });
        }
    }, [selectedAnswers, currentQuestionIdx, examStarted, showResults]);

    // --- Countdown timer ---
    useEffect(() => {
        if (!examStarted || showResults) return;

        timerRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    if (timerRef.current) clearInterval(timerRef.current);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [examStarted, showResults]);

    // Auto-submit when time = 0
    useEffect(() => {
        if (timeLeft === 0 && examStarted && !showResults && !hasAutoSubmitted.current) {
            hasAutoSubmitted.current = true;
            toast.error(" Ht gi! Bi thi  c t ng np.");
            handleSubmitInternal();
        }
    }, [timeLeft, examStarted, showResults]);

    // Stop audio when changing question
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setIsPlayingAudio(false);
        }
    }, [currentQuestionIdx]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const getTimeColor = () => {
        if (!exam) return '';
        const totalSeconds = (exam.duration || 60) * 60;
        const percentLeft = timeLeft / totalSeconds;
        if (percentLeft <= 0.1) return 'text-red-600 animate-pulse';
        if (percentLeft <= 0.25) return 'text-red-500';
        if (percentLeft <= 0.5) return 'text-amber-500';
        return 'text-emerald-600';
    };

    const getTimeBgColor = () => {
        if (!exam) return '';
        const totalSeconds = (exam.duration || 60) * 60;
        const percentLeft = timeLeft / totalSeconds;
        if (percentLeft <= 0.1) return 'bg-red-50 border-red-200';
        if (percentLeft <= 0.25) return 'bg-red-50 border-red-100';
        if (percentLeft <= 0.5) return 'bg-amber-50 border-amber-100';
        return 'bg-emerald-50 border-emerald-100';
    };

    const handleStartExam = () => {
        const startedAt = Date.now();
        saveSession({ answers: {}, questionIdx: 0, startedAt });
        setExamStarted(true);
        hasAutoSubmitted.current = false;
    };

    const toggleAudio = (audioUrl: string) => {
        if (!audioRef.current) {
            audioRef.current = new Audio(getImageUrl(audioUrl) || audioUrl);
            audioRef.current.onended = () => setIsPlayingAudio(false);
        }

        if (isPlayingAudio) {
            audioRef.current.pause();
        } else {
            audioRef.current.src = getImageUrl(audioUrl) || audioUrl;
            audioRef.current.play();
        }
        setIsPlayingAudio(!isPlayingAudio);
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-[#C53030] border-t-transparent rounded-full"
            />
        </div>
    );
    if (!exam) return <div>Khng tm thy  thi.</div>;

    const questions = exam.questions.map((q: any) => ({
        ...q,
        options: Array.isArray(q.options) ? q.options : (typeof q.options === 'string' ? JSON.parse(q.options) : [])
    }));

    const currentQuestion = questions[currentQuestionIdx];
    const questionType = currentQuestion?.type || 'CHOICE';

    const handleSelectAnswer = (questionId: string, value: string) => {
        setSelectedAnswers(prev => ({
            ...prev,
            [questionId]: value,
        }));
        // Auto-advance for CHOICE/LISTENING only
        if ((questionType === 'CHOICE' || questionType === 'LISTENING') && currentQuestionIdx < questions.length - 1) {
            setTimeout(() => {
                handleNext();
            }, 400);
        }
    };

    const handleFillAnswer = (questionId: string, value: string) => {
        setSelectedAnswers(prev => ({
            ...prev,
            [questionId]: value,
        }));
    };

    const handleNext = () => {
        if (currentQuestionIdx < questions.length - 1) {
            setCurrentQuestionIdx(currentQuestionIdx + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIdx > 0) {
            setCurrentQuestionIdx(currentQuestionIdx - 1);
        }
    };

    const handleSubmitInternal = async () => {
        setSubmitting(true);
        if (timerRef.current) clearInterval(timerRef.current);
        clearSession(); // Clear saved session on submit
        try {
            await examsAPI.submit(examId, selectedAnswers);
            setShowResults(true);
            window.scrollTo({ top: 0, behavior: "smooth" });
        } catch (error) {
            console.error("Failed to submit", error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleSubmit = async () => {
        const answeredCount = Object.keys(selectedAnswers).filter(k => selectedAnswers[k]?.trim()).length;
        if (answeredCount < questions.length) {
            const confirmed = window.confirm(
                `Bn mi tr li ${answeredCount}/${questions.length} cu. Bn c mun np bi khng?`
            );
            if (!confirmed) return;
        }
        handleSubmitInternal();
    };

    const calculateScore = () => {
        let correct = 0;
        questions.forEach((q: any) => {
            const userAnswer = (selectedAnswers[q.id] || '').trim();
            const correctAnswer = (q.correctAnswer || '').trim();

            if (q.type === 'FILL') {
                if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
                    correct++;
                }
            } else {
                if (userAnswer === correctAnswer) {
                    correct++;
                }
            }
        });
        const percentage = Math.round((correct / questions.length) * 100);
        return { correct, total: questions.length, score: percentage, percentage };
    };

    const score = showResults ? calculateScore() : null;
    const progressPercentage = ((currentQuestionIdx + 1) / questions.length) * 100;
    const timeProgress = exam ? (timeLeft / ((exam.duration || 60) * 60)) * 100 : 100;

    const getQuestionTypeIcon = (type: string) => {
        switch (type) {
            case 'FILL': return <Type className="w-4 h-4" />;
            case 'LISTENING': return <Volume2 className="w-4 h-4" />;
            default: return <HelpCircle className="w-4 h-4" />;
        }
    };

    const getQuestionTypeLabel = (type: string) => {
        switch (type) {
            case 'FILL': return 'in t';
            case 'LISTENING': return 'Nghe';
            default: return 'Trc nghim';
        }
    };

    // ================================================================
    // PRE-EXAM START SCREEN
    // ================================================================
    if (!examStarted) {
        const questionTypeCounts = questions.reduce((acc: any, q: any) => {
            acc[q.type] = (acc[q.type] || 0) + 1;
            return acc;
        }, {});

        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans px-4 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full max-w-lg"
                >
                    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden">
                        {/* Header gradient */}
                        <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-[#C53030] px-8 pt-10 pb-12 text-center">
                            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50"></div>
                            <motion.div
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                className="relative"
                            >
                                <div className="w-20 h-20 rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center mx-auto mb-5 shadow-2xl">
                                    <FileText className="w-10 h-10 text-white" />
                                </div>
                                <h1 className="text-2xl font-black text-white mb-2 tracking-tight">{exam.title}</h1>
                                {exam.level && (
                                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold text-white/90 uppercase tracking-wider">
                                        {exam.level}
                                    </span>
                                )}
                            </motion.div>
                        </div>

                        {/* Exam info */}
                        <div className="px-8 py-8">
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <motion.div initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
                                    className="p-5 bg-blue-50 rounded-2xl border border-blue-100 text-center">
                                    <Clock className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                                    <div className="text-2xl font-black text-blue-700">{exam.duration || 60}</div>
                                    <div className="text-xs font-bold text-blue-400 uppercase tracking-wider">Pht</div>
                                </motion.div>
                                <motion.div initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
                                    className="p-5 bg-rose-50 rounded-2xl border border-rose-100 text-center">
                                    <FileText className="w-6 h-6 text-[#C53030] mx-auto mb-2" />
                                    <div className="text-2xl font-black text-[#C53030]">{questions.length}</div>
                                    <div className="text-xs font-bold text-rose-400 uppercase tracking-wider">Cu hi</div>
                                </motion.div>
                            </div>

                            {/* Question type breakdown */}
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
                                className="flex gap-2 mb-6 flex-wrap">
                                {questionTypeCounts['CHOICE'] && (
                                    <span className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-bold border border-indigo-100">
                                        <HelpCircle className="w-3.5 h-3.5" /> {questionTypeCounts['CHOICE']} Trc nghim
                                    </span>
                                )}
                                {questionTypeCounts['FILL'] && (
                                    <span className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-bold border border-emerald-100">
                                        <Type className="w-3.5 h-3.5" /> {questionTypeCounts['FILL']} in t
                                    </span>
                                )}
                                {questionTypeCounts['LISTENING'] && (
                                    <span className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-600 rounded-lg text-xs font-bold border border-amber-100">
                                        <Volume2 className="w-3.5 h-3.5" /> {questionTypeCounts['LISTENING']} Bi nghe
                                    </span>
                                )}
                            </motion.div>

                            {/* Rules */}
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                                className="bg-amber-50 border border-amber-100 rounded-2xl p-5 mb-8">
                                <div className="flex items-center gap-2 mb-3">
                                    <Shield className="w-4 h-4 text-amber-600" />
                                    <span className="text-sm font-bold text-amber-700">Lu  trc khi thi</span>
                                </div>
                                <ul className="space-y-2 text-sm text-amber-800/80 font-medium">
                                    <li className="flex items-start gap-2">
                                        <span className="mt-1 w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"></span>
                                        Thi gian s bt u m ngc khi bn bm &quot;Bt u&quot;
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="mt-1 w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"></span>
                                        Bi thi s t ng np khi ht thi gian
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="mt-1 w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"></span>
                                        Bn c th quay li cu hi trc  bt c lc no
                                    </li>
                                </ul>
                            </motion.div>

                            {/* Start button */}
                            <motion.button
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleStartExam}
                                className="w-full flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-slate-900 to-[#C53030] px-8 py-5 font-black text-lg text-white shadow-2xl shadow-slate-900/30 hover:shadow-[#C53030]/30 transition-shadow duration-500"
                            >
                                <Play className="w-6 h-6 fill-current" />
                                Bt u lm bi
                            </motion.button>

                            <Link href="/exam" className="block text-center mt-4 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors">
                                 Quay li danh sch  thi
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        );
    }

    // ================================================================
    // QUESTION RENDERERS
    // ================================================================
    const renderChoiceQuestion = (q: any) => (
        <div className="space-y-4">
            {q.options?.map((option: string, optionIndex: number) => {
                const isSelected = selectedAnswers[q.id] === option;
                return (
                    <button
                        key={optionIndex}
                        onClick={() => handleSelectAnswer(q.id, option)}
                        className={`group flex w-full items-center gap-5 rounded-2xl border-2 p-5 text-left transition-all duration-300 ${isSelected
                            ? "border-[#C53030] bg-rose-50 shadow-md shadow-[#C53030]/10"
                            : "border-slate-100 hover:border-[#C53030]/50 hover:bg-slate-50"
                            }`}
                    >
                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-bold transition-colors ${isSelected
                            ? "bg-[#C53030] text-white"
                            : "bg-slate-100 text-slate-500 group-hover:bg-rose-100 group-hover:text-[#C53030]"
                            }`}>
                            {isSelected ? <Check className="w-5 h-5" /> : String.fromCharCode(65 + optionIndex)}
                        </div>
                        <span className={`flex-1 text-lg font-medium transition-colors ${isSelected ? "text-[#C53030]" : "text-slate-700"}`}>
                            {option}
                        </span>
                    </button>
                );
            })}
        </div>
    );

    const renderFillQuestion = (q: any) => (
        <div className="space-y-4">
            <div className="relative">
                <input
                    type="text"
                    placeholder="Nhp p n ca bn..."
                    value={selectedAnswers[q.id] || ''}
                    onChange={(e) => handleFillAnswer(q.id, e.target.value)}
                    className="w-full p-6 bg-slate-50 border-2 border-slate-200 rounded-2xl text-xl font-bold text-slate-900 focus:outline-none focus:border-[#C53030]/50 focus:bg-white transition-all placeholder:text-slate-300 placeholder:font-medium"
                    autoComplete="off"
                />
                {selectedAnswers[q.id] && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        <CheckCircle className="w-6 h-6 text-emerald-400" />
                    </div>
                )}
            </div>
            <p className="text-sm text-slate-400 font-medium flex items-center gap-2">
                <Type className="w-4 h-4" />
                G cu tr li bng ting Nht hoc romaji
            </p>
        </div>
    );

    const renderListeningQuestion = (q: any) => (
        <div className="space-y-6">
            {/* Audio player */}
            {q.audioUrl && (
                <div className="p-5 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl border border-indigo-100 flex items-center gap-5">
                    <button
                        onClick={() => toggleAudio(q.audioUrl)}
                        className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 text-white flex items-center justify-center hover:scale-105 transition-all shadow-lg shadow-indigo-200 active:scale-95"
                    >
                        {isPlayingAudio ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
                    </button>
                    <div>
                        <p className="font-bold text-indigo-900 mb-0.5">Nghe on hi thoi</p>
                        <p className="text-xs text-indigo-400 font-medium">
                            {isPlayingAudio ? 'ang pht...' : 'Click  pht m thanh'}
                        </p>
                    </div>
                </div>
            )}

            {/* Options */}
            {q.options?.length > 0 && (
                <div className="space-y-3">
                    {q.options.map((option: string, optionIndex: number) => {
                        const isSelected = selectedAnswers[q.id] === option;
                        return (
                            <button
                                key={optionIndex}
                                onClick={() => handleSelectAnswer(q.id, option)}
                                className={`group flex w-full items-center gap-5 rounded-2xl border-2 p-5 text-left transition-all duration-300 ${isSelected
                                    ? "border-indigo-500 bg-indigo-50 shadow-md shadow-indigo-500/10"
                                    : "border-slate-100 hover:border-indigo-300 hover:bg-slate-50"
                                    }`}
                            >
                                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-bold transition-colors ${isSelected
                                    ? "bg-indigo-500 text-white"
                                    : "bg-slate-100 text-slate-500 group-hover:bg-indigo-100 group-hover:text-indigo-600"
                                    }`}>
                                    {isSelected ? <Check className="w-5 h-5" /> : String.fromCharCode(65 + optionIndex)}
                                </div>
                                <span className={`flex-1 text-lg font-medium transition-colors ${isSelected ? "text-indigo-700" : "text-slate-700"}`}>
                                    {option}
                                </span>
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );

    // ================================================================
    // EXAM IN PROGRESS
    // ================================================================
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
            {/* Sub-Header with countdown */}
            <div className="sticky top-[76px] z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm transition-all">
                <div className="container mx-auto px-4 lg:px-8 py-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-slate-400">{exam.title}</span>
                        <span className="text-xs font-bold text-slate-300">|</span>
                        <span className="text-sm font-medium text-slate-400">
                            {Object.keys(selectedAnswers).filter(k => selectedAnswers[k]?.trim()).length}/{questions.length}  tr li
                        </span>
                    </div>
                    {!showResults && (
                        <div className={`flex items-center gap-2.5 px-4 py-2 rounded-full font-bold text-sm border transition-all ${getTimeBgColor()} ${getTimeColor()}`}>
                            <Timer className="w-4 h-4" />
                            <span className="font-mono text-base tracking-wider">{formatTime(timeLeft)}</span>
                        </div>
                    )}
                </div>
                {!showResults && (
                    <div className="h-1 w-full bg-slate-100">
                        <motion.div
                            className={`h-full transition-colors duration-1000 ${
                                timeProgress <= 10 ? 'bg-red-500' :
                                timeProgress <= 25 ? 'bg-red-400' :
                                timeProgress <= 50 ? 'bg-amber-400' :
                                'bg-emerald-500'
                            }`}
                            initial={{ width: '100%' }}
                            animate={{ width: `${timeProgress}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                )}
            </div>

            <div className="flex-1 container mx-auto px-4 py-8 lg:py-12">
                <div className="mx-auto max-w-3xl">
                    {!showResults ? (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="mb-8 relative z-10 text-center">
                                <span className="inline-block px-3 py-1 bg-white border border-slate-200 shadow-sm rounded-full text-xs font-bold text-slate-400 tracking-wider uppercase mb-4">
                                    {exam.level} | {exam.title}
                                </span>
                                <h1 className="text-3xl lg:text-4xl font-black text-slate-900 mb-6 tracking-tight">
                                    ang lm <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C53030] to-rose-400">bi thi</span>
                                </h1>

                                <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col gap-3">
                                    <div className="flex items-center justify-between text-sm font-bold text-slate-700">
                                        <div className="flex items-center gap-2">
                                            <span>Cu {currentQuestionIdx + 1} / {questions.length}</span>
                                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                                                questionType === 'FILL' ? 'bg-emerald-100 text-emerald-600' :
                                                questionType === 'LISTENING' ? 'bg-indigo-100 text-indigo-600' :
                                                'bg-slate-100 text-slate-500'
                                            }`}>
                                                {getQuestionTypeIcon(questionType)}
                                                {getQuestionTypeLabel(questionType)}
                                            </span>
                                        </div>
                                        <span className="text-slate-400 font-medium">
                                             chn: {Object.keys(selectedAnswers).filter(k => selectedAnswers[k]?.trim()).length}/{questions.length}
                                        </span>
                                    </div>
                                    <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
                                        <motion.div
                                            className="h-full rounded-full bg-gradient-to-r from-[#C53030] to-rose-400"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${progressPercentage}%` }}
                                            transition={{ duration: 0.5 }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentQuestionIdx}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="mb-8 rounded-[2rem] border border-slate-100 bg-white p-6 md:p-10 shadow-xl shadow-slate-200/50"
                                >
                                    <div className="mb-8">
                                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 leading-snug">
                                            {currentQuestion.question}
                                        </h2>
                                    </div>

                                    {/* Render based on question type */}
                                    {questionType === 'FILL' && renderFillQuestion(currentQuestion)}
                                    {questionType === 'LISTENING' && renderListeningQuestion(currentQuestion)}
                                    {questionType === 'CHOICE' && renderChoiceQuestion(currentQuestion)}
                                </motion.div>
                            </AnimatePresence>

                            <div className="flex items-center justify-between">
                                <button
                                    onClick={handlePrevious}
                                    disabled={currentQuestionIdx === 0}
                                    className="rounded-xl border border-slate-200 bg-white px-6 py-3.5 font-bold text-slate-600 shadow-sm hover:bg-slate-50 hover:text-slate-900 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    Cu trc 
                                </button>

                                {currentQuestionIdx === questions.length - 1 ? (
                                    <button
                                        onClick={handleSubmit}
                                        disabled={submitting}
                                        className="rounded-xl bg-slate-900 px-8 py-3.5 font-bold text-white shadow-xl shadow-slate-200 hover:bg-[#C53030] hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
                                    >
                                        <Send className="w-4 h-4" />
                                        {submitting ? "ang np..." : "Np bi thi"}
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleNext}
                                        className="rounded-xl bg-white border border-slate-200 px-8 py-3.5 font-bold text-slate-900 shadow-sm hover:border-[#C53030] hover:text-[#C53030] hover:bg-rose-50 transition-all duration-300"
                                    >
                                        Tip tc
                                    </button>
                                )}
                            </div>

                            {/* Question quick nav */}
                            <div className="mt-8 bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">iu hng nhanh</div>
                                <div className="flex flex-wrap gap-2">
                                    {questions.map((q: any, idx: number) => (
                                        <button
                                            key={idx}
                                            onClick={() => setCurrentQuestionIdx(idx)}
                                            title={getQuestionTypeLabel(q.type)}
                                            className={`w-10 h-10 rounded-xl font-bold text-sm transition-all flex items-center justify-center border-2 ${
                                                currentQuestionIdx === idx
                                                ? "bg-slate-900 border-slate-900 text-white shadow-lg scale-110"
                                                : selectedAnswers[q.id]?.trim()
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
                    ) : (
                        /* ============== RESULTS SCREEN ============== */
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="space-y-8"
                        >
                            <div className="relative rounded-[2.5rem] bg-white p-8 md:p-12 text-center shadow-2xl overflow-hidden border border-slate-100">
                                <div className={`absolute top-0 left-0 w-full h-3 ${score!.percentage >= 80 ? 'bg-emerald-500' : score!.percentage >= 60 ? 'bg-amber-400' : 'bg-rose-500'}`}></div>
                                <div className="mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-3xl bg-slate-50">
                                    {score!.percentage >= 80 ? (
                                        <Trophy className="h-16 w-16 text-emerald-500" />
                                    ) : score!.percentage >= 60 ? (
                                        <AlertCircle className="h-16 w-16 text-amber-500" />
                                    ) : (
                                        <XCircle className="h-16 w-16 text-rose-500" />
                                    )}
                                </div>
                                <h2 className="mb-2 text-4xl font-black text-slate-900 tracking-tight">
                                    {score!.percentage >= 80 ? "Qu tuyt vi!" : score!.percentage >= 60 ? "C gng thm cht!" : "Cn n tp thm!"}
                                </h2>
                                <p className="mb-8 text-lg font-medium text-slate-500">
                                    Bn  t <span className="text-slate-900 font-bold">{score!.correct}/{score!.total}</span> cu ng.
                                </p>
                                <div className="inline-flex items-center justify-center gap-4 bg-slate-50 rounded-2xl px-8 py-4 border border-slate-100">
                                    <div className={`text-6xl font-black ${score!.percentage >= 80 ? 'text-emerald-500' : score!.percentage >= 60 ? 'text-amber-500' : 'text-rose-500'}`}>
                                        {score!.percentage}%
                                    </div>
                                    <div className="text-left leading-tight">
                                        <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">im s</div>
                                        <div className="text-slate-900 font-bold">Hon thnh</div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-2xl font-black text-slate-900 px-2">Xem li kt qu</h3>
                                {questions.map((q: any, idx: number) => {
                                    const userAnswer = (selectedAnswers[q.id] || '').trim();
                                    const isCorrect = q.type === 'FILL'
                                        ? userAnswer.toLowerCase() === q.correctAnswer.trim().toLowerCase()
                                        : userAnswer === q.correctAnswer.trim();

                                    return (
                                        <div key={idx} className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm space-y-4">
                                            <div className="flex items-start gap-4">
                                                <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${isCorrect ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>
                                                    {idx + 1}
                                                </span>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                                            q.type === 'FILL' ? 'bg-emerald-100 text-emerald-600' :
                                                            q.type === 'LISTENING' ? 'bg-indigo-100 text-indigo-600' :
                                                            'bg-slate-100 text-slate-500'
                                                        }`}>
                                                            {getQuestionTypeLabel(q.type)}
                                                        </span>
                                                    </div>
                                                    <h4 className="text-xl font-bold text-slate-900 leading-snug">{q.question}</h4>
                                                </div>
                                            </div>

                                            {/* For FILL type - show user answer vs correct */}
                                            {q.type === 'FILL' ? (
                                                <div className="grid gap-3 pt-2">
                                                    <div className={`p-4 rounded-xl border-2 flex items-center gap-3 ${
                                                        isCorrect
                                                        ? 'border-emerald-500 bg-emerald-50/50 text-emerald-700 font-bold'
                                                        : 'border-rose-500 bg-rose-50/50 text-rose-700 font-bold'
                                                    }`}>
                                                        <span className="text-sm font-bold text-slate-500">Bn tr li:</span>
                                                        {userAnswer || '(Khng tr li)'}
                                                        {isCorrect
                                                            ? <CheckCircle className="w-5 h-5 ml-auto text-emerald-500" />
                                                            : <XCircle className="w-5 h-5 ml-auto text-rose-500" />
                                                        }
                                                    </div>
                                                    {!isCorrect && (
                                                        <div className="p-4 rounded-xl border-2 border-emerald-500 bg-emerald-50/50 text-emerald-700 font-bold flex items-center gap-3">
                                                            <span className="text-sm font-bold text-slate-500">p n ng:</span>
                                                            {q.correctAnswer}
                                                            <CheckCircle className="w-5 h-5 ml-auto text-emerald-500" />
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                /* For CHOICE/LISTENING - show options */
                                                <div className="grid gap-3 pt-2">
                                                    {q.options?.map((opt: string, oIdx: number) => {
                                                        const isSelected = userAnswer === opt;
                                                        const isActuallyCorrect = opt === q.correctAnswer;

                                                        let borderClass = "border-slate-100";
                                                        let bgClass = "bg-slate-50";
                                                        let textClass = "text-slate-600";

                                                        if (isActuallyCorrect) {
                                                            borderClass = "border-emerald-500";
                                                            bgClass = "bg-emerald-50/50";
                                                            textClass = "text-emerald-700 font-bold";
                                                        } else if (isSelected && !isActuallyCorrect) {
                                                            borderClass = "border-rose-500";
                                                            bgClass = "bg-rose-50/50";
                                                            textClass = "text-rose-700 font-bold";
                                                        }

                                                        return (
                                                            <div key={oIdx} className={`p-4 rounded-xl border-2 ${borderClass} ${bgClass} ${textClass} flex items-center gap-3`}>
                                                                <span className="w-8 h-8 rounded-lg bg-white/50 flex items-center justify-center font-bold text-xs opacity-50">
                                                                    {String.fromCharCode(65 + oIdx)}
                                                                </span>
                                                                {opt}
                                                                {isActuallyCorrect && <CheckCircle className="w-5 h-5 ml-auto text-emerald-500" />}
                                                                {isSelected && !isActuallyCorrect && <XCircle className="w-5 h-5 ml-auto text-rose-500" />}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            )}

                                            {q.explanation && (
                                                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 mt-4">
                                                    <div className="flex items-center gap-2 text-blue-700 font-bold text-sm mb-1">
                                                        <AlertCircle className="w-4 h-4" />
                                                        Gii thch
                                                    </div>
                                                    <p className="text-blue-900/80 text-sm leading-relaxed">{q.explanation}</p>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            <Link
                                href="/exam"
                                className="w-full flex justify-center items-center gap-2 rounded-xl bg-slate-900 px-6 py-4 font-bold text-white shadow-xl hover:bg-[#C53030] transition-all duration-300"
                            >
                                <RotateCcw className="w-5 h-5" />
                                Lm  thi khc
                            </Link>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}
