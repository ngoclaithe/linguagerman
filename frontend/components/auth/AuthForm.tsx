'use client';

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookOpen, Mail, Lock, Eye, EyeOff, User, ArrowRight, Languages } from "lucide-react";
import { authAPI } from "@/lib/api";
import { useAuthStore } from "@/lib/store";

interface AuthFormProps {
    type: "login" | "register";
}

export function AuthForm({ type }: AuthFormProps) {
    const isLogin = type === "login";
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();
    const login = useAuthStore((state) => state.login);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            if (isLogin) {
                const response: any = await authAPI.login(email, password);
                login(response);
            } else {
                const response: any = await authAPI.register(email, password, name);
                login(response);
            }
            router.push("/dashboard");
        } catch (err: any) {
            setError(err.response?.data?.message || (isLogin ? "Đăng nhập thất bại" : "Đăng ký thất bại"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex selection:bg-[#C53030]/20 selection:text-[#C53030]">
            {}
            <div className="hidden lg:flex w-1/2 relative bg-slate-900 justify-center items-center overflow-hidden">
                {}
                <div className="absolute inset-0 bg-[#C53030]/10 mix-blend-luminosity duration-1000 transition-all hover:scale-105 hover:opacity-50"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                <div className="absolute bottom-[-20%] left-[-10%] w-[70%] h-[70%] bg-[#C53030]/30 blur-[120px] rounded-full pointer-events-none"></div>

                <div className="relative z-10 w-full max-w-lg px-8 flex flex-col items-start text-left mt-32">
                    <Link href="/" className="mb-12 flex items-center gap-3 group">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#C53030] to-rose-500 shadow-lg shadow-[#C53030]/30 group-hover:scale-105 transition-transform duration-300">
                            <Languages className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-3xl font-black text-white tracking-tight">
                            LinguaGerman
                        </span>
                    </Link>

                    <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
                        Khám phá vẻ đẹp<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C53030] to-rose-400">Tiếng Đức Hiện Đại</span>
                    </h2>
                    <p className="text-lg text-slate-300 leading-relaxed mb-10 max-w-md">
                        Trải nghiệm học tập thế hệ mới. Lộ trình cá nhân hóa, công nghệ AI thông minh và thiết kế tối ưu cho hành trình chinh phục tiếng Đức của bạn.
                    </p>

                    <div className="flex items-center gap-4 text-sm font-medium text-slate-300 bg-white/5 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10">
                        <div className="flex -space-x-2">
                            <div className="w-8 h-8 rounded-full bg-slate-300 border-2 border-slate-900"></div>
                            <div className="w-8 h-8 rounded-full bg-slate-400 border-2 border-slate-900"></div>
                            <div className="w-8 h-8 rounded-full bg-[#C53030] flex items-center justify-center border-2 border-slate-900 text-white text-xs">+10k</div>
                        </div>
                        <span>Học viên đang theo học</span>
                    </div>
                </div>
            </div>

            {}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative overflow-hidden bg-slate-50">
                <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#C53030]/5 via-transparent to-transparent pointer-events-none"></div>

                <div className="w-full max-w-md relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <Link href="/" className="lg:hidden mb-10 flex items-center justify-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#C53030] to-rose-500 shadow-md">
                            <Languages className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-2xl font-black tracking-tight text-slate-900">
                            LinguaGerman
                        </span>
                    </Link>

                    <div className="mb-10 lg:text-left text-center">
                        <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-3 tracking-tight">
                            {isLogin ? "Đăng nhập" : "Tạo tài khoản"}
                        </h2>
                        <p className="text-slate-500 text-lg">
                            {isLogin
                                ? "Chào mừng bạn đã quay trở lại!"
                                : "Bắt đầu hành trình chinh phục tiếng Đức ngay hôm nay."}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {error && (
                            <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium">
                                {error}
                            </div>
                        )}

                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1.5 focus-within:text-[#C53030] transition-colors">Họ và tên</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-[#C53030] transition-colors" />
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="VD: Nguyễn Văn A"
                                        className="w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 py-3.5 outline-none focus:border-[#C53030]/50 focus:ring-4 focus:ring-[#C53030]/10 transition-all text-slate-900 font-medium placeholder:font-normal placeholder:text-slate-400"
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1.5 focus-within:text-[#C53030] transition-colors">Địa chỉ Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-[#C53030] transition-colors" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@example.com"
                                    className="w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 py-3.5 outline-none focus:border-[#C53030]/50 focus:ring-4 focus:ring-[#C53030]/10 transition-all text-slate-900 font-medium placeholder:font-normal placeholder:text-slate-400"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label className="block text-sm font-bold text-slate-700 focus-within:text-[#C53030] transition-colors">Mật khẩu</label>
                                {isLogin && (
                                    <a href="#" className="font-semibold cursor-pointer text-sm text-[#C53030] hover:text-[#C53030]/80 transition-colors">
                                        Quên mật khẩu?
                                    </a>
                                )}
                            </div>

                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-[#C53030] transition-colors" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder=""
                                    className="w-full rounded-xl border border-slate-200 bg-white pl-12 pr-12 py-3.5 outline-none focus:border-[#C53030]/50 focus:ring-4 focus:ring-[#C53030]/10 transition-all text-slate-900 font-medium placeholder:font-normal placeholder:text-slate-400 tracking-wider"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                                    tabIndex={-1}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-xl bg-slate-900 mt-2 py-4 font-bold text-white shadow-xl shadow-slate-200 hover:bg-[#C53030] hover:-translate-y-0.5 hover:shadow-[#C53030]/20 transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:pointer-events-none"
                        >
                            {loading ? (
                                "Đang xử lý..."
                            ) : (
                                <>
                                    {isLogin ? "Đăng nhập ngay" : "Đăng ký tài khoản"}
                                    <ArrowRight className="w-4 h-4 opacity-70 group-hover:translate-x-1 group-hover:opacity-100 transition-all" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="my-8 flex items-center gap-4">
                        <div className="h-px flex-1 bg-slate-200" />
                        <span className="text-sm font-semibold text-slate-400 uppercase tracking-widest">Hoặc</span>
                        <div className="h-px flex-1 bg-slate-200" />
                    </div>

                    <div className="space-y-3">
                        <button className="w-full rounded-xl border border-slate-200 bg-white py-3.5 font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-3 shadow-sm">
                            <svg className="h-5 w-5" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Tiếp tục với Google
                        </button>
                    </div>

                    <div className="mt-10 text-center text-slate-600 font-medium bg-slate-100 py-3 rounded-xl border border-slate-200/60">
                        {isLogin ? (
                            <>
                                Bạn chưa có tài khoản?{" "}
                                <Link
                                    href="/register"
                                    className="text-[#C53030] font-bold hover:text-rose-600 transition-colors"
                                >
                                    Đăng ký ngay
                                </Link>
                            </>
                        ) : (
                            <>
                                Bạn đã có tài khoản?{" "}
                                <Link
                                    href="/login"
                                    className="text-[#C53030] font-bold hover:text-rose-600 transition-colors"
                                >
                                    Đăng nhập
                                </Link>
                            </>
                        )}
                    </div>

                    <p className="mt-8 text-center text-xs font-medium text-slate-400">
                        Bằng việc tiếp tục, bạn đồng ý với{" "}
                        <a href="#" className="underline hover:text-slate-600 transition-colors">Điều khoản dịch vụ</a>
                        {" "}và{" "}
                        <a href="#" className="underline hover:text-slate-600 transition-colors">Chính sách bảo mật</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
