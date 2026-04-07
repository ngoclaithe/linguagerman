# LinguaGerman LLM Server

Local LLM inference server for the LinguaGerman language learning platform.

## Model

- **Qwen2.5-7B-Instruct** (Q4_K_M quantization, ~4.7GB)
- Engine: llama.cpp with full CUDA GPU offload
- Context: 8192 tokens
- Target: RTX 4060 Ti 15GB VRAM

## Setup (GPU Server)

```bash
# 1. Run deploy script (installs everything)
bash deploy.sh

# 2. Start the server
bash start.sh
```

## API

OpenAI-compatible API on port 8000:

```bash
# Health check
curl http://localhost:8000/health

# Chat completion
curl http://localhost:8000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "Qwen/Qwen2.5-7B-Instruct",
    "messages": [{"role": "user", "content": "Hallo!"}],
    "temperature": 0.6,
    "max_tokens": 80
  }'
```

## Architecture

```
NestJS Backend → SSH Tunnel → LLM Server (GPU) → Qwen2.5-7B
                               port 8000
```
