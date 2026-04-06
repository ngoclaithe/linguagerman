'use client';

import { X, Save, Mail, User, Lock, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/toast";
import { authAPI, usersAPI, adminAPI, getImageUrl } from "@/lib/api";

interface Props {
    item: any;
    onClose: () => void;
    onSuccess: () => void;
}

export default function AdminTeacherModal({ item, onClose, onSuccess }: Props) {
    const toast = useToast();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "TEACHER",
        avatar: "",
        slug: "",
        bio: "",
    });
    const [uploading, setUploading] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (item) {
            setFormData({
                name: item.name || "",
                email: item.email || "",
                password: "", 
                role: "TEACHER",
                avatar: item.avatar || "",
                slug: item.slug || "",
                bio: item.bio || "",
            });
        }
    }, [item]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            if (item) {
                
                const updateData: any = { 
                    name: formData.name, 
                    email: formData.email,
                    avatar: formData.avatar,
                    slug: formData.slug || null,
                    bio: formData.bio || null
                };
                if (formData.password) updateData.password = formData.password;
                await usersAPI.update(item.id, updateData);
                toast.success("Cập nhật giáo viên thành công");
            } else {
                
                
                const res = await authAPI.register(formData.email, formData.password, formData.name);
                
                await usersAPI.update((res as any).id, {
                    avatar: formData.avatar,
                    slug: formData.slug || null,
                    bio: formData.bio || null,
                    role: "TEACHER"
                });
                toast.success("Tạo tài khoản giáo viên thành công");
            }
            onSuccess();
        } catch (error) {
            console.error("Failed to save teacher", error);
            toast.error("Có li xảy ra khi lưu thông tin");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative bg-white rounded-[2.5rem] w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
                <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900">{item ? "Chnh sửa" : "Thêm mi"} giáo viên</h2>
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mt-1">Quản lý i ngũ Lehrer</p>
                    </div>
                    <button onClick={onClose} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-8 max-h-[70vh] overflow-y-auto space-y-6">
                    <div className="flex flex-col items-center gap-4 mb-6">
                        <div className="relative group">
                            <div className="w-24 h-24 rounded-[2rem] overflow-hidden bg-slate-100 border-2 border-dashed border-slate-200 flex items-center justify-center transition-all group-hover:border-[#C53030]">
                                {formData.avatar ? (
                                    <img src={getImageUrl(formData.avatar) || undefined} alt="Avatar" className="w-full h-full object-cover" />
                                ) : (
                                    <User className="w-10 h-10 text-slate-300" />
                                )}
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Plus className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <input
                                type="file"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if (!file) return;
                                    setUploading(true);
                                    try {
                                        const res = await adminAPI.uploadImage(file);
                                        setFormData({ ...formData, avatar: res.url });
                                        toast.success("Tải ảnh lên thành công");
                                    } catch (err) {
                                        toast.error("Li tải ảnh");
                                    } finally {
                                        setUploading(false);
                                    }
                                }}
                            />
                        </div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ảnh ại din Lehrer</p>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Họ và tên</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-12 pr-4 py-3 outline-none focus:border-[#C53030] focus:bg-white transition-all text-sm"
                                    placeholder="VD: Tanaka Lehrer"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Slug cá nhân (ID URL)</label>
                            <input
                                required
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-[#C53030] focus:bg-white transition-all text-sm"
                                placeholder="tanaka-Lehrer"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Mô tả bản thân</label>
                            <textarea
                                value={formData.bio}
                                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                className="w-full h-32 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-[#C53030] focus:bg-white transition-all text-sm resize-none"
                                placeholder="Ghi mt vài dòng gii thiu về Lehrer..."
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Email (Tài khoản)</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    required
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-12 pr-4 py-3 outline-none focus:border-[#C53030] focus:bg-white transition-all text-sm"
                                    placeholder="tanaka@LinguaGerman.vn"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">{item ? "Mật khẩu mi (Bỏ trng nếu không i)" : "Mật khẩu ban ầu"}</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    required={!item}
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-12 pr-4 py-3 outline-none focus:border-[#C53030] focus:bg-white transition-all text-sm"
                                    placeholder=""
                                />
                            </div>
                        </div>
                    </div>

                </div>

                <div className="p-8 border-t border-slate-50 flex gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 px-6 py-4 rounded-xl font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 transition-colors"
                    >
                        Hủy bỏ
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={submitting || uploading}
                        className="flex-[2] flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-white bg-slate-900 hover:bg-[#C53030] shadow-xl shadow-slate-200 transition-all disabled:opacity-50"
                    >
                        <Save className="w-5 h-5" />
                        {submitting ? "Đang lưu..." : "Lưu thông tin"}
                    </button>
                </div>
            </div>
        </div>
    );
}
