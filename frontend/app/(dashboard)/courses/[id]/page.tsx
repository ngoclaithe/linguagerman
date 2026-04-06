'use client';

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
    BookOpen,
    Users,
    Star,
    Clock,
    Award,
    CheckCircle,
    Play,
    FileText,
    MessageSquare,
    ArrowLeft,
    Share2,
    Heart,
    Calendar,
    Layers,
    ShieldCheck,
    Zap
} from "lucide-react";
import { useEffect, useState } from "react";
import { coursesAPI, ordersAPI, progressAPI, getImageUrl } from "@/lib/api";
import { useToast } from "@/components/ui/toast";
import { ConfirmDialog } from "@/components/ui/dialog";

export default function CourseDetailPage() {
    const params = useParams();
    const router = useRouter();
    const id = params?.id as string;
    const [activeTab, setActiveTab] = useState("overview");
    const [course, setCourse] = useState<any>(null);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isPurchaseDialogOpen, setIsPurchaseDialogOpen] = useState(false);
    const [isPurchasing, setIsPurchasing] = useState(false);
    const toast = useToast();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [courseData, enrollments] = await Promise.all([
                    coursesAPI.get(id), 
                    progressAPI.getMyCourses()
                ]);
                setCourse(courseData);
                setIsEnrolled(enrollments.some((e: any) => e.course?.slug === id || e.course?.id === id));
            } catch (error) {
                console.error("Failed to fetch course data", error);
                toast.error("Không th tải thông tin khóa học");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handlePurchase = async () => {
        setIsPurchasing(true);
        try {
            await ordersAPI.create([course.id]);
            toast.success("Đã thêm vào ơn hàng. Vui lòng thanh toán  kích hoạt khóa học.");
            setIsPurchaseDialogOpen(false);
        } catch (error) {
            toast.error("Không th thực hin mua hàng");
        } finally {
            setIsPurchasing(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-[#C53030] border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    if (!course) return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">Không tìm thấy khóa học</h1>
                <Link href="/courses" className="text-[#C53030] font-bold">Về danh sách</Link>
            </div>
        </div>
    );

    const getIcon = (type: string) => {
        switch (type) {
            case "video":
                return <Play className="w-4 h-4" />;
            case "quiz":
                return <FileText className="w-4 h-4" />;
            case "practice":
                return <MessageSquare className="w-4 h-4" />;
            default:
                return <BookOpen className="w-4 h-4" />;
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-[#C53030]/20 selection:text-[#C53030]">
            {}

            {}
            <section className="relative bg-slate-900 pt-16 pb-32 lg:pb-40 overflow-hidden text-white">
                <div className="absolute inset-0 bg-[url('/images/course-A1.jpg')] opacity-5 bg-cover bg-center mix-blend-overlay pointer-events-none"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#C53030]/20 blur-[120px] rounded-full pointer-events-none"></div>

                <div className="container mx-auto px-4 lg:px-8 relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="lg:w-2/3 lg:pr-12">
                        <div className="flex gap-3 mb-6">
                            <span className="px-3 py-1 bg-[#C53030] text-white text-xs font-bold rounded-md shadow-sm">
                                LEVEL {course.level}
                            </span>
                            <span className="px-3 py-1 bg-white/10 backdrop-blur-md text-white border border-white/20 text-xs font-medium rounded-md">
                                Cập nhật: 2026
                            </span>
                        </div>

                        <h1 className="text-4xl lg:text-5xl font-extrabold mb-6 leading-tight tracking-tight">
                            {course.title}
                        </h1>

                        <p className="text-lg lg:text-xl text-slate-300 mb-8 leading-relaxed">
                            {course.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-6 lg:gap-10 text-sm font-medium">
                            <div className="flex items-center gap-2">
                                <div className="flex -space-x-1 mr-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
                                    ))}
                                </div>
                                <span className="text-amber-400 font-bold text-base">{course.rating}</span>
                                <span className="text-slate-400">({course.reviews} ánh giá)</span>
                            </div>

                            <div className="flex items-center gap-2 text-slate-300">
                                <Users className="w-5 h-5 text-slate-400" />
                                <span>{course.students}</span> ã tham gia
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {}
            <section className="container mx-auto px-4 lg:px-8 relative z-20 -mt-16 lg:-mt-24 pb-24">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">

                    {}
                    <div className="w-full lg:w-2/3 flex flex-col gap-8 animate-in fade-in duration-700 delay-300 fill-mode-both">

                        {}
                        <div className="bg-white rounded-2xl p-6 shadow-xl shadow-slate-200/40 border border-slate-100 flex items-center lg:items-start gap-5">
                            <img
                                src={course.instructor?.avatar ? getImageUrl(course.instructor.avatar) || "/images/default-course.jpg" : "/images/default-course.jpg"}
                                alt={course.instructor?.name || "Giảng viên"}
                                className="w-16 h-16 lg:w-20 lg:h-20 rounded-full object-cover ring-4 ring-rose-50"
                            />
                            <div>
                                <div className="text-xs font-bold text-[#C53030] tracking-wider uppercase mb-1">Giảng viên phụ trách</div>
                                <h3 className="text-lg lg:text-xl font-bold text-slate-900 mb-2">{course.instructor?.name || "Takahashi Akira"}</h3>
                                <p className="text-sm text-slate-600 leading-relaxed max-w-lg">
                                    {course.instructor?.bio || "Chuyên gia sư phạm vi >10 nm kinh nghim giảng dạy tiếng Nhật. Thạc sĩ ngôn ngữ học Đại học Tokyo."}
                                </p>
                            </div>
                        </div>

                        {}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-white rounded-2xl p-4 border border-slate-100 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center shrink-0">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-xs text-slate-500 font-medium">Thời lượng</div>
                                    <div className="font-bold text-slate-900">{course.duration}</div>
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl p-4 border border-slate-100 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-rose-50 text-[#C53030] rounded-xl flex items-center justify-center shrink-0">
                                    <Layers className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-xs text-slate-500 font-medium">Bài học</div>
                                    <div className="font-bold text-slate-900">{course.lessons?.length || 0} bài</div>
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl p-4 border border-slate-100 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center shrink-0">
                                    <Award className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-xs text-slate-500 font-medium">Chứng ch</div>
                                    <div className="font-bold text-slate-900">Goethe B5</div>
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl p-4 border border-slate-100 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center shrink-0">
                                    <Calendar className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-xs text-slate-500 font-medium">Truy cập</div>
                                    <div className="font-bold text-slate-900">Trọn ời</div>
                                </div>
                            </div>
                        </div>

                        {}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-2 overflow-x-auto scrollbar-hide">
                            <div className="flex min-w-max">
                                {["overview", "curriculum", "reviews"].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`flex-1 min-w-[120px] text-center px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${activeTab === tab
                                            ? "bg-slate-900 text-white shadow-md"
                                            : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                                            }`}
                                    >
                                        {tab === "overview" && "Tng quan"}
                                        {tab === "curriculum" && "Ni dung học"}
                                        {tab === "reviews" && "Đánh giá"}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {}
                        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 min-h-[400px]">

                            {}
                            {activeTab === "overview" && (
                                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
                                        <Zap className="w-6 h-6 text-amber-400" />
                                        Bạn sẽ ạt ược gì?
                                    </h2>
                                    <div className="grid sm:grid-cols-2 gap-4 mb-10">
                                        {(course.features || [
                                            "Học qua Video trực quan sinh ng",
                                            "Thực hành giao tiếp 1-1 vi trợ lý ảo AI",
                                            "L trình cá nhân hóa",
                                            "Tài liu Flashcard thông minh",
                                            "Cập nhật thường xuyên ề thi thử",
                                            "H trợ giải áp 24/7"
                                        ]).map((feature: string, idx: number) => (
                                            <div key={idx} className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl">
                                                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                                                    <CheckCircle className="w-4 h-4" />
                                                </div>
                                                <span className="text-slate-700 text-sm leading-relaxed">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <hr className="border-slate-100 mb-10" />

                                    <h2 className="text-2xl font-black text-slate-900 mb-6">Yêu cầu khóa học</h2>
                                    <ul className="space-y-4">
                                        <li className="flex gap-3 text-slate-600">
                                            <div className="w-2 h-2 rounded-full bg-rose-400 mt-2"></div>
                                            <p>Không yêu cầu bất kỳ kiến thức nền tảng nào về tiếng Nhật. Dành cho người mi bắt ầu hoàn toàn.</p>
                                        </li>
                                        <li className="flex gap-3 text-slate-600">
                                            <div className="w-2 h-2 rounded-full bg-rose-400 mt-2"></div>
                                            <p>Chuẩn b thiết b có kết ni Internet n nh (Laptop, PC, Tablet hoặc Smartphone).</p>
                                        </li>
                                        <li className="flex gap-3 text-slate-600">
                                            <div className="w-2 h-2 rounded-full bg-rose-400 mt-2"></div>
                                            <p>Cam kết dành thời gian ti thiu 30-45 phút mi ngày  tạo thói quen học tập liên tục.</p>
                                        </li>
                                    </ul>
                                </div>
                            )}

                            {}
                            {activeTab === "curriculum" && (
                                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div className="flex items-center justify-between mb-8">
                                        <h2 className="text-2xl font-black text-slate-900">L trình học tập</h2>
                                        <span className="text-slate-500 font-medium text-sm">{course.lessons?.length || 0} bài học</span>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="border border-slate-200 rounded-2xl overflow-hidden group">
                                            <div className="bg-slate-50 p-5 flex items-center justify-between border-b border-slate-200">
                                                <div>
                                                    <h3 className="font-bold text-slate-900 text-lg mb-1">Ni dung chi tiết</h3>
                                                    <p className="text-sm text-slate-500">{course.lessons?.length || 0} bài chi tiết</p>
                                                </div>
                                            </div>
                                            <div className="divide-y divide-slate-100 bg-white">
                                                {(course.lessons || []).map((lesson: any, lIdx: number) => (
                                                    <Link href={`/courses/${id}/lesson/${lesson.id}`} key={lIdx} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors cursor-pointer text-slate-700 hover:text-[#C53030]">
                                                        <div className="flex items-center gap-4">
                                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${lesson.videoUrl ? 'bg-rose-50 text-rose-500' : 'bg-amber-50 text-amber-500'}`}>
                                                                {getIcon(lesson.videoUrl ? 'video' : 'quiz')}
                                                            </div>
                                                            <span className="font-medium text-sm lg:text-base">{lesson.title}</span>
                                                        </div>
                                                        <span className="text-sm text-slate-400 ml-4 shrink-0 font-medium">Bắt ầu học</span>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {}
                            {activeTab === "reviews" && (
                                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <h2 className="text-2xl font-black text-slate-900 mb-8">Phản hi học viên (Tuyn chọn)</h2>

                                    {}
                                    <div className="flex flex-col md:flex-row gap-8 items-center bg-slate-50 p-8 rounded-3xl mb-12 border border-slate-100">
                                        <div className="text-center w-48 shrink-0">
                                            <div className="text-6xl font-black text-slate-900 mb-2">{course.rating}</div>
                                            <div className="flex justify-center gap-1 mb-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className={`w-5 h-5 ${i < Math.floor(course.rating) ? 'text-amber-400 fill-current' : 'text-slate-300 fill-current'}`} />
                                                ))}
                                            </div>
                                            <div className="text-sm text-slate-500 font-medium">{course.reviews} ánh giá</div>
                                        </div>

                                        <div className="flex-1 w-full space-y-3 border-t md:border-t-0 md:border-l border-slate-200 pt-6 md:pt-0 md:pl-8">
                                            {[
                                                { s: 5, p: 85 },
                                                { s: 4, p: 10 },
                                                { s: 3, p: 3 },
                                                { s: 2, p: 1 },
                                                { s: 1, p: 1 },
                                            ].map((item) => (
                                                <div key={item.s} className="flex items-center gap-3">
                                                    <span className="w-12 text-sm font-bold text-slate-600">{item.s} <Star className="inline w-3 h-3 text-slate-400 mb-1" /></span>
                                                    <div className="h-2.5 flex-1 rounded-full bg-slate-200 overflow-hidden">
                                                        <div className="h-full bg-amber-400 rounded-full" style={{ width: `${item.p}%` }}></div>
                                                    </div>
                                                    <span className="w-10 text-right text-sm text-slate-500">{item.p}%</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {}
                                    <div className="grid gap-6">
                                        {[
                                            {
                                                name: "Ngân Hà",
                                                time: "2 tuần trưc",
                                                text: "Lúc ầu mình rất sợ học T vng nhưng cách Lehrer dạy liên tưng hình ảnh cực kỳ nh. Đã thi pass A1 ợt tháng 7 vừa ri! Cảm ơn Nihongo Academy rất nhiều.",
                                            },
                                            {
                                                name: "Đình Phúc",
                                                time: "1 tháng trưc",
                                                text: "Web mượt, app d học. Phần flashcard ôn tập từ vựng làm mình ỡ mỏi mắt hơn rất nhiều so vi học sách giấy. Mình hay học vào giờ ngh trưa  công ty.",
                                            },
                                            {
                                                name: "Mai Chi",
                                                time: "3 tháng trưc",
                                                text: "L trình rõ ràng, i ngũ support nhanh chóng mi khi mình không hiu bài test. Highly recommend cho các bạn tự học A1.",
                                            }
                                        ].map((rev, idx) => (
                                            <div key={idx} className="p-6 rounded-2xl border border-slate-100 bg-white hover:shadow-lg transition-shadow">
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#C53030] to-rose-400 text-white flex items-center justify-center font-bold text-lg shadow-inner">
                                                            {rev.name.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <div className="font-bold text-slate-900">{rev.name}</div>
                                                            <div className="text-xs text-slate-400">{rev.time}</div>
                                                        </div>
                                                    </div>
                                                    <div className="flex">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
                                                        ))}
                                                    </div>
                                                </div>
                                                <p className="text-slate-600 leading-relaxed text-sm lg:text-base">"{rev.text}"</p>
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            )}
                        </div>

                    </div>

                    {}
                    <div className="w-full lg:w-1/3">
                        <div className="sticky top-28 bg-white rounded-[2rem] p-6 lg:p-8 shadow-2xl shadow-slate-200/50 border border-slate-100 flex flex-col gap-6 animate-in slide-in-from-right-8 duration-700">

                            {}
                            <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg group cursor-pointer">
                                <img
                                    src={getImageUrl(course.thumbnail) || "/images/default-course.jpg"}
                                    alt={course.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-slate-900/30 flex items-center justify-center group-hover:bg-slate-900/40 transition-colors">
                                    <div className="w-16 h-16 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-[#C53030] transform group-hover:scale-110 transition-transform">
                                        <Play className="w-6 h-6 ml-1" />
                                    </div>
                                </div>
                                <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-bold rounded-lg uppercase tracking-wider">
                                    Xem gii thiu
                                </div>
                            </div>

                            {}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-3xl lg:text-4xl font-black text-slate-900">
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(course.price)}
                                    </span>
                                    {course.price < 4000000 && <span className="text-sm font-bold text-rose-500 bg-rose-50 px-2 py-1 rounded-md">-33%</span>}
                                </div>
                                <div className="text-sm text-slate-400 line-through mb-6">Giá gc: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(course.price * 1.5)}</div>

                                <div className="flex flex-col gap-3">
                                    {isEnrolled ? (
                                        <button
                                            onClick={() => router.push(`/courses/${id}/lesson/${course.lessons[0].id}`)}
                                            className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 transition-all duration-300"
                                        >
                                            Tiếp tục học
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => setIsPurchaseDialogOpen(true)}
                                            className="w-full bg-[#C53030] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#C53030]/90 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#C53030]/30 transition-all duration-300"
                                        >
                                            Mua khóa học ngay
                                        </button>
                                    )}
                                    {!isEnrolled && (
                                        <button
                                            className="w-full bg-slate-50 border border-slate-200 text-slate-700 py-4 rounded-xl font-bold text-center hover:bg-slate-100 transition-colors"
                                        >
                                            Học thử min phí 
                                        </button>
                                    )}
                                </div>
                                <p className="text-xs text-center text-slate-400 mt-4">Cam kết hoàn tiền trong 7 ngày ầu tiên.</p>
                            </div>

                            <hr className="border-slate-100" />

                            {}
                            <div className="space-y-4">
                                <h4 className="font-bold text-slate-900">Khóa học này bao gm:</h4>
                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                    <Play className="w-4 h-4 text-[#C53030] shrink-0" /> Tập trung 40+ video bài giảng 4K
                                </div>
                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                    <FileText className="w-4 h-4 text-[#C53030] shrink-0" /> Hàng trm bài rèn luyn ngữ pháp
                                </div>
                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                    <Award className="w-4 h-4 text-[#C53030] shrink-0" /> Cấp chứng nhận hoàn thành
                                </div>
                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                    <ShieldCheck className="w-4 h-4 text-[#C53030] shrink-0" /> Quyền truy cập trọn ời
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </section>
            {}
            <ConfirmDialog
                isOpen={isPurchaseDialogOpen}
                onClose={() => setIsPurchaseDialogOpen(false)}
                title="Xác nhận mua khóa học"
                description={`Bạn có chắc chắn mun tham gia khóa học "${course.title}" vi giá ${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(course.price)}?`}
                onConfirm={handlePurchase}
                isLoading={isPurchasing}
                confirmText="Xác nhận mua"
                cancelText="Hủy"
            />
        </div>
    );
}
