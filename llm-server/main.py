from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn
import time
import os
from huggingface_hub import hf_hub_download
from llama_cpp import Llama

app = FastAPI()

MODEL_FILE = "qwen3-0.6b.gguf"

if not os.path.exists(MODEL_FILE):
    print(f"[*] Không tìm thấy {MODEL_FILE}. Đang tự động tải Qwen2.5-0.5B-Instruct-GGUF (Q8_0) từ HuggingFace...")
    downloaded_path = hf_hub_download(
        repo_id="Qwen/Qwen2.5-0.5B-Instruct-GGUF",
        filename="qwen2.5-0.5b-instruct-q8_0.gguf"
    )
    import shutil
    shutil.copy(downloaded_path, MODEL_FILE)
    print(f"[*] Tải xong và lưu thành {MODEL_FILE}")

print(f"[*] Đang nạp mô hình {MODEL_FILE} bằng llama.cpp... Siêu tối ưu cho RAM!")
llm = Llama(
    model_path=MODEL_FILE,
    n_threads=8,
    n_ctx=2048,
    verbose=False
)
print("[*] Nạp model thành công! Llama.cpp Sẵn sàng phục vụ.")

class ChatMessage(BaseModel):
    role: str
    content: str
    
class ChatCompletionRequest(BaseModel):
    model: str
    messages: list[ChatMessage]
    temperature: float = 0.7
    max_tokens: int = 512

@app.post("/v1/chat/completions")
async def chat_completions(request: ChatCompletionRequest):
    print(f"\n[DEBUG] --- Bắt đầu xử lý Request bằng Llama-cpp ---")
    start_time = time.time()
    
    formatted_messages = [{"role": m.role, "content": m.content} for m in request.messages]
    
    print("[DEBUG] Đang suy luận (Generation)...")
    
    response = llm.create_chat_completion(
        messages=formatted_messages,
        max_tokens=request.max_tokens,
        temperature=request.temperature
    )
    
    gen_time = time.time() - start_time
    output_tokens = response['usage']['completion_tokens']
    
    print(f"[DEBUG] Decode token xong! Sinh ra {output_tokens} tokens.")
    print(f"[DEBUG] Tốc độ (CPU) = {(output_tokens / gen_time):.2f} Token/s. Thời gian: {gen_time:.2f}s")
    print(f"[DEBUG] --- Kết thúc Request ---\n")
    
    return response

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
