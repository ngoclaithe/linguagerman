'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const pathname = usePathname();
    const hideFooterPaths = ['/ai-chat', '/dashboard', '/courses', '/flashcards', '/exam', '/teachers', '/community', '/missions', '/leaderboard', '/live-talk', '/profile'];
    const hideFooter = hideFooterPaths.some(p => pathname.startsWith(p));

    return (
        <div className="flex min-h-screen">
            <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
            <div className={`flex-1 flex flex-col transition-all duration-300 ${isCollapsed ? 'lg:pl-24' : 'lg:pl-64'}`}>
                <Header />
                <main className="flex-1 flex flex-col min-h-0 bg-white">{children}</main>
                {!hideFooter && <Footer />}
            </div>
        </div>
    );
}
