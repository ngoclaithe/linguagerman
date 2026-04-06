'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    Volume2,
    ChevronLeft,
    ChevronRight,
    RotateCcw,
    Check,
    X,
    Sparkles,
    Award
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { flashcardsAPI } from "@/lib/api";
import { useAuthStore } from "@/lib/store";
export default function FlashcardsPage() {
    const user = useAuthStore((state) => state.user);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [knownCards, setKnownCards] = useState<string[]>([]);
    const [unknownCards, setUnknownCards] = useState<string[]>([]);
    const [direction, setDirection] = useState(0);
    const [flashcards, setFlashcards] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedLevel, setSelectedLevel] = useState<string>("All");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const allCards = await flashcardsAPI.list();
                setFlashcards(allCards);

                if (user) {
                    try {
                        const myProgress = await flashcardsAPI.getMyProgress();
                        setKnownCards(myProgress.filter((p: any) => p.known).map((p: any) => p.flashcardId));
                        setUnknownCards(myProgress.filter((p: any) => !p.known).map((p: any) => p.flashcardId));
                    } catch (e) {
                        console.warn("Could not fetch progress", e);
                    }
                }
            } catch (error: any) {
                if (error.response?.status !== 401 || user) {
                    console.error("Failed to fetch flashcards", error);
                }
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const filteredCards = selectedLevel === "All"
        ? flashcards
        : flashcards.filter(card => card.level === selectedLevel);

    const currentCard = filteredCards[currentCardIndex];

    const handleLevelChange = (level: string) => {
        setSelectedLevel(level);
        setCurrentCardIndex(0);
        setIsFlipped(false);
    };

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleNext = () => {
        if (currentCardIndex < filteredCards.length - 1) {
            setDirection(1);
            setCurrentCardIndex(prev => prev + 1);
            setIsFlipped(false);
        }
    };

    const handlePrevious = () => {
        if (currentCardIndex > 0) {
            setDirection(-1);
            setCurrentCardIndex(prev => prev - 1);
            setIsFlipped(false);
        }
    };

    const markCard = async (known: boolean) => {
        if (!currentCard) return;
        const cardId = currentCard.id;

        setDirection(known ? -1 : 1);

        if (known) {
            setKnownCards(prev => Array.from(new Set([...prev, cardId])));
            setUnknownCards(prev => prev.filter(id => id !== cardId));
        } else {
            setUnknownCards(prev => Array.from(new Set([...prev, cardId])));
            setKnownCards(prev => prev.filter(id => id !== cardId));
        }

        if (user) {
            try {
                await flashcardsAPI.updateProgress(cardId, known);
            } catch (err) { console.error(err); }
        }

        setTimeout(() => {
            if (currentCardIndex < filteredCards.length - 1) {
                setCurrentCardIndex(prev => prev + 1);
                setIsFlipped(false);
            }
        }, 10);
    };

    const handleDragEnd = (event: any, info: any) => {
        const threshold = 100;
        if (info.offset.x > threshold) {
            markCard(true);
        } else if (info.offset.x < -threshold) {
            markCard(false);
        }
    };

    const handleReset = () => {
        setCurrentCardIndex(0);
        setIsFlipped(false);
        setKnownCards([]);
        setUnknownCards([]);
        setDirection(0);
    };

    const handleSpeak = (text: string) => {
        if ("speechSynthesis" in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = "ja-JP";
            window.speechSynthesis.speak(utterance);
        }
    };

    if (loading) return null;
    if (flashcards.length === 0) return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="text-center">
                <Sparkles className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 font-medium">Không có flashcard nào.</p>
            </div>
        </div>
    );

    const displayCards = filteredCards.length > 0 ? filteredCards : [];
    const progressPercentage = displayCards.length > 0 ? ((currentCardIndex + 1) / displayCards.length) * 100 : 0;

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-[#C53030]/20 selection:text-[#C53030] pt-32 pb-20">
            <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-16">
                    <div>
                        <h1 className="text-4xl lg:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                            Luyn tập <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C53030] to-rose-500">Flashcards</span>
                        </h1>
                        <p className="text-xl text-slate-600 font-medium max-w-2xl">
                            Ghi nh từ vựng hiu quả qua phương pháp lặp lại ngắt quãng. Chạm  lật, gạt  học.
                        </p>
                    </div>

                    <div className="flex flex-col items-end gap-4">
                        <div className="flex bg-white p-2 rounded-2xl border border-slate-200/60 shadow-sm w-max">
                            {["All", "A1", "A2", "B1", "B2", "C1"].map((level) => (
                                <button
                                    key={level}
                                    onClick={() => handleLevelChange(level)}
                                    className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all ${selectedLevel === level
                                        ? "bg-[#C53030] text-white shadow-lg shadow-rose-200"
                                        : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                                        }`}
                                >
                                    {level}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="relative flex flex-col items-center">
                    <div className="absolute top-[0%] left-[-10%] w-[40%] h-[40%] bg-rose-100/30 blur-[120px] rounded-full pointer-events-none"></div>
                    <div className="absolute bottom-[0%] right-[-10%] w-[40%] h-[40%] bg-blue-100/30 blur-[120px] rounded-full pointer-events-none"></div>

                    <div className="w-full max-w-4xl relative z-10">
                        {user && (
                            <div className="max-w-2xl mx-auto mb-12 bg-white/40 backdrop-blur-md p-6 rounded-3xl border border-white shadow-sm">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Tiến  hin tại</span>
                                            <div className="flex items-center gap-2">
                                                <span className="text-3xl font-black text-slate-900 leading-none">
                                                    {displayCards.length > 0 ? currentCardIndex + 1 : 0}
                                                </span>
                                                <span className="text-slate-300 font-bold">/ {displayCards.length}</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={handleReset}
                                            className="ml-2 w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#C53030] hover:border-[#C53030]/30 transition-all shadow-sm group"
                                            title="Đặt lại tiến trình"
                                        >
                                            <RotateCcw className="h-4 w-4 group-hover:rotate-180 transition-transform duration-500" />
                                        </button>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="flex flex-col items-end">
                                            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">{knownCards.length} Đã nh</span>
                                            <div className="flex gap-1">
                                                {Array.from({ length: Math.min(knownCards.length, 5) }).map((_, i) => (
                                                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="w-px h-8 bg-slate-200 mx-1 self-center"></div>
                                        <div className="flex flex-col items-end">
                                            <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-1">{unknownCards.length} Cần học</span>
                                            <div className="flex gap-1">
                                                {Array.from({ length: Math.min(unknownCards.length, 5) }).map((_, i) => (
                                                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="h-3 rounded-full bg-slate-200/50 overflow-hidden relative">
                                    <motion.div
                                        className="h-full rounded-full bg-gradient-to-r from-[#C53030] to-rose-400 relative z-10"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progressPercentage}%` }}
                                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                    />
                                    <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
                                </div>
                            </div>
                        )}

                        <div className="relative h-[450px] w-full max-w-2xl mx-auto mb-8" style={{ perspective: "2000px" }}>
                            {displayCards.length > 0 ? (
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentCardIndex}
                                        drag="x"
                                        dragConstraints={{ left: 0, right: 0 }}
                                        onDragEnd={handleDragEnd}
                                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{
                                            x: direction > 0 ? -500 : 500,
                                            opacity: 0,
                                            rotate: direction > 0 ? -20 : 20,
                                            transition: { duration: 0.4 }
                                        }}
                                        whileDrag={{ scale: 1.02 }}
                                        className="relative w-full h-full cursor-grab active:cursor-grabbing"
                                        style={{ transformStyle: "preserve-3d" }}
                                    >
                                        <motion.div
                                            onClick={handleFlip}
                                            animate={{ rotateY: isFlipped ? 180 : 0 }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 260,
                                                damping: 20
                                            }}
                                            className="w-full h-full relative shadow-[0_30px_60px_-12px_rgba(0,0,0,0.15)] rounded-[3.5rem]"
                                            style={{ transformStyle: "preserve-3d" }}
                                        >
                                            <div
                                                className="absolute inset-0 w-full h-full bg-white rounded-[3.5rem] border border-slate-100 flex flex-col items-center justify-center p-12"
                                                style={{ backfaceVisibility: "hidden" }}
                                            >


                                                <button
                                                    onClick={(e) => { e.stopPropagation(); handleSpeak(currentCard.word); }}
                                                    className="absolute top-10 right-10 w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 hover:bg-[#C53030] hover:text-white transition-all flex items-center justify-center"
                                                >
                                                    <Volume2 className="w-5 h-5" />
                                                </button>

                                                <div className="text-7xl sm:text-8xl font-black text-slate-900 tracking-tight mb-4">{currentCard.word}</div>
                                                <div className="text-2xl font-medium text-slate-400">{currentCard.kana}</div>

                                                <div className="absolute bottom-10 py-2 px-4 bg-slate-50 rounded-full text-[10px] font-bold text-slate-400 flex items-center gap-2">
                                                    <div className="w-1 h-1 rounded-full bg-slate-300 animate-pulse"></div>
                                                    Chạm  lật bài
                                                </div>
                                            </div>

                                            <div
                                                className="absolute inset-0 w-full h-full bg-slate-900 rounded-[3.5rem] flex flex-col items-center justify-center p-12 text-white overflow-hidden"
                                                style={{
                                                    backfaceVisibility: "hidden",
                                                    transform: "rotateY(180deg)"
                                                }}
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-br from-[#C53030]/20 to-transparent opacity-50"></div>


                                                <div className="relative z-10 text-center">
                                                    <div className="text-4xl sm:text-5xl font-black mb-8 leading-tight">{currentCard.meaning}</div>
                                                    <div className="inline-block px-8 py-6 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 max-w-md">
                                                        <div className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-3 text-left">Ví dụ:</div>
                                                        <div className="text-lg font-medium leading-relaxed italic text-white/90">
                                                            {currentCard.example}
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </motion.div>
                                    </motion.div>
                                </AnimatePresence>
                            ) : (
                                <div className="w-full h-full bg-white rounded-[3.5rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-12 text-center">
                                    <Sparkles className="w-10 h-10 text-slate-200 mb-6" />
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">Hết bài ri!</h3>
                                    <p className="text-slate-400">Chọn cấp  khác hoặc bắt ầu lại nhé.</p>
                                </div>
                            )}
                        </div>

                        {}
                        <div className="flex justify-center items-center gap-6 mt-12 mb-8">
                            <button
                                onClick={handlePrevious}
                                disabled={currentCardIndex === 0}
                                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all bg-white border border-slate-100 shadow-xl shadow-slate-200/50 ${currentCardIndex === 0
                                    ? "opacity-30 cursor-not-allowed"
                                    : "text-slate-600 hover:bg-slate-900 hover:text-white active:scale-95"
                                    }`}
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>

                            <div className="px-6 py-2 bg-slate-100/50 backdrop-blur-md rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest border border-slate-200/50">
                                Thẻ {currentCardIndex + 1} / {displayCards.length}
                            </div>

                            <button
                                onClick={handleNext}
                                disabled={currentCardIndex === displayCards.length - 1}
                                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all bg-white border border-slate-100 shadow-xl shadow-slate-200/50 ${currentCardIndex === displayCards.length - 1
                                    ? "opacity-30 cursor-not-allowed"
                                    : "text-slate-600 hover:bg-slate-900 hover:text-white active:scale-95"
                                    }`}
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
