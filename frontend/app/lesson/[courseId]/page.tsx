'use client';

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
    ChevronLeft,
    ChevronRight,
    CheckCircle,
    Circle,
    Play,
    FileText,
    BookOpen,
    ArrowLeft,
    Settings,
    MoreVertical,
    Maximize,
    Volume2,
    Loader2
} from "lucide-react";
import { useState, useEffect } from "react";
import { lessonsAPI, coursesAPI } from "@/lib/api";
import { useAuthStore } from "@/lib/store";

export default function LessonPage() {
    const params = useParams();
    const router = useRouter();
    const courseId = params?.courseId as string;
    const [lessons, setLessons] = useState<any[]>([]);
    const [course, setCourse] = useState<any>(null);
    const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const { user } = useAuthStore();

    useEffect(() => {
        const loadData = async () => {
            if (!courseId) return;
            try {
                const [courseRes, lessonsRes] = await Promise.all([
                    coursesAPI.get(courseId),
                    lessonsAPI.getByCourse(courseId)
                ]);
                setCourse(courseRes);
                setLessons(lessonsRes || []);
            } catch (error) {
                console.error("Failed to load lesson data", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [courseId]);

    const currentLesson = lessons[currentLessonIndex];
    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-slate-950">
                <Loader2 className="w-10 h-10 text-[#C53030] animate-spin" />
            </div>
        );
    }

    if (!course || lessons.length === 0) {
        return (
            <div className="flex h-screen flex-col items-center justify-center bg-slate-950 text-white">
                <h1 className="text-2xl font-bold mb-4">Khng tm thy bi hc</h1>
                <Link href="/dashboard" className="text-[#C53030] hover:underline">Quay li Dashboard</Link>
            </div>
        );
    }

    const handlePrevious = () => {
        if (currentLessonIndex > 0) {
            setCurrentLessonIndex(currentLessonIndex - 1);
        }
    };

    const handleNext = () => {
        if (currentLessonIndex < lessons.length - 1) {
            setCurrentLessonIndex(currentLessonIndex + 1);
        }
    };

    const progress = ((currentLessonIndex + 1) / lessons.length) * 100;

    // Generate streaming URL
    // We assume the backend is at process.env.NEXT_PUBLIC_API_URL or localhost:3050
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3050/api/v1';

    // In a real app, you'd get the JWT from your storage or cookie
    // For this example, if the video item doesn't have an ID, we can't stream.
    // Video item usually is lesson.videos[0]
    const activeVideo = currentLesson.videos?.[0];
    const streamUrl = activeVideo
        ? `${baseUrl}/streaming/video/${activeVideo.id}`
        : null;

    return (
        <div className="flex h-screen flex-col bg-slate-950 text-slate-50 font-sans selection:bg-[#C53030]/30 selection:text-white">
            {/* Top Navigation Bar */}
            <div className="flex items-center justify-between border-b border-white/10 bg-slate-900/80 backdrop-blur-md px-6 py-3 sticky top-0 z-50">
                <div className="flex items-center gap-6">
                    <Link
                        href="/dashboard"
                        className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium"
                    >
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                            <ArrowLeft className="w-4 h-4" />
                        </div>
                        <span className="hidden sm:inline">V Dashboard</span>
                    </Link>
                    <div className="h-6 w-px bg-white/10 hidden sm:block"></div>
                    <div className="hidden sm:block">
                        <h2 className="text-sm font-bold text-white max-w-[300px] truncate">{course.title}</h2>
                        <p className="text-xs text-slate-400">{currentLesson.title}</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-3 mr-4">
                        <div className="text-right">
                            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">Tin </div>
                            <div className="text-sm text-slate-400">{currentLessonIndex + 1} / {lessons.length} bi</div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-[#C53030]/20 border border-[#C53030] text-[#C53030] flex items-center justify-center font-bold text-xs">
                            {Math.round(progress)}%
                        </div>
                    </div>
                    <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 hover:bg-white/10 transition-colors">
                        <Settings className="w-5 h-5 text-slate-400" />
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={currentLessonIndex === lessons.length - 1}
                        className="rounded-xl bg-[#C53030] px-5 py-2 text-sm font-bold text-white hover:bg-rose-600 transition-colors shadow-lg shadow-[#C53030]/20 disabled:opacity-50"
                    >
                        Bi k tip
                    </button>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden relative">
                {/* Main Content Area (Video) */}
                <div className="flex flex-1 flex-col overflow-y-auto custom-scrollbar bg-slate-950">

                    {/* Video Player Section */}
                    <div className="w-full bg-black relative group flex-shrink-0 animate-in fade-in duration-500">
                        <div className="w-full aspect-video max-h-[70vh] flex items-center justify-center relative z-0 overflow-hidden bg-black shadow-2xl">
                            {currentLesson.type === "video" && streamUrl ? (
                                <video
                                    key={streamUrl} // Force re-render when lesson changes
                                    src={streamUrl}
                                    controls
                                    crossOrigin="use-credentials"
                                    className="w-full h-full"
                                    controlsList="nodownload"
                                    onContextMenu={(e) => e.preventDefault()}
                                >
                                    Trnh duyt ca bn khng h tr pht video.
                                </video>
                            ) : (
                                <div className="relative z-20 flex flex-col items-center justify-center text-center p-6 bg-slate-900 w-full h-full">
                                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center mb-6">
                                        <FileText className="w-10 h-10 md:w-12 md:h-12" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4 drop-shadow-md">Ni dung bi hc: {currentLesson.title}</h3>
                                    <p className="text-slate-400 mb-8 max-w-sm">Bi hc ny bao gm ti liu v ni dung thc hnh bn di.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Lesson Details Info */}
                    <div className="max-w-5xl w-full mx-auto p-6 md:p-10 animate-in slide-in-from-bottom-8 duration-700">
                        <div className="flex flex-col md:flex-row gap-10">
                            <div className="flex-1">
                                <h1 className="text-3xl md:text-4xl font-black mb-4 tracking-tight leading-tight">
                                    {currentLesson.title}
                                </h1>
                                <div
                                    className="text-slate-400 text-lg leading-relaxed mb-8 prose prose-invert max-w-none"
                                    dangerouslySetInnerHTML={{ __html: currentLesson.content || '' }}
                                />

                                {/* Lesson Materials Block */}
                                {currentLesson.files && currentLesson.files.length > 0 && (
                                    <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-sm mb-10">
                                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                            <FileText className="w-5 h-5 text-[#C53030]" />
                                            Ti liu nh km
                                        </h3>
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            {currentLesson.files.map((file: any) => (
                                                <a
                                                    key={file.id}
                                                    href={file.fileUrl}
                                                    target="_blank"
                                                    className="group flex items-center gap-4 rounded-xl bg-slate-800/50 p-4 border border-white/5 hover:bg-slate-800 hover:border-[#C53030]/50 transition-all"
                                                >
                                                    <div className="w-10 h-10 rounded-lg bg-[#C53030]/10 text-[#C53030] flex items-center justify-center group-hover:scale-110 transition-transform">
                                                        <BookOpen className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-sm text-white">{file.title}</div>
                                                        <div className="text-xs text-slate-500">Ti xung ti liu</div>
                                                    </div>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Bottom Navigation */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-white/10 mt-8">
                            <button
                                onClick={handlePrevious}
                                disabled={currentLessonIndex === 0}
                                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 font-bold text-slate-300 hover:bg-white/10 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed uppercase text-xs tracking-wider"
                            >
                                <ChevronLeft className="w-4 h-4" />
                                Bi trc 
                            </button>

                            <button
                                onClick={handleNext}
                                disabled={currentLessonIndex === lessons.length - 1}
                                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-slate-800 border border-slate-700 hover:border-[#C53030] px-8 py-3.5 font-bold text-white hover:bg-[#C53030] transition-all disabled:opacity-30 disabled:cursor-not-allowed uppercase text-xs tracking-wider shadow-lg"
                            >
                                Tip tc hc
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Sidebar - Playlist */}
                <div className="hidden lg:flex w-96 flex-col border-l border-white/10 bg-slate-950 flex-shrink-0 z-30 shadow-2xl animate-in fade-in slide-in-from-right-8 duration-500">
                    <div className="p-6 border-b border-white/10 bg-slate-900/50 backdrop-blur-md sticky top-0 z-10">
                        <h2 className="font-black text-white text-xl flex items-center justify-between">
                            Ni dung bi hc
                            <MoreVertical className="w-5 h-5 text-slate-500 cursor-pointer hover:text-white transition-colors" />
                        </h2>
                        <div className="mt-4 flex items-center justify-between text-xs font-bold text-slate-400">
                            <span className="uppercase tracking-widest">{currentLessonIndex + 1}/{lessons.length} hon thnh</span>
                            <span className="text-[#C53030]">{Math.round(progress)}%</span>
                        </div>
                        <div className="mt-2 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-[#C53030] to-rose-400 rounded-full transition-all duration-500"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        <div className="p-4 space-y-2">
                            {lessons.map((lesson, index) => {
                                const isActive = currentLessonIndex === index;
                                return (
                                    <button
                                        key={lesson.id}
                                        onClick={() => setCurrentLessonIndex(index)}
                                        className={`group w-full flex items-start gap-4 p-4 rounded-xl text-left transition-all duration-300 relative overflow-hidden ${isActive
                                            ? "bg-[#C53030]/10 border border-[#C53030]/20 shadow-sm"
                                            : "hover:bg-white/5 border border-transparent"
                                            }`}
                                    >
                                        {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#C53030] rounded-r-md"></div>}

                                        <div className="mt-1">
                                            {isActive ? (
                                                <div className="w-5 h-5 rounded-full border-2 border-[#C53030] bg-[#C53030]/20 flex items-center justify-center">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-[#C53030] animate-pulse"></div>
                                                </div>
                                            ) : (
                                                <Circle className="w-5 h-5 text-slate-600 group-hover:text-slate-400 transition-colors" />
                                            )}
                                        </div>

                                        <div className="flex-1">
                                            <div
                                                className={`font-bold text-sm mb-1.5 leading-snug transition-colors ${isActive ? "text-white" : "text-slate-300 group-hover:text-white"
                                                    }`}
                                            >
                                                {index + 1}. {lesson.title}
                                            </div>
                                            <div className="flex items-center gap-3 text-xs font-medium text-slate-500">
                                                <span className="flex items-center gap-1 bg-slate-900 px-2 py-0.5 rounded-md">
                                                    <Play className="w-3 h-3 text-[#C53030]" />
                                                    Video
                                                </span>
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
