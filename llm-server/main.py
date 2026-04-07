from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
import time
import os
from huggingface_hub import hf_hub_download
from llama_cpp import Llama

app = FastAPI(title="LinguaGerman LLM Server")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL_FILE = "Qwen2.5-7B-Instruct-Q4_K_M.gguf"
REPO_ID = "bartowski/Qwen2.5-7B-Instruct-GGUF"

if not os.path.exists(MODEL_FILE):
    dl_start = time.time()
    print(f"[*] Downloading {MODEL_FILE} from {REPO_ID}...")
    downloaded_path = hf_hub_download(
        repo_id=REPO_ID,
        filename=MODEL_FILE
    )
    import shutil
    shutil.copy(downloaded_path, MODEL_FILE)
    print(f"[*] Downloaded in {time.time() - dl_start:.1f}s")

load_start = time.time()
print(f"[*] Loading {MODEL_FILE} with llama.cpp (full GPU offload)...")
llm = Llama(
    model_path=MODEL_FILE,
    n_threads=8,
    n_ctx=4096,
    n_gpu_layers=-1,
    verbose=False,
)
load_time = time.time() - load_start
print(f"[*] Model loaded in {load_time:.2f}s | RTX 4060 Ti GPU ready")
print("=" * 60)

request_count = 0


class ChatMessage(BaseModel):
    role: str
    content: str


class ChatCompletionRequest(BaseModel):
    model: str = "Qwen/Qwen2.5-7B-Instruct"
    messages: list[ChatMessage]
    temperature: float = 0.7
    max_tokens: int = 1024


@app.get("/health")
async def health():
    return {"status": "ok", "model": MODEL_FILE, "gpu": "RTX 4060 Ti"}


@app.get("/v1/models")
async def list_models():
    return {
        "object": "list",
        "data": [
            {
                "id": "Qwen/Qwen2.5-7B-Instruct",
                "object": "model",
                "owned_by": "local",
            }
        ],
    }


@app.post("/v1/chat/completions")
async def chat_completions(request: ChatCompletionRequest):
    global request_count
    request_count += 1
    rid = request_count

    print(f"\n{'=' * 60}")
    print(f"[#{rid}] Request received")
    print(f"[#{rid}] Messages: {len(request.messages)} | max_tokens: {request.max_tokens} | temp: {request.temperature}")
    for m in request.messages:
        preview = m.content[:80].replace('\n', ' ')
        print(f"[#{rid}]   {m.role}: {preview}{'...' if len(m.content) > 80 else ''}")

    formatted_messages = [
        {"role": m.role, "content": m.content} for m in request.messages
    ]

    t_start = time.time()
    response = llm.create_chat_completion(
        messages=formatted_messages,
        max_tokens=request.max_tokens,
        temperature=request.temperature,
    )
    t_total = time.time() - t_start

    prompt_tokens = response["usage"]["prompt_tokens"]
    output_tokens = response["usage"]["completion_tokens"]
    total_tokens = response["usage"]["total_tokens"]
    speed = output_tokens / t_total if t_total > 0 else 0

    reply = response["choices"][0]["message"]["content"][:100].replace('\n', ' ')

    print(f"[#{rid}] --- DONE ---")
    print(f"[#{rid}] Prompt: {prompt_tokens} tok | Output: {output_tokens} tok | Total: {total_tokens} tok")
    print(f"[#{rid}] Speed: {speed:.1f} tok/s | Time: {t_total:.2f}s")
    print(f"[#{rid}] Reply: {reply}{'...' if len(response['choices'][0]['message']['content']) > 100 else ''}")
    print(f"{'=' * 60}\n")

    return response


if __name__ == "__main__":
    print(f"[*] Starting server on http://0.0.0.0:8000")
    uvicorn.run(app, host="0.0.0.0", port=8000)

