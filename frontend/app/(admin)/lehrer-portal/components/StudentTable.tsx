import React from "react";
import { Edit } from "lucide-react";

interface StudentRow {
    id: string;
    name: string;
    email: string;
    courses: number;
    progress: number;
    status: string;
}

interface StudentTableProps {
    students: StudentRow[];
    getStatusBadge: (status: string) => React.ReactNode;
}

const StudentTable: React.FC<StudentTableProps> = ({ students, getStatusBadge }) => {
    return (
        <tbody className="divide-y divide-slate-100 bg-white">
            {students.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">
                                {student.name.charAt(0)}
                            </div>
                            <span className="font-bold text-slate-900">{student.name}</span>
                        </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-500">{student.email}</td>
                    <td className="px-6 py-4 font-bold text-slate-700">{student.courses} khóa</td>
                    <td className="px-6 py-4">
                        <div className="flex items-center gap-3 w-40">
                            <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                                <div className="h-full rounded-full bg-gradient-to-r from-[#C53030] to-rose-400" style={{ width: `${student.progress}%` }} />
                            </div>
                            <span className="font-bold text-slate-700 w-8">{student.progress}%</span>
                        </div>
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(student.status)}</td>
                    <td className="px-6 py-4 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-[#C53030] hover:bg-rose-50 transition-colors">
                            <Edit className="w-4 h-4" />
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
    );
};

export default StudentTable;
