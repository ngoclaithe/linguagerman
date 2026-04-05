import React from "react";
import { ChevronRight } from "lucide-react";

interface CourseRow {
    id: string;
    name: string;
    level: string;
    students: number;
    revenue: string;
}

interface PopularCoursesProps {
    courses: CourseRow[];
}

const PopularCourses: React.FC<PopularCoursesProps> = ({ courses }) => {
    return (
        <div className="lg:col-span-2 rounded-[2rem] border border-slate-100 bg-white shadow-sm flex flex-col">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">Khóa học phổ biến nhất</h3>
                <button className="text-[#C53030] text-sm font-bold hover:text-[#C53030]/80 transition-colors flex items-center gap-1">
                    Xem tất cả <ChevronRight className="w-4 h-4" />
                </button>
            </div>
            <div className="p-6">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-100 text-sm font-bold text-slate-400 uppercase tracking-wider">
                                <th className="pb-4 font-bold">Khóa học</th>
                                <th className="pb-4 font-bold">Trình độ</th>
                                <th className="pb-4 font-bold">Học viên</th>
                                <th className="pb-4 font-bold text-right">Doanh thu</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {courses.slice(0, 4).map((course) => (
                                <tr key={course.id} className="group border-b last:border-0 border-slate-50 hover:bg-slate-50/50 transition-colors">
                                    <td className="py-4 font-bold text-slate-900">{course.name}</td>
                                    <td className="py-4">
                                        <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 font-bold text-xs rounded-lg">{course.level}</span>
                                    </td>
                                    <td className="py-4 font-semibold text-slate-600">{course.students}</td>
                                    <td className="py-4 text-right font-black text-[#C53030]">{course.revenue}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PopularCourses;
