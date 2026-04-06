'use client';

import { useState, useEffect } from "react";
import {
    User,
    Mail,
    Lock,
    Key,
    Shield,
    Camera,
    CheckCircle2,
    Save,
    LayoutDashboard,
    FileText,
    Users,
    MessageSquare
} from "lucide-react";
import { useAuthStore } from "@/lib/store";
import { motion } from "framer-motion";
import { usersAPI, adminAPI, getImageUrl } from "@/lib/api";
import { useToast } from "@/components/ui/toast";
import Link from "next/link";

export default function LehrerProfilePage() {
    const user = useAuthStore((state) => state.user);
    const toast = useToast();
    const [activeTab, setActiveTab] = useState("info");
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        bio: "",
        avatar: "",
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                bio: (user as any).bio || "",
                avatar: user.avatar || "",
            });
        }
    }, [user]);

    const tabs = [
        { id: "info", label: "H sơ Lehrer", icon: User },
        { id: "security", label: "Bảo mật", icon: Lock },
    ];

    const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setLoading(true);
            const res = await adminAPI.uploadImage(file);
            setFormData({ ...formData, avatar: res.url });
            toast.success("Tải ảnh ại din thành công!");
        } catch (error) {
            toast.error("Li khi tải ảnh lên");
        } finally {
            setLoading(false);
        }
    };

    const handleSaveInfo = async () => {
        if (!user) return;
        try {
            setLoading(true);
            await usersAPI.update(user.id, {
                name: formData.name,
                bio: formData.bio,
                avatar: formData.avatar
            });
            toast.success("Cập nhật thông tin thành công!");
        } catch (error) {
            toast.error("Li khi cập nhật thông tin");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdatePassword = async () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error("Mật khẩu xác nhận không khp");
            return;
        }
        try {
            setLoading(true);
            await usersAPI.update(user!.id, {
                currentPassword: passwordData.currentPassword,
                password: passwordData.newPassword
            });
            toast.success("Đi mật khẩu thành công!");
            setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Li khi i mật khẩu");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-20 font-sans">
            {}
            <div className="sticky top-0 z-50 bg-gradient-to-r from-slate-950 via-[#9b1c1c] to-slate-950 border-b border-[#C53030]/30 shadow-xl transition-all h-24 flex items-center">
                <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl -z-10"></div>
                <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <Link 
                            href="/lehrer-portal" 
                            className="w-12 h-12 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center text-white border border-white/20 hover:bg-[#C53030] transition-all duration-500 shadow-xl"
                        >
                            <LayoutDashboard className="w-6 h-6" />
                        </Link>
                        <h1 className="text-xl font-black text-white tracking-tight">Cài ặt h sơ Lehrer</h1>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 lg:px-8 py-12">
                <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-8">

                    {}
                    <div className="w-full lg:w-64 flex flex-col gap-2">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-3 px-5 py-4 rounded-2xl font-bold transition-all ${activeTab === tab.id
                                    ? "bg-[#C53030] text-white shadow-lg shadow-rose-200"
                                    : "bg-white text-slate-500 hover:bg-slate-50 border border-slate-100"
                                    }`}
                            >
                                <tab.icon className="w-5 h-5" />
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {}
                    <div className="flex-1">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-xl shadow-slate-200/40 border border-slate-100"
                        >
                            {activeTab === "info" && (
                                <div className="space-y-10">
                                    <div className="flex flex-col md:flex-row gap-8 items-start">
                                        <div className="relative group">
                                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-slate-50 shadow-md">
                                                {formData.avatar ? (
                                                    <img src={getImageUrl(formData.avatar) || undefined} alt="Avatar" className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full bg-slate-100 flex items-center justify-center text-4xl font-black text-[#C53030]">
                                                        {formData.name?.charAt(0) || 'S'}
                                                    </div>
                                                )}
                                            </div>
                                            <label className="absolute bottom-1 right-1 w-10 h-10 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-slate-600 hover:text-[#C53030] cursor-pointer transition-all hover:scale-110">
                                                <Camera className="w-5 h-5" />
                                                <input type="file" className="hidden" accept="image/*" onChange={handleAvatarUpload} />
                                            </label>
                                        </div>

                                        <div className="flex-1 space-y-6 w-full">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Họ và tên hin th</label>
                                                <input
                                                    type="text"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    className="w-full h-14 bg-slate-50 border border-slate-200 rounded-2xl px-5 text-slate-900 font-bold focus:border-[#C53030]/50 focus:ring-4 focus:ring-[#C53030]/10 transition-all outline-none"
                                                    placeholder="Nhập tên của bạn..."
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Đa ch Email (C nh)</label>
                                                <div className="flex items-center gap-3 w-full h-14 bg-slate-100 border border-slate-200 rounded-2xl px-5 text-slate-500 font-medium">
                                                    <Mail className="w-5 h-5" />
                                                    {user?.email}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Gii thiu bản thân (Bio)</label>
                                            <span className="text-[10px] font-bold text-slate-300">Markdown ược h trợ</span>
                                        </div>
                                        <textarea
                                            value={formData.bio}
                                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                            rows={6}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-[2rem] p-6 text-slate-700 font-medium focus:border-[#C53030]/50 focus:bg-white focus:ring-4 focus:ring-[#C53030]/10 transition-all outline-none resize-none"
                                            placeholder="Chia sẻ kinh nghim giảng dạy, s thích và phương châm của bạn..."
                                        />
                                    </div>

                                    <div className="flex justify-end pt-4">
                                        <button
                                            onClick={handleSaveInfo}
                                            disabled={loading}
                                            className="flex items-center gap-3 bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-[#C53030] shadow-xl shadow-slate-200 hover:-translate-y-1 transition-all duration-300 disabled:opacity-50"
                                        >
                                            <Save className="w-5 h-5" />
                                            {loading ? "Đang xử lý..." : "Cập nhật h sơ"}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {activeTab === "security" && (
                                <div className="space-y-8">
                                    <div className="max-w-md space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Mật khẩu hin tại</label>
                                            <div className="relative">
                                                <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                <input
                                                    type="password"
                                                    value={passwordData.currentPassword}
                                                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                                    className="w-full h-14 bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 font-medium focus:border-[#C53030]/50 outline-none transition-all"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Mật khẩu mi</label>
                                            <div className="relative">
                                                <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                <input
                                                    type="password"
                                                    value={passwordData.newPassword}
                                                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                                    className="w-full h-14 bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 font-medium focus:border-[#C53030]/50 outline-none transition-all"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Xác nhận mật khẩu mi</label>
                                            <div className="relative">
                                                <CheckCircle2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                <input
                                                    type="password"
                                                    value={passwordData.confirmPassword}
                                                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                                    className="w-full h-14 bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 font-medium focus:border-[#C53030]/50 outline-none transition-all"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-6">
                                        <button
                                            onClick={handleUpdatePassword}
                                            disabled={loading}
                                            className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-black shadow-xl hover:-translate-y-1 transition-all duration-300 disabled:opacity-50"
                                        >
                                            {loading ? "Đang xử lý..." : "Cập nhật mật khẩu"}
                                        </button>
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
