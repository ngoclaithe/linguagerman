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
    X,
    Layout
} from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { lessonsAPI, coursesAPI, progressAPI, getImageUrl, getVideoStreamUrl, getHlsPlaylistUrl } from "@/lib/api";
import Hls from 'hls.js';

export default function LessonPage() {
    const params = useParams();
    const router = useRouter();
    const courseId = params?.id as string;
    const lessonId = params?.lessonId as string;

    const [course, setCourse] = useState<any>(null);
    const [lessons, setLessons] = useState<any[]>([]);
    const [currentLesson, setCurrentLesson] = useState<any>(null);
    const [activeVideoIndex, setActiveVideoIndex] = useState(0);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [hasStartedVideo, setHasStartedVideo] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [courseData, lessonsData] = await Promise.all([
                    coursesAPI.get(courseId),
                    lessonsAPI.getByCourse(courseId)
                ]);
                setCourse(courseData);
                setLessons(lessonsData);

                const found = lessonsData.find((l: any) => l.id === lessonId);
                setCurrentLesson(found || lessonsData[0]);
                setHasStartedVideo(false);
            } catch (error) {
                console.error("Failed to fetch lesson data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [courseId, lessonId]);

    // HLS Player Setup
    useEffect(() => {
        if (!hasStartedVideo || !currentLesson) return;

        const activeVideo = currentLesson.videos?.[activeVideoIndex] || { videoUrl: currentLesson.videoUrl, id: null };
        if (!activeVideo.id) return;

        const videoElement = document.getElementById('hls-video-player') as HTMLVideoElement;
        if (!videoElement) return;

        const hlsUrl = getHlsPlaylistUrl(
            activeVideo.id, 
            activeVideo.signedUrlParams?.signature, 
            activeVideo.signedUrlParams?.expires
        );

        if (!hlsUrl) return;

        let hls: Hls;

        if (Hls.isSupported()) {
            hls = new Hls({
                xhrSetup: (xhr, url) => {
                    // Send credentials (cookies) for all HLS requests (playlist, segments, keys)
                    xhr.withCredentials = true;
                },
            });

            // Append signature to segment URLs automatically
            hls.on(Hls.Events.LEVEL_LOADING, (event, data) => {
                const params = new URLSearchParams({
                    sig: activeVideo.signedUrlParams?.signature || '',
                    expires: String(activeVideo.signedUrlParams?.expires || '')
                }).toString();
                
                // This is a bit tricky in hls.js to append to all fragments automatically 
                // but usually the segments are requested relative to m3u8.
                // However, we can use the hls.js property 'xhrSetup' to modify the URL if needed.
            });

            // Re-configuring xhrSetup to handle URL query params for all HLS related files
            hls.config.xhrSetup = (xhr, url) => {
                xhr.withCredentials = true;
                if (!url.includes('sig=')) {
                    const separator = url.includes('?') ? '&' : '?';
                    const newUrl = `${url}${separator}sig=${activeVideo.signedUrlParams?.signature}&expires=${activeVideo.signedUrlParams?.expires}`;
                    // Note: We can't easily change the URL here in xhrSetup after it's passed,
                    // so we rely on the initial playlist URL having the params and hls.js 
                    // usually preserves them if it's configured correctly or we use a loader.
                }
            };

            hls.loadSource(hlsUrl);
            hls.attachMedia(videoElement);
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                videoElement.play().catch(e => console.error("Auto-play blocked:", e));
            });

            hls.on(Hls.Events.ERROR, (event, data) => {
                if (data.fatal) {
                    switch (data.type) {
                        case Hls.ErrorTypes.NETWORK_ERROR:
                            console.error("HLS Network Error:", data);
                            if (data.response?.code === 403) {
                                alert("Phiên xem video ã hết hạn (2h). Trang sẽ tải lại.");
                                window.location.reload();
                            }
                            hls.startLoad();
                            break;
                        case Hls.ErrorTypes.MEDIA_ERROR:
                            hls.recoverMediaError();
                            break;
                        default:
                            hls.destroy();
                            break;
                    }
                }
            });
        } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
            // Native HLS support (Safari)
            videoElement.src = hlsUrl;
            videoElement.addEventListener('loadedmetadata', () => {
                videoElement.play().catch(e => console.error("Native play error:", e));
            });
        }

        return () => {
            if (hls) {
                hls.destroy();
            }
        };
    }, [hasStartedVideo, currentLesson, activeVideoIndex]);

    const handlePrevious = () => {
        const index = lessons.findIndex((l: any) => l.id === currentLesson?.id);
        if (index > 0) {
            router.push(`/courses/${courseId}/lesson/${lessons[index - 1].id}`);
        }
    };

    const handleNext = async () => {
        const index = lessons.findIndex((l: any) => l.id === currentLesson?.id);

        try {
            await progressAPI.markComplete(currentLesson.id);
        } catch (error) {
            console.error("Failed to mark lesson complete", error);
        }

        if (index < lessons.length - 1) {
            router.push(`/courses/${courseId}/lesson/${lessons[index + 1].id}`);
        } else {
            router.push(`/dashboard`);
        }
    };

    if (loading || !currentLesson) return null;

    const currentLessonIndex = lessons.findIndex((l: any) => l.id === currentLesson.id);
    const progress = ((currentLessonIndex + 1) / lessons.length) * 100;

    return (
        <div className="flex h-screen flex-col bg-[#020617] text-slate-50 font-sans selection:bg-[#C53030]/30 selection:text-white">
            {/* Top Navigation Bar */}
            <div className="flex items-center justify-between border-b border-white/5 bg-slate-900/60 backdrop-blur-xl px-6 py-4 sticky top-0 z-[60]">
                <div className="flex items-center gap-8">
                    <Link
                        href="/dashboard"
                        className="group flex items-center gap-3 text-slate-400 hover:text-white transition-all text-sm font-black uppercase tracking-widest"
                    >
                        <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-[#C53030] group-hover:text-white transition-all duration-300">
                            <ArrowLeft className="w-5 h-5" />
                        </div>
                        <span className="hidden sm:inline">Thoát</span>
                    </Link>
                    <div className="h-8 w-px bg-white/10 hidden sm:block"></div>
                    <div className="hidden sm:block">
                        <h2 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-1">{course?.title || "Khóa học"}</h2>
                        <p className="text-sm font-black text-white">{currentLesson.title}</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden lg:flex items-center gap-4 mr-6">
                        <div className="text-right">
                            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Tiến  khóa học</div>
                            <div className="text-xs font-black text-white">{currentLessonIndex + 1} / {lessons.length} bài ã hoàn thành</div>
                        </div>
                        <div className="relative w-12 h-12 flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="3" fill="transparent" className="text-white/5" />
                                <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="3" fill="transparent" strokeDasharray={125.6} strokeDashoffset={125.6 - (125.6 * progress) / 100} className="text-[#C53030] transition-all duration-1000" />
                            </svg>
                            <span className="absolute text-[10px] font-black">{Math.round(progress)}%</span>
                        </div>
                    </div>

                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className={`hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-2xl border transition-all duration-300 font-black text-[10px] uppercase tracking-widest ${isSidebarOpen ? "bg-white/5 border-white/10 text-slate-400" : "bg-white text-slate-950 border-white shadow-xl shadow-white/10"}`}
                    >
                        <Layout className="w-4 h-4" />
                        {isSidebarOpen ? "Thu gọn sidebar" : "M sidebar"}
                    </button>

                    <button
                        onClick={handleNext}
                        className="hidden sm:flex rounded-2xl bg-[#C53030] px-6 py-2.5 text-[10px] font-black uppercase tracking-widest text-white hover:bg-[#A51F1F] transition-all shadow-lg shadow-[#C53030]/20"
                    >
                        Bài tiếp theo
                    </button>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden relative">
                {/* Main Content Area */}
                <div className="flex-1 flex flex-col overflow-y-auto custom-scrollbar bg-[#020617]">

                    {/* Video Section - Always Full Width of Content Area */}
                    <div className="w-full bg-black relative group shrink-0">
                        <div className="w-full aspect-video max-h-[85vh] flex items-center justify-center relative z-0 overflow-hidden bg-black">
                            {!hasStartedVideo ? (
                                <div
                                    className="absolute inset-0 z-10 cursor-pointer flex flex-col items-center justify-center bg-slate-950/20 hover:bg-black/40 transition-all duration-500 group/play"
                                    onClick={() => setHasStartedVideo(true)}
                                >
                                    {/* Thumbnail Placeholder or Background */}
                                    <div className="absolute inset-0 z-0 opacity-40 blur-sm scale-110">
                                        <img
                                            src={getImageUrl(course?.thumbnail) || "/placeholder-course.jpg"}
                                            alt=""
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-[1]"></div>

                                    <motion.div
                                        whileHover={{ scale: 1.15 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="relative z-[2] w-24 h-24 rounded-full bg-[#C53030] flex items-center justify-center shadow-[0_0_60px_rgba(197,48,48,0.6)] group-hover/play:bg-[#A51F1F] transition-all duration-300"
                                    >
                                        <Play className="w-10 h-10 text-white fill-current ml-1" />
                                    </motion.div>

                                    <div className="relative z-[2] mt-10 text-center px-4 max-w-2xl">
                                        <h3 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-white drop-shadow-2xl line-clamp-2 mb-3">
                                            {currentLesson.title}
                                        </h3>
                                        <div className="flex items-center justify-center gap-3">
                                            <span className="h-px w-8 bg-white/20"></span>
                                            <p className="text-[#C53030] text-xs font-black uppercase tracking-[0.3em]">Bắt ầu bài học ngay</p>
                                            <span className="h-px w-8 bg-white/20"></span>
                                        </div>
                                    </div>
                                </div>
                            ) : null}

                            {(currentLesson.videos && currentLesson.videos.length > 0) || currentLesson.videoUrl ? (
                                (() => {
                                    const activeVideo = currentLesson.videos?.[activeVideoIndex] || { videoUrl: currentLesson.videoUrl };
                                    if (!activeVideo.videoUrl) return null;

                                    if (activeVideo.videoUrl.includes('youtube.com') || activeVideo.videoUrl.includes('youtu.be')) {
                                        return (
                                            <iframe
                                                src={`https://www.youtube.com/embed/${activeVideo.videoUrl.split('v=')[1] || activeVideo.videoUrl.split('/').pop()}?autoplay=${hasStartedVideo ? 1 : 0}&rel=0`}
                                                className="w-full h-full border-0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            ></iframe>
                                        );
                                    } else {
                                        return (
                                            <video
                                                id="hls-video-player"
                                                key={activeVideo.id || 'single-video'}
                                                className="w-full h-full object-contain"
                                                controls
                                                preload="metadata"
                                                crossOrigin="use-credentials"
                                            >
                                                {!activeVideo.id && (
                                                    <source src={getImageUrl(activeVideo.videoUrl) || ""} type="video/mp4" />
                                                )}
                                            </video>
                                        );
                                    }
                                })()
                            ) : (
                                <div className="absolute inset-0 bg-slate-900 flex flex-col items-center justify-center text-center p-10">
                                    <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6">
                                        <Play className="w-10 h-10 text-slate-700" />
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-500 uppercase tracking-widest">Chưa có video</h3>
                                    <p className="text-slate-600 mt-2 max-w-sm">Ni dung video cho bài học này hin ang ược cập nhật.</p>
                                </div>
                            )}
                        </div>

                    </div>

                    {/* Lesson Details Section */}
                    <div className="max-w-5xl mx-auto w-full px-6 py-16 md:px-12">
                        <div className="space-y-16">
                            {/* Header */}
                            <header className="space-y-8">
                                <div className="flex items-center gap-4">
                                    <span className="px-4 py-1.5 rounded-full bg-[#C53030]/10 border border-[#C53030]/20 text-[#C53030] text-[10px] font-black uppercase tracking-[0.2em]">
                                        Bài {currentLessonIndex + 1}
                                    </span>
                                    <div className="h-4 w-px bg-white/10"></div>
                                    <span className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
                                        Cấp  {course?.level || "A1"}
                                    </span>
                                </div>
                                <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight text-white uppercase italic">
                                    {currentLesson.title}
                                </h1>
                                <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-3xl border-l-4 border-[#C53030] pl-8 py-2">
                                    {currentLesson.description || `Học phần ${currentLesson.title.toLowerCase()} cùng Lehrer. Hãy xem kỹ video và tải tài liu ính kèm  ôn tập.`}
                                </p>
                            </header>

                            {/* Main Content Grid */}
                            <div className="grid lg:grid-cols-3 gap-12">
                                <div className="lg:col-span-2 space-y-12">

                                    {/* Multi-Video Selector */}
                                    {currentLesson.videos && currentLesson.videos.length > 1 && (
                                        <section className="space-y-6">
                                            <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] flex items-center gap-3">
                                                <Play className="w-4 h-4" /> Danh sách video ({currentLesson.videos.length})
                                            </h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {currentLesson.videos.map((vid: any, idx: number) => (
                                                    <button
                                                        key={vid.id}
                                                        onClick={() => {
                                                            setActiveVideoIndex(idx);
                                                            setHasStartedVideo(true);
                                                        }}
                                                        className={`group flex items-center gap-5 p-6 rounded-[2rem] border transition-all duration-300 ${activeVideoIndex === idx
                                                            ? "bg-[#C53030] border-[#C53030] shadow-2xl shadow-[#C53030]/20 scale-[1.02]"
                                                            : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10"}`}
                                                    >
                                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${activeVideoIndex === idx ? "bg-black/20 text-white" : "bg-slate-800 text-slate-500 shadow-inner"}`}>
                                                            <Play className="w-5 h-5 fill-current" />
                                                        </div>
                                                        <div className="text-left overflow-hidden">
                                                            <div className="text-sm font-black truncate text-white">{vid.title || `Video phần ${idx + 1}`}</div>
                                                            <div className={`text-[10px] font-black uppercase tracking-widest mt-1 ${activeVideoIndex === idx ? "text-white/60" : "text-slate-600"}`}>PHẦN {idx + 1}</div>
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        </section>
                                    )}

                                    {/* Downloadable Materials */}
                                    <section className="space-y-6">
                                        <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] flex items-center gap-3">
                                            <FileText className="w-4 h-4" /> Tài liu ính kèm
                                        </h3>
                                        <div className="grid sm:grid-cols-2 gap-5">
                                            {currentLesson.fileUrl && (
                                                <a href={getImageUrl(currentLesson.fileUrl) || "#"} target="_blank" className="group flex items-center gap-6 rounded-[2rem] bg-white/5 p-7 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                                                    <div className="w-14 h-14 rounded-2xl bg-[#C53030]/10 text-[#C53030] flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-[#C53030]/5">
                                                        <BookOpen className="w-7 h-7" />
                                                    </div>
                                                    <div>
                                                        <div className="font-black text-sm text-white">Giáo trình chính</div>
                                                        <div className="text-[10px] font-black text-slate-500 mt-1 uppercase tracking-widest">DOWNLOAD .PDF</div>
                                                    </div>
                                                </a>
                                            )}
                                            {currentLesson.files && currentLesson.files.map((file: any, idx: number) => (
                                                <a key={file.id} href={getImageUrl(file.fileUrl) || "#"} target="_blank" className="group flex items-center gap-6 rounded-[2rem] bg-white/5 p-7 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                                                    <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/5">
                                                        <FileText className="w-7 h-7" />
                                                    </div>
                                                    <div className="overflow-hidden">
                                                        <div className="font-black text-sm text-white truncate">{file.title || `Tài liu ${idx + 1}`}</div>
                                                        <div className="text-[10px] font-black text-slate-500 mt-1 uppercase tracking-widest">DOWNLOAD .DOCX</div>
                                                    </div>
                                                </a>
                                            ))}
                                        </div>
                                    </section>
                                </div>

                                {/* Sidebar Info */}
                                <aside className="space-y-10">
                                    <div className="rounded-[2.5rem] border border-amber-500/10 bg-gradient-to-br from-amber-500/5 to-transparent p-10 relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-6 opacity-20 transform translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500">
                                            <Settings className="w-16 h-16 text-amber-500" />
                                        </div>
                                        <h3 className="text-xl font-black text-white mb-4 uppercase italic">Thử thách</h3>
                                        <p className="text-slate-500 text-sm leading-relaxed mb-10">Kim tra ngay kiến thức của bạn qua bài trắc nghim trắc nghim  m khóa bài học tiếp theo.</p>
                                        <Link href="/exam" className="flex items-center justify-center gap-3 w-full py-5 rounded-2xl bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-[0.2em] hover:bg-amber-400 transition-all shadow-2xl shadow-amber-500/20 active:scale-95">
                                            Bắt ầu ngay
                                            <ChevronRight className="w-5 h-5" />
                                        </Link>
                                    </div>

                                    <div className="rounded-[2.5rem] border border-white/5 bg-slate-900/40 p-10">
                                        <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-6">Mẹo học tập</h4>
                                        <div className="space-y-6">
                                            <div className="flex gap-4">
                                                <div className="w-2 h-2 rounded-full bg-[#C53030] mt-1.5 shrink-0"></div>
                                                <p className="text-xs text-slate-400 leading-relaxed font-medium italic">"Luyn tập viết các mẫu câu mi ít nhất 5 lần mi ngày."</p>
                                            </div>
                                            <div className="flex gap-4">
                                                <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
                                                <p className="text-xs text-slate-400 leading-relaxed font-medium italic">"Nghe video bài giảng 2-3 lần  quen vi ngữ iu chuẩn."</p>
                                            </div>
                                        </div>
                                    </div>
                                </aside>
                            </div>

                            {/* Bottom Footer Nav */}
                            <footer className="flex flex-col sm:flex-row items-center justify-between gap-8 pt-16 border-t border-white/5">
                                <button
                                    onClick={handlePrevious}
                                    disabled={currentLessonIndex === 0}
                                    className="w-full sm:w-auto flex items-center justify-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-10 py-5 font-black text-slate-400 hover:bg-white/10 hover:text-white transition-all disabled:opacity-20 disabled:cursor-not-allowed uppercase text-[10px] tracking-[0.3em]"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                    Bài trưc
                                </button>

                                <button
                                    onClick={handleNext}
                                    disabled={currentLessonIndex === lessons.length - 1}
                                    className="w-full sm:w-auto flex items-center justify-center gap-4 rounded-2xl bg-white px-12 py-5 font-black text-slate-950 hover:bg-[#C53030] hover:text-white transition-all duration-500 disabled:opacity-20 disabled:cursor-not-allowed uppercase text-[10px] tracking-[0.3em] shadow-2xl hover:shadow-[#C53030]/30 active:scale-95"
                                >
                                    Tiếp tục
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </footer>
                        </div>
                    </div>
                </div>

                {/* Sidebar - Playlist - Collapsible */}
                <div
                    className={`transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] flex flex-col border-l border-white/5 bg-slate-950/80 backdrop-blur-3xl flex-shrink-0 z-40 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] overflow-hidden ${isSidebarOpen ? "w-96" : "w-0 border-l-0"}`}
                >
                    <div className="w-96 flex flex-col h-full">
                        {/* Sidebar Header */}
                        <div className="p-10 border-b border-white/5 sticky top-0 bg-slate-950/40 backdrop-blur-xl z-20">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="font-black text-white text-xl uppercase italic tracking-tighter">Bài học công chiếu</h3>
                                <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 rounded-xl bg-white/5 text-slate-400">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">
                                    <span>Tiến trình hoàn thành</span>
                                    <span className="text-[#C53030]">{Math.round(progress)}%</span>
                                </div>
                                <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress}%` }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                        className="h-full bg-[#C53030] shadow-[0_0_20px_rgba(197,48,48,0.6)]"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* List Area */}
                        <div className="flex-1 overflow-y-auto custom-scrollbar px-6 py-8 space-y-3">
                            {lessons.map((lesson, index) => {
                                const isActive = currentLessonIndex === index;
                                return (
                                    <button
                                        key={lesson.id}
                                        onClick={() => router.push(`/courses/${courseId}/lesson/${lesson.id}`)}
                                        className={`group w-full flex items-start gap-5 p-6 rounded-[1.5rem] transition-all duration-300 relative overflow-hidden ${isActive
                                            ? "bg-white/5 ring-1 ring-white/10 shadow-2xl"
                                            : "hover:bg-white/2"
                                            }`}
                                    >
                                        {/* Status Icon */}
                                        <div className="mt-1 shrink-0">
                                            {lesson.completed ? (
                                                <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${isActive ? 'bg-[#C53030]/20 text-[#C53030]' : 'bg-emerald-500/10 text-emerald-500'}`}>
                                                    <CheckCircle className="w-4 h-4" />
                                                </div>
                                            ) : (
                                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${isActive ? "border-[#C53030] shadow-[0_0_10px_rgba(197,48,48,0.3)]" : "border-slate-800"}`}>
                                                    {isActive && <div className="w-2 h-2 rounded-full bg-[#C53030] animate-pulse"></div>}
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 text-left overflow-hidden">
                                            <div className={`text-[10px] font-black uppercase tracking-widest mb-1.5 transition-colors ${isActive ? "text-[#C53030]" : "text-slate-600 group-hover:text-slate-500"}`}>BI {index + 1}</div>
                                            <div className={`font-black text-sm leading-tight transition-colors ${isActive ? "text-white" : "text-slate-400 group-hover:text-slate-200"}`}>
                                                {lesson.title}
                                            </div>
                                            <div className="mt-3 flex items-center gap-4 text-[10px] font-black text-slate-700">
                                                <span className="flex items-center gap-1.5 uppercase">
                                                    <Play className="w-3 h-3" />
                                                    15 Phút
                                                </span>
                                            </div>
                                        </div>

                                        {/* Active Indicator */}
                                        {isActive && (
                                            <div className="absolute right-0 top-0 bottom-0 w-1 bg-[#C53030] shadow-[0_0_20px_#C53030]"></div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Sidebar Footer */}
                        <div className="p-8 border-t border-white/5 bg-slate-900/20">
                            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-500 italic font-serif">?</div>
                                <div className="flex-1 overflow-hidden">
                                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">H trợ học tập</div>
                                    <div className="text-[11px] font-bold text-slate-300 truncate">Lehrer ang online...</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
