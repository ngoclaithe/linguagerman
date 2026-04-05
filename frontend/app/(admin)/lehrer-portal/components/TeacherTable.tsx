import React from "react";
import { Edit, Trash2, Mail, ExternalLink } from "lucide-react";
import { getImageUrl } from "@/lib/api";

interface TeacherRow {
    id: string;
    name: string;
    email: string;
    avatar: string | null;
    courseCount: number;
    createdAt: string;
}

interface TeacherTableProps {
    teachers: TeacherRow[];
    onEdit: (teacher: any) => void;
    onDelete: (id: string, name: string) => void;
}

const TeacherTable: React.FC<TeacherTableProps> = ({ teachers, onEdit, onDelete }) => {
    return (
        <tbody className="divide-y divide-slate-100 bg-white">
            {teachers.map((teacher) => (
                <tr key={teacher.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-sm border border-slate-100">
                                {teacher.avatar ? (
                                    <img src={getImageUrl(teacher.avatar) || undefined} alt={teacher.name} className="w-full h-full object-cover" />
                                ) : (
                                    teacher.name.charAt(0)
                                )}
                            </div>
                            <div>
                                <span className="font-bold text-slate-900 block">{teacher.name}</span>
                                <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">GIO VIN</span>
                            </div>
                        </div>
                    </td>
                    <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-slate-500 font-medium">
                            <Mail className="w-4 h-4" />
                            {teacher.email}
                        </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                        <div className="inline-flex flex-col">
                            <span className="font-black text-slate-900 text-lg">{teacher.courseCount}</span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Kha hc</span>
                        </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500 font-medium whitespace-nowrap">
                        {new Date(teacher.createdAt).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="px-6 py-4 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                            onClick={() => onEdit(teacher)}
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                            title="Sa thng tin"
                        >
                            <Edit className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => onDelete(teacher.id, teacher.name)}
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Xa gio vin"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </td>
                </tr>
            ))}
            {teachers.length === 0 && (
                <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-2">
                                <ExternalLink className="w-8 h-8" />
                            </div>
                            <p className="text-slate-400 font-bold">Cha c gio vin no trong danh sch</p>
                        </div>
                    </td>
                </tr>
            )}
        </tbody>
    );
};

export default TeacherTable;
