import React from "react";
import { BookOpen, Edit, Trash2 } from "lucide-react";

interface CourseRow {
    id: string;
    name: string;
    level: string;
    teacher: string;
    students: number;
    revenue: string;
    status: string;
}

interface CourseTableProps {
    courses: CourseRow[];
    onEdit: (course: any, tab?: "info" | "lessons") => void;
    onDelete: (id: string, name: string) => void;
    getStatusBadge: (status: string) => React.ReactNode;
}

const CourseTable: React.FC<CourseTableProps> = ({ courses, onEdit, onDelete, getStatusBadge }) => {
    return (
        <tbody className="divide-y divide-slate-100 bg-white">
            {courses.map((course) => (
                <tr key={course.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4 font-bold text-slate-900">{course.name}</td>
                    <td className="px-6 py-4">
                        <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 font-bold text-xs rounded-lg">{course.level}</span>
                    </td>
                    <td className="px-6 py-4 font-bold text-blue-600">{course.teacher}</td>
                    <td className="px-6 py-4 font-medium text-slate-600">{course.students}</td>
                    <td className="px-6 py-4 font-black text-[#C53030]">{course.revenue}</td>
                    <td className="px-6 py-4">{getStatusBadge(course.status)}</td>
                    <td className="px-6 py-4 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                            onClick={() => onEdit(course, "lessons")}
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                            title="Quản lý bài học"
                        >
                            <BookOpen className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => onEdit(course, "info")}
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-[#C53030] hover:bg-rose-50 transition-colors"
                            title="Sửa thông tin"
                        >
                            <Edit className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => onDelete(course.id, course.name)}
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
    );
};

export default CourseTable;
