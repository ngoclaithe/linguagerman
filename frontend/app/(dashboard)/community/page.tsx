'use client';

import Link from "next/link";
import { ArrowLeft, MessageSquare, Heart, Share2, Users, Flame, Trophy, Search } from "lucide-react";
import { motion } from "framer-motion";

export default function CommunityPage() {
    const posts = [
        {
            user: "Linh Nguyn",
            avatar: "https://i.pravatar.cc/100?img=32",
            content: "Mọi người có mẹo nào học 50 bài Minna no Nihongo trong 3 tháng không ạ? Đang vi quá sắp thi ri ",
            likes: 124,
            comments: 56,
            time: "2 giờ trưc",
            category: "Kinh nghim"
        },
        {
            user: "Hoàng Minh",
            avatar: "https://i.pravatar.cc/100?img=11",
            content: "Vừa nhận ược kết quả B1! Cảm ơn LinguaGerman rất nhiều, ặc bit là h thng Flashcard T vng cứu mình bàn thua trông thấy.",
            likes: 567,
            comments: 89,
            time: "5 giờ trưc",
            category: "Thành tích"
        },
        {
            user: "Akira Tanaka",
            avatar: "https://i.pravatar.cc/100?img=53",
            content: "What is your favorite Japanese snack? I love Pocky! ",
            likes: 88,
            comments: 45,
            time: "1 ngày trưc",
            category: "Giao lưu"
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-20">
            <div className="container mx-auto px-4 lg:px-8 max-w-6xl">


                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Left Sidebar */}
                    <div className="hidden lg:block space-y-6">
                        <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100">
                            <h3 className="text-lg font-black text-slate-900 mb-6 uppercase tracking-wider text-xs">Phân loại</h3>
                            <nav className="space-y-2">
                                {[" Tất cả thảo luận", " Tin hot nhất", " Chia sẻ thành tích", "️ Giao lưu vn hóa", " Hỏi áp kiến thức"].map((item, i) => (
                                    <button key={i} className={`w-full text-left px-4 py-3 rounded-xl font-bold transition-all ${i === 0 ? 'bg-rose-50 text-[#C53030]' : 'text-slate-500 hover:bg-slate-50'}`}>
                                        {item}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        <div className="bg-[#C53030] rounded-[2rem] p-8 text-white shadow-xl shadow-rose-200">
                            <Trophy className="w-12 h-12 mb-6" />
                            <h3 className="text-2xl font-black mb-2">Thách thức!</h3>
                            <p className="font-bold opacity-80 mb-6 text-sm">Học 100 từ vựng T vng trong 1 tuần nhận ngay Voucher 50%!</p>
                            <button className="w-full bg-white text-[#C53030] py-3 rounded-xl font-black text-sm uppercase">Tham gia</button>
                        </div>
                    </div>

                    {/* Main Feed */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Post Box */}
                        <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-100">
                            <div className="flex gap-4 mb-6">
                                <img src="https://i.pravatar.cc/100?img=20" alt="" className="w-12 h-12 rounded-full border-2 border-slate-100" />
                                <button className="flex-1 bg-slate-50 rounded-2xl px-6 text-left text-slate-400 font-bold hover:bg-slate-100 transition-colors">
                                    Bạn ang nghĩ gì thế?
                                </button>
                            </div>
                            <div className="flex border-t border-slate-50 pt-4 gap-6">
                                <button className="flex items-center gap-2 text-slate-500 font-bold text-sm hover:text-[#C53030] transition-colors">
                                     Ảnh/Video
                                </button>
                                <button className="flex items-center gap-2 text-slate-500 font-bold text-sm hover:text-[#C53030] transition-colors">
                                    #️ Nhãn
                                </button>
                            </div>
                        </div>

                        {/* Posts */}
                        {posts.map((post, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-4">
                                        <img src={post.avatar} alt="" className="w-12 h-12 rounded-full ring-4 ring-slate-50" />
                                        <div>
                                            <h4 className="font-black text-slate-900">{post.user}</h4>
                                            <p className="text-xs font-bold text-slate-400">{post.time}  {post.category}</p>
                                        </div>
                                    </div>
                                    <button className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400"></button>
                                </div>
                                <p className="text-lg text-slate-700 font-medium leading-relaxed mb-8">
                                    {post.content}
                                </p>
                                <div className="flex items-center gap-8 border-t border-slate-50 pt-6">
                                    <button className="flex items-center gap-2 text-slate-500 font-bold hover:text-rose-600 transition-colors">
                                        <Heart className="w-5 h-5" /> {post.likes}
                                    </button>
                                    <button className="flex items-center gap-2 text-slate-500 font-bold hover:text-blue-600 transition-colors">
                                        <MessageSquare className="w-5 h-5" /> {post.comments}
                                    </button>
                                    <button className="flex items-center gap-2 text-slate-500 font-bold hover:text-[#C53030] transition-colors ml-auto">
                                        <Share2 className="w-5 h-5" /> Chia sẻ
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Right Sidebar */}
                    <div className="hidden lg:block space-y-8">
                        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
                            <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                                <Flame className="w-5 h-5 text-orange-500" /> Xu hưng
                            </h3>
                            <div className="space-y-6">
                                {[
                                    { tag: "#Goethe_n3_tips", count: "1.2k bài viết" },
                                    { tag: "#japanese_food", count: "856 bài viết" },
                                    { tag: "#du_hoc_nhat", count: "2.4k bài viết" },
                                    { tag: "#T vng_hacks", count: "3.1k bài viết" }
                                ].map((tag, i) => (
                                    <div key={i} className="group cursor-pointer">
                                        <div className="font-black text-slate-900 group-hover:text-[#C53030] transition-colors">{tag.tag}</div>
                                        <div className="text-xs font-bold text-slate-400">{tag.count}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
                            <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                                <Users className="w-5 h-5 text-blue-500" /> Top óng góp
                            </h3>
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="" className="w-10 h-10 rounded-full" />
                                        <div className="flex-1">
                                            <div className="text-sm font-bold text-slate-900">User_{i}00</div>
                                            <div className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Master Level</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
