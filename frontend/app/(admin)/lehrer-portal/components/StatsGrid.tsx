import React from "react";
import { TrendingUp, LucideIcon } from "lucide-react";

interface StatItem {
    icon: LucideIcon;
    label: string;
    value: string;
    change: string;
    trend: string;
    color: string;
    bgColor: string;
}

interface StatsGridProps {
    stats: StatItem[];
}

const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => {
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
                <div
                    key={index}
                    className="group rounded-[2rem] border border-slate-100 bg-white p-6 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300"
                >
                    <div className="flex items-start justify-between mb-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.bgColor}`}>
                            <stat.icon className={`w-6 h-6 ${stat.color}`} />
                        </div>
                        <div className="flex items-center gap-1 font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg text-xs">
                            <TrendingUp className="w-3 h-3" />
                            {stat.change}
                        </div>
                    </div>
                    <div>
                        <div className="text-3xl font-black text-slate-900 mb-1">{stat.value}</div>
                        <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StatsGrid;
