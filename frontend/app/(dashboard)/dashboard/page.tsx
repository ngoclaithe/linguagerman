'use client';

import Link from "next/link";
import {
  BookOpen,
  TrendingUp,
  Clock,
  Award,
  Play,
  CheckCircle,
  Target,
  FileText,
  Calendar,
  Flame,
  ArrowRight
} from "lucide-react";
import { useAuthStore } from "@/lib/store";

import { useEffect, useState } from "react";
import { progressAPI, examsAPI, getImageUrl } from "@/lib/api";

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  const [recentLessons, setRecentLessons] = useState<any[]>([]);
  const [stats, setStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [courses, progress, examResults] = await Promise.all([
          progressAPI.getMyCourses(),
          progressAPI.get(),
          examsAPI.getMyResults()
        ]);

        const safeEnrolledCourses = Array.isArray(courses) ? courses : [];
        const safeProgress = progress || { completedLessons: [], completedCount: 0 };
        const safeExamResults = Array.isArray(examResults) ? examResults : [];

        setEnrolledCourses(safeEnrolledCourses.map((e: any) => {
          const completedLessons = (safeProgress.completedLessons || []).filter((p: any) => p.lesson.courseId === e.courseId);
          const completedLessonIds = new Set(completedLessons.map((p: any) => p.lesson.id));

          
          const sortedLessons = [...(e.course.lessons || [])].sort((a: any, b: any) => a.order - b.order);

          
          const nextLesson = sortedLessons.find((l: any) => !completedLessonIds.has(l.id)) || sortedLessons[0];

          return {
            ...e.course,
            progress: Math.round((completedLessons.length / (e.course.lessons?.length || 1)) * 100),
            completedLessonsCount: completedLessons.length,
            totalLessons: e.course.lessons?.length || 0,
            currentLesson: nextLesson?.title || "Hoàn thành",
            nextLessonId: nextLesson?.id
          };
        }));

        setRecentLessons((safeProgress.completedLessons || []).slice(0, 3).map((lp: any) => ({
          id: lp.id,
          lesson: lp.lesson.title,
          course: lp.lesson.course?.title || "Tiếng Nhật",
          date: lp.completedAt ? new Date(lp.completedAt).toLocaleDateString() : "Vừa xong",
          duration: "15:00",
          completed: true
        })));

        setStats([
          {
            icon: BookOpen,
            label: "Bài học đã xong",
            value: (safeProgress.completedCount || 0).toString(),
            color: "text-blue-600",
            bgColor: "bg-blue-100/50",
          },
          {
            icon: Clock,
            label: "Giờ học",
            value: ((safeProgress.completedCount || 0) * 0.25).toFixed(1) + "h",
            color: "text-emerald-600",
            bgColor: "bg-emerald-100/50",
          },
          {
            icon: Flame,
            label: "Chuỗi ngày",
            value: "1 ngày",
            color: "text-orange-500",
            bgColor: "bg-orange-100/50",
          },
          {
            icon: Award,
            label: "Đề thi đã làm",
            value: safeExamResults.length.toString(),
            color: "text-purple-600",
            bgColor: "bg-purple-100/50",
          },
        ]);
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const upcomingTests = [
    {
      title: "Kiểm tra A1",
      date: "Sắp tới",
      course: "Tiếng Nhật A1",
      questions: 50,
      time: "60 phút"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {}
      {}
      <section className="bg-slate-900 pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/course-A1.jpg')] opacity-5 bg-cover bg-center mix-blend-luminosity"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#C53030]/20 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-white animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-xs font-medium mb-4">
                <Flame className="w-4 h-4 text-orange-400" />
                Chuỗi học tập: 7 ngày liên tiếp
              </div>
              <h1 className="text-3xl lg:text-5xl font-extrabold mb-2 tracking-tight">
                Chào buổi sáng, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C53030] to-rose-400">{user?.name || 'Bạn'}!</span> 
              </h1>
              <p className="text-slate-300 text-lg">
                Hôm nay bạn muốn tiếp tục bài học nào?
              </p>
            </div>
            <Link
              href="/flashcards"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C53030] px-6 py-3.5 font-bold text-white shadow-lg shadow-[#C53030]/30 hover:bg-[#C53030]/90 hover:-translate-y-0.5 transition-all duration-300 transform"
            >
              Học Flashcard ngay
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {}
      <div className="container mx-auto px-4 lg:px-8 pb-20 relative z-20 -mt-12 animate-in fade-in duration-700 delay-300">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">

          {}
          <div className="lg:col-span-8 flex flex-col gap-8">

            {}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                >
                  <div
                    className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${stat.bgColor}`}
                  >
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div className="mb-1 text-2xl font-black text-slate-900">{stat.value}</div>
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {}
            <div>
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900">Khóa học của bạn</h2>
                <Link
                  href="/courses"
                  className="text-sm font-semibold text-[#C53030] hover:text-[#C53030]/80 transition-colors inline-flex items-center gap-1"
                >
                  Xem tất cả <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid gap-5">
                {enrolledCourses.map((course) => (
                  <div
                    key={course.id}
                    className="group rounded-3xl border border-slate-100 bg-white p-4 lg:p-6 shadow-sm hover:shadow-xl hover:shadow-[#C53030]/10 transition-all duration-300 flex flex-col md:flex-row gap-6 relative overflow-hidden"
                  >
                    {}
                    <div className="absolute top-0 left-0 h-1 bg-slate-100 w-full">
                      <div className="h-full bg-[#C53030]" style={{ width: `${course.progress}%` }}></div>
                    </div>

                    <div className="w-full md:w-56 aspect-video overflow-hidden rounded-2xl flex-shrink-0 relative group-hover:shadow-md transition-shadow">
                      <img
                        src={getImageUrl(course.thumbnail) || "/images/default-course.jpg"}
                        alt={course.title}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold text-slate-900 shadow-sm">
                        {course.level}
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col justify-center">
                      <h3 className="mb-2 text-xl font-bold text-slate-900 group-hover:text-[#C53030] transition-colors">
                        {course.title}
                      </h3>
                      <p className="mb-5 text-sm font-medium text-slate-500">
                        Bài tiếp theo: <span className="text-slate-700">{course.currentLesson}</span>
                      </p>

                      <div className="mb-5">
                        <div className="mb-2 flex items-center justify-between text-xs font-semibold">
                          <span className="text-slate-400 uppercase tracking-wider">Tiến độ khóa học</span>
                          <span className="text-[#C53030]">{course.progress}%</span>
                        </div>
                        <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-[#C53030]"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                        <div className="mt-2 text-xs font-medium text-slate-400">
                          Đã học {course.completedLessonsCount}/{course.totalLessons} bài học
                        </div>
                      </div>

                      <Link
                        href={`/courses/${course.slug || course.id}/lesson/${course.nextLessonId}`}
                        className="inline-flex w-max items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-[#C53030] transition-colors duration-300"
                      >
                        <Play className="h-4 w-4 fill-current" />
                        Tiếp tục học
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {}
            <div>
              <h2 className="mb-5 text-2xl font-bold text-slate-900">Hoạt động gần đây</h2>
              <div className="rounded-3xl border border-slate-100 bg-white overflow-hidden shadow-sm">
                <div className="divide-y divide-slate-50">
                  {recentLessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="flex items-center justify-between p-5 hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 shrink-0 border border-emerald-100">
                          <CheckCircle className="h-6 w-6 text-emerald-500" />
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 mb-0.5">{lesson.lesson}</div>
                          <div className="text-xs font-medium text-slate-500 line-clamp-1">
                            {lesson.course} <span className="mx-1"></span> {lesson.date}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm font-bold text-slate-700 bg-white shadow-sm border border-slate-100 px-3 py-1.5 rounded-lg shrink-0">
                        {lesson.duration}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {}
          <div className="lg:col-span-4 space-y-8 lg:-mt-[150px] relative z-20">

            {}
            <div className="rounded-[2rem] border border-slate-100 bg-white p-6 md:p-8 shadow-xl shadow-slate-200/50">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#C53030]/10 border border-[#C53030]/20 shrink-0">
                  <Target className="h-7 w-7 text-[#C53030]" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">Mục tiêu học tập</h3>
                  <p className="text-xs font-medium text-slate-500">Giữ nhịp điệu hàng ngày</p>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-600">Mục tiêu tuần này</span>
                    <span className="font-bold text-slate-900">10/15 giờ</span>
                  </div>
                  <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#C53030] to-rose-400"
                      style={{ width: "67%" }}
                    />
                  </div>
                  <p className="text-xs text-slate-500 font-medium mt-3 text-center">
                    Cố lên! Bạn sắp hoàn thành mục tiêu tuần này rồi.
                  </p>
                </div>
                <button className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 text-sm font-bold text-slate-700 hover:bg-slate-100 transition-colors shadow-sm">
                  Cập nhật mục tiêu
                </button>
              </div>
            </div>

            {}
            <div className="rounded-[2rem] border border-slate-100 bg-white p-6 md:p-8 shadow-md">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-500">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-slate-900">Kiểm tra sắp tới</h3>
                </div>
              </div>

              <div className="space-y-4">
                {upcomingTests.map((test, index) => (
                  <div
                    key={index}
                    className="group rounded-2xl border border-slate-100 bg-slate-50 p-5 hover:border-[#C53030]/30 transition-colors hover:shadow-md"
                  >
                    <div className="mb-1 font-bold text-slate-900 group-hover:text-[#C53030] transition-colors">{test.title}</div>
                    <div className="mb-4 text-xs font-medium text-slate-500">
                      {test.course}
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-y-2 border-t border-slate-200/60 pt-3">
                      <div className="flex gap-4">
                        <span className="text-xs font-semibold text-slate-600">
                          {test.questions} câu
                        </span>
                        <span className="text-xs font-semibold text-slate-600">
                          {test.time}
                        </span>
                      </div>
                      <span className="font-bold text-sm text-[#C53030] px-2 py-1 bg-[#C53030]/10 rounded-md">
                        {test.date}
                      </span>
                    </div>
                  </div>
                ))}
                <Link
                  href="/tests"
                  className="block w-full rounded-xl bg-slate-900 py-3.5 text-center text-sm font-bold text-white hover:bg-slate-800 transition-colors shadow-md mt-2"
                >
                  Xem tất cả
                </Link>
              </div>
            </div>

            {}
            <div className="rounded-[2rem] border border-slate-100 bg-white p-6 md:p-8 shadow-md">
              <h3 className="mb-5 font-bold text-slate-900">Lối tắt công cụ</h3>
              <div className="grid gap-3">
                <Link
                  href="/flashcards"
                  className="flex items-center gap-4 rounded-2xl border border-slate-100 p-4 hover:border-[#C53030]/30 hover:shadow-md hover:bg-slate-50 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-rose-50 flex justify-center items-center text-rose-500 group-hover:scale-110 transition-transform">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <span className="font-medium text-slate-700">Ôn tập Flashcard</span>
                </Link>
                <Link
                  href="/tests"
                  className="flex items-center gap-4 rounded-2xl border border-slate-100 p-4 hover:border-[#C53030]/30 hover:shadow-md hover:bg-slate-50 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex justify-center items-center text-blue-500 group-hover:scale-110 transition-transform">
                    <FileText className="h-5 w-5" />
                  </div>
                  <span className="font-medium text-slate-700">Làm đề thi mẫu</span>
                </Link>
                <Link
                  href="/courses"
                  className="flex items-center gap-4 rounded-2xl border border-slate-100 p-4 hover:border-[#C53030]/30 hover:shadow-md hover:bg-slate-50 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex justify-center items-center text-emerald-500 group-hover:scale-110 transition-transform">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <span className="font-medium text-slate-700">Đăng ký thêm lớp</span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

