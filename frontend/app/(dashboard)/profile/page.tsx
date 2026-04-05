'use client';

import { useState } from "react";
import {
    User,
    Mail,
    Calendar,
    Award,
    BookOpen,
    Star,
    Settings,
    Camera,
    CheckCircle2,
    Lock,
    Key,
    Shield,
    CreditCard
} from "lucide-react";
import { useAuthStore } from "@/lib/store";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { progressAPI } from "@/lib/api";

export default function ProfilePage() {
    const user = useAuthStore((state) => state.user);
    const [activeTab, setActiveTab] = useState("info");
    const tabs = [
        { id: "info", label: "Thông tin cá nhân", icon: User },
        { id: "security", label: "Bảo mật", icon: Lock },
        { id: "billing", label: "Thanh toán", icon: CreditCard },
        { id: "achievements", label: "Thành tựu", icon: Award },
    ];
    const [stats, setStats] = useState([
        { label: "Khóa học", value: "0", icon: BookOpen, color: "text-blue-500" },
        { label: "Đim thưng", value: "0", icon: Star, color: "text-amber-500" },
        { label: "Ngày học", value: "1", icon: Calendar, color: "text-emerald-500" },
    ]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [courses, progress] = await Promise.all([
                    progressAPI.getMyCourses(),
                    progressAPI.get()
                ]);
                setStats([
                    { label: "Khóa học", value: courses.length.toString(), icon: BookOpen, color: "text-blue-500" },
                    { label: "Đim thưng", value: (progress.completedCount * 10).toString(), icon: Star, color: "text-amber-500" },
                    { label: "Bài ã học", value: progress.completedCount.toString(), icon: CheckCircle2, color: "text-emerald-500" },
                ]);
            } catch (error) {
                console.error("Profile fetch error:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 pb-20 font-sans selection:bg-[#C53030]/20 selection:text-[#C53030]">
            {/* Header / Banner */}
            <div className="h-48 lg:h-64 bg-slate-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/course-A1.jpg')] opacity-20 bg-cover bg-center"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
            </div>

            <div className="container mx-auto px-4 lg:px-8 -mt-24 relative z-10">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Sidebar / Profile Info Card */}
                    <div className="w-full lg:w-1/3 flex flex-col gap-6">
                        <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 text-center flex flex-col items-center">
                            <div className="relative mb-6">
                                <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full bg-gradient-to-tr from-[#C53030] to-rose-400 p-1.5 shadow-xl">
                                    <div className="w-full h-full rounded-full bg-white p-1">
                                        <div className="w-full h-full rounded-full bg-slate-100 flex items-center justify-center text-4xl font-black text-[#C53030]">
                                            {user?.name?.charAt(0) || 'U'}
                                        </div>
                                    </div>
                                </div>
                                <button className="absolute bottom-2 right-2 w-10 h-10 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-slate-600 hover:text-[#C53030] transition-colors">
                                    <Camera className="w-5 h-5" />
                                </button>
                            </div>

                            <h2 className="text-2xl font-black text-slate-900 mb-1">{user?.name || 'Học viên LinguaGerman'}</h2>
                            <p className="text-slate-500 font-medium mb-6">Thành viên từ 01/2026</p>

                            <div className="grid grid-cols-3 w-full gap-4 pt-6 border-t border-slate-100">
                                {stats.map((stat, i) => (
                                    <div key={i} className="text-center">
                                        <div className={`flex justify-center mb-1 ${stat.color}`}>
                                            <stat.icon className="w-5 h-5" />
                                        </div>
                                        <div className="font-bold text-slate-900 text-sm">{stat.value}</div>
                                        <div className="text-[10px] uppercase tracking-wider font-bold text-slate-400">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Navigation Tabs (Sidebar style on Desktop) */}
                        <div className="bg-white rounded-3xl p-3 shadow-sm border border-slate-100 hidden lg:flex flex-col gap-1">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-3 px-5 py-4 rounded-2xl font-bold transition-all ${activeTab === tab.id
                                        ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20"
                                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                                        }`}
                                >
                                    <tab.icon className="w-5 h-5" />
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1">

                        {/* Mobile Tabs */}
                        <div className="lg:hidden flex bg-white rounded-2xl p-1 shadow-sm border border-slate-100 mb-6 overflow-x-auto scrollbar-hide">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex-1 min-w-max flex items-center gap-2 px-4 py-3 rounded-xl font-bold text-xs transition-all ${activeTab === tab.id
                                        ? "bg-slate-900 text-white"
                                        : "text-slate-500"
                                        }`}
                                >
                                    <tab.icon className="w-4 h-4" />
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-xl shadow-slate-200/40 border border-slate-100"
                        >
                            {activeTab === "info" && (
                                <div>
                                    <h3 className="text-2xl font-black text-slate-900 mb-8 border-b border-slate-100 pb-4">Thông tin cá nhân</h3>
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Họ và tên chuyên dùng</label>
                                            <div className="relative">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                <input
                                                    type="text"
                                                    defaultValue={user?.name}
                                                    className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 text-slate-900 font-medium focus:border-[#C53030]/50 focus:ring-4 focus:ring-[#C53030]/10 transition-all outline-none"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Đa ch Email</label>
                                            <div className="relative">
                                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                <input
                                                    type="email"
                                                    defaultValue={user?.email}
                                                    disabled
                                                    className="w-full h-12 bg-slate-100 border border-slate-200 rounded-xl pl-12 pr-4 text-slate-500 font-medium cursor-not-allowed outline-none"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">S in thoại</label>
                                            <input
                                                type="text"
                                                placeholder="09xx xxx xxx"
                                                className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl px-4 text-slate-900 font-medium focus:border-[#C53030]/50 focus:ring-4 focus:ring-[#C53030]/10 transition-all outline-none"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Ngày sinh</label>
                                            <input
                                                type="date"
                                                className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl px-4 text-slate-900 font-medium focus:border-[#C53030]/50 focus:ring-4 focus:ring-[#C53030]/10 transition-all outline-none"
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-12 flex items-center justify-between p-6 bg-rose-50 rounded-2xl border border-rose-100">
                                        <div className="flex items-center gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-rose-500" />
                                            <span className="text-sm font-bold text-rose-700">Tài khoản này ã ược xác thực Email</span>
                                        </div>
                                    </div>

                                    <button className="mt-12 bg-[#C53030] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#A51F1F] shadow-lg shadow-[#C53030]/30 hover:-translate-y-1 transition-all duration-300">
                                        Lưu thay i
                                    </button>
                                </div>
                            )}

                            {activeTab === "security" && (
                                <div>
                                    <h3 className="text-2xl font-black text-slate-900 mb-8 border-b border-slate-100 pb-4">Bảo mật & Mật khẩu</h3>

                                    <div className="space-y-8 max-w-md">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Mật khẩu hin tại</label>
                                            <div className="relative">
                                                <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                <input
                                                    type="password"
                                                    className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 text-slate-900 font-medium focus:border-[#C53030]/50 outline-none transition-all"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Mật khẩu mi</label>
                                            <div className="relative">
                                                <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                <input
                                                    type="password"
                                                    className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 text-slate-900 font-medium focus:border-[#C53030]/50 outline-none transition-all"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Xác nhận mật khẩu</label>
                                            <div className="relative">
                                                <CheckCircle2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                <input
                                                    type="password"
                                                    className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 text-slate-900 font-medium focus:border-[#C53030]/50 outline-none transition-all"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <button className="mt-12 bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-black shadow-lg hover:-translate-y-1 transition-all duration-300">
                                        Cập nhật mật khẩu
                                    </button>
                                </div>
                            )}

                            {activeTab === "billing" && (
                                <div className="text-center py-12">
                                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CreditCard className="w-10 h-10 text-slate-400" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">Chưa có lch sử giao dch</h3>
                                    <p className="text-slate-500 max-w-sm mx-auto">Bạn chưa thực hin bất kỳ giao dch nào trên LinguaGerman. Các hóa ơn sẽ hin th tại ây sau khi bạn ng ký khóa học.</p>
                                    <button className="mt-8 text-[#C53030] font-bold hover:underline">Khám phá các khóa học</button>
                                </div>
                            )}

                            {activeTab === "achievements" && (
                                <div>
                                    <h3 className="text-2xl font-black text-slate-900 mb-8 border-b border-slate-100 pb-4">Danh hiu & Huy hiu</h3>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                                        {[
                                            { name: "Người mi", icon: "", earned: true },
                                            { name: "Chm ch", icon: "", earned: true },
                                            { name: "Bất tử", icon: "", earned: false },
                                            { name: "Thông thái", icon: "", earned: false },
                                            { name: "Vô ch A1", icon: "", earned: false },
                                        ].map((badge, i) => (
                                            <div key={i} className={`p-6 rounded-3xl border ${badge.earned ? 'border-[#C53030]/20 bg-rose-50/50' : 'border-slate-100 bg-slate-50 opacity-40'} flex flex-col items-center gap-3 grayscale-[0.5] hover:grayscale-0 transition-all cursor-pointer`}>
                                                <div className="text-4xl">{badge.icon}</div>
                                                <div className="text-xs font-bold text-slate-900">{badge.name}</div>
                                                {badge.earned && <div className="text-[10px] font-bold text-[#C53030] uppercase">Đã ạt</div>}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}