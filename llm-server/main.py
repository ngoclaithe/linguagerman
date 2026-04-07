from fastapi import FastAPI
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
    print(f"[*] Downloading {MODEL_FILE} from {REPO_ID}...")
    downloaded_path = hf_hub_download(
        repo_id=REPO_ID,
        filename=MODEL_FILE
    )
    import shutil
    shutil.copy(downloaded_path, MODEL_FILE)
    print(f"[*] Downloaded and saved as {MODEL_FILE}")

print(f"[*] Loading {MODEL_FILE} with llama.cpp (full GPU offload)...")
llm = Llama(
    model_path=MODEL_FILE,
    n_threads=8,
    n_ctx=4096,
    n_gpu_layers=-1,
    verbose=False,
)
print("[*] Model loaded! RTX 4060 Ti GPU inference ready.")


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
    start_time = time.time()

    formatted_messages = [
        {"role": m.role, "content": m.content} for m in request.messages
    ]

    response = llm.create_chat_completion(
        messages=formatted_messages,
        max_tokens=request.max_tokens,
        temperature=request.temperature,
    )

    gen_time = time.time() - start_time
    output_tokens = response["usage"]["completion_tokens"]
    speed = output_tokens / gen_time if gen_time > 0 else 0
    print(f"[GPU] {output_tokens} tokens | {speed:.1f} tok/s | {gen_time:.2f}s")

    return response


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
