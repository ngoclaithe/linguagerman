'use client';

import { useState, useEffect } from "react";
import {
    Users,
    BookOpen,
    FileText,
    TrendingUp,
    Plus,
    Edit,
    Trash2,
    Search,
    Bell,
    Settings,
    MoreVertical,
    ChevronRight,
    RefreshCw,
    ShoppingBag,
    Check,
    X,
    LogOut,
    LayoutDashboard,
} from "lucide-react";
import Link from "next/link";
import { adminAPI, coursesAPI, usersAPI, examsAPI, flashcardsAPI, authAPI } from "@/lib/api";
import { useToast } from "@/components/ui/toast";
import { ConfirmDialog } from "@/components/ui/dialog";
import { useAuthStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import AdminCourseModal from "./components/AdminCourseModal";
import AdminExamModal from "./components/AdminExamModal";
import AdminFlashcardModal from "./components/AdminFlashcardModal";
import StatsGrid from "./components/StatsGrid";
import PopularCourses from "./components/PopularCourses";
import RecentActivity from "./components/RecentActivity";
import CourseTable from "./components/CourseTable";
import StudentTable from "./components/StudentTable";
import TeacherTable from "./components/TeacherTable";
import ExamTable from "./components/ExamTable";
import FlashcardTable from "./components/FlashcardTable";
import OrderTable from "./components/OrderTable";
import AdminTeacherModal from "./components/AdminTeacherModal";

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState<"overview" | "courses" | "students" | "teachers" | "tests" | "flashcards" | "orders">("overview");
    const [loading, setLoading] = useState(true);
    const [statsData, setStatsData] = useState<any>(null);
    const [coursesData, setCoursesData] = useState<any[]>([]);
    const [usersData, setUsersData] = useState<any[]>([]);
    const [teachersData, setTeachersData] = useState<any[]>([]);
    const [examsData, setExamsData] = useState<any[]>([]);
    const [flashcardsData, setFlashcardsData] = useState<any[]>([]);
    const [ordersData, setOrdersData] = useState<any[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [modalType, setModalType] = useState<"course" | "exam" | "student" | "teacher" | "flashcard" | null>(null);
    const [currentEditItem, setCurrentEditItem] = useState<any>(null);
    const { user } = useAuthStore();
    const router = useRouter();

    const toast = useToast();
    const [confirmState, setConfirmState] = useState<{
        isOpen: boolean;
        title: string;
        description: string;
        onConfirm: () => void;
        isLoading: boolean;
    }>({
        isOpen: false,
        title: "",
        description: "",
        onConfirm: () => { },
        isLoading: false
    });

    const fetchData = async () => {
        setLoading(true);
        try {
            const [stats, courses, users, teachers, exams, flashcards, orders] = await Promise.all([
                adminAPI.getStats(),
                coursesAPI.manage(),
                adminAPI.getUsers(),
                adminAPI.getTeachers(),
                examsAPI.list(),
                flashcardsAPI.list(),
                adminAPI.getOrders()
            ]);
            setStatsData(stats);
            setCoursesData(courses);
            setUsersData(users);
            setTeachersData(teachers);
            setExamsData(exams);
            setFlashcardsData(flashcards || []);
            setOrdersData(orders || []);
        } catch (error) {
            console.error("Failed to fetch admin data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!user || ((user.role as any) !== 'ADMIN' && (user.role as any) !== 'TEACHER')) {
            router.push("/lehrer-portal/login");
            return;
        }
        fetchData();
    }, [user, router]);

    const handleLogout = async () => {
        try {
            await authAPI.logout();
        } catch (e) {
            console.error(e);
        } finally {
            useAuthStore.getState().logout();
            window.location.href = "/lehrer-portal/login";
        }
    };

    const stats = statsData?.stats ? [
        {
            icon: Users,
            label: "Tng học viên",
            value: (statsData.stats.totalUsers || 0).toLocaleString(),
            change: "+0%",
            trend: "up",
            color: "text-blue-500",
            bgColor: "bg-blue-50",
        },
        {
            icon: BookOpen,
            label: "Khóa học",
            value: (statsData.stats.totalCourses || 0).toLocaleString(),
            change: "+0",
            trend: "up",
            color: "text-emerald-500",
            bgColor: "bg-emerald-50",
        },
        {
            icon: FileText,
            label: "Doanh s",
            value: (statsData.stats.totalSales || 0).toLocaleString(),
            change: "+0",
            trend: "up",
            color: "text-amber-500",
            bgColor: "bg-amber-50",
        },
        {
            icon: TrendingUp,
            label: "Hoạt ng",
            value: (statsData.recentOrders?.length || 0).toString(),
            change: "+0%",
            trend: "up",
            color: "text-purple-500",
            bgColor: "bg-purple-50",
        },
    ] : [];

    const courses = (coursesData || [])
        .map(c => ({
            id: c.id,
            name: c.title,
            level: c.level,
            teacher: c.teacher?.name || "N/A",
            students: c._count?.enrollments || 0,
            revenue: (c.price * (c._count?.enrollments || 0)).toLocaleString('vi-VN') + ' ',
            status: "active",
            teacherId: c.teacherId,
            originalData: c
        }));

    const students = (usersData || []).map(u => ({
        id: u.id,
        name: u.name,
        email: u.email,
        courses: u._count?.enrollments || 0,
        progress: 0,
        joinDate: new Date(u.createdAt).toLocaleDateString(),
        status: "active",
    }));

    const activities = statsData?.recentOrders?.map((order: any) => ({
        title: order.status === 'COMPLETED' ? "Đơn hàng hoàn tất" : "Đơn hàng mi",
        desc: `Mã ơn: #${order.id.slice(-6)} - ${order.totalPrice.toLocaleString()}`,
        time: new Date(order.createdAt).toLocaleDateString(),
        type: order.status === 'COMPLETED' ? 'success' : 'order'
    })) || [];

    const tests = (examsData || [])
        .map(e => ({
            id: e.id,
            name: e.title,
            course: e.course?.title || "Chung",
            questions: e.questions?.length || 0,
            attempts: e._count?.results || 0,
            avgScore: 0,
            status: e.published ? "published" : "draft",
            teacherId: e.course?.teacherId
        }));

    const [initialCourseTab, setInitialCourseTab] = useState<"info" | "lessons">("info");

    const handleEditCourse = (course: any, tab: "info" | "lessons" = "info") => {
        const fullCourse = coursesData.find(c => c.id === course.id);
        setCurrentEditItem(fullCourse);
        setInitialCourseTab(tab);
        setModalType("course");
        setIsEditing(true);
    };

    const handleCreateCourse = () => {
        setCurrentEditItem(null);
        setModalType("course");
        setIsEditing(true);
    };

    const handleEditExam = (examId: string) => {
        const exam = examsData.find(e => e.id === examId);
        setCurrentEditItem(exam);
        setModalType("exam");
        setIsEditing(true);
    };

    const handleCreateExam = () => {
        setCurrentEditItem(null);
        setModalType("exam");
        setIsEditing(true);
    };

    const handleEditFlashcard = (flashcard: any) => {
        setCurrentEditItem(flashcard);
        setModalType("flashcard");
        setIsEditing(true);
    };

    const handleCreateFlashcard = () => {
        setCurrentEditItem(null);
        setModalType("flashcard");
        setIsEditing(true);
    };

    const handleEditTeacher = (teacher: any) => {
        setCurrentEditItem(teacher);
        setModalType("teacher");
        setIsEditing(true);
    };

    const handleCreateTeacher = () => {
        setCurrentEditItem(null);
        setModalType("teacher");
        setIsEditing(true);
    };

    const handleDeleteTeacher = (id: string, name: string) => {
        setConfirmState({
            isOpen: true,
            title: "Xóa giáo viên",
            description: `Bạn có chắc chắn mun xóa tài khoản giáo viên "${name}"?`,
            isLoading: false,
            onConfirm: async () => {
                setConfirmState(prev => ({ ...prev, isLoading: true }));
                try {
                    await usersAPI.delete(id);
                    toast.success("Xóa giáo viên thành công");
                    setConfirmState(prev => ({ ...prev, isOpen: false }));
                    fetchData();
                } catch (error) {
                    toast.error("Li khi xóa tài khoản");
                } finally {
                    setConfirmState(prev => ({ ...prev, isLoading: false }));
                }
            }
        });
    };

    const handleBulkUploadFlashcards = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (event) => {
            try {
                const data = JSON.parse(event.target?.result as string);
                if (!Array.isArray(data)) throw new Error("Dữ liu phải là mt mảng");

                for (const item of data) {
                    await flashcardsAPI.create(item);
                }
                toast.success(`Tải lên thành công ${data.length} flashcards`);
                fetchData();
            } catch (error) {
                console.error("Bulk upload failed", error);
                toast.error("Li tải lên: " + (error as Error).message);
            }
        };
        reader.readAsText(file);
    };

    const handleDeleteFlashcard = (id: string) => {
        setConfirmState({
            isOpen: true,
            title: "Xóa flashcard",
            description: "Bạn có chắc chắn mun xóa flashcard này? Thao tác này không th hoàn tác.",
            isLoading: false,
            onConfirm: async () => {
                setConfirmState(prev => ({ ...prev, isLoading: true }));
                try {
                    await flashcardsAPI.delete(id);
                    toast.success("Xóa flashcard thành công");
                    setConfirmState(prev => ({ ...prev, isOpen: false }));
                    fetchData();
                } catch (error) {
                    toast.error("Li xóa flashcard");
                } finally {
                    setConfirmState(prev => ({ ...prev, isLoading: false }));
                }
            }
        });
    };

    const handleUpdateOrderStatus = async (id: string, status: string) => {
        try {
            await adminAPI.updateOrderStatus(id, status);
            toast.success("Cập nhật trạng thái ơn hàng thành công");
            fetchData();
        } catch (error) {
            console.error("Update status failed", error);
            toast.error("Li cập nhật trạng thái");
        }
    };

    const handleDeleteCourse = (id: string, name: string) => {
        setConfirmState({
            isOpen: true,
            title: "Xóa khóa học",
            description: `Bạn có chắc chắn mun xóa khóa học "${name}"? Toàn b bài học liên quan cũng sẽ b xóa.`,
            isLoading: false,
            onConfirm: async () => {
                setConfirmState(prev => ({ ...prev, isLoading: true }));
                try {
                    await coursesAPI.delete(id);
                    toast.success("Xóa khóa học thành công");
                    setConfirmState(prev => ({ ...prev, isOpen: false }));
                    fetchData();
                } catch (error) {
                    toast.error("Li khi xóa khóa học");
                } finally {
                    setConfirmState(prev => ({ ...prev, isLoading: false }));
                }
            }
        });
    };

    const handleDeleteExam = (id: string, name: string) => {
        setConfirmState({
            isOpen: true,
            title: "Xóa ề thi",
            description: `Bạn có chắc chắn mun xóa ề thi "${name}"?`,
            isLoading: false,
            onConfirm: async () => {
                setConfirmState(prev => ({ ...prev, isLoading: true }));
                try {
                    await examsAPI.delete(id);
                    toast.success("Xóa ề thi thành công");
                    setConfirmState(prev => ({ ...prev, isOpen: false }));
                    fetchData();
                } catch (error) {
                    toast.error("Li khi xóa ề thi");
                } finally {
                    setConfirmState(prev => ({ ...prev, isLoading: false }));
                }
            }
        });
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "active":
            case "published":
            case "completed":
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">Hoạt ng</span>;
            case "draft":
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">Bản nháp</span>;
            case "inactive":
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">Tạm ngưng</span>;
            default:
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">{status}</span>;
        }
    };

    if (!user || ((user.role as any) !== 'ADMIN' && (user.role as any) !== 'TEACHER')) {
        return null;
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-[#C53030]/20 selection:text-[#C53030]">
            {/* Top Navbar - Vibrantly Colored Design */}
            <div className="sticky top-0 z-50 bg-gradient-to-r from-slate-950 via-[#9b1c1c] to-slate-950 border-b border-[#C53030]/30 shadow-2xl transition-all">
                <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl -z-10"></div>
                <div className="container mx-auto px-4 lg:px-8 h-24 flex items-center justify-between">
                    <div className="flex items-center gap-12">
                        <div className="flex items-center gap-4 group">
                            <Link 
                                href="/lehrer-portal" 
                                onClick={(e) => {
                                    e.preventDefault();
                                    setActiveTab('overview');
                                }}
                                className="flex items-center gap-4"
                            >
                                <div className="w-14 h-14 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-rose-950/20 group-hover:scale-110 group-hover:bg-[#C53030] transition-all duration-700 border border-white/20">
                                    <LayoutDashboard className="w-8 h-8" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-2xl font-black text-white tracking-tight leading-none">
                                        Lehrer<span className="text-rose-400">Hub</span>
                                    </span>
                                    <span className="text-[10px] font-black text-rose-300 uppercase tracking-[0.3em] mt-1.5 opacity-80">
                                        Executive Portal
                                    </span>
                                </div>
                            </Link>
                        </div>

                        {/* Navigation Menu in Header */}
                        <div className="hidden xl:flex items-center gap-1.5 p-1.5 bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl">
                            {[
                                { id: "overview", label: "Dashboard" },
                                { id: "courses", label: "Khóa học" },
                                { id: "students", label: "Học viên" },
                                { id: "teachers", label: "Giáo viên", hidden: (user?.role as any) === 'TEACHER' },
                                { id: "tests", label: "Đề thi" },
                                { id: "flashcards", label: "Flashcards" },
                                { id: "orders", label: "Đơn hàng" },
                            ].filter(t => !t.hidden).map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={`px-6 py-3 text-sm font-black rounded-xl transition-all duration-500 relative group/btn ${activeTab === tab.id
                                        ? "text-white bg-gradient-to-br from-[#C53030] to-rose-600 shadow-xl shadow-rose-900/50 scale-[1.02]"
                                        : "text-rose-100/70 hover:text-white hover:bg-white/5"
                                        }`}
                                >
                                    {tab.label}
                                    {activeTab === tab.id && (
                                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1.5 bg-white rounded-full blur-[2px]"></div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-5">
                            <Link 
                                href={(user?.role as any) === 'TEACHER' ? "/Lehrer/profile" : "#"}
                                className="flex items-center gap-4 p-2 pr-6 rounded-[1.5rem] bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-500 group shadow-lg"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-white to-rose-200 text-[#C53030] flex items-center justify-center font-black text-xl shadow-xl group-hover:rotate-[360deg] transition-all duration-1000">
                                    {user?.name?.charAt(0) || 'A'}
                                </div>
                                <div className="hidden md:block text-sm text-left">
                                    <div className="font-black text-white group-hover:text-rose-300 transition-colors leading-tight text-base">{user?.name || 'Administrator'}</div>
                                    <div className="text-[11px] text-rose-300/60 font-black uppercase tracking-widest mt-0.5">{(user?.role as any) === 'ADMIN' ? 'System Master' : 'Lehrer'}</div>
                                </div>
                            </Link>

                            <div className="h-12 w-px bg-white/10 mx-1"></div>

                            <button
                                onClick={handleLogout}
                                className="w-12 h-12 rounded-2xl bg-black/20 hover:bg-[#C53030] flex items-center justify-center text-white transition-all duration-500 group border border-white/10"
                                title="Đng xuất"
                            >
                                <LogOut className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 lg:px-8 py-8 flex-1 flex flex-col">

                {/* Mobile Navigation Tabs (Shown only on mobile since hidden in header) */}
                <div className="xl:hidden mb-8 overflow-x-auto custom-scrollbar pb-4">
                    <div className="flex bg-[#0f172a]/90 backdrop-blur-md rounded-[1.5rem] p-1.5 border border-white/10 shadow-xl w-max gap-1">
                        {[
                            { id: "overview", label: "Dashboard" },
                            { id: "courses", label: "Khóa học" },
                            { id: "students", label: "Học viên" },
                            { id: "teachers", label: "Giáo viên", hidden: (user?.role as any) === 'TEACHER' },
                            { id: "tests", label: "Đề thi" },
                            { id: "flashcards", label: "Flashcards" },
                            { id: "orders", label: "Đơn hàng" },
                        ].filter(t => !t.hidden).map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`px-5 py-2.5 text-sm font-bold rounded-[1rem] transition-all duration-500 ${activeTab === tab.id
                                    ? "text-white bg-gradient-to-r from-[#C53030] to-rose-500 shadow-lg shadow-rose-900/40"
                                    : "text-slate-400 hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1">
                    {activeTab === "overview" && (
                        <div className="space-y-8 animate-in fade-in duration-500">
                            {/* Stats Grid */}
                            <StatsGrid stats={stats} />

                            <div className="grid gap-6 lg:grid-cols-3">
                                {/* Popular Courses */}
                                <PopularCourses courses={courses} />

                                {/* Recent Activity */}
                                <RecentActivity activities={activities} />
                            </div>
                        </div>
                    )}

                    {activeTab !== "overview" && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col">

                            {/* Table Toolbar */}
                            <div className="p-6 border-b border-slate-100 bg-white flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="relative w-full sm:max-w-md">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder={`Tìm kiếm ${activeTab === "courses" ? "khóa học" : activeTab === "students" ? "học viên" : activeTab === "teachers" ? "giáo viên" : activeTab === "tests" ? "bài kim tra" : activeTab === "orders" ? "ơn hàng" : "flashcards"}...`}
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 py-3 outline-none focus:border-[#C53030]/50 focus:ring-4 focus:ring-[#C53030]/10 focus:bg-white transition-all text-sm font-medium"
                                    />
                                </div>
                                <div className="flex items-center gap-3 w-full sm:w-auto">
                                    <div className="flex items-center gap-2">
                                        {activeTab === "flashcards" && (
                                            <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-600 shadow-sm hover:bg-slate-50 cursor-pointer transition-colors">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                                                Bulk Upload (JSON)
                                                <input type="file" accept=".json" className="hidden" onChange={handleBulkUploadFlashcards} />
                                            </label>
                                        )}
                                        <button className="flex-1 sm:flex-none justify-center items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-600 shadow-sm hover:bg-slate-50 transition-colors inline-flex">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
                                            Lọc
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => {
                                            if (activeTab === "courses") handleCreateCourse();
                                            if (activeTab === "teachers") handleCreateTeacher();
                                            if (activeTab === "tests") handleCreateExam();
                                            if (activeTab === "flashcards") handleCreateFlashcard();
                                        }}
                                        className="flex-1 sm:flex-none justify-center items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white shadow-lg hover:bg-[#C53030] transition-colors duration-300 inline-flex"
                                    >
                                        <Plus className="h-4 w-4" />
                                        Thêm mi
                                    </button>
                                </div>
                            </div>

                            {/* Lists Based on Tab */}
                            <div className="overflow-x-auto w-full">
                                <table className="w-full text-left text-sm whitespace-nowrap">
                                    <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-bold uppercase tracking-wider text-xs">
                                        {activeTab === "courses" && (
                                            <tr>
                                                <th className="px-6 py-4">Tên khóa học</th>
                                                <th className="px-6 py-4">Trình </th>
                                                <th className="px-6 py-4">Giáo viên</th>
                                                <th className="px-6 py-4">Học viên</th>
                                                <th className="px-6 py-4">Doanh thu</th>
                                                <th className="px-6 py-4">Trạng thái</th>
                                                <th className="px-6 py-4 text-right">Thao tác</th>
                                            </tr>
                                        )}
                                        {activeTab === "students" && (
                                            <tr>
                                                <th className="px-6 py-4">Họ tên</th>
                                                <th className="px-6 py-4">Email</th>
                                                <th className="px-6 py-4">Khóa học</th>
                                                <th className="px-6 py-4">Tiến  HT</th>
                                                <th className="px-6 py-4">Trạng thái</th>
                                                <th className="px-6 py-4 text-right">Thao tác</th>
                                            </tr>
                                        )}
                                        {activeTab === "teachers" && (
                                            <tr>
                                                <th className="px-6 py-4">Họ tên Lehrer</th>
                                                <th className="px-6 py-4">Email liên h</th>
                                                <th className="px-6 py-4 text-center">S khóa dạy</th>
                                                <th className="px-6 py-4">Ngày tham gia</th>
                                                <th className="px-6 py-4 text-right">Thao tác</th>
                                            </tr>
                                        )}
                                        {activeTab === "tests" && (
                                            <tr>
                                                <th className="px-6 py-4">Tên bài kim tra</th>
                                                <th className="px-6 py-4">Thuc khóa</th>
                                                <th className="px-6 py-4">S lượng câu</th>
                                                <th className="px-6 py-4">Lượt thi</th>
                                                <th className="px-6 py-4">Đim TB</th>
                                                <th className="px-6 py-4 text-right">Thao tác</th>
                                            </tr>
                                        )}
                                        {activeTab === "flashcards" && (
                                            <tr>
                                                <th className="px-6 py-4">Từ vựng</th>
                                                <th className="px-6 py-4">Ý nghĩa</th>
                                                <th className="px-6 py-4">Trình </th>
                                                <th className="px-6 py-4">Ví dụ</th>
                                                <th className="px-6 py-4 text-right">Thao tác</th>
                                            </tr>
                                        )}
                                        {activeTab === "orders" && (
                                            <tr>
                                                <th className="px-6 py-4">Mã ơn hàng</th>
                                                <th className="px-6 py-4">Học viên</th>
                                                <th className="px-6 py-4">Khóa học</th>
                                                <th className="px-6 py-4">Tng tiền</th>
                                                <th className="px-6 py-4">Trạng thái</th>
                                                <th className="px-6 py-4 text-right">Thao tác</th>
                                            </tr>
                                        )}
                                    </thead>
                                    {activeTab === "courses" && (
                                        <CourseTable
                                            courses={courses}
                                            onEdit={handleEditCourse}
                                            onDelete={handleDeleteCourse}
                                            getStatusBadge={getStatusBadge}
                                        />
                                    )}

                                    {activeTab === "students" && (
                                        <StudentTable
                                            students={usersData.filter(u => u.role === 'STUDENT').map(u => ({
                                                id: u.id,
                                                name: u.name || 'Học viên',
                                                email: u.email,
                                                courses: u._count?.enrollments || 0,
                                                progress: 0, // Mock for now
                                                status: "active"
                                            }))}
                                            getStatusBadge={getStatusBadge}
                                        />
                                    )}

                                    {activeTab === "teachers" && (
                                        <TeacherTable
                                            teachers={teachersData.map(t => ({
                                                id: t.id,
                                                name: t.name || 'Giáo viên',
                                                email: t.email,
                                                avatar: t.avatar,
                                                slug: t.slug,
                                                bio: t.bio,
                                                courseCount: t._count?.courses || 0,
                                                createdAt: t.createdAt
                                            }))}
                                            onEdit={handleEditTeacher}
                                            onDelete={handleDeleteTeacher}
                                        />
                                    )}

                                    {activeTab === "tests" && (
                                        <ExamTable
                                            exams={tests}
                                            onEdit={handleEditExam}
                                            onDelete={handleDeleteExam}
                                        />
                                    )}

                                    {activeTab === "flashcards" && (
                                        <FlashcardTable
                                            flashcards={flashcardsData}
                                            onEdit={handleEditFlashcard}
                                            onDelete={handleDeleteFlashcard}
                                        />
                                    )}

                                    {activeTab === "orders" && (
                                        <OrderTable
                                            orders={ordersData}
                                            onUpdateStatus={handleUpdateOrderStatus}
                                        />
                                    )}
                                </table>
                            </div>

                            <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-sm">
                                <div className="text-slate-500 font-medium">
                                    Đang hin th <span className="font-bold text-slate-900">1</span> ến <span className="font-bold text-slate-900">
                                        {activeTab === "courses" ? courses.length :
                                            activeTab === "students" ? students.length :
                                                activeTab === "teachers" ? teachersData.length :
                                                    activeTab === "tests" ? tests.length :
                                                        activeTab === "orders" ? ordersData.length :
                                                            flashcardsData.length}
                                    </span> trong s <span className="font-bold text-slate-900">
                                        {activeTab === "courses" ? courses.length :
                                            activeTab === "students" ? students.length :
                                                activeTab === "teachers" ? teachersData.length :
                                                    activeTab === "tests" ? tests.length :
                                                        activeTab === "orders" ? ordersData.length :
                                                            flashcardsData.length}
                                    </span> kết quả
                                </div>
                                <div className="flex gap-1">
                                    <button className="px-3 py-1 rounded border border-slate-200 bg-white text-slate-400 cursor-not-allowed">Trang trưc</button>
                                    <button className="px-3 py-1 rounded border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors">Trang tiếp</button>
                                </div>
                            </div>

                        </div>
                    )}
                </div>
            </div>

            {isEditing && modalType === "course" && (
                <AdminCourseModal
                    item={currentEditItem}
                    initialTab={initialCourseTab}
                    onClose={() => {
                        setIsEditing(false);
                        setModalType(null);
                    }}
                    onSuccess={() => {
                        setIsEditing(false);
                        setModalType(null);
                        fetchData();
                    }}
                />
            )}

            {isEditing && modalType === "exam" && (
                <AdminExamModal
                    item={currentEditItem}
                    onClose={() => {
                        setIsEditing(false);
                        setModalType(null);
                    }}
                    onSuccess={() => {
                        setIsEditing(false);
                        setModalType(null);
                        fetchData();
                    }}
                />
            )}
            {isEditing && modalType === "flashcard" && (
                <AdminFlashcardModal
                    item={currentEditItem}
                    onClose={() => {
                        setIsEditing(false);
                        setModalType(null);
                    }}
                    onSuccess={() => {
                        setIsEditing(false);
                        setModalType(null);
                        fetchData();
                    }}
                />
            )}
            {isEditing && modalType === "teacher" && (
                <AdminTeacherModal
                    item={currentEditItem}
                    onClose={() => {
                        setIsEditing(false);
                        setModalType(null);
                    }}
                    onSuccess={() => {
                        setIsEditing(false);
                        setModalType(null);
                        fetchData();
                    }}
                />
            )}
            {/* Confirmation Dialog */}
            <ConfirmDialog
                isOpen={confirmState.isOpen}
                onClose={() => setConfirmState(prev => ({ ...prev, isOpen: false }))}
                title={confirmState.title}
                description={confirmState.description}
                onConfirm={confirmState.onConfirm}
                isLoading={confirmState.isLoading}
                confirmText="Xác nhận"
                cancelText="Hủy bỏ"
            />
        </div>
    );
}
