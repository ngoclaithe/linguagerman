'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { authAPI } from '@/lib/api';
import { 
    LayoutDashboard, 
    LogOut, 
    Languages, 
    BookOpen, 
    Layers, 
    Target, 
    Users, 
    MessageCircle,
    UserPlus,
    Menu, 
    X,
    ChevronLeft,
    ChevronRight,
    LogIn,
    Trophy,
    Bot,
    Mic,
    Flag
} from 'lucide-react';
import { useState, useEffect } from 'react';

interface SidebarProps {
    isCollapsed: boolean;
    setIsCollapsed: (val: boolean) => void;
}

export default function Sidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    const pathname = usePathname();
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isAdminPage = pathname?.startsWith('/lehrer-portal');
    const isAuthPage = pathname === '/login' || pathname === '/register';
    const isSessionPage = pathname?.includes('/lesson/');

    if (!mounted || isAdminPage || isAuthPage || isSessionPage) return null;

    const navLinks = [
        ...(user ? [{ label: "Học tập", href: "/dashboard", icon: LayoutDashboard, color: "text-amber-500", bg: "bg-amber-100" }] : []),
        { label: "Khóa học", href: "/courses", icon: BookOpen, color: "text-blue-500", bg: "bg-blue-100" },
        { label: "Flashcards", href: "/flashcards", icon: Layers, color: "text-purple-500", bg: "bg-purple-100" },
        ...(user ? [{ label: "Thi thử", href: "/exam", icon: Target, color: "text-rose-500", bg: "bg-rose-100" }] : []),
        { label: "Giáo viên", href: "/teachers", icon: Users, color: "text-emerald-500", bg: "bg-emerald-100" },
        { label: "Cộng đồng", href: "/community", icon: MessageCircle, color: "text-cyan-500", bg: "bg-cyan-100" },
        ...(user ? [
            { label: "Nhiệm vụ", href: "/missions", icon: Flag, color: "text-indigo-500", bg: "bg-indigo-100" },
            { label: "Bảng xếp hạng", href: "/leaderboard", icon: Trophy, color: "text-yellow-500", bg: "bg-yellow-100" },
            { label: "Trò chuyện AI", href: "/ai-chat", icon: Bot, color: "text-violet-500", bg: "bg-violet-100" },
            { label: "Live Talk", href: "/live-talk", icon: Mic, color: "text-pink-500", bg: "bg-pink-100" }
        ] : []),
    ];

    const sidebarWidth = isCollapsed ? 'w-24' : 'w-64';

    return (
        <>
            {/* Mobile Sidebar Toggle - shown when sidebar is hidden on small screens */}
            <button 
                className="lg:hidden fixed top-4 left-4 z-[100] p-2 bg-white rounded-xl shadow-md border border-slate-100"
                onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
                {isMobileOpen ? <X className="w-5 h-5 text-slate-700" /> : <Menu className="w-5 h-5 text-slate-700" />}
            </button>

            {/* Sidebar Container */}
            <aside className={`fixed top-0 left-0 h-screen ${sidebarWidth} bg-[#F8FAFC] border-r border-slate-200 flex flex-col transition-all duration-300 z-[90] ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 shadow-[4px_0_24px_rgba(0,0,0,0.02)]`}>
                
                {/* Desktop Collapse Toggle */}
                <button 
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="hidden lg:flex absolute -right-3 top-8 w-6 h-6 bg-white border border-slate-200 rounded-full items-center justify-center text-slate-500 hover:text-[#FF2D78] hover:border-[#FF2D78] shadow-sm transition-all z-50 focus:outline-none"
                    aria-label="Toggle Sidebar"
                >
                    {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4 ml-0.5" />}
                </button>

                {/* Logo */}
                <div className={`p-6 pb-4 flex items-center ${isCollapsed ? 'justify-center px-0' : ''}`}>
                    <Link href="/" className="flex items-center gap-3 group" title="LinguaGerman">
                        <div className="w-10 h-10 shrink-0 rounded-xl flex items-center justify-center text-white rotate-3 group-hover:rotate-0 transition-all bg-gradient-to-tr from-[#FF2D78] to-[#FF6B9D] shadow-lg shadow-[#FF2D78]/20">
                            <Languages className="w-6 h-6" />
                        </div>
                        {!isCollapsed && (
                            <span className="text-xl transition-colors duration-500 font-bold tracking-tight text-slate-900 group-hover:pl-0.5 whitespace-nowrap overflow-hidden">
                                Lingua<span className="text-[#FF2D78]">German</span>
                            </span>
                        )}
                    </Link>
                </div>

                {/* Navigation Menu */}
                <div className="flex-1 overflow-y-auto px-4 py-3 space-y-1.5 scrollbar-hide">
                    {navLinks.map((item) => {
                        const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                title={isCollapsed ? item.label : undefined}
                                onClick={() => setIsMobileOpen(false)}
                                className={`flex items-center ${isCollapsed ? 'justify-center p-2.5 rounded-[14px]' : 'gap-3 px-3 py-2.5 rounded-[16px]'} transition-all duration-300 ${
                                    isActive 
                                    ? "bg-gradient-to-r from-[#FF2D78] to-[#FF6B9D] text-white shadow-md shadow-[#FF2D78]/25 translate-x-1" 
                                    : "bg-white text-slate-600 hover:bg-slate-50 hover:shadow-sm border border-slate-100/60 hover:-translate-y-[1px]"
                                }`}
                            >
                                <div className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${isActive ? 'bg-white/20 text-white' : item.color + ' ' + item.bg} ${isCollapsed && !isActive ? 'bg-transparent' : ''}`}>
                                    <Icon className="w-4 h-4 ml-[0.5px]" />
                                </div>
                                {!isCollapsed && (
                                    <>
                                        <span className={`text-[13px] whitespace-nowrap ${isActive ? "font-black" : "font-bold"}`}>{item.label}</span>
                                        {isActive && (
                                            <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                        )}
                                    </>
                                )}
                            </Link>
                        );
                    })}
                </div>

                {/* Bottom Section */}
                <div className={`p-4 border-t border-slate-200/60 bg-white/50 backdrop-blur-sm flex flex-col gap-2 ${isCollapsed ? 'items-center px-2' : ''}`}>
                    {user ? (
                        <>
                            <Link 
                                href="/profile" 
                                title={isCollapsed ? user.name || 'Profile' : undefined}
                                className={`flex items-center gap-3 p-2 rounded-2xl hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-slate-100 cursor-pointer group ${isCollapsed ? 'justify-center w-full' : ''}`}
                            >
                                <div className="shrink-0 w-8 h-8 text-xs rounded-full bg-gradient-to-tr from-[#FF2D78] to-[#FF6B9D] flex items-center justify-center text-white font-black shadow-sm group-hover:scale-105 transition-transform">
                                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                </div>
                                {!isCollapsed && (
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[13px] leading-tight font-extrabold text-slate-800 truncate">{user.name}</p>
                                        <p className="text-[11px] font-semibold text-slate-500 truncate">{user.email}</p>
                                    </div>
                                )}
                            </Link>
                            
                            {(user.role === 'ADMIN' || user.role === 'TEACHER') && (
                                <Link
                                    href="/lehrer-portal"
                                    onClick={() => setIsMobileOpen(false)}
                                    title={isCollapsed ? "Quản trị viên" : undefined}
                                    className={`flex items-center justify-center bg-gradient-to-r from-slate-900 to-slate-800 hover:from-black hover:to-slate-900 text-white rounded-[14px] text-[13px] font-bold shadow-sm transition-all active:scale-95 border border-slate-700 ${isCollapsed ? 'w-8 h-8 p-0' : 'w-full gap-2 px-3 py-2.5'}`}
                                >
                                    <LayoutDashboard className="w-4 h-4 shrink-0" />
                                    {!isCollapsed && <span>Quản trị viên</span>}
                                </Link>
                            )}

                            <button
                                onClick={async () => {
                                    try {
                                        await authAPI.logout();
                                    } catch (e) {
                                    } finally {
                                        logout();
                                        window.location.href = '/';
                                    }
                                }}
                                title={isCollapsed ? "Đăng xuất" : undefined}
                                className={`flex items-center justify-center border-2 border-rose-100 bg-rose-50 hover:bg-rose-500 text-rose-500 hover:text-white rounded-[14px] text-[13px] font-bold transition-all group ${isCollapsed ? 'w-8 h-8 p-0' : 'w-full gap-2 px-3 py-2.5'}`}
                            >
                                <LogOut className={`w-4 h-4 shrink-0 ${!isCollapsed ? 'group-hover:-translate-x-1 transition-transform' : ''}`} />
                                {!isCollapsed && <span>Đăng xuất</span>}
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/register" onClick={() => setIsMobileOpen(false)} className={`block ${isCollapsed ? 'w-full flex justify-center' : ''}`} title={isCollapsed ? "Đăng ký" : undefined}>
                                <button className={`flex items-center justify-center bg-gradient-to-r from-[#FF2D78] to-[#FF6B9D] hover:from-[#E0255F] hover:to-[#FF2D78] text-white rounded-[14px] text-[13px] font-black shadow-md shadow-[#FF2D78]/20 transition-all hover:-translate-y-[1px] active:scale-95 transition-transform ${isCollapsed ? 'w-8 h-8 p-0' : 'w-full gap-2 px-3 py-2.5'}`}>
                                    <UserPlus className="w-4 h-4 shrink-0" />
                                    {!isCollapsed && <span>Đăng ký</span>}
                                </button>
                            </Link>
                            <Link href="/login" onClick={() => setIsMobileOpen(false)} className={`block ${isCollapsed ? 'w-full flex justify-center' : ''}`} title={isCollapsed ? "Đăng nhập" : undefined}>
                                <button className={`flex items-center justify-center bg-white hover:bg-slate-50 border-2 border-slate-200 text-slate-700 rounded-[14px] text-[13px] font-bold transition-all shadow-sm ${isCollapsed ? 'w-8 h-8 p-0' : 'w-full gap-2 px-3 py-2'}`}>
                                    <LogIn className="w-4 h-4 shrink-0" />
                                    {!isCollapsed && <span>Đăng nhập</span>}
                                </button>
                            </Link>
                        </>
                    )}
                </div>
            </aside>

            {/* Mobile Overlay */}
            {isMobileOpen && (
                <div 
                    className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[80] lg:hidden transition-all duration-300"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}
        </>
    );
}
