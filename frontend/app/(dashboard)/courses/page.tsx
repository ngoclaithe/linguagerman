'use client';

import Link from "next/link";
import { BookOpen, Users, Star, Clock, Filter, Search, ArrowRight, PlayCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { coursesAPI, getImageUrl } from "@/lib/api";
import { useToast } from "@/components/ui/toast";

export default function CoursesPage() {
    const [selectedLevel, setSelectedLevel] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [courses, setCourses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const toast = useToast();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await coursesAPI.list();
                setCourses(data);
            } catch (error) {
                console.error("Failed to fetch courses", error);
                toast.error("Không thể tải danh sách khóa học");
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    const levels = ["all", "A1", "A2", "B1", "B2", "C1", "Giao tiếp"];

    const filteredCourses = courses.filter((course) => {
        const matchesLevel = selectedLevel === "all" || course.level === selectedLevel;
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesLevel && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            {/* Hero Section - Redesigned for Clarity and Premium Feel */}
            <section className="relative pt-44 pb-32 overflow-hidden bg-white wave-divider">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#FFF5F8] to-transparent -z-0"></div>
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#FF2D78]/5 blur-[100px] rounded-full animate-pulse"></div>
                <div className="absolute top-20 left-10 w-72 h-72 bg-[#FF2D78]/5 rounded-full blur-3xl animate-float"></div>

                <div className="container mx-auto px-4 lg:px-8 relative z-10">
                    <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-700">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF2D78]/10 border border-[#FF2D78]/20 backdrop-blur-sm mb-6">
                            <Star className="w-4 h-4 text-[#FF2D78] fill-[#FF2D78]" />
                            <span className="text-sm font-bold text-[#FF2D78] uppercase tracking-widest">
                                Khám phá tri thức
                            </span>
                        </div>
                        <h1 className="mb-6 text-5xl lg:text-7xl font-[1000] text-slate-900 tracking-tighter leading-[1.1]">
                            Hệ thống <span className="gradient-text">Khóa học</span> <br />
                            Chuẩn Quốc Tế
                        </h1>
                        <p className="text-lg lg:text-xl text-slate-600 max-w-2xl leading-relaxed font-medium">
                            Phá vỡ mọi rào cản tiếng Đức với lộ trình bài bản, giảng viên tâm huyết và bộ công cụ học tập tiên tiến nhất hiện nay.
                        </p>
                    </div>
                </div>
            </section>

            {/* Filters Container */}
            <div className="container mx-auto px-4 lg:px-8 relative z-20 -mt-10 animate-in fade-in duration-700 delay-300 fill-mode-both">
                <div className="bg-white rounded-3xl shadow-xl shadow-[#FF2D78]/5 border border-slate-100 p-2 md:p-4 flex flex-col lg:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1 relative group">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-[#FF2D78] transition-colors" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm khóa học (VD: B1, giao tiếp...)"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-14 rounded-2xl bg-slate-50 pl-14 pr-4 outline-none border border-transparent focus:border-[#FF2D78]/30 focus:bg-white focus:ring-4 focus:ring-[#FF2D78]/10 transition-all text-slate-700 font-medium"
                        />
                    </div>

                    {/* Level Filter */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
                        {levels.map((level) => (
                            <button
                                key={level}
                                onClick={() => setSelectedLevel(level)}
                                className={`whitespace-nowrap rounded-2xl px-6 h-14 font-bold text-sm transition-all duration-300 ${selectedLevel === level
                                    ? "bg-[#FF2D78] text-white shadow-lg shadow-[#FF2D78]/30 scale-100"
                                    : "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200"
                                    }`}
                            >
                                {level === "all" ? "Tất cả trình độ" : level}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Courses Grid */}
            <section className="py-20 flex-grow">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="flex items-center justify-between mb-10">
                        <h2 className="text-2xl font-bold text-slate-900">
                            {filteredCourses.length > 0 ? "Kết quả phù hợp" : "Không tìm thấy kết quả"}
                        </h2>
                        <span className="text-slate-600 font-bold bg-[#FFF5F8] text-[#FF2D78] px-4 py-1.5 rounded-full text-sm border border-[#FF2D78]/20">
                            {filteredCourses.length} khóa học
                        </span>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {filteredCourses.map((course) => (
                            <Link
                                key={course.id}
                                href={`/courses/${course.slug || course.id}`}
                                className="group flex flex-col bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-[#FF2D78]/10 transition-all duration-500 hover:-translate-y-2"
                            >
                                {/* Course Image */}
                                <div className="relative aspect-[4/3] overflow-hidden">
                                    <img
                                        src={getImageUrl(course.thumbnail) || "/images/german_course_hero.png"}
                                        alt={course.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>

                                    {/* Tags & Badges */}
                                    <div className="absolute top-5 left-5 right-5 flex justify-between items-start">
                                        <div className="flex flex-col gap-2 items-start">
                                            <span className="px-4 py-1.5 bg-white/95 backdrop-blur-sm text-slate-900 text-xs font-black rounded-full shadow-sm">
                                                {course.level}
                                            </span>
                                            {course.tag && (
                                                <span className="px-4 py-1.5 bg-gradient-to-r from-[#FF2D78] to-[#FF6B9D] text-white text-xs font-black rounded-full shadow-sm">
                                                    {course.tag}
                                                </span>
                                            )}
                                        </div>
                                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100 shadow-lg">
                                            <PlayCircle className="w-7 h-7" />
                                        </div>
                                    </div>

                                    <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end">
                                        <div className="bg-slate-900/40 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center gap-1.5 border border-white/10">
                                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                            <span className="text-white font-bold text-sm">{course.rating || "5.0"}</span>
                                            <span className="text-white/70 text-xs">({course.students || "0"})</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Course Info */}
                                <div className="p-8 flex flex-col flex-grow">
                                    <h3 className="mb-3 text-xl font-bold text-slate-900 group-hover:text-[#FF2D78] transition-colors line-clamp-2 leading-snug">
                                        {course.title}
                                    </h3>

                                    <p className="text-sm text-slate-500 line-clamp-2 mb-6 leading-relaxed">
                                        {course.description}
                                    </p>

                                    <div className="grid grid-cols-2 gap-y-3 mb-8 mt-auto px-5 py-4 bg-slate-50 rounded-2xl group-hover:bg-[#FFF5F8] transition-colors border border-slate-100 group-hover:border-[#FF2D78]/10">
                                        <div className="flex items-center gap-2 text-sm text-slate-600 font-bold">
                                            <BookOpen className="w-4 h-4 text-[#FF2D78]" />
                                            {course.lessons?.length || 0} bài
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-slate-600 font-bold">
                                            <Clock className="w-4 h-4 text-[#FF2D78]" />
                                            {course.duration || "Đang cập nhật"}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between border-t border-slate-100 pt-6">
                                        <div>
                                            <div className="text-xs text-slate-400 line-through mb-1 font-medium">{course.originalPrice || ""}</div>
                                            <div className="text-2xl font-black text-slate-900">
                                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(course.price)}
                                            </div>
                                        </div>
                                        <div className="w-12 h-12 rounded-2xl bg-[#FFF5F8] flex items-center justify-center group-hover:bg-[#FF2D78] transition-colors duration-300">
                                            <ArrowRight className="w-5 h-5 text-[#FF2D78] group-hover:text-white transition-colors" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {filteredCourses.length === 0 && !loading && (
                        <div className="py-32 text-center max-w-sm mx-auto animate-in fade-in zoom-in duration-500">
                            <div className="w-24 h-24 bg-[#FFF5F8] rounded-full flex items-center justify-center mx-auto mb-6">
                                <Search className="h-10 w-10 text-[#FF2D78]" />
                            </div>
                            <h3 className="mb-3 text-2xl font-bold text-slate-900">Không tìm thấy khóa học</h3>
                            <p className="text-slate-500 mb-8">
                                Rất tiếc, không có khóa học nào khớp với tìm kiếm của bạn. Vui lòng thử lại với từ khóa khác.
                            </p>
                            <button
                                onClick={() => {
                                    setSearchQuery("");
                                    setSelectedLevel("all");
                                }}
                                className="inline-flex items-center justify-center gap-2 rounded-xl btn-gradient px-8 py-3.5 text-sm font-bold shadow-lg shadow-[#FF2D78]/20 transition-all hover:scale-105 active:scale-95"
                            >
                                Xóa bộ lọc
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
