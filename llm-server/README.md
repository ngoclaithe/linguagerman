# LinguaGerman LLM Server

Local LLM server using **Qwen2.5-7B-Instruct** (Q4_K_M GGUF) with GPU acceleration via `llama-cpp-python`.

## Specs

| Component | Value |
|---|---|
| Model | Qwen2.5-7B-Instruct-Q4_K_M (~4.7GB) |
| Runtime | llama-cpp-python + CUDA |
| GPU | RTX 4060 Ti 15GB VRAM |
| API | OpenAI-compatible (`/v1/chat/completions`) |
| Context | 4096 tokens |

## Deploy to GPU Server

### Quick Start

```bash
# 1. Upload llm-server folder to GPU server
scp -r ./llm-server user@gpu-server:~/

# 2. SSH into GPU server
ssh user@gpu-server

# 3. Run deploy script
cd ~/llm-server
chmod +x deploy.sh
./deploy.sh

# 4. Start the server
source .venv/bin/activate
python main.py

# 5. In another terminal, create Cloudflare tunnel
cloudflared tunnel --url http://localhost:8000
```

### Connect Backend

Copy the Cloudflare tunnel URL and update `backend/.env`:

```env
OPENAI_BASE_URL="https://your-tunnel-id.trycloudflare.com/v1"
```

## API Endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/health` | Health check |
| GET | `/v1/models` | List available models |
| POST | `/v1/chat/completions` | Chat completion (OpenAI-compatible) |

## Test

```bash
curl http://localhost:8000/health

curl -X POST http://localhost:8000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "Qwen/Qwen2.5-7B-Instruct",
    "messages": [
      {"role": "system", "content": "You are a German teacher."},
      {"role": "user", "content": "Hallo, wie geht es dir?"}
    ],
    "temperature": 0.7,
    "max_tokens": 256
  }'
```
