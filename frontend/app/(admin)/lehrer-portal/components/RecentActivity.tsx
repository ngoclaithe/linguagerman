import React from "react";
import { MoreVertical } from "lucide-react";

interface ActivityItem {
    title: string;
    desc: string;
    time: string;
    type: string;
}

interface RecentActivityProps {
    activities: ActivityItem[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
    return (
        <div className="rounded-[2rem] border border-slate-100 bg-white shadow-sm flex flex-col">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">Hoạt động mới</h3>
                <button className="text-slate-400 hover:text-slate-600 transition-colors">
                    <MoreVertical className="w-5 h-5" />
                </button>
            </div>
            <div className="p-6 flex-1">
                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                    {activities.length > 0 ? (
                        activities.map((activity, index) => (
                            <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-slate-100 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                                    <div className="w-2.5 h-2.5 bg-[#C53030] rounded-full"></div>
                                </div>
                                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] pl-4 md:pl-0 md:group-odd:pr-6 md:group-even:pl-6 text-sm">
                                    <div className="font-bold text-slate-900 mb-0.5">{activity.title}</div>
                                    <div className="text-slate-500 mb-1">{activity.desc}</div>
                                    <div className="text-xs font-semibold text-slate-400">{activity.time}</div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-10">
                            <p className="text-sm text-slate-400 italic">Chưa có hoạt động mới nào.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RecentActivity;
