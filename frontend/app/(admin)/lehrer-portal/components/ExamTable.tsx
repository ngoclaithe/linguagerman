import React from "react";
import { Edit, Trash2 } from "lucide-react";

interface ExamRow {
    id: string;
    name: string;
    course: string;
    questions: number;
    attempts: number;
    avgScore: number;
}

interface ExamTableProps {
    exams: ExamRow[];
    onEdit: (id: string) => void;
    onDelete: (id: string, name: string) => void;
}

const ExamTable: React.FC<ExamTableProps> = ({ exams, onEdit, onDelete }) => {
    return (
        <tbody className="divide-y divide-slate-100 bg-white">
            {exams.map((test) => (
                <tr key={test.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4 font-bold text-slate-900">{test.name}</td>
                    <td className="px-6 py-4 font-medium text-slate-500">{test.course}</td>
                    <td className="px-6 py-4 font-bold text-slate-700">{test.questions} câu</td>
                    <td className="px-6 py-4 font-medium text-slate-600">{test.attempts} lượt</td>
                    <td className="px-6 py-4">
                        <span className={`inline-flex items-center justify-center px-2 py-1 rounded font-bold text-xs ${test.avgScore >= 80 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                            {test.avgScore} / 100
                        </span>
                    </td>
                    <td className="px-6 py-4 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                            onClick={() => onEdit(test.id)}
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-[#C53030] hover:bg-rose-50 transition-colors"
                        >
                            <Edit className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => onDelete(test.id, test.name)}
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

export default ExamTable;
