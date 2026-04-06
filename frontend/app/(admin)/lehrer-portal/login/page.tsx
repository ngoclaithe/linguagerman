'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { authAPI } from "@/lib/api";
import { useAuthStore } from "@/lib/store";
import Link from 'next/link';

export default function AdminLoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();
    const { login, user } = useAuthStore();

    
    useEffect(() => {
        if (user && (user.role === 'ADMIN' || (user.role as any) === 'TEACHER')) {
            router.push("/lehrer-portal");
        }
    }, [user, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response: any = await authAPI.login(email, password);

            
            if (response.role !== 'ADMIN' && (response.role as any) !== 'TEACHER') {
                setError("Bạn không có quyền truy cập vào cng quản tr này.");
                return;
            }

            login(response);
            router.push("/lehrer-portal");
        } catch (err: any) {
            setError(err.response?.data?.message || "Đng nhập thất bại. Vui lòng kim tra lại thông tin.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-6 selection:bg-[#C53030]/20 selection:text-[#C53030]">
            {}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#C53030]/10 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]"></div>
            </div>

            <div className="w-full max-w-lg relative z-10">
                {}
                <div className="text-center mb-10">
                    <Link href="/" className="inline-flex items-center gap-3 group mb-6">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#C53030] to-rose-600 shadow-2xl shadow-[#C53030]/20 group-hover:scale-110 transition-transform duration-500 rotate-3 group-hover:rotate-0">
                            <ShieldCheck className="h-8 w-8 text-white" />
                        </div>
                    </Link>
                    <h1 className="text-4xl font-black text-white tracking-tight mb-2">
                        Nihongo <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C53030] to-rose-400">Admin</span>
                    </h1>
                    <p className="text-slate-400 font-medium">Cng thông tin quản tr h thng LinguaGerman</p>
                </div>

                {}
                <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-[2.5rem] p-8 md:p-12 shadow-2xl overflow-hidden relative group">
                    {}
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#C53030]/20 to-blue-500/20 rounded-[2.5rem] blur opacity-0 group-hover:opacity-100 transition duration-1000"></div>

                    <form onSubmit={handleSubmit} className="relative space-y-6">
                        {error && (
                            <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-2xl text-sm font-bold animate-in fade-in zoom-in duration-300 flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.8)]"></div>
                                {error}
                            </div>
                        )}

                        <div className="space-y-6">
                            <div>
                                <label className="block text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-3 ml-1">Email Quản tr</label>
                                <div className="relative group/input">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within/input:text-[#C53030] transition-colors" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="admin@LinguaGerman.vn"
                                        className="w-full rounded-2xl border border-slate-700/50 bg-slate-900/50 pl-12 pr-4 py-4 outline-none focus:border-[#C53030]/50 focus:ring-4 focus:ring-[#C53030]/5 transition-all text-white font-medium placeholder:text-slate-600"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-3 ml-1">
                                    <label className="block text-xs font-black text-slate-500 uppercase tracking-[0.2em]">Mật khẩu</label>
                                    <a href="#" className="text-xs font-bold text-slate-500 hover:text-[#C53030] transition-colors">Yêu cầu cấp lại?</a>
                                </div>
                                <div className="relative group/input">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within/input:text-[#C53030] transition-colors" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder=""
                                        className="w-full rounded-2xl border border-slate-700/50 bg-slate-900/50 pl-12 pr-12 py-4 outline-none focus:border-[#C53030]/50 focus:ring-4 focus:ring-[#C53030]/5 transition-all text-white font-medium placeholder:text-slate-600 tracking-wider"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white focus:outline-none transition-colors"
                                        tabIndex={-1}
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-2xl bg-white mt-4 py-4 font-black text-slate-900 shadow-2xl hover:bg-[#C53030] hover:text-white hover:-translate-y-1 transition-all duration-500 flex items-center justify-center gap-3 group/btn disabled:opacity-50 disabled:pointer-events-none disabled:translate-y-0"
                        >
                            {loading ? (
                                <>
                                    <Zap className="w-5 h-5 animate-pulse" />
                                    Đang xác thực...
                                </>
                            ) : (
                                <>
                                    Truy cập H thng
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    {}
                    <div className="absolute bottom-4 right-8 flex gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#C53030]/20"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-[#C53030]/40"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-[#C53030]/60"></div>
                    </div>
                </div>

                <p className="mt-10 text-center text-sm font-bold text-slate-500">
                    Cảnh báo: Đây là khu vực hạn chế. Truy cập trái phép sẽ b ghi lại.<br />
                    <Link href="/" className="text-[#C53030] hover:underline mt-4 inline-block tracking-widest uppercase text-[10px] font-black opacity-60 hover:opacity-100 transition-opacity">Quay lại trang chủ</Link>
                </p>
            </div>
        </div>
    );
}
