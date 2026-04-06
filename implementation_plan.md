# Kiến trúc Triển khai (Trợ lý Tiếng Đức Trí tuệ Nhân tạo)

Dựa trên tài liệu Đặc tả chức năng (FSD) `trochuyenai.md`, giải pháp dưới đây tập trung vào việc tạo ra vòng lặp **Multi-turn Contextual Conversation** bằng cách sử dụng **OpenAI API (GPT-4o)** và tích hợp luồng JSON Output chuẩn mực.

## 1. Mở rộng Backend (NestJS)

### Cài đặt Thư viện
- Cài đặt thêm package `openai` để dùng OpenAI SDK.

### DTOs (Data Transfer Objects)
Tạo `src/ai/dto/chat-german.dto.ts`:
```typescript
export class ChatGermanDto {
  userInput: string;
  conversationLog: string[];
  topic: string; // VD: Beruf, Familie, Alltag
  level: string; // VD: A1, A2
}
```

### Prompt Engineering & Controller `AiController`
Triển khai endpoint POST `POST /api/ai/chat/german`.
Sử dụng công nghệ **Structured Outputs (Response Format: JSON Object)** của OpenAI để ép bot trả về chính xác định dạng:
```typescript
// System Prompt
const systemPrompt = `Bạn là trợ giảng tiếng Đức thông minh.
Chủ đề: ${topic}, level: ${level}
Conversation so far: ${conversationLog}

Yêu cầu đầu ra bắt buộc phải là 1 JSON Object chứa:
{
  "suggestion": "Câu gợi ý viết mượt và đúng ngữ pháp mà user nên dùng thay thế (bỏ trống nếu user nói hoàn hảo)",
  "explanation": "Giải thích chi tiết bằng tiếng Việt nếu ngữ pháp/từ vựng sai (bỏ trống nếu user nói hoàn hảo)",
  "nextPhrase": "Câu giao tiếp tiếp theo bằng tiếng Đức để bot phản hồi lại user, giúp duy trì cuộc nói chuyện"
}`;
```

## 2. Frontend UI/UX (Màn hình `ai-chat`)

- Xóa các Mock data (dữ liệu giả) ở file `app/(dashboard)/ai-chat/page.tsx`.
- Viết hàm `fetch` móc nối vào API `POST http://localhost:3054/api/ai/chat/german`.
- Định dạng dữ liệu hiển thị:
   - Các Bong bóng Chat của User gõ lên.
   - Nếu có `suggestion` và `explanation` -> Render thẻ `Gợi ý tự nhiên hơn`.
   - Lấy `nextPhrase` gán vào Bong bóng màu Tím của Bot làm phản hồi tiếp theo.
- Nút Action hỗ trợ (sẽ triển khai thêm theo FSD):
  - Nhập bằng giọng nói (Voice input -> sẽ truyền vào userInput).
  - Nghe lại (Speaker button).

## Open Questions (User Review Required)
> [!IMPORTANT]
> 1. Em đã kiểm tra file `backend/.env` thì hiện tại **Chưa có chuỗi mã API Key của OpenAI**. Anh/chị có sẵn một mã **`OPENAI_API_KEY=sk-...`** (API của ChatGPT) cho em mượn để gắn vào `.env` không ạ? Nếu gửi lên chat này sợ lộ, anh/chị có thể dán thẳng chuỗi đó vào file `backend/.env` giúp em nha.
> 2. Về lịch sử Chat (`conversationLog`), tài liệu của mình cho phép phía Frontend truyền nguyên mảng chuỗi lên. Em sẽ code theo hướng này để tối ưu tốc độ nhanh nhất. Hệ thống không cần thiết phải "lật lại DB để đọc lịch sử cũ" mỗi lần gửi tin nhắn. Anh/chị chốt phương án này chuẩn chưa?
>
> Anh/chị xem xét và duyệt plan để em bắt tay vào cài `openai` và gõ code nhé!
