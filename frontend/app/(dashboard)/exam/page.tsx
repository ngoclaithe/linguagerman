'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Play, Clock, FileText, Trophy, Calendar } from "lucide-react";
import { examsAPI } from "@/lib/api";

export default function ExamsListPage() {
    const [exams, setExams] = useState<any[]>([]);
    const [myResults, setMyResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [allExams, results] = await Promise.all([
                    examsAPI.list(),
                    examsAPI.getMyResults()
                ]);
                setExams(allExams || []);
                setMyResults(results || []);
            } catch (error) {
                console.error("Failed to fetch exams", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div>Đang tải danh sách ề thi...</div>;

    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-20 font-sans">
            <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
                {}

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl lg:text-5xl font-black text-slate-900 mb-4 tracking-tight">
                            Luyn tập <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C53030] to-rose-400">Đề thi</span>
                        </h1>
                        <p className="text-slate-500 text-lg font-medium">
                            Nâng cao kỹ nng và làm quen vi cấu trúc ề thi Goethe
                        </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {exams.map((exam) => {
                        const bestResult = myResults.filter(r => r.examId === exam.id).sort((a, b) => b.score - a.score)[0];
                        return (
                            <div key={exam.id} className="group rounded-[2rem] border border-slate-100 bg-white p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <div className="mb-6 flex items-center justify-between">
                                    <div className="h-12 w-12 rounded-2xl bg-[#C53030]/10 flex items-center justify-center text-[#C53030]">
                                        <FileText className="w-6 h-6" />
                                    </div>
                                    <span className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-bold text-slate-500 uppercase tracking-wider">
                                        {exam.level}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-[#C53030] transition-colors">{exam.title}</h3>

                                <div className="flex flex-wrap gap-4 mb-6">
                                    <div className="flex items-center gap-1.5 text-sm font-medium text-slate-400">
                                        <Clock className="w-4 h-4" />
                                        {exam.duration} phút
                                    </div>
                                    <div className="flex items-center gap-1.5 text-sm font-medium text-slate-400">
                                        <FileText className="w-4 h-4" />
                                        {exam.questions?.length || 0} câu hỏi
                                    </div>
                                </div>

                                {bestResult && (
                                    <div className="mb-6 p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Trophy className="w-4 h-4 text-emerald-500" />
                                            <span className="text-xs font-bold text-emerald-700">Đim cao nhất</span>
                                        </div>
                                        <span className="text-sm font-black text-emerald-600">{bestResult.score}%</span>
                                    </div>
                                )}

                                <Link
                                    href={`/exam/${exam.id}`}
                                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 font-bold text-white shadow-lg hover:bg-[#C53030] transition-all"
                                >
                                    <Play className="w-4 h-4 fill-current" />
                                    Bắt ầu thi
                                </Link>
                            </div>
                        );
                    })}
                </div>

                {exams.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-[2rem] border border-dashed border-slate-200">
                        <Calendar className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Hin chưa có ề thi nào</h3>
                        <p className="text-slate-500">Quay lại sau nhé!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
