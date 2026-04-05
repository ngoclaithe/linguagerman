import React from "react";
import { Edit, Trash2 } from "lucide-react";

interface FlashcardRow {
    id: string;
    word: string;
    kana: string;
    meaning: string;
    level: string;
    example: string;
}

interface FlashcardTableProps {
    flashcards: FlashcardRow[];
    onEdit: (fc: any) => void;
    onDelete: (id: string) => void;
}

const FlashcardTable: React.FC<FlashcardTableProps> = ({ flashcards, onEdit, onDelete }) => {
    return (
        <tbody className="divide-y divide-slate-100 bg-white">
            {flashcards.map((fc) => (
                <tr key={fc.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                        <div className="flex flex-col">
                            <span className="font-bold text-slate-900">{fc.word}</span>
                            <span className="text-xs text-slate-500">{fc.kana}</span>
                        </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-700">{fc.meaning}</td>
                    <td className="px-6 py-4">
                        <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 font-bold text-xs rounded-lg">{fc.level}</span>
                    </td>
                    <td className="px-6 py-4 truncate max-w-[200px] font-medium text-slate-500 italic">"{fc.example}"</td>
                    <td className="px-6 py-4 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                            onClick={() => onEdit(fc)}
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-[#C53030] hover:bg-rose-50 transition-colors"
                        >
                            <Edit className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => onDelete(fc.id)}
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

export default FlashcardTable;
