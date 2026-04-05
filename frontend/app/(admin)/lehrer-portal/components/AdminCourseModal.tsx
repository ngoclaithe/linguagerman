'use client';

import { X, Save, Upload } from "lucide-react";
import { useState, useEffect } from "react";
import { coursesAPI, adminAPI, lessonsAPI, getImageUrl } from "@/lib/api";
import { useToast } from "@/components/ui/toast";
import { useRef, useCallback } from "react";
import { BookOpen, Video, FileText, Plus, Trash2, GripVertical, ChevronRight } from "lucide-react";
import { useAuthStore } from "@/lib/store";

interface Props {
    item: any;
    onClose: () => void;
    onSuccess: () => void;
    initialTab?: "info" | "lessons";
}

export default function AdminCourseModal({ item, onClose, onSuccess, initialTab = "info" }: Props) {
    const toast = useToast();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        level: "A1",
        price: 0,
        thumbnail: "",
        teacherId: null as string | null,
    });
    const [teachers, setTeachers] = useState<any[]>([]);
    const [submitting, setSubmitting] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [activeTab, setActiveTab] = useState<"info" | "lessons">(initialTab);
    const [lessons, setLessons] = useState<any[]>([]);
    const [showLessonForm, setShowLessonForm] = useState(false);
    const [currentLesson, setCurrentLesson] = useState<any>(null);
    const [lessonFormData, setLessonFormData] = useState({
        title: "",
        content: "",
        videoUrl: "",
        fileUrl: "",
        order: 0,
        videos: [] as any[],
        files: [] as any[],
    });
    const fileInputRef = useRef<HTMLInputElement>(null);
    const videoInputRef = useRef<HTMLInputElement>(null);
    const docInputRef = useRef<HTMLInputElement>(null);

    const fetchLessons = useCallback(async () => {
        if (!item?.id) return;
        try {
            const data = await lessonsAPI.getByCourse(item.id);
            setLessons(data.sort((a: any, b: any) => a.order - b.order));
        } catch (error) {
            console.error("Failed to fetch lessons", error);
        }
    }, [item?.id]);

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const data = await adminAPI.getTeachers();
                setTeachers(data || []);
            } catch (err) {
                console.error("Failed to fetch teachers", err);
            }
        };
        fetchTeachers();

        const currentUser = useAuthStore.getState().user;
        const isTeacher = (currentUser?.role as any) === 'TEACHER';

        if (item) {
            setFormData({
                title: item.title || "",
                description: item.description || "",
                level: item.level || "A1",
                price: item.price || 0,
                thumbnail: item.thumbnail || "",
                teacherId: item.teacherId || null,
            });
            fetchLessons();
        } else if (isTeacher && currentUser) {
            setFormData(prev => ({ ...prev, teacherId: currentUser.id || (currentUser as any).sub }));
        }
    }, [item, fetchLessons]);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'thumbnail' | 'video' | 'file', index?: number) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            let response: any;
            if (field === 'thumbnail') {
                response = await adminAPI.uploadImage(file);
                setFormData(prev => ({ ...prev, thumbnail: response.url }));
            } else if (field === 'video') {
                response = await adminAPI.uploadVideo(file);
                if (index !== undefined) {
                    const newVideos = [...lessonFormData.videos];
                    newVideos[index] = { ...newVideos[index], videoUrl: response.url, title: newVideos[index].title || file.name };
                    setLessonFormData(prev => ({ ...prev, videos: newVideos }));
                } else {
                    setLessonFormData(prev => ({ ...prev, videoUrl: response.url }));
                }
            } else {
                response = await adminAPI.uploadFile(file);
                if (index !== undefined) {
                    const newFiles = [...lessonFormData.files];
                    newFiles[index] = { ...newFiles[index], fileUrl: response.url, title: newFiles[index].title || file.name };
                    setLessonFormData(prev => ({ ...prev, files: newFiles }));
                } else {
                    setLessonFormData(prev => ({ ...prev, fileUrl: response.url }));
                }
            }
            toast.success("Tải lên thành công");
        } catch (error) {
            console.error("Upload failed", error);
            toast.error("Không th tải lên. Vui lòng thử lại.");
        } finally {
            setUploading(false);
        }
    };

    const handleLessonSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!item?.id) return;
        setSubmitting(true);
        try {
            if (currentLesson) {
                await lessonsAPI.update(currentLesson.id, { ...lessonFormData, courseId: item.id });
                toast.success("Cập nhật bài học thành công");
            } else {
                await lessonsAPI.create({ ...lessonFormData, courseId: item.id, order: lessons.length + 1 });
                toast.success("Thêm bài học thành công");
            }
            setShowLessonForm(false);
            setCurrentLesson(null);
            setLessonFormData({ title: "", content: "", videoUrl: "", fileUrl: "", order: 0, videos: [], files: [] });
            fetchLessons();
        } catch (error) {
            toast.error("Li khi lưu bài học");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteLesson = async (id: string) => {
        if (!confirm("Bạn có chắc chắn mun xóa bài học này?")) return;
        try {
            await lessonsAPI.delete(id);
            toast.success("Xóa bài học thành công");
            fetchLessons();
        } catch (error) {
            toast.error("Li khi xóa bài học");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            if (item) {
                await coursesAPI.update(item.id, formData);
            } else {
                await coursesAPI.create(formData);
            }
            toast.success(item ? "Cập nhật khóa học thành công" : "Tạo khóa học thành công");
            onSuccess();
        } catch (error) {
            console.error("Failed to save course", error);
            toast.error("Có li xảy ra khi lưu khóa học");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
            <div className={`relative bg-white rounded-[2.5rem] w-full ${activeTab === 'info' ? 'max-w-2xl' : 'max-w-4xl'} overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]`}>
                <div className="p-8 border-b border-slate-100 flex items-center justify-between shrink-0">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900">{item ? "Chnh sửa" : "Tạo mi"} khóa học</h2>
                        <div className="flex gap-4 mt-2">
                            <button
                                onClick={() => setActiveTab("info")}
                                className={`text-sm font-bold transition-colors ${activeTab === "info" ? "text-[#C53030]" : "text-slate-400 hover:text-slate-600"}`}
                            >
                                Thông tin chung
                            </button>
                            {item && (
                                <button
                                    onClick={() => setActiveTab("lessons")}
                                    className={`text-sm font-bold transition-colors ${activeTab === "lessons" ? "text-[#C53030]" : "text-slate-400 hover:text-slate-600"}`}
                                >
                                    Danh sách bài học ({lessons.length})
                                </button>
                            )}
                        </div>
                    </div>
                    <button onClick={onClose} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
                    {activeTab === "info" ? (
                        <form id="course-form" onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm font-bold text-slate-700">Tên khóa học</label>
                                    <input
                                        required
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-[#C53030] focus:bg-white transition-all"
                                        placeholder="VD: Tiếng Nhật A1 cấp tc"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Trình </label>
                                    <select
                                        value={formData.level}
                                        onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-[#C53030] focus:bg-white transition-all appearance-none"
                                    >
                                        <option value="A1">Goethe B5</option>
                                        <option value="A2">Goethe B4</option>
                                        <option value="B1">Goethe B3</option>
                                        <option value="B2">Goethe B2</option>
                                        <option value="C1">Goethe B1</option>
                                    </select>
                                </div>

                                {((useAuthStore.getState().user?.role as any) !== 'TEACHER') && (
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Giáo viên phụ trách</label>
                                        <select
                                            value={formData.teacherId || ""}
                                            onChange={(e) => setFormData({ ...formData, teacherId: e.target.value || null })}
                                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-[#C53030] focus:bg-white transition-all appearance-none"
                                        >
                                            <option value="">-- Chọn giáo viên --</option>
                                            {teachers.map(t => (
                                                <option key={t.id} value={t.id}>{t.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Giá khóa học (VND)</label>
                                    <input
                                        type="number"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-[#C53030] focus:bg-white transition-all"
                                    />
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm font-bold text-slate-700">Mô tả khóa học</label>
                                    <textarea
                                        required
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        rows={4}
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-[#C53030] focus:bg-white transition-all resize-none"
                                        placeholder="Mô tả tóm tắt ni dung khóa học..."
                                    />
                                </div>

                                <div className="space-y-4 md:col-span-2">
                                    <label className="text-sm font-bold text-slate-700">Hình ại din (Thumbnail)</label>
                                    <div className="flex flex-col md:flex-row gap-6">
                                        {/* Preview block */}
                                        <div className="w-full md:w-48 h-32 rounded-2xl bg-slate-100 border-2 border-dashed border-slate-200 overflow-hidden relative group">
                                            {formData.thumbnail ? (
                                                <img
                                                    src={getImageUrl(formData.thumbnail) || ""}
                                                    alt="Preview"
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                                                    <Upload className="w-6 h-6 mb-2" />
                                                    <span className="text-[10px] font-bold uppercase tracking-wider">Chưa có ảnh</span>
                                                </div>
                                            )}
                                            {uploading && (
                                                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
                                                    <div className="w-6 h-6 border-2 border-[#C53030] border-t-transparent rounded-full animate-spin"></div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex-1 space-y-4">
                                            <div className="flex gap-3">
                                                <input
                                                    type="text"
                                                    value={formData.thumbnail}
                                                    onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                                                    className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs outline-none focus:border-[#C53030] focus:bg-white transition-all"
                                                    placeholder="URL ảnh hoặc tải lên..."
                                                />
                                                <input
                                                    type="file"
                                                    className="hidden"
                                                    ref={fileInputRef}
                                                    accept="image/*"
                                                    onChange={(e) => handleFileUpload(e, 'thumbnail')}
                                                />
                                                <button
                                                    type="button"
                                                    disabled={uploading}
                                                    onClick={() => fileInputRef.current?.click()}
                                                    className="px-6 py-3 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-[#C53030] transition-all flex items-center gap-2 disabled:opacity-50"
                                                >
                                                    <Upload className="w-4 h-4" />
                                                    Tải ảnh lên
                                                </button>
                                            </div>
                                            <p className="text-[11px] text-slate-400 leading-relaxed italic">
                                                * Khuyên dùng ảnh t l 16:9. H thng sẽ tự ng ti ưu sang nh dạng **WebP**  tng tc  tải trang.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </form>
                    ) : (
                        <div className="space-y-6">
                            {showLessonForm ? (
                                <form onSubmit={handleLessonSubmit} className="bg-slate-50 rounded-3xl p-6 border border-slate-200 space-y-4 animate-in fade-in slide-in-from-top-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="font-bold text-slate-800">{currentLesson ? "Sửa bài học" : "Thêm bài học mi"}</h3>
                                        <button type="button" onClick={() => setShowLessonForm(false)} className="text-slate-400 hover:text-slate-600"><X className="w-4 h-4" /></button>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase">Tiêu ề bài học</label>
                                        <input
                                            required
                                            value={lessonFormData.title}
                                            onChange={(e) => setLessonFormData({ ...lessonFormData, title: e.target.value })}
                                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 outline-none focus:border-[#C53030] transition-all"
                                            placeholder="Bài 1: Gii thiu bản thân"
                                        />
                                    </div>
                                    {/* Multi Video Section */}
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <label className="text-xs font-bold text-slate-500 uppercase">Danh sách Video bài giảng</label>
                                            <button
                                                type="button"
                                                onClick={() => setLessonFormData(prev => ({
                                                    ...prev,
                                                    videos: [...prev.videos, { title: "", videoUrl: "", order: prev.videos.length }]
                                                }))}
                                                className="text-[10px] font-bold text-[#C53030] hover:underline uppercase flex items-center gap-1"
                                            >
                                                <Plus className="w-3 h-3" /> Thêm video
                                            </button>
                                        </div>
                                        {lessonFormData.videos.map((vid, idx) => (
                                            <div key={idx} className="flex flex-col gap-2 p-3 bg-white border border-slate-200 rounded-xl relative group/item">
                                                <button
                                                    type="button"
                                                    onClick={() => setLessonFormData(prev => ({
                                                        ...prev,
                                                        videos: prev.videos.filter((_, i) => i !== idx)
                                                    }))}
                                                    className="absolute -top-2 -right-2 w-6 h-6 bg-rose-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-opacity shadow-sm z-10"
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                                <input
                                                    value={vid.title}
                                                    onChange={(e) => {
                                                        const newVids = [...lessonFormData.videos];
                                                        newVids[idx].title = e.target.value;
                                                        setLessonFormData(prev => ({ ...prev, videos: newVids }));
                                                    }}
                                                    className="w-full rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 outline-none focus:border-[#C53030] transition-all text-xs font-bold"
                                                    placeholder="Tên video (VD: Phần 1: Gii thiu)"
                                                />
                                                <div className="flex gap-2">
                                                    <input
                                                        value={vid.videoUrl}
                                                        onChange={(e) => {
                                                            const newVids = [...lessonFormData.videos];
                                                            newVids[idx].videoUrl = e.target.value;
                                                            setLessonFormData(prev => ({ ...prev, videos: newVids }));
                                                        }}
                                                        className="flex-1 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 outline-none focus:border-[#C53030] transition-all text-[10px]"
                                                        placeholder="URL video hoặc upload..."
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const input = document.createElement('input');
                                                            input.type = 'file';
                                                            input.accept = 'video/*';
                                                            input.onchange = (e) => handleFileUpload(e as any, 'video', idx);
                                                            input.click();
                                                        }}
                                                        className="px-3 py-2 bg-slate-900 text-white rounded-lg text-[10px] font-bold hover:bg-[#C53030] shrink-0"
                                                    >
                                                        Upload
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                        {lessonFormData.videos.length === 0 && (
                                            <p className="text-[10px] text-slate-400 italic text-center py-2 bg-white rounded-xl border border-dashed border-slate-200">Chưa có video nào. Click "Thêm video"  bắt ầu.</p>
                                        )}
                                    </div>

                                    {/* Multi File Section */}
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <label className="text-xs font-bold text-slate-500 uppercase">Tài liu ính kèm (PDF, DOCX)</label>
                                            <button
                                                type="button"
                                                onClick={() => setLessonFormData(prev => ({
                                                    ...prev,
                                                    files: [...prev.files, { title: "", fileUrl: "", order: prev.files.length }]
                                                }))}
                                                className="text-[10px] font-bold text-blue-600 hover:underline uppercase flex items-center gap-1"
                                            >
                                                <Plus className="w-3 h-3" /> Thêm tài liu
                                            </button>
                                        </div>
                                        {lessonFormData.files.map((file, idx) => (
                                            <div key={idx} className="flex flex-col gap-2 p-3 bg-white border border-slate-200 rounded-xl relative group/item">
                                                <button
                                                    type="button"
                                                    onClick={() => setLessonFormData(prev => ({
                                                        ...prev,
                                                        files: prev.files.filter((_, i) => i !== idx)
                                                    }))}
                                                    className="absolute -top-2 -right-2 w-6 h-6 bg-rose-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-opacity shadow-sm z-10"
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                                <input
                                                    value={file.title}
                                                    onChange={(e) => {
                                                        const newFiles = [...lessonFormData.files];
                                                        newFiles[idx].title = e.target.value;
                                                        setLessonFormData(prev => ({ ...prev, files: newFiles }));
                                                    }}
                                                    className="w-full rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 outline-none focus:border-[#C53030] transition-all text-xs font-bold"
                                                    placeholder="Tên tài liu (VD: Lesson 1 Notes.pdf)"
                                                />
                                                <div className="flex gap-2">
                                                    <input
                                                        value={file.fileUrl}
                                                        onChange={(e) => {
                                                            const newFiles = [...lessonFormData.files];
                                                            newFiles[idx].fileUrl = e.target.value;
                                                            setLessonFormData(prev => ({ ...prev, files: newFiles }));
                                                        }}
                                                        className="flex-1 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 outline-none focus:border-[#C53030] transition-all text-[10px]"
                                                        placeholder="URL file hoặc upload..."
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const input = document.createElement('input');
                                                            input.type = 'file';
                                                            input.accept = '.pdf,.doc,.docx,.zip';
                                                            input.onchange = (e) => handleFileUpload(e as any, 'file', idx);
                                                            input.click();
                                                        }}
                                                        className="px-3 py-2 bg-slate-100 text-slate-600 border border-slate-200 rounded-lg text-[10px] font-bold hover:bg-slate-200 shrink-0"
                                                    >
                                                        Upload
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase">Ni dung chi tiết</label>
                                        <textarea
                                            value={lessonFormData.content}
                                            onChange={(e) => setLessonFormData({ ...lessonFormData, content: e.target.value })}
                                            rows={5}
                                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 outline-none focus:border-[#C53030] transition-all text-sm resize-none"
                                            placeholder="Ghi chú thêm cho bài học..."
                                        />
                                    </div>
                                    <div className="flex gap-2 pt-2">
                                        <button
                                            type="submit"
                                            disabled={submitting}
                                            className="flex-1 py-3 bg-[#C53030] text-white rounded-xl font-bold text-sm hover:bg-[#A52828] transition-colors"
                                        >
                                            {submitting ? "Đang xử lý..." : "Lưu bài học"}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setShowLessonForm(false)}
                                            className="flex-1 py-3 bg-slate-200 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-300 transition-colors"
                                        >
                                            Hủy
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <button
                                    onClick={() => {
                                        setCurrentLesson(null);
                                        setLessonFormData({ title: "", content: "", videoUrl: "", fileUrl: "", order: lessons.length + 1, videos: [], files: [] });
                                        setShowLessonForm(true);
                                    }}
                                    className="w-full py-8 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center text-slate-400 hover:text-[#C53030] hover:border-[#C53030]/50 hover:bg-rose-50/30 transition-all group"
                                >
                                    <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                        <Plus className="w-6 h-6" />
                                    </div>
                                    <span className="font-bold text-sm">Thêm bài học mi</span>
                                </button>
                            )}

                            <div className="space-y-3">
                                {lessons.map((lesson, index) => (
                                    <div key={lesson.id} className="flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-2xl hover:border-[#C53030]/30 hover:shadow-lg hover:shadow-slate-100 transition-all group">
                                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 font-bold text-sm shrink-0">
                                            {index + 1}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-bold text-slate-900 truncate">{lesson.title}</h4>
                                            <div className="flex items-center gap-3 mt-1">
                                                {lesson.videoUrl && (
                                                    <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
                                                        <Video className="w-3 h-3" /> Video
                                                    </span>
                                                )}
                                                {lesson.fileUrl && (
                                                    <span className="flex items-center gap-1 text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                                                        <FileText className="w-3 h-3" /> Tài liu
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => {
                                                    setCurrentLesson(lesson);
                                                    setLessonFormData({
                                                        title: lesson.title,
                                                        content: lesson.content || "",
                                                        videoUrl: lesson.videoUrl || "",
                                                        fileUrl: lesson.fileUrl || "",
                                                        order: lesson.order,
                                                        videos: lesson.videos || [],
                                                        files: lesson.files || [],
                                                    });
                                                    setShowLessonForm(true);
                                                }}
                                                className="p-2 text-slate-400 hover:text-[#C53030] transition-colors"
                                            >
                                                <GripVertical className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteLesson(lesson.id)}
                                                className="p-2 text-slate-400 hover:text-rose-600 transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-8 border-t border-slate-100 bg-slate-50/50 flex gap-3 shrink-0">
                    {activeTab === "info" ? (
                        <>
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 px-6 py-4 rounded-xl font-bold text-slate-500 bg-white border border-slate-200 hover:bg-slate-50 transition-colors"
                            >
                                Hủy bỏ
                            </button>
                            <button
                                form="course-form"
                                disabled={submitting}
                                className="flex-[2] flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-white bg-slate-900 hover:bg-[#C53030] shadow-xl shadow-slate-200 transition-all duration-300 disabled:opacity-50"
                            >
                                <Save className="w-5 h-5" />
                                {submitting ? "Đang lưu..." : "Lưu thay i"}
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={onClose}
                            className="w-full px-6 py-4 rounded-xl font-bold text-white bg-slate-900 hover:bg-[#C53030] transition-all"
                        >
                            Hoàn tất
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
