# Cấu Trúc Thư Mục Toàn Diện Nền Tảng LinguaGerman
*(Bao gồm: Frontend Next.js 15, Backend NestJS, AI Server)*

Tài liệu này mapping toàn bộ cấu trúc dự án thực tế, phơi bày các Tính năng Hệ thống Học Tập (LMS) kết hợp Gamification và AI.

---

## 🟢 1. Cấu trúc Frontend (Next.js 15 App Router)
*Thư mục gốc: `frontend/app` & `frontend/components`*

Hệ thống điều hướng dùng App Router với Route Groups để tối ưu Layout.

```text
frontend/
├── app/
│   ├── (auth)/             # Màn hình cho khách (Login/Register/Quên mật khẩu)
│   ├── (admin)/
│   │   └── lehrer-portal/  # Cổng thông tin dành cho Giáo viên (Quản lý học sinh, duyệt bài)
│   ├── (dashboard)/        # TRUNG TÂM PHẦN HỌC (Yêu cầu đăng nhập)
│   │   ├── dashboard/      # Tổng quan tiến trình, gợi ý bài học, daily streak
│   │   ├── ai-chat/        # AI đồng hành (Persona, chấm lỗi ngữ pháp, Text-to-Speech)
│   │   ├── courses/        # Danh mục khóa học tiếng Đức & Giao diện chọn lớp
│   │   ├── lesson/         # Giao diện học bài chi tiết (Video, lý thuyết, content)
│   │   ├── exams/ & exam/  # Thi thử chứng chỉ, đếm ngược thời gian, chấm điểm
│   │   ├── flashcards/     # Giao diện ôn tập từ vựng bằng thẻ nhớ
│   │   ├── missions/       # Nhiệm vụ hàng ngày/tuần (Missions Gamification)
│   │   ├── leaderboard/    # Bảng xếp hạng XP thi đua giữa các người dùng
│   │   ├── community/      # Mạng xã hội/Cộng đồng nội bộ của học sinh
│   │   ├── live-talk/      # Tính năng phòng luyện nói trực tiếp 
│   │   ├── teachers/       # Danh sách giáo viên người thật để book lịch
│   │   ├── orders/         # Lịch sử nạp tiền, mua khóa học/giờ học
│   │   └── profile/        # Quản lý tài khoản cá nhân
│   ├── globals.css         # Import Tailwind CSS và setup global
│   └── providers.tsx       # Bọc các Layer Context Providers (Auth, Theme...)
│
├── components/             # React Components (Reusable)
│   ├── ui/                 # Thư viện UI nguyên tử (Nút bấm, TextField, Cards...)
│   ├── auth/               # Tổ hợp form Đăng nhập, Đăng ký
│   ├── layout/             # Header, Navigation Sidebar, thẻ Footer
│   └── landing/            # Layout tĩnh phục vụ cho trang giới thiệu (Landing Page)
│
└── lib/                    # Các module hỗ trợ Frontend
    ├── api.ts              # Fetch/Axios Interceptors tóm bắt token & lỗi
    ├── store.ts            # Global State Manager (VD: dùng Zustand/Redux)
    └── utils.ts            # Hàm tiện ích dùng chung
```

---

## 🔵 2. Cấu trúc Backend API (NestJS)
*Thư mục gốc: `backend/src`*

Backend được chia thành từng Domain/Module tách biệt (Domain-Driven Design).

```text
backend/src/
├── prisma/               # Cấu hình ORM cài đặt file Client (kết nối DB)
├── common/               # Resource Dùng Chung toàn Server
│   └── middleware/       # Bộ lọc Request, Loggers, Chặn lỗi Authentication
│
├── auth/                 # Xử lý Cấp quyền: Tạo JWT, Verify Token, Login
├── users/                # Quản lý Data tài khoản người dùng, User Roles
│
│   # --- NHÓM L.M.S CỐT LÕI (Core Learning) ---
├── courses/              # Quản lý Database Danh mục Khóa học
├── lessons/              # Quản lý chi tiết nội dung của từng Bài học
├── progress/             # Tracking % tiến độ học tập của người dùng
├── streaming/            # API trả file âm thanh, video dưới dạng Stream chunk
├── upload/               # Bộ phận xử lý tải lên File (Avatar, ảnh bài giảng)
│
│   # --- NHÓM LUYỆN TẬP & KIỂM TRA ---
├── questions/            # Quản lý Ngân hàng các câu hỏi (Q&A)
├── exams/                # Tổ hợp Bài Thi & Đề nộp bài, tính điểm
├── flashcards/           # Thuật toán truy vấn Bộ thẻ ghi nhớ
│
│   # --- NHÓM GAME HÓA & TRÍ TUỆ NHÂN TẠO ---
├── quests/               # Thuật toán đếm Nhiệm vụ (Ví dụ: Học 2 bài liên tiếp)
├── leaderboard/          # Thuật toán lấy Bảng xếp hạng XP theo Tuần/Tháng
├── ai/                   # Routing giao tiếp với Local LLM Server & Google Trans
│
│   # --- NHÓM THƯƠNG MẠI & PHÂN QUYỀN ---
├── orders/               # Logging các lệnh mua nội dung, giao dịch
├── admin/                # API xuất thống kê kinh doanh và tổng hợp User
│
└── app.module.ts         # Khai báo Root bọc toàn bộ 17 System Modules
```

---

## 🟣 3. Cấu trúc Local AI Server (Python FastAPI)
*Thư mục gốc: `llm-server`*

Trái tim AI tiết kiệm chi phí, chạy Offline qua GPU/CPU Local.

```text
llm-server/
└── main.py              # Single-file Monolithic App
                         # - Sử dụng: FastAPI
                         # - Inference: llama-cpp-python
                         # - Models: Chuẩn GGUF (Ví dụ Qwen2.5-7B)
                         # - API: Cung cấp endpoint tương thích chuẩn OpenAI
```

---

### Đánh giá Mô hình Tổng quát:
*   Mô hình này cho thấy sự kết hợp của: **E-Learning tĩnh** (Course/Lesson) + **Tương tác động** (Gamification/AI-Chat) + **Tương tác thực tế** (Community/LiveTalk). 
*   Việc module hóa cực tốt trên NestJS cho phép ứng dụng mở rộng thêm nhiều tính năng học ngoại ngữ khác mà không làm phình hay rối tổ chức Codebase.
