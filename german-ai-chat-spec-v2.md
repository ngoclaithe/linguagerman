# Technical Spec — AI Chat Module · LinguaGerman
**Scope:** Chỉ phần AI Chat, tích hợp vào codebase hiện có  
**Version:** 2.0 — aligned với project structure thực tế

---

## 1. Tổng quan thay đổi

Codebase đã có đủ khung. Công việc thực tế là:

| Layer | File/Module hiện có | Việc cần làm |
|---|---|---|
| LLM Server | `llm-server/main.py` | Load 2 model, thêm 3 endpoints |
| Backend | `backend/src/ai/` | Tách thành 4 service + 1 gateway |
| Frontend | `frontend/app/(dashboard)/ai-chat/` | Thêm PersonaSelector, SuggestionChips, GrammarCard |

---

## 2. LLM Server — `llm-server/main.py`

Hiện tại là single-file monolithic. Giữ nguyên pattern đó, mở rộng thêm.

### 2.1 Model Loading

Load 2 model khi khởi động server, giữ cả 2 trong RAM/VRAM suốt vòng đời process:

```
Model A — Main Chat
  File:    qwen2.5-14b-instruct-q4_k_m.gguf   (GPU 24GB)
           qwen2.5-7b-instruct-q4_k_m.gguf    (GPU 16GB)
  Config:  n_gpu_layers=-1 (full GPU offload)
           n_ctx=8192
           verbose=False

Model B — Suggestion + Grammar
  File:    qwen2.5-7b-instruct-q4_k_m.gguf    (GPU 24GB)
           qwen2.5-3b-instruct-q4_k_m.gguf    (GPU 16GB)
  Config:  n_gpu_layers=-1
           n_ctx=2048   (task ngắn, không cần context dài)
           verbose=False
```

Model B dùng chung cho cả suggestion lẫn grammar — gọi tuần tự hoặc song song tùy thread. Nếu VRAM eo hẹp, Model B có thể để `n_gpu_layers=20` (partial offload) và phần còn lại chạy CPU — latency tăng ~200ms nhưng không ảnh hưởng UX vì chạy background.

### 2.2 Endpoints cần thêm

Hiện tại `main.py` đã có endpoint tương thích OpenAI. Giữ nguyên, thêm 3 endpoint chuyên biệt:

**`POST /chat/stream`** — Main chat, trả SSE  
```
Request:
{
  "messages": [...],          // Full conversation history
  "persona_id": "frau_schmidt",
  "system_prompt": "..."      // Đã build sẵn từ NestJS, llm-server chỉ nhận
}

Response: text/event-stream
data: {"token": "Hallo"}
data: {"token": " wie"}
data: [DONE]
```

**`POST /suggest`** — 3 gợi ý, trả JSON  
```
Request:
{
  "last_ai_message": "...",
  "topic": "Reisen",
  "cefr": "B1"
}

Response:
{
  "suggestions": ["Ich mag Reisen.", "Wohin reist du?", "Das ist toll!"]
}
```

**`POST /grammar`** — Kiểm tra ngữ pháp, trả JSON  
```
Request:
{
  "text": "Ich gehe gestern in die Schule.",
  "cefr": "B1"
}

Response:
{
  "has_error": true,
  "corrections": [
    {
      "original": "gehe gestern",
      "corrected": "ging gestern",
      "type": "grammar",
      "explanation": "Hành động trong quá khứ dùng Präteritum",
      "severity": "error"
    }
  ]
}
```

### 2.3 Prompt Templates (bên trong main.py)

`/suggest` và `/grammar` dùng prompt cố định bên trong `main.py`, không nhận system_prompt từ ngoài — để tránh prompt injection và đơn giản hóa API:

```python
SUGGEST_PROMPT = """You are a German language learning assistant.
Last AI message: "{last_ai_message}"
Topic: {topic}, CEFR level: {cefr}

Generate exactly 3 short German response suggestions (max 10 words each).
Vary types: 1 question, 1 statement, 1 reaction/emotion.
Output JSON only: {{"suggestions": ["...", "...", "..."]}}"""

GRAMMAR_PROMPT = """Check this German text for errors.
Text: "{text}"
Learner CEFR level: {cefr}

Output JSON only:
{{"has_error": bool, "corrections": [{{"original":"...","corrected":"...","type":"grammar|vocabulary|spelling|word_order","explanation":"...tiếng Việt max 15 từ...","severity":"error|warning|suggestion"}}]}}
If no errors: {{"has_error": false, "corrections": []}}"""
```

### 2.4 Thread Safety

llama-cpp-python không thread-safe mặc định. Dùng `asyncio.Lock` riêng cho mỗi model:

```python
lock_model_a = asyncio.Lock()
lock_model_b = asyncio.Lock()
```

`/chat/stream` acquire `lock_model_a`, `/suggest` và `/grammar` acquire `lock_model_b`. Hai lock độc lập nên chat và suggest chạy song song thực sự.

---

## 3. Backend — `backend/src/ai/`

### 3.1 Cấu trúc module hiện tại → mục tiêu

```
backend/src/ai/
├── ai.module.ts              # Đã có — khai báo thêm 3 service mới
├── ai.controller.ts          # Đã có — thêm các route mới
│
│   # --- THÊM MỚI ---
├── ai.gateway.ts             # SSE gateway, nhận message từ FE
├── services/
│   ├── persona.service.ts    # Build system prompt theo persona
│   ├── chat.service.ts       # Gọi /chat/stream trên llm-server, pipe SSE
│   ├── suggestion.service.ts # Gọi /suggest trên llm-server
│   └── grammar.service.ts    # Gọi /grammar trên llm-server
├── config/
│   └── personas.config.ts    # Định nghĩa 4 persona
└── dto/
    ├── send-message.dto.ts
    └── start-session.dto.ts
```

### 3.2 Luồng xử lý mỗi lượt chat

```
FE gửi POST /ai/message
        │
        ▼
   ai.gateway.ts
   Lấy context từ Redis (20 turns)
        │
        ├─────────────────────────────────┐
        │                                 │
        ▼                                 ▼
  chat.service.ts                  Promise.allSettled([
  Gọi llm-server /chat/stream        suggestion.service.ts → llm-server /suggest
  Pipe SSE token về FE ngay lập tức  grammar.service.ts    → llm-server /grammar
  event: "chat:token"              ])
  event: "chat:done"               Push về FE sau ~600-800ms
                                   event: "suggestions"
                                   event: "grammar"
        │                                 │
        └─────────────────────────────────┘
                         │
                         ▼
             Lưu turn vào Redis
             Async lưu vào DB qua Prisma
             (fire-and-forget, không block response)
```

### 3.3 API Endpoints

Thêm vào `ai.controller.ts`:

**`POST /ai/session/start`**  
Khởi tạo session mới, trả opening message và 3 suggestions đầu tiên.
```
Body:     { personaId, topic, cefrLevel, userId }
Response: { sessionId, openingMessage, suggestions: string[] }
```

**`POST /ai/message`** — trả SSE stream  
Endpoint chính, nhận message user, trả stream gồm nhiều event types.
```
Body: { sessionId, userId, message, personaId, topic, cefrLevel }

SSE Events:
  event: chat:token    data: { token: string }
  event: chat:done     data: { fullMessage: string }
  event: suggestions   data: { items: string[] }
  event: grammar       data: { hasError: bool, corrections: [...] }
```

**`GET /ai/session/:sessionId/history`**  
Lấy lịch sử hội thoại (dùng khi resume session).

**`GET /ai/personas`**  
Trả danh sách persona có sẵn (cho FE render PersonaSelector).

### 3.4 Context Management (Redis)

Dùng Redis client đã có trong project (nếu chưa có thì thêm `ioredis`).

```
Key:   context:{userId}:{sessionId}
Value: JSON array, 20 turns gần nhất
       [{ role: "user"|"assistant", content: "..." }, ...]
TTL:   86400 (24 giờ)
```

Mỗi lượt chat: GET → append turn mới → trim về 20 → SET lại. Không dùng LPUSH/LRANGE để tránh phức tạp.

### 3.5 Persona Config — `personas.config.ts`

```typescript
export const PERSONAS = {
  frau_schmidt: {
    id: 'frau_schmidt',
    name: 'Frau Schmidt',
    title: 'Giáo viên tiếng Đức',
    avatar: '👩‍🏫',
    cefrTarget: 'B1',
    errorTolerance: 'strict',
    systemPrompt: `Du bist Frau Schmidt, eine geduldige Deutschlehrerin aus Hamburg.
Antworte ausschließlich auf Deutsch. Korrigiere Grammatikfehler des Lernenden höflich.
Erkläre Korrekturen kurz. Stelle am Ende jeder Antwort eine Folgefrage.
Halte Antworten unter 4 Sätzen.`,
    topicAffinities: ['Grammatik', 'Kultur', 'Literatur', 'Bildung'],
  },

  max_friend: {
    id: 'max_friend',
    name: 'Max',
    title: 'Bạn thân người Berlin',
    avatar: '👦',
    cefrTarget: 'A2',
    errorTolerance: 'relaxed',
    systemPrompt: `Du bist Max, ein lockerer Typ aus Berlin, 25 Jahre alt.
Schreib locker, kurz, wie in einer WhatsApp-Nachricht. Benutze gelegentlich Berliner Slang.
Ignoriere kleine Grammatikfehler. Antworte auf Deutsch, max 2-3 Sätze.`,
    topicAffinities: ['Musik', 'Sport', 'Reisen', 'Essen', 'Filme'],
  },

  frau_bauer: {
    id: 'frau_bauer',
    name: 'Frau Bauer',
    title: 'Hàng xóm thân thiện',
    avatar: '👵',
    cefrTarget: 'A1',
    errorTolerance: 'moderate',
    systemPrompt: `Du bist Frau Bauer, eine freundliche Nachbarin aus München, 55 Jahre alt.
Sprich langsam und deutlich. Benutze einfache Wörter (A1-A2 Niveau).
Erzähle manchmal kurze Geschichten aus deinem Alltag. Max 3 einfache Sätze.`,
    topicAffinities: ['Wetter', 'Kochen', 'Familie', 'Einkaufen', 'Garten'],
  },

  herr_weber: {
    id: 'herr_weber',
    name: 'Herr Weber',
    title: 'Sếp tại công ty',
    avatar: '👨‍💼',
    cefrTarget: 'B2',
    errorTolerance: 'strict',
    systemPrompt: `Du bist Herr Weber, ein Abteilungsleiter in einem deutschen Unternehmen.
Benutze ausschließlich formelles Deutsch mit "Sie". Geschäftliche Themen und Bürosprache.
Korrigiere Fehler im formellen Register. Antworte professionell, max 4 Sätze.`,
    topicAffinities: ['Beruf', 'Meetings', 'Bewerbung', 'Präsentation', 'E-Mail'],
  },
}
```

---

## 4. Frontend — `frontend/app/(dashboard)/ai-chat/`

### 4.1 Cấu trúc file

```
frontend/app/(dashboard)/ai-chat/
├── page.tsx                  # Entry point — render PersonaSelector hoặc ChatWindow
├── components/
│   ├── PersonaSelector.tsx   # Chọn persona + topic + CEFR trước khi chat
│   ├── ChatWindow.tsx        # Container chính khi đang chat
│   ├── MessageList.tsx       # Render danh sách message + grammar annotations
│   ├── MessageBubble.tsx     # Single message với underline annotation
│   ├── GrammarTooltip.tsx    # Tooltip khi hover/tap vào lỗi
│   ├── SuggestionChips.tsx   # 3 nút gợi ý câu tiếp theo
│   └── StreamingIndicator.tsx # "..." khi AI đang typing
└── hooks/
    ├── useChat.ts            # Core hook: quản lý SSE, messages, state
    ├── useSuggestions.ts     # Nhận và reset suggestions
    └── useGrammar.ts         # Nhận grammar annotations, map vào message
```

### 4.2 Zustand Store — mở rộng `frontend/lib/store.ts`

Thêm slice mới vào store hiện có:

```typescript
interface AIChatSlice {
  // Session
  sessionId: string | null
  persona: Persona | null
  topic: string | null
  cefrLevel: 'A1' | 'A2' | 'B1' | 'B2' | 'C1'

  // Messages
  messages: Message[]
  isStreaming: boolean
  streamingContent: string      // Buffer token đang stream

  // Real-time features
  suggestions: string[]
  pendingSuggestions: boolean   // true khi đang chờ suggestions về
  grammarMap: Record<string, GrammarResult>  // key: messageId

  // Actions
  startSession: (personaId: string, topic: string, cefr: string) => Promise<void>
  sendMessage: (text: string) => void
  applySuggestion: (text: string) => void
  resetSession: () => void
}
```

### 4.3 SSE Hook — `useChat.ts`

Logic cốt lõi: mở EventSource, route từng event type vào đúng state:

```typescript
// Mở SSE connection khi user gửi message
const source = new EventSource(`/api/ai/message?...`)

source.addEventListener('chat:token', (e) => {
  // Append token vào streamingContent
})

source.addEventListener('chat:done', (e) => {
  // Finalize message, clear streamingContent
})

source.addEventListener('suggestions', (e) => {
  // Set suggestions chips
})

source.addEventListener('grammar', (e) => {
  // Map annotations vào messageId vừa gửi
})

source.addEventListener('error', () => source.close())
```

### 4.4 Grammar Annotation — hiển thị trên `MessageBubble.tsx`

Parse message text, wrap những đoạn có lỗi bằng `<span>` có underline:

```
severity: "error"      → underline đỏ  (border-bottom: 2px solid #ef4444)
severity: "warning"    → underline vàng (border-bottom: 2px dashed #f59e0b)
severity: "suggestion" → underline xanh (border-bottom: 2px dotted #3b82f6)
```

Tap/hover vào span → hiện `GrammarTooltip` với `corrected` + `explanation`.  
Không render tooltip nếu `hasError = false`.

### 4.5 PersonaSelector — flow trước khi chat

3 bước đơn giản trong cùng 1 trang:

```
Bước 1: Chọn persona (4 card, mỗi card có avatar + tên + mô tả ngắn)
Bước 2: Chọn topic (grid chip, filter theo topicAffinities của persona vừa chọn)
Bước 3: Confirm CEFR level (tự đánh giá, default theo cefrTarget của persona)
         → Gọi POST /ai/session/start → nhận openingMessage → vào ChatWindow
```

### 4.6 SuggestionChips — behavior

- Hiển thị sau khi AI trả xong message (nhận event `suggestions`)
- Ẩn ngay khi user bắt đầu gõ vào input
- Tap vào chip → điền vào input, không gửi ngay (user có thể edit trước)
- Reset về `[]` khi user gửi message mới, hiện skeleton 3 chip trong lúc chờ

---

## 5. Data Model — Prisma

Thêm vào schema Prisma hiện có:

```prisma
model AiSession {
  id           String     @id @default(uuid())
  userId       String
  personaId    String
  topic        String
  cefrLevel    String
  startedAt    DateTime   @default(now())
  endedAt      DateTime?
  messageCount Int        @default(0)

  user         User       @relation(fields: [userId], references: [id])
  messages     AiMessage[]
}

model AiMessage {
  id          String     @id @default(uuid())
  sessionId   String
  role        String     // "user" | "assistant"
  content     String     @db.Text
  annotations Json?      // grammar corrections, nullable
  createdAt   DateTime   @default(now())

  session     AiSession  @relation(fields: [sessionId], references: [id])
}
```

`AiMessage` chỉ ghi async sau mỗi 5 turns hoặc khi session kết thúc — không ghi real-time để tránh làm chậm chat path.

---

## 6. Wiring vào Module hiện có

### `ai.module.ts`

```typescript
@Module({
  imports: [
    HttpModule,          // Để gọi llm-server
    // RedisModule đã có trong project
  ],
  controllers: [AiController],
  providers: [
    AiGateway,
    PersonaService,
    ChatService,
    SuggestionService,
    GrammarService,
    ContextService,      // Wrap Redis operations
  ],
  exports: [PersonaService],
})
```

### Environment Variables cần thêm

```bash
# backend/.env
LLM_SERVER_URL=http://localhost:8000   # hoặc IP nội bộ của GPU server
MAIN_MODEL=qwen2.5-14b
FAST_MODEL=qwen2.5-7b

# llm-server/.env
MAIN_MODEL_PATH=./models/qwen2.5-14b-instruct-q4_k_m.gguf
FAST_MODEL_PATH=./models/qwen2.5-7b-instruct-q4_k_m.gguf
```

---

## 7. Topics Library

Dùng cho PersonaSelector step 2. Lưu dưới dạng constant trong FE, không cần DB.

```typescript
export const TOPICS_BY_LEVEL = {
  'A1-A2': [
    'Begrüßung', 'Familie', 'Essen & Trinken', 'Wetter',
    'Wohnung', 'Einkaufen', 'Farben & Zahlen', 'Tiere',
  ],
  'B1-B2': [
    'Reisen', 'Arbeit & Beruf', 'Gesundheit', 'Hobbys',
    'Technologie', 'Umwelt', 'Stadtleben', 'Kochen',
  ],
  'C1': [
    'Politik', 'Wirtschaft', 'Wissenschaft',
    'Bewerbungsgespräch', 'Präsentationen', 'Aktuelle Ereignisse',
  ],
}
```
