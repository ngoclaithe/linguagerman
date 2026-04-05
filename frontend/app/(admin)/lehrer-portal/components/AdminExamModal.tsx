import { X, Save, Plus, Trash2, Volume2, HelpCircle, FileText, Type, Upload, CheckCircle2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { examsAPI, coursesAPI, adminAPI, getImageUrl } from "@/lib/api";
import { useToast } from "@/components/ui/toast";

interface Props {
    item: any;
    onClose: () => void;
    onSuccess: () => void;
}

export default function AdminExamModal({ item, onClose, onSuccess }: Props) {
    const toast = useToast();
    const [courses, setCourses] = useState<any[]>([]);
    const [formData, setFormData] = useState({
        title: "",
        level: "A1",
        duration: 60,
        courseId: null as string | null,
        published: true,
        questions: [] as any[],
    });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await coursesAPI.manage();
                setCourses(data || []);
            } catch (error) {
                console.error("Failed to fetch courses", error);
            }
        };
        fetchCourses();

        if (item) {
            setFormData({
                title: item.title || "",
                level: item.level || "A1",
                duration: item.duration || 60,
                courseId: item.courseId || null,
                published: item.published ?? true,
                questions: (item.questions || []).map((q: any) => ({
                    ...q,
                    options: Array.isArray(q.options) ? q.options : (typeof q.options === 'string' ? JSON.parse(q.options) : ["", "", "", ""]),
                    type: q.type || 'CHOICE'
                })),
            });
        }
    }, [item]);

    const handleAddQuestion = () => {
        setFormData({
            ...formData,
            questions: [
                ...formData.questions,
                {
                    question: "",
                    type: "CHOICE",
                    options: ["", "", "", ""],
                    correctAnswer: "",
                    explanation: "",
                    audioUrl: "",
                    order: formData.questions.length + 1
                }
            ]
        });
    };

    const handleRemoveQuestion = (idx: number) => {
        const newQs = [...formData.questions];
        newQs.splice(idx, 1);
        setFormData({ ...formData, questions: newQs });
    };

    const handleQuestionChange = (idx: number, field: string, value: any) => {
        const newQs = [...formData.questions];
        newQs[idx] = { ...newQs[idx], [field]: value };

        // Safety for type changes
        if (field === 'type' && (value === 'FILL' || value === 'LISTENING') && !newQs[idx].options) {
            newQs[idx].options = ["", "", "", ""];
        }

        setFormData({ ...formData, questions: newQs });
    };

    const handleOptionChange = (qIdx: number, oIdx: number, value: string) => {
        const newQs = [...formData.questions];
        if (!Array.isArray(newQs[qIdx].options)) {
            newQs[qIdx].options = ["", "", "", ""];
        }
        newQs[qIdx].options[oIdx] = value;
        setFormData({ ...formData, questions: newQs });
    };

    const handleAudioUpload = async (idx: number, file: File) => {
        try {
            const res = await adminAPI.uploadAudio(file);
            handleQuestionChange(idx, "audioUrl", res.url);
            toast.success("Tải lên file audio thành công!");
        } catch (error) {
            console.error("Failed to upload audio", error);
            toast.error("Tải lên file audio thất bại");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            // Clean up options for non-choice questions if needed, but keeping them for now as array is fine
            const submissionData = {
                ...formData,
                questions: formData.questions.map((q, idx) => ({
                    ...q,
                    order: idx + 1,
                    // Ensure options is array of strings
                    options: Array.isArray(q.options) ? q.options : []
                }))
            };

            if (item) {
                await examsAPI.update(item.id, submissionData);
            } else {
                await examsAPI.create(submissionData);
            }
            toast.success(item ? "Cập nhật ề thi thành công" : "Tạo ề thi thành công");
            onSuccess();
        } catch (error) {
            console.error("Failed to save exam", error);
            toast.error("Có li xảy ra khi lưu ề thi");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative bg-white rounded-[2.5rem] w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col">
                <div className="p-8 border-b border-slate-100 flex items-center justify-between shrink-0">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900">{item ? "Chnh sửa" : "Tạo mi"} ề thi</h2>
                        <p className="text-slate-500 text-sm">Quản lý bài thi, câu hỏi trắc nghim, iền từ và bài nghe.</p>
                    </div>
                    <button onClick={onClose} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
                    <div className="grid gap-6 md:grid-cols-4 bg-slate-50 p-6 rounded-3xl border border-slate-100">
                        <div className="space-y-2 md:col-span-1">
                            <label className="text-sm font-bold text-slate-700">Tên ề thi</label>
                            <input
                                required
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-[#C53030] transition-all"
                                placeholder="VD: Đề thi thử Goethe B5 ợt 1"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Trình </label>
                            <select
                                value={formData.level}
                                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-[#C53030] transition-all"
                            >
                                <option value="A1">Goethe B5</option>
                                <option value="A2">Goethe B4</option>
                                <option value="B1">Goethe B3</option>
                                <option value="B2">Goethe B2</option>
                                <option value="C1">Goethe B1</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Thuc khóa học</label>
                            <select
                                value={formData.courseId || ""}
                                onChange={(e) => setFormData({ ...formData, courseId: e.target.value || null })}
                                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-[#C53030] transition-all"
                            >
                                <option value="">Dùng chung (Không thuc khóa học)</option>
                                {courses.map(c => (
                                    <option key={c.id} value={c.id}>{c.title}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex gap-6">
                            <div className="space-y-2 flex-1">
                                <label className="text-sm font-bold text-slate-700">Thời gian</label>
                                <input
                                    type="number"
                                    value={formData.duration}
                                    onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-[#C53030] transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Trạng thái</label>
                                <div className="flex items-center h-[52px]">
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, published: !formData.published })}
                                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${formData.published ? 'bg-[#C53030]' : 'bg-slate-200'}`}
                                    >
                                        <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${formData.published ? 'translate-x-5' : 'translate-x-0'}`} />
                                    </button>
                                    <span className="ml-3 text-sm font-medium text-slate-600">{formData.published ? 'Hin' : 'Ẩn'}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold text-slate-900">Danh sách câu hỏi ({formData.questions.length})</h3>
                            <button
                                type="button"
                                onClick={handleAddQuestion}
                                className="flex items-center gap-2 px-4 py-2 bg-[#C53030] text-white rounded-xl font-bold text-sm hover:bg-[#C53030]/90 transition-colors shadow-lg shadow-[#C53030]/20"
                            >
                                <Plus className="w-4 h-4" />
                                Thêm câu hỏi
                            </button>
                        </div>

                        <div className="space-y-6">
                            {formData.questions.map((q, qIdx) => (
                                <div key={qIdx} className="p-6 rounded-3xl border border-slate-100 bg-white shadow-sm space-y-6">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1 flex gap-6 items-start">
                                            <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm shrink-0">
                                                {qIdx + 1}
                                            </div>

                                            <div className="flex-1 space-y-4">
                                                <div className="grid md:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Loại câu hỏi</label>
                                                        <div className="flex gap-2 p-1 bg-slate-100 rounded-xl">
                                                            {[
                                                                { id: 'CHOICE', icon: HelpCircle, label: 'Trắc nghim' },
                                                                { id: 'FILL', icon: Type, label: 'Điền từ' },
                                                                { id: 'LISTENING', icon: Volume2, label: 'Bài nghe' }
                                                            ].map(type => (
                                                                <button
                                                                    key={type.id}
                                                                    type="button"
                                                                    onClick={() => handleQuestionChange(qIdx, "type", type.id)}
                                                                    className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all ${q.type === type.id ? 'bg-white text-[#C53030] shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
                                                                >
                                                                    <type.icon className="w-3.5 h-3.5" />
                                                                    {type.label}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    {q.type === 'LISTENING' && (
                                                        <div className="space-y-2 animate-in fade-in slide-in-from-left-2 transition-all">
                                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">File Audio (Tải lên)</label>
                                                            <div className="flex gap-3 items-center">
                                                                <label className={`flex-1 relative flex items-center gap-3 px-4 py-2.5 rounded-xl border-2 border-dashed transition-all cursor-pointer ${q.audioUrl ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-slate-200 bg-slate-50 text-slate-500 hover:border-[#C53030] hover:bg-rose-50'}`}>
                                                                    <input
                                                                        type="file"
                                                                        accept="audio/*"
                                                                        className="hidden"
                                                                        onChange={(e) => {
                                                                            const file = e.target.files?.[0];
                                                                            if (file) handleAudioUpload(qIdx, file);
                                                                        }}
                                                                    />
                                                                    {q.audioUrl ? (
                                                                        <>
                                                                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                                                            <span className="text-xs font-bold truncate">Đã tải lên: {q.audioUrl.split('/').pop()}</span>
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <Upload className="w-4 h-4" />
                                                                            <span className="text-xs font-bold">Lựa chọn file bài nghe (.mp3)</span>
                                                                        </>
                                                                    )}
                                                                </label>
                                                                {q.audioUrl && (
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => {
                                                                            const audio = new Audio(getImageUrl(q.audioUrl)!);
                                                                            audio.play();
                                                                        }}
                                                                        className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center hover:bg-emerald-100 transition-colors"
                                                                        title="Nghe thử"
                                                                    >
                                                                        <Volume2 className="w-5 h-5" />
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Ni dung câu hỏi</label>
                                                    <textarea
                                                        required
                                                        value={q.question}
                                                        rows={2}
                                                        onChange={(e) => handleQuestionChange(qIdx, "question", e.target.value)}
                                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-[#C53030] focus:bg-white transition-all text-sm font-medium"
                                                        placeholder="Nhập ni dung câu hỏi..."
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveQuestion(qIdx)}
                                            className="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center hover:bg-rose-100 transition-colors shrink-0"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>

                                    {/* Options Only for CHOICE and LISTENING (if needed) - let's keep them always for Choice/Listening */}
                                    {(q.type === 'CHOICE' || q.type === 'LISTENING') && (
                                        <div className="grid gap-4 md:grid-cols-2 pl-16">
                                            {Array.isArray(q.options) && q.options.map((opt: string, oIdx: number) => (
                                                <div key={oIdx} className="flex gap-2">
                                                    <span className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-slate-500 shrink-0 mt-0.5 text-xs">
                                                        {String.fromCharCode(65 + oIdx)}
                                                    </span>
                                                    <input
                                                        required
                                                        value={opt}
                                                        onChange={(e) => handleOptionChange(qIdx, oIdx, e.target.value)}
                                                        className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 outline-none focus:border-[#C53030] focus:bg-white transition-all text-sm"
                                                        placeholder={`Lựa chọn ${String.fromCharCode(65 + oIdx)}`}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <div className="grid gap-4 md:grid-cols-2 pt-2 pl-16">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                                                {q.type === 'FILL' ? 'Đáp án úng (Người học phải gõ úng chui này)' : 'Đáp án úng'}
                                            </label>
                                            <input
                                                required
                                                value={q.correctAnswer}
                                                onChange={(e) => handleQuestionChange(qIdx, "correctAnswer", e.target.value)}
                                                className="w-full rounded-xl border border-slate-200 bg-emerald-50 px-4 py-3 outline-none focus:border-emerald-500 transition-all font-bold text-emerald-700 text-sm"
                                                placeholder="Nhập áp án úng..."
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Giải thích áp án</label>
                                            <input
                                                value={q.explanation}
                                                onChange={(e) => handleQuestionChange(qIdx, "explanation", e.target.value)}
                                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-[#C53030] transition-all text-sm"
                                                placeholder="Lý do tại sao áp án này úng..."
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </form>

                <div className="p-8 border-t border-slate-100 bg-white flex gap-3 shrink-0">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 px-6 py-4 rounded-xl font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 transition-colors"
                    >
                        Hủy bỏ
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={submitting}
                        className="flex-[2] flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-white bg-slate-900 hover:bg-[#C53030] shadow-xl shadow-slate-200 transition-all duration-300 disabled:opacity-50"
                    >
                        <Save className="w-5 h-5" />
                        {submitting ? "Đang lưu..." : "Lưu ề thi"}
                    </button>
                </div>
            </div>
        </div>
    );
}

