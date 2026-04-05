'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/lib/store';
import { authAPI } from '@/lib/api';
import { Menu, X, LogOut, LayoutDashboard, Languages } from 'lucide-react';

export default function Header() {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const isAdminPage = pathname?.startsWith('/lehrer-portal');
    const isAuthPage = pathname === '/login' || pathname === '/register';
    const isSessionPage = pathname?.includes('/lesson/');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (isAdminPage || isAuthPage || isSessionPage) return null;

    const navLinks = [
        { label: "Khóa học", href: "/courses" },
        { label: "Flashcards", href: "/flashcards" },
        ...(user ? [{ label: "Thi thử", href: "/exam" }] : []),
        { label: "Giáo viên", href: "/teachers" },
        { label: "Cộng đồng", href: "/community" },
    ];

    return (
        <header
            className={`fixed w-full top-0 z-[100] transition-all duration-500 delay-75 ${isScrolled || isMobileMenuOpen
                ? "bg-[#FFF5F8]/85 backdrop-blur-xl py-2.5 shadow-[0_10px_30px_rgb(255,45,120,0.15)]"
                : "bg-transparent py-5 lg:py-6"
                }`}
        >
            {/* Animated bottom border when scrolled */}
            <div className={`absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF2D78] to-transparent transition-opacity duration-700 ${isScrolled ? "opacity-30" : "opacity-0"}`} />
            
            {/* Ambient glowing orb inside header on scroll */}
            <div className={`absolute -top-10 -left-10 w-32 h-32 bg-[#FF2D78]/20 rounded-full blur-2xl transition-opacity duration-700 pointer-events-none ${isScrolled ? "opacity-100 animate-float" : "opacity-0"}`} />

            <nav className="container mx-auto px-6 flex items-center justify-between">
                <Link href="/" className="text-2xl font-black flex items-center gap-2 group">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white rotate-3 group-hover:rotate-0 transition-all bg-[#FF2D78]">
                        <Languages className="w-6 h-6" />
                    </div>
                    <span className="transition-colors duration-500 font-bold tracking-tight text-slate-900 group-hover:pl-0.5">
                        Lingua<span className="text-[#FF2D78] group-hover:text-[#FF6B9D] transition-colors">German</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center gap-10">
                    {navLinks.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={`relative text-sm font-black transition-colors duration-300 py-1 ${
                                pathname === item.href 
                                    ? "text-[#FF2D78] after:w-full" 
                                    : "text-slate-600 hover:text-[#FF2D78] after:w-0 hover:after:w-full"
                            } after:absolute after:bottom-0 after:left-0 after:h-[3px] after:rounded-full after:bg-gradient-to-r after:from-[#FF2D78] after:to-[#FF6B9D] after:transition-all after:duration-300`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-5">
                    {user ? (
                        <div className="flex items-center gap-3 sm:gap-6">
                            {(user.role === 'ADMIN' || user.role === 'TEACHER') && (
                                <Link
                                    href="/lehrer-portal"
                                    className="hidden sm:flex items-center gap-2.5 bg-gradient-to-r from-slate-900 to-slate-800 text-white px-5 py-2.5 rounded-xl text-xs font-black hover:from-[#FF2D78] hover:to-[#FF6B9D] transition-all shadow-lg shadow-slate-200 hover:-translate-y-0.5 active:scale-95 border border-white/10"
                                >
                                    <LayoutDashboard className="w-4 h-4" />
                                    <span>Lehrer Portal</span>
                                </Link>
                            )}
                            <Link
                                href="/dashboard"
                                className={`hidden sm:block text-sm font-black transition-all hover:scale-105 ${pathname === '/dashboard' ? "text-[#FF2D78]" : "text-slate-600 hover:text-[#FF2D78]"}`}
                            >
                                Học tập
                            </Link>
                            <button
                                onClick={async () => {
                                    try {
                                        await authAPI.logout();
                                    } catch (e) {
                                        console.error("Logout error", e);
                                    } finally {
                                        logout();
                                        window.location.href = '/';
                                    }
                                }}
                                className="text-sm font-black transition-colors flex items-center gap-2 group text-slate-700 hover:text-[#FF2D78]"
                            >
                                <LogOut className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                                <span className="hidden md:inline">Thoát</span>
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3 ml-2">
                            <Link href="/register">
                                <Button className="group relative overflow-hidden bg-gradient-to-r from-[#FF2D78] to-[#FF6B9D] hover:from-[#E0255F] hover:to-[#FF2D78] text-white rounded-xl px-7 h-11 text-sm font-black shadow-xl shadow-[#FF2D78]/20 transition-all active:scale-95 hover:-translate-y-0.5">
                                    <span className="relative z-10 flex items-center gap-1.5">
                                        Bắt đầu ngay
                                        <div className="w-1.5 h-1.5 rounded-full bg-white opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300" />
                                    </span>
                                    {/* Shimmer effect */}
                                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
                                </Button>
                            </Link>
                        </div>
                    )}

                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-900 border border-slate-200"
                    >
                        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden bg-white border-t border-slate-100 p-6 space-y-4 animate-in slide-in-from-top duration-300">
                    {navLinks.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block text-lg font-bold text-slate-600 hover:text-[#FF2D78] py-2"
                        >
                            {item.label}
                        </Link>
                    ))}
                    {user ? (
                        <div className="pt-4 border-t border-slate-50 flex flex-col gap-3">
                            {(user.role === 'ADMIN' || user.role === 'TEACHER') && (
                                <Link
                                    href="/lehrer-portal"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center gap-3 bg-slate-900 text-white px-5 py-3 rounded-2xl text-base font-black"
                                >
                                    <LayoutDashboard className="w-5 h-5" />
                                    <span>Quản trị viên (Portal)</span>
                                </Link>
                            )}
                            <Link
                                href="/dashboard"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block text-lg font-black text-slate-600 hover:text-[#FF2D78] py-2"
                            >
                                Dashboard của tôi
                            </Link>
                            <button
                                onClick={async () => {
                                    setIsMobileMenuOpen(false);
                                    try {
                                        await authAPI.logout();
                                    } catch (e) { } finally {
                                        logout();
                                        window.location.href = '/';
                                    }
                                }}
                                className="flex items-center gap-2 text-lg font-black text-rose-500 py-2 text-left"
                            >
                                <LogOut className="w-5 h-5" />
                                <span>Đăng xuất tài khoản</span>
                            </button>
                        </div>
                    ) : (
                        <div className="pt-4 border-t border-slate-50 flex flex-col gap-3">
                            <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                                <Button className="w-full bg-[#FF2D78] hover:bg-[#E0255F] text-white rounded-xl h-14 text-base font-black shadow-lg shadow-[#FF2D78]/20">Bắt đầu học ngay</Button>
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </header>
    );
}
