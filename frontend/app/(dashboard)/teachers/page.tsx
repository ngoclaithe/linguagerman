'use client';

import Link from "next/link";
import { ArrowLeft, Users, Star, GraduationCap, Globe2, Mail, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

import { useState, useEffect } from "react";
import { teachersAPI, getImageUrl } from "@/lib/api";

export default function TeachersPage() {
    const [teachers, setTeachers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const data = await teachersAPI.list();
                setTeachers(data);
            } catch (error) {
                console.error("Failed to fetch teachers", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTeachers();
    }, []);

    return (
        <div className="min-h-screen bg-[#FFF5F8]/50 pt-32 pb-20">
            <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
                {}

                <div className="mb-16 text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FF2D78]/10 border border-[#FF2D78]/20 mb-5">
                       <span className="text-sm font-bold text-[#FF2D78] tracking-widest uppercase">Chuyên gia</span>
                    </div>
                    <h1 className="text-4xl lg:text-6xl font-[1000] text-slate-900 mb-6 tracking-tight leading-tight">
                        Đội ngũ <span className="gradient-text">Giảng viên</span>
                    </h1>
                    <p className="text-lg lg:text-xl text-slate-600 font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                        Những người bạn đồng hành tâm huyết trên hành trình chinh phục ngôn ngữ xứ sở trung tâm Châu Âu.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" style={{ perspective: "1200px" }}>
                    {loading ? (
                        [1, 2, 3].map((i) => (
                            <div key={i} className="bg-white rounded-[2.5rem] p-8 border border-[#FF2D78]/10 shadow-sm animate-pulse h-96"></div>
                        ))
                    ) : (
                        teachers.map((teacher, idx) => (
                            <motion.div
                                key={teacher.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white rounded-[2.5rem] p-8 border border-white shadow-sm transition-all group relative overflow-visible"
                                style={{
                                    transform: "rotate(0deg) translateY(0px) rotateY(0deg) rotateX(0deg)",
                                    transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                                    boxShadow: "0 10px 30px -10px rgba(255,45,120,0.05)",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "rotate(0deg) translateY(-14px) rotateY(-3deg) rotateX(2deg) scale(1.02)";
                                    e.currentTarget.style.boxShadow = "0 30px 60px -15px rgba(255, 45, 120, 0.25), 0 15px 30px -10px rgba(0,0,0,0.1)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "rotate(0deg) translateY(0px) rotateY(0deg) rotateX(0deg) scale(1)";
                                    e.currentTarget.style.boxShadow = "0 10px 30px -10px rgba(255,45,120,0.05)";
                                }}
                            >
                                <Link href={`/teachers/${teacher.slug}`} className="absolute inset-0 z-10 rounded-[2.5rem]"></Link>
                                <div className="flex flex-col items-center text-center">
                                    <div className="relative mb-6">
                                        <div className="absolute inset-0 bg-gradient-to-tr from-[#FF2D78] to-[#FF6B9D] rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
                                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl bg-[#FFF5F8] flex items-center justify-center relative z-10 group-hover:scale-105 transition-transform duration-500">
                                            {teacher.avatar ? (
                                                <img src={getImageUrl(teacher.avatar) || ''} alt={teacher.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <GraduationCap className="w-12 h-12 text-[#FF2D78]/50" />
                                            )}
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-black text-slate-900 mb-1 group-hover:text-[#FF2D78] transition-colors">{teacher.name}</h3>
                                    <div className="inline-block px-4 py-1.5 bg-[#FF2D78]/10 text-[#FF2D78] text-[10px] font-black rounded-full uppercase mb-6 tracking-widest border border-[#FF2D78]/20">
                                        Lehrer / Giảng viên
                                    </div>

                                    <p className="text-slate-500 font-medium mb-8 leading-relaxed italic line-clamp-3">
                                        "{teacher.bio || "Chưa có mô tả bản thân."}"
                                    </p>

                                    <div className="grid grid-cols-2 gap-4 w-full mb-8 relative z-20">
                                        <div className="p-4 bg-slate-50 group-hover:bg-[#FFF5F8] transition-colors rounded-2xl border border-slate-100 group-hover:border-[#FF2D78]/10">
                                            <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Khóa học</div>
                                            <div className="text-lg font-black text-slate-900">{teacher._count?.courses || 0}</div>
                                        </div>
                                        <div className="p-4 bg-slate-50 group-hover:bg-[#FFF5F8] transition-colors rounded-2xl border border-slate-100 group-hover:border-[#FF2D78]/10">
                                            <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Đánh giá</div>
                                            <div className="flex items-center justify-center gap-1">
                                                <span className="text-lg font-black text-slate-900">5.0</span>
                                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 relative z-20">
                                        {[Mail, MessageCircle, Globe2].map((Icon, i) => (
                                            <button key={i} className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-[#FF2D78] hover:text-white transition-all shadow-sm hover:shadow-lg hover:shadow-[#FF2D78]/30">
                                                <Icon className="w-5 h-5" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
