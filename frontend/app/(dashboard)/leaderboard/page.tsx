'use client';

import { Trophy, Medal, Star, Flame, Crown } from 'lucide-react';

export default function LeaderboardPage() {
    const leaderboardData = [
        { rank: 1, name: 'Nguyễn Văn A', xp: 12500, avatar: 'A' },
        { rank: 2, name: 'Trần Thị B', xp: 11200, avatar: 'B' },
        { rank: 3, name: 'Lê Văn C', xp: 10800, avatar: 'C' },
        { rank: 4, name: 'Phạm D', xp: 9500, avatar: 'D' },
        { rank: 5, name: 'Hoàng E', xp: 8200, avatar: 'E' },
        { rank: 6, name: 'Mai F', xp: 7900, avatar: 'F' },
        { rank: 7, name: 'Đặng G', xp: 7100, avatar: 'G' },
    ];

    const topThree = leaderboardData.slice(0, 3);
    const others = leaderboardData.slice(3);

    return (
        <div className="min-h-screen bg-[#F8FAFC] pb-24">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 px-6 py-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-400/5 rounded-full blur-[100px] pointer-events-none" />
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-yellow-100 text-yellow-500 rounded-2xl flex items-center justify-center shadow-inner">
                            <Trophy className="w-7 h-7" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-black text-slate-900">Bảng xếp hạng</h1>
                            <p className="text-slate-500 font-medium mt-1">Cạnh tranh cùng bạn bè để giành vị trí cao nhất</p>
                        </div>
                    </div>

                    <div className="flex bg-slate-100 p-1.5 rounded-xl border border-slate-200 w-full md:w-auto">
                        <button className="flex-1 md:flex-none px-6 py-2 bg-white text-slate-800 font-bold rounded-lg shadow-sm">Tuần này</button>
                        <button className="flex-1 md:flex-none px-6 py-2 text-slate-500 font-semibold hover:text-slate-800 transition-colors">Tháng này</button>
                        <button className="flex-1 md:flex-none px-6 py-2 text-slate-500 font-semibold hover:text-slate-800 transition-colors">Tất cả</button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-6 mt-12">
                
                {/* Podium Top 3 */}
                <div className="flex items-end justify-center gap-4 md:gap-8 mb-16 h-64">
                    {/* Hạng 2 */}
                    <div className="flex flex-col items-center flex-1 max-w-[140px]">
                        <div className="relative mb-4">
                            <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center text-3xl font-black text-slate-500 border-4 border-slate-300 shadow-lg z-10 relative">
                                {topThree[1].avatar}
                            </div>
                            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-slate-300 text-slate-700 w-8 h-8 rounded-full flex items-center justify-center font-black border-2 border-white z-20 shadow-sm">
                                2
                            </div>
                        </div>
                        <div className="w-full h-32 bg-gradient-to-t from-slate-200 to-slate-100 rounded-t-2xl flex justify-center pt-4 border border-b-0 border-slate-200 relative overflow-hidden">
                            <div className="absolute inset-0 bg-white/40 mask-shine" />
                            <span className="font-black text-slate-500">{topThree[1].xp} XP</span>
                        </div>
                        <div className="text-center mt-3 font-bold text-slate-700 truncate w-full">{topThree[1].name}</div>
                    </div>

                    {/* Hạng 1 */}
                    <div className="flex flex-col items-center flex-1 max-w-[160px] relative z-20">
                        <Crown className="w-10 h-10 text-yellow-500 mb-2 drop-shadow-md animate-bounce" />
                        <div className="relative mb-4">
                            <div className="w-24 h-24 bg-gradient-to-tr from-yellow-400 to-yellow-300 rounded-full flex items-center justify-center text-4xl font-black text-white border-4 border-yellow-200 shadow-xl shadow-yellow-500/30 z-10 relative">
                                {topThree[0].avatar}
                            </div>
                            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 w-9 h-9 rounded-full flex items-center justify-center font-black border-2 border-white z-20 shadow-md">
                                1
                            </div>
                        </div>
                        <div className="w-full h-40 bg-gradient-to-t from-yellow-100 to-yellow-50 rounded-t-2xl flex justify-center pt-4 border border-b-0 border-yellow-200 relative overflow-hidden">
                            <div className="absolute inset-0 bg-white/60" />
                            <span className="font-black text-yellow-600 relative z-10">{topThree[0].xp} XP</span>
                        </div>
                        <div className="text-center mt-3 font-black text-slate-900 text-lg truncate w-full">{topThree[0].name}</div>
                    </div>

                    {/* Hạng 3 */}
                    <div className="flex flex-col items-center flex-1 max-w-[140px]">
                        <div className="relative mb-4">
                            <div className="w-20 h-20 bg-amber-700/20 rounded-full flex items-center justify-center text-3xl font-black text-amber-800 border-4 border-amber-700/30 shadow-lg z-10 relative">
                                {topThree[2].avatar}
                            </div>
                            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-amber-700/30 text-amber-900 w-8 h-8 rounded-full flex items-center justify-center font-black border-2 border-white z-20 shadow-sm">
                                3
                            </div>
                        </div>
                        <div className="w-full h-24 bg-gradient-to-t from-amber-50 to-orange-50 rounded-t-2xl flex justify-center pt-4 border border-b-0 border-amber-200/50 relative overflow-hidden">
                            <div className="absolute inset-0 bg-white/40 mask-shine" />
                            <span className="font-black text-amber-700/80">{topThree[2].xp} XP</span>
                        </div>
                        <div className="text-center mt-3 font-bold text-slate-700 truncate w-full">{topThree[2].name}</div>
                    </div>
                </div>

                {/* List View */}
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                    {others.map((user, index) => (
                        <div key={user.rank} className="flex items-center justify-between p-5 border-b border-slate-100 last:border-b-0 hover:bg-slate-50 transition-colors">
                            <div className="flex items-center gap-5">
                                <div className="w-8 font-black text-slate-400 text-center text-lg">{user.rank}</div>
                                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold bg-gradient-to-tr from-[#FF2D78] to-[#FF6B9D]">
                                    {user.avatar}
                                </div>
                                <div className="font-bold text-slate-800 text-lg">{user.name}</div>
                            </div>
                            <div className="font-black text-slate-600 flex items-center gap-1.5 bg-slate-100 px-4 py-1.5 rounded-full">
                                {user.xp} <span className="text-slate-400 text-xs">XP</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
