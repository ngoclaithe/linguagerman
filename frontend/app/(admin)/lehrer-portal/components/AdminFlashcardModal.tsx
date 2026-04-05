'use client';

import { X, Save } from "lucide-react";
import { useState, useEffect } from "react";
import { flashcardsAPI } from "@/lib/api";
import { useToast } from "@/components/ui/toast";

interface Props {
    item: any;
    onClose: () => void;
    onSuccess: () => void;
}

export default function AdminFlashcardModal({ item, onClose, onSuccess }: Props) {
    const toast = useToast();
    const [formData, setFormData] = useState({
        word: "",
        kana: "",
        meaning: "",
        example: "",
        level: "A1",
    });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (item) {
            setFormData({
                word: item.word || "",
                kana: item.kana || "",
                meaning: item.meaning || "",
                example: item.example || "",
                level: item.level || "A1",
            });
        }
    }, [item]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            if (item) {
                await flashcardsAPI.update(item.id, formData);
            } else {
                await flashcardsAPI.create(formData);
            }
            toast.success(item ? "Cập nhật flashcard thành công" : "Tạo flashcard thành công");
            onSuccess();
        } catch (error) {
            console.error("Failed to save flashcard", error);
            toast.error("Có li xảy ra khi lưu flashcard");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative bg-white rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
                <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900">{item ? "Chnh sửa" : "Tạo mi"} flashcard</h2>
                        <p className="text-slate-500 text-sm">Điền thông tin từ vựng.</p>
                    </div>
                    <button onClick={onClose} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Từ vựng (T vng/Word)</label>
                            <input
                                required
                                value={formData.word}
                                onChange={(e) => setFormData({ ...formData, word: e.target.value })}
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-[#C53030] focus:bg-white transition-all font-bold text-xl"
                                placeholder="VD: 私"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Cách ọc (Kana/Furigana)</label>
                            <input
                                required
                                value={formData.kana}
                                onChange={(e) => setFormData({ ...formData, kana: e.target.value })}
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-[#C53030] focus:bg-white transition-all"
                                placeholder="VD: "
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Ý nghĩa (Tiếng Vit)</label>
                            <input
                                required
                                value={formData.meaning}
                                onChange={(e) => setFormData({ ...formData, meaning: e.target.value })}
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-[#C53030] focus:bg-white transition-all font-bold"
                                placeholder="VD: Tôi"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Ví dụ</label>
                            <textarea
                                value={formData.example}
                                onChange={(e) => setFormData({ ...formData, example: e.target.value })}
                                rows={3}
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-[#C53030] focus:bg-white transition-all resize-none"
                                placeholder="VD: 私は学で"
                            />
                        </div>
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-4 rounded-xl font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 transition-colors"
                        >
                            Hủy
                        </button>
                        <button
                            disabled={submitting}
                            className="flex-[2] flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-white bg-slate-900 hover:bg-[#C53030] shadow-xl shadow-slate-200 transition-all duration-300 disabled:opacity-50"
                        >
                            <Save className="w-5 h-5" />
                            {submitting ? "Đang lưu..." : "Lưu flashcard"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
