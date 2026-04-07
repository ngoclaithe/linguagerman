# LinguaGerman LLM Server

Local LLM server using **Qwen2.5-7B-Instruct** (Q4_K_M GGUF) with native llama.cpp CUDA build.

## Specs

| Component | Value |
|---|---|
| Model | Qwen2.5-7B-Instruct-Q4_K_M (~4.7GB) |
| Engine | llama.cpp (native C++ with CUDA) |
| GPU | RTX 4060 Ti 15GB VRAM |
| API | OpenAI-compatible (`/v1/chat/completions`) |
| Context | 4096 tokens |

## Deploy

```bash
# 1. SSH into GPU server
ssh -p 1928 root@n2.ckey.vn

# 2. Run deploy script (builds llama.cpp with CUDA)
cd /home/linguagerman/llm-server
chmod +x deploy.sh start.sh
bash deploy.sh

# 3. Start the server
bash start.sh
```

## Connect from Local Backend

SSH tunnel from local machine:
```bash
ssh -L 8000:localhost:8000 -p 1928 root@n2.ckey.vn
```

Backend `.env`:
```env
OPENAI_BASE_URL="http://127.0.0.1:8000/v1"
```

## API Endpoints (provided by llama-server)

| Method | Path | Description |
|---|---|---|
| GET | `/health` | Health check |
| GET | `/v1/models` | List models |
| POST | `/v1/chat/completions` | Chat (OpenAI-compatible) |

## Test

```bash
curl http://localhost:8000/health

curl -X POST http://localhost:8000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "Qwen2.5-7B-Instruct",
    "messages": [
      {"role": "system", "content": "You are a German teacher."},
      {"role": "user", "content": "Hallo, wie geht es dir?"}
    ],
    "temperature": 0.7,
    "max_tokens": 256
  }'
```
