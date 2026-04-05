'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Facebook,
    Twitter,
    Instagram,
    Youtube,
    MessageSquare,
    Globe2,
    Languages
} from "lucide-react";

export default function Footer() {
    const pathname = usePathname();
    const isAdminPage = pathname?.startsWith('/lehrer-portal');
    const isAuthPage = pathname === '/login' || pathname === '/register';
    const isSessionPage = pathname?.includes('/lesson/') || pathname === '/flashcards' || (pathname?.startsWith('/exam/') && pathname !== '/exam');

    if (isAdminPage || isAuthPage || isSessionPage) return null;

    return (
        <footer className="bg-slate-50 pt-24 pb-12 overflow-hidden border-t border-slate-100">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-4 gap-16 lg:gap-8 mb-20">
                    <div className="col-span-1 lg:col-span-1">
                        <Link href="/" className="text-3xl font-black flex items-center gap-2 mb-8">
                            <div className="w-10 h-10 bg-[#FF2D78] rounded-xl flex items-center justify-center text-white rotate-3">
                                <Languages className="w-6 h-6" />
                            </div>
                            <span className="text-slate-900 tracking-tight">Lingua<span className="text-[#FF2D78]">German</span></span>
                        </Link>
                        <p className="text-slate-500 font-medium mb-8 leading-relaxed">
                            Nền tảng học Tiếng Đức hàng đầu Việt Nam, giúp người Việt chinh phục chứng chỉ Goethe/Telc và bứt phá sự nghiệp với công nghệ EdTech hàng đầu.
                        </p>
                        <div className="flex items-center gap-4">
                            {[Facebook, Twitter, Instagram, Youtube].map((Icon, idx) => (
                                <button key={idx} className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#FF2D78] hover:border-[#FF2D78]/30 transition-all">
                                    <Icon className="w-5 h-5" />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="col-span-1">
                        <h4 className="text-lg font-[1000] text-slate-900 mb-8 uppercase tracking-widest text-xs">Về chúng tôi</h4>
                        <ul className="space-y-4">
                            {[
                                { label: "Giới thiệu LinguaGerman", href: "#" },
                                { label: "Lộ trình đào tạo", href: "/courses" },
                                { label: "Đội ngũ giảng viên", href: "/teachers" },
                                { label: "Đối tác chiến lược", href: "#" },
                                { label: "Cơ hội nghề nghiệp", href: "#" },
                            ].map((item) => (
                                <li key={item.label}>
                                    <Link href={item.href} className="text-slate-500 font-bold hover:text-[#FF2D78] transition-colors">
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="col-span-1">
                        <h4 className="text-lg font-[1000] text-slate-900 mb-8 uppercase tracking-widest text-xs">Hỗ trợ học viên</h4>
                        <ul className="space-y-4">
                            {["Trung tâm trợ giúp", "Điều khoản sử dụng", "Chính sách bảo mật", "Hướng dẫn đăng ký", "Liên hệ học vụ"].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-slate-500 font-bold hover:text-[#FF2D78] transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="col-span-1">
                        <h4 className="text-lg font-[1000] text-slate-900 mb-8 uppercase tracking-widest text-xs">Phòng Tuyển sinh</h4>
                        <ul className="space-y-5">
                            <li className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-[#FFF5F8] flex items-center justify-center text-[#FF2D78] shrink-0">
                                    <MessageSquare className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Hotline 24/7</div>
                                    <div className="text-lg font-black text-slate-900">1900 8181</div>
                                </div>
                            </li>
                            <li className="flex items-start gap-4 text-slate-500 font-medium">
                                <Globe2 className="w-5 h-5 text-slate-300 shrink-0" />
                                <span>Số 1 Đại học Bách Khoa, Hai Bà Trưng, Hà Nội</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-12 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6 text-sm font-bold text-slate-400">
                    <p>&copy; 2026 LinguaGerman - High-Performance EdTech Platform. All Rights Reserved.</p>
                    <div className="flex items-center gap-8">
                        <Link href="#" className="hover:text-slate-900">Privacy Policy</Link>
                        <Link href="#" className="hover:text-slate-900">Terms of Service</Link>
                        <Link href="#" className="hover:text-slate-900">Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
