'use client';

import { Flag, Gift, Target, Flame, CheckCircle2, ChevronRight, Zap } from 'lucide-react';
import { useState } from 'react';

export default function MissionsPage() {
    const [claimed, setClaimed] = useState<number[]>([]);

    const dailyMissions = [
        { id: 1, title: 'Hoàn thành 3 bài học', target: 3, current: 3, xp: 50, reward: 'Rương bạc' },
        { id: 2, title: 'Đạt 100 XP hôm nay', target: 100, current: 45, xp: 30, reward: 'Vàng' },
        { id: 3, title: 'Luyện tập Flashcard 1 lần', target: 1, current: 0, xp: 20, reward: 'Vàng' },
    ];

    const weeklyMissions = [
        { id: 4, title: 'Chuỗi học tập 7 ngày', target: 7, current: 5, xp: 200, reward: 'Rương vàng' },
        { id: 5, title: 'Duy trì top 10 Bảng xếp hạng', target: 1, current: 1, xp: 150, reward: 'Huy hiệu' },
    ];

    const handleClaim = (id: number) => {
        if (!claimed.includes(id)) {
            setClaimed([...claimed, id]);
        }
    };

    const renderMission = (mission: any) => {
        const isCompleted = mission.current >= mission.target;
        const isClaimed = claimed.includes(mission.id);
        const progressPercent = Math.min((mission.current / mission.target) * 100, 100);

        return (
            <div key={mission.id} className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between gap-6 group">
                <div className="flex items-center gap-5 flex-1">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${isClaimed ? 'bg-emerald-100 text-emerald-500' : isCompleted ? 'bg-amber-100 text-amber-500 animate-pulse' : 'bg-slate-100 text-slate-400'}`}>
                        {isClaimed ? <CheckCircle2 className="w-7 h-7" /> : <Target className="w-7 h-7" />}
                    </div>
                    <div className="flex-1">
                        <h3 className={`font-bold text-lg mb-1 ${isClaimed ? 'text-slate-400 line-through' : 'text-slate-800'}`}>{mission.title}</h3>
                        <div className="flex items-center gap-2 text-sm font-semibold text-slate-500 mb-3">
                            <span className="flex items-center gap-1 text-amber-500 bg-amber-50 px-2 py-0.5 rounded-md">
                                <Zap className="w-3.5 h-3.5" /> {mission.xp} XP
                            </span>
                            <span className="text-slate-300">•</span>
                            <span className="text-slate-600">Phần thưởng: {mission.reward}</span>
                        </div>
                        <div className="relative h-2.5 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                                className={`absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ${isClaimed ? 'bg-emerald-400' : isCompleted ? 'bg-gradient-to-r from-amber-400 to-amber-500' : 'bg-[#FF2D78]'}`}
                                style={{ width: `${progressPercent}%` }}
                            />
                        </div>
                        <div className="text-right text-xs font-bold text-slate-500 mt-1.5">
                            {mission.current} / {mission.target}
                        </div>
                    </div>
                </div>
                <div>
                    {isClaimed ? (
                        <div className="px-5 py-2.5 text-emerald-500 font-bold border-2 border-emerald-100 rounded-xl bg-emerald-50">
                            Đã nhận
                        </div>
                    ) : isCompleted ? (
                        <button 
                            onClick={() => handleClaim(mission.id)}
                            className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold rounded-xl shadow-lg shadow-amber-500/25 hover:scale-105 active:scale-95 transition-all animate-bounce"
                        >
                            Nhận thưởng
                        </button>
                    ) : (
                        <div className="px-5 py-2.5 text-slate-400 font-bold border-2 border-slate-100 rounded-xl bg-slate-50">
                            Chưa đạt
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] pb-24">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 px-6 py-8">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-indigo-100 text-indigo-500 rounded-2xl flex items-center justify-center shadow-inner">
                            <Flag className="w-7 h-7" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-black text-slate-900">Nhiệm vụ</h1>
                            <p className="text-slate-500 font-medium mt-1">Hoàn thành để nhận XP và phần thưởng hấp dẫn</p>
                        </div>
                    </div>
                    <div className="bg-amber-50 border border-amber-200 px-4 py-2.5 rounded-2xl flex items-center gap-3 shadow-sm">
                        <Flame className="w-6 h-6 text-orange-500" />
                        <div>
                            <div className="text-xs font-bold text-slate-500 uppercase">Chuỗi ngày học</div>
                            <div className="text-xl font-black text-slate-900">5 ngày</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-6 mt-8 space-y-10">
                {/* Daily Chest Progress */}
                <div className="bg-gradient-to-r from-[#FF2D78] to-[#FF6B9D] rounded-[2rem] p-8 text-white relative overflow-hidden shadow-xl shadow-[#FF2D78]/20">
                    <div className="absolute -right-10 -top-10 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
                    <div className="relative z-10 flex items-center justify-between">
                        <div className="flex-1 pr-10">
                            <h2 className="text-2xl font-black mb-2 flex items-center gap-2">
                                <Gift className="w-6 h-6" /> Rương phần thưởng ngày
                            </h2>
                            <p className="text-white/80 font-medium mb-6">Mở khóa rương đặc biệt khi hoàn thành đủ 3 nhiệm vụ hằng ngày.</p>
                            <div className="flex items-center gap-4">
                                <div className="flex-1 h-3 bg-black/20 rounded-full overflow-hidden">
                                    <div className="h-full bg-white rounded-full" style={{ width: '33%' }} />
                                </div>
                                <span className="font-bold">1 / 3 Nhiệm vụ</span>
                            </div>
                        </div>
                        <div className="w-32 h-32 bg-white/20 backdrop-blur-md rounded-full border-4 border-white/30 flex items-center justify-center shrink-0">
                            <Gift className="w-12 h-12 opacity-80" />
                        </div>
                    </div>
                </div>

                {/* Daily Missions */}
                <div>
                    <h2 className="text-xl font-black text-slate-800 mb-5 flex items-center gap-2">
                        <span className="w-2 h-8 bg-indigo-500 rounded-full" /> Nhiệm vụ hôm nay
                    </h2>
                    <div className="space-y-4">
                        {dailyMissions.map(renderMission)}
                    </div>
                </div>

                {/* Weekly Missions */}
                <div>
                    <h2 className="text-xl font-black text-slate-800 mb-5 flex items-center gap-2">
                        <span className="w-2 h-8 bg-purple-500 rounded-full" /> Nhiệm vụ tuần
                    </h2>
                    <div className="space-y-4">
                        {weeklyMissions.map(renderMission)}
                    </div>
                </div>
            </div>
        </div>
    );
}
