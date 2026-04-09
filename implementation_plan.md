# Refactoring AI Chat Module to V2

Theo yêu cầu từ tài liệu kỹ thuật `german-ai-chat-spec-v2.md`, quá trình triển khai sẽ tác động toàn diện từ AI Server đến Frontend để tách biệt logic, tăng hiệu năng và trải nghiệm người dùng (chia ra theo các phase rõ ràng).

## User Review Required

> [!WARNING]
> Mặc dù `schema.prisma` hiện tại đã có `AiConversation` và `AiMessage`, spec V2 yêu cầu thiết kế `AiSession` và điều chỉnh lại hệ thống ghi log tin nhắn (không ghi real-time, mà dùng Redis cache để tối ưu độ trễ xử lý realtime AI). Prisma Schema sẽ cần được migrate lại. Vui lòng kiểm tra và xác nhận có muốn xóa bảng cũ `ai_conversations` hay giữ để migrate dữ liệu sang `ai_sessions` mới!

---

## Proposed Changes

### LLM Server Layer

Sửa đổi kiến trúc monolithic của AI Server Python hiện tại để gánh được trọng tải đồng thời và dùng 2 models.

#### [MODIFY] [main.py](file:///d:/linguagerman/llm-server/main.py)
- Import `asyncio`, triển khai `lock_model_a` và `lock_model_b` để xử lý Thread Safety cho llama-cpp vì thư viện này không thread-safe mặc định.
- Load đồng thời 2 cấu hình Models: `MAIN_MODEL` (14B) để chat và `FAST_MODEL` (7B) để check grammar/suggest từ OS environment.
- Giữ nguyên endpoint `/v1/chat/completions` tương thích OpenAI.
- Thêm endpoint `POST /chat/stream`: Nhận mảng tin nhắn và stream SSE trả về Client (Model A).
- Thêm endpoint `POST /suggest`: Nhận input tạo 3 câu gợi ý trả về array JSON (Model B).
- Thêm endpoint `POST /grammar`: Nhận cú pháp sai trả về JSON chứa mảng `corrections` (Model B).

---

### Backend Layer (NestJS)

Chia nhỏ khối monolithic Controller/Service hiện tại. Cập nhật Prisma Schema và tích hợp Redis để xử lý dữ liệu context streaming.

#### [MODIFY] [schema.prisma](file:///d:/linguagerman/backend/prisma/schema.prisma)
- Cập nhật chuẩn format theo Spec V2: sửa `AiConversation` -> `AiSession`.
- Cập nhật field `annotations` trong `AiMessage` để mapping grammar fix JSON.

#### [NEW] [package.json](file:///d:/linguagerman/backend/package.json)
- Cài đặt thêm các package hỗ trợ cho SSE và context state: `npm install ioredis @nestjs/cache-manager`
- Cài đặt `npm install uuid` hoặc dùng Prisma sinh CUID tùy thuộc. 

#### [MODIFY] [ai.module.ts](file:///d:/linguagerman/backend/src/ai/ai.module.ts)
- Khai báo các providers mới bao gồm: `AiGateway`, `PersonaService`, `ChatService`, `SuggestionService`, `GrammarService`, `ContextService` (Redis).

#### [NEW] [ai.gateway.ts](file:///d:/linguagerman/backend/src/ai/ai.gateway.ts)
- Controller chính để tiếp nhận EventSource (SSE). Xử lý mở port stream về Next.js.
- Quản lý logic Promise.allSettled() gọi Grammar và Suggestion models song song để stream về Frontend sau khi chữ chat được tải về qua `/chat/stream`.

#### [DELETE] [ai.service.ts](file:///d:/linguagerman/backend/src/ai/ai.service.ts)
- Chuyển toàn bộ logic hiện có (translate, regex suggest) sang các module chia tách nhỏ. Thay regex hardcode bằng prompt AI Suggestion.

#### [NEW] [personas.config.ts](file:///d:/linguagerman/backend/src/ai/config/personas.config.ts)
- Khởi tạo 4 persona như Spec (Frau Schmidt, Max, Frau Bauer, Herr Weber) với system prompt tuỳ chỉnh và level CEFR tương ứng.

---

### Frontend Layer (Next.js)

Tách toàn bộ trang `ai-chat/page.tsx` đồ sộ ra thành các Functional Components. 

#### [MODIFY] [store.ts](file:///d:/linguagerman/frontend/lib/store.ts)
- Mở rộng Zustand store thêm scope `AIChatSlice`.
- Quản lý state tập trung cho các tín hiệu Streaming, danh sách Suggestions đang chờ (`pendingSuggestions`), và danh sách `grammarMap`.

#### [DELETE] [page.tsx](file:///d:/linguagerman/frontend/app/(dashboard)/ai-chat/page.tsx)
- Xóa code cũ, refactor page làm Root Controller render `PersonaSelector` hoặc `ChatWindow`.

#### [NEW] Component Tree (`frontend/app/(dashboard)/ai-chat/components/`)
- `PersonaSelector.tsx`: Hiển thị Topic A1-B2-C1.
- `ChatWindow.tsx`: Khung chat chính.
- `MessageBubble.tsx` & `GrammarTooltip.tsx`: Trọng tâm UI/UX, phân tích đoạn text, render thẻ span bị underline lỗi (lưới màu đỏ, vàng, lục) tương ứng JSON đẩy từ backend và popup tooltip khi lướt chuột.
- `SuggestionChips.tsx`: Render 3 nút bấm đề xuất tự động.

#### [NEW] Hooks (`frontend/app/(dashboard)/ai-chat/hooks/`)
- `useChat.ts`: Mở một kết nối `EventSource`, listen events: `chat:token`, `chat:done`, `suggestions`, `grammar` cập nhật real-time vào Zustand.

---

## Open Questions

> [!WARNING]
> 1. DB (Prisma): Mới đây project đã cài đặt Prisma, nếu tôi xóa/đổi `AiConversation` sang `AiSession` như Spec V2, DB của bạn có cần backup không hay tôi có thể thực thi lệnh `npx prisma db push` / `npx prisma migrate dev` và thay đổi tuân thủ?
> 2. System ENV: `llm-server` cần tải thêm một model `qwen2.5-14b-instruct-q4_k_m.gguf`. Bạn có đủ RAM/VRAM (> 24GB) không hay bạn muốn tôi vẫn cấu hình Model A & B đều dùng chung cái 7B hiện tạy để chạy cho nhẹ máy?

---

## Verification Plan

### Automated Tests
1. Chạy AI Server `main.py` xem tốc độ boot (giới hạn context/vram models chuẩn xác không).
2. Viết dummy curl request để test độc lập các route `/grammar` và `/suggest` JSON response format.

### Manual Verification
1. Mở FrontEnd dashboard AI Chat, test Flow Persona -> Chat.
2. Kiểm tra độ trễ hiển thị SSE Typing text (Từng token bật vào UI).
3. Sau khi chat được render xong, xem Suggestion Pills có nẩy ra không.
4. Gõ thử một câu sai (VD: `Ich ist gut`), chờ nó underline màu đỏ chữ `ist` -> `bin` với popup lý giải tiếng Việt.
