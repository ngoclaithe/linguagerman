Functional Specification Document (FSD)
Module: German Conversation Assistant

Mục tiêu:
Học viên luyện hội thoại tiếng Đức theo chủ đề, nhận gợi ý câu nói tự nhiên, giải thích ngữ pháp/từ vựng, và đề xuất câu tiếp theo, với khả năng multi-turn conversation.

1️⃣ Người dùng
Loại người dùng	Chức năng
Học viên	Nhập câu tiếng Đức hoặc tiếng Anh, nhận gợi ý câu tự nhiên, giải thích, câu tiếp theo
Admin/Teacher	(Optional) Thêm chủ đề, chỉnh level, quản lý content gợi ý
2️⃣ Yêu cầu chức năng
ID	Tên chức năng	Mô tả chi tiết	Input	Output	Notes
F01	Nhập câu học viên	Học viên nhập câu tiếng Đức hoặc tiếng Anh	text	N/A	Text input FE
F02	Gợi ý câu tự nhiên	Module nhận câu học viên, trả câu tiếng Đức tự nhiên	userInput, conversationLog, topic, level	suggestion: string	Có thể highlight từ/câu sai
F03	Giải thích ngữ pháp/từ vựng	Giải thích chi tiết câu học viên dùng sai hoặc từ vựng khó	same as F02	explanation: string	Có thể kèm ví dụ
F04	Đề xuất câu tiếp theo	Sinh câu tiếp theo trong hội thoại, giữ context multi-turn	same as F02	nextPhrase: string	Giữ phong cách thân thiện, level phù hợp
F05	Multi-turn memory	Lưu lại conversation log để model hiểu bối cảnh	conversationLog: string[]	N/A	FE gửi log mỗi lượt, BE giữ log session
F06	Chủ đề luyện tập	Học viên hoặc default chọn chủ đề	topic: string	N/A	Ví dụ: Beruf, Familie, Alltag
F07	Level học viên	Học viên hoặc default chọn level	level: string	N/A	A1, A2, B1, B2, C1
F08	Export hội thoại	Lưu hoặc export hội thoại đã luyện	conversationLog	PDF/JSON	Optional, dùng ôn tập
3️⃣ Luồng nghiệp vụ
Học viên mở module → chọn topic và level.
Học viên nhập câu đầu tiên.
FE gửi API request tới BE: { userInput, conversationLog, topic, level }.

BE gọi LLM (GPT-4o / Claude 3 / Mistral 7B Instruct) với prompt:

Bạn là trợ giảng tiếng Đức thông minh.
Chủ đề: {topic}, level: {level}
Conversation so far: {conversationLog}
Học viên vừa nói: "{userInput}"
Trả lời theo JSON: { suggestion, explanation, nextPhrase }
BE trả JSON về FE → hiển thị:
Gợi ý câu tự nhiên
Giải thích ngữ pháp/từ vựng
Câu tiếp theo trong hội thoại
Học viên click câu tiếp theo hoặc nhập câu mới → bước 3 lặp lại.
Lưu conversation log để multi-turn.
4️⃣ Yêu cầu phi chức năng
Loại	Chi tiết
Hiệu năng	Response dưới 2s/lượt khi dùng cloud GPT-4o, dưới 5s nếu self-host
Khả năng mở rộng	Hỗ trợ nhiều topic, nhiều level, multi-turn ≥ 10 lượt
Bảo mật	Không lưu nội dung học viên ngoài session nếu không cần
Giao diện	Chat UI thân thiện, highlight gợi ý + giải thích
Khả năng mở rộng	Cho phép export PDF/flashcards, thêm các roleplay scenario
5️⃣ Input/Output API (BE)

Endpoint: POST /chat/german

Request body:

{
  "userInput": "Hallo",
  "conversationLog": ["Hallo! Ich heiße Anna."],
  "topic": "Beruf",
  "level": "A1"
}

Response:

{
  "suggestion": "Hallo",
  "explanation": "You used English 'hello'. In German, 'Hallo' is correct.",
  "nextPhrase": "Hallo! Mein Name ist Anna Keller, ich bin deine Deutschlehrerin. Wie geht es dir heute?"
}
6️⃣ Frontend UI/UX
Chat window hiển thị:
Học viên nhập câu → hiển thị gợi ý + giải thích + next phrase.
Multi-turn conversation scrollable.
Highlight: từ/cấu trúc sai → dễ nhận biết.
Buttons:
“Use suggestion” → tự động nhập câu gợi ý.
“Next phrase” → thêm câu model đề xuất vào hội thoại.
“Change topic/level” → restart conversation với context mới.