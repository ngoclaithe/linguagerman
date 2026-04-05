'use client';

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, BookOpen, Star, GraduationCap, Mail, MessageCircle, Globe2, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { teachersAPI, getImageUrl } from "@/lib/api";

export default function TeacherDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [teacher, setTeacher] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeacher = async () => {
            if (!params.slug) return;
            try {
                const res = await teachersAPI.getBySlug(params.slug as string);
                setTeacher(res);
            } catch (error) {
                console.error("Failed to fetch teacher", error);
                router.push('/teachers');
            } finally {
                setLoading(false);
            }
        };
        fetchTeacher();
    }, [params.slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 pt-32 flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-[#C53030] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!teacher) return null;

    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-20">
            <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
                <Link
                    href="/teachers"
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-[#C53030] mb-8 font-medium transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Quay lại danh sách
                </Link>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Left side: Info */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-xl sticky top-32"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="w-40 h-40 rounded-[2.5rem] overflow-hidden border-8 border-slate-50 shadow-2xl mb-8">
                                    {teacher.avatar ? (
                                        <img src={getImageUrl(teacher.avatar) || ''} alt={teacher.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                                            <GraduationCap className="w-16 h-16 text-slate-300" />
                                        </div>
                                    )}
                                </div>

                                <h1 className="text-3xl font-black text-slate-900 mb-2">{teacher.name}</h1>
                                <div className="inline-block px-4 py-1.5 bg-rose-50 text-[#C53030] text-xs font-black rounded-full uppercase mb-8 tracking-widest">
                                    Lehrer
                                </div>

                                <div className="grid grid-cols-2 gap-4 w-full mb-10">
                                    <div className="p-4 bg-slate-50 rounded-2xl">
                                        <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Đánh giá</div>
                                        <div className="flex items-center justify-center gap-1">
                                            <span className="text-lg font-black text-slate-900">5.0</span>
                                            <Star className="w-4 h-4 text-amber-500 fill-current" />
                                        </div>
                                    </div>
                                    <div className="p-4 bg-slate-50 rounded-2xl">
                                        <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Khóa học</div>
                                        <div className="text-lg font-black text-slate-900">{teacher.courses?.length || 0}</div>
                                    </div>
                                </div>

                                <div className="flex gap-4 mb-4">
                                    {[Mail, MessageCircle, Globe2].map((Icon, i) => (
                                        <button key={i} className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-[#C53030] hover:text-white transition-all shadow-sm">
                                            <Icon className="w-6 h-6" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right side: Bio & Courses */}
                    <div className="lg:col-span-2 space-y-12">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                                <GraduationCap className="w-6 h-6 text-[#C53030]" />
                                Gii thiu bản thân
                            </h2>
                            <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm leading-relaxed text-slate-600 font-medium italic text-lg lg:text-xl">
                                "{teacher.bio || "Chưa có mô tả chi tiết."}"
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                                <BookOpen className="w-6 h-6 text-[#C53030]" />
                                Khóa học ang giảng dạy
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-6">
                                {teacher.courses?.map((course: any) => (
                                    <div key={course.id} className="group bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all">
                                        <div className="relative h-48">
                                            <img 
                                                src={getImageUrl(course.thumbnail) || '/images/default-course.jpg'} 
                                                alt={course.title} 
                                                className="w-full h-full object-cover transition-transform group-hover:scale-105" 
                                            />
                                            <div className="absolute top-4 left-4">
                                                <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black tracking-widest text-[#C53030] uppercase">
                                                    {course.level}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-xl font-black text-slate-900 mb-4 line-clamp-2 min-h-[3.5rem]">
                                                {course.title}
                                            </h3>
                                            <div className="flex items-center justify-between">
                                                <div className="text-[#C53030] font-black text-lg">
                                                    {course.price.toLocaleString('vi-VN')} 
                                                </div>
                                                <Link 
                                                    href={`/courses/${course.id}`}
                                                    className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center hover:bg-[#C53030] transition-colors"
                                                >
                                                    <ChevronRight className="w-6 h-6" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {(!teacher.courses || teacher.courses.length === 0) && (
                                    <div className="col-span-full py-12 text-center bg-slate-100/50 rounded-[2rem] border-2 border-dashed border-slate-200">
                                        <p className="text-slate-400 font-bold">Chưa có khóa học nào ược ng tải.</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
