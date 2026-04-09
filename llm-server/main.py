import os
import time
import asyncio
import json
from fastapi import FastAPI, Request
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
from huggingface_hub import hf_hub_download
from llama_cpp import Llama

app = FastAPI(title="LinguaGerman Dual LLM Server")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuration from env or defaults
MAIN_MODEL_FILE = os.getenv("MAIN_MODEL_FILE", "Qwen2.5-14B-Instruct-Q4_K_M.gguf")
MAIN_REPO_ID = os.getenv("MAIN_REPO_ID", "bartowski/Qwen2.5-14B-Instruct-GGUF")

FAST_MODEL_FILE = os.getenv("FAST_MODEL_FILE", "Qwen2.5-7B-Instruct-Q4_K_M.gguf")
FAST_REPO_ID = os.getenv("FAST_REPO_ID", "bartowski/Qwen2.5-7B-Instruct-GGUF")

def ensure_model(filename, repo_id):
    if not os.path.exists(filename):
        print(f"[*] Downloading {filename} from {repo_id}...")
        downloaded_path = hf_hub_download(repo_id=repo_id, filename=filename)
        import shutil
        shutil.copy(downloaded_path, filename)
        print(f"[*] Downloaded {filename}")
    return filename

ensure_model(MAIN_MODEL_FILE, MAIN_REPO_ID)
ensure_model(FAST_MODEL_FILE, FAST_REPO_ID)

print(f"[*] Loading MAIN MODEL: {MAIN_MODEL_FILE}")
llm_main = Llama(
    model_path=MAIN_MODEL_FILE,
    n_threads=8,
    n_ctx=8192,
    n_gpu_layers=-1, # Full GPU offload
    verbose=False,
)

print(f"[*] Loading FAST MODEL: {FAST_MODEL_FILE}")
llm_fast = Llama(
    model_path=FAST_MODEL_FILE,
    n_threads=8,
    n_ctx=2048,      # Short context for quick tasks
    n_gpu_layers=-1, # Full GPU offload (can tweak this if out of memory)
    verbose=False,
)

# Async Locks for thread safety
lock_model_main = asyncio.Lock()
lock_model_fast = asyncio.Lock()

# Prompt Templates
SUGGEST_PROMPT = """You are a German language learning assistant.
Last AI message: "{last_ai_message}"
Topic: {topic}, CEFR level: {cefr}

Generate exactly 3 short response suggestions in German (max 10 words each) that the user could say next.
Vary types: 1 question, 1 statement, 1 reaction/emotion.
Output JSON only: {{"suggestions": ["...", "...", "..."]}}"""

GRAMMAR_PROMPT = """Check this German text for errors.
Text: "{text}"
Learner CEFR level: {cefr}

Output JSON only in this exact format:
{{"hasError": bool, "corrections": [{{"original":"...","corrected":"...","type":"grammar|vocabulary|spelling","explanation":"...tiếng Việt max 15 từ...","severity":"error|warning|suggestion"}}]}}
If no errors: {{"hasError": false, "corrections": []}}"""

class ChatMessage(BaseModel):
    role: str
    content: str
    
class StreamRequest(BaseModel):
    messages: list[ChatMessage]
    system_prompt: str = ""

class SuggestRequest(BaseModel):
    last_ai_message: str
    topic: str
    cefr: str

class GrammarRequest(BaseModel):
    text: str
    cefr: str

@app.get("/health")
async def health():
    return {"status": "ok"}

@app.post("/chat/stream")
async def chat_stream(req: StreamRequest):
    async def generate():
        formatted_messages = []
        if req.system_prompt:
            formatted_messages.append({"role": "system", "content": req.system_prompt})
            
        for m in req.messages:
            formatted_messages.append({"role": m.role, "content": m.content})

        async with lock_model_main:
            # We use synchronous create_chat_completion with stream=True 
            # inside a thread or just loop through it (llama-cpp-python handles this via generator)
            response_generator = llm_main.create_chat_completion(
                messages=formatted_messages,
                stream=True,
                max_tokens=256,
                temperature=0.7,
            )
            
            for chunk in response_generator:
                if 'choices' in chunk and len(chunk['choices']) > 0:
                    delta = chunk['choices'][0].get('delta', {})
                    if 'content' in delta and delta['content']:
                        yield f"data: {json.dumps({'token': delta['content']})}\n\n"
            yield f"data: [DONE]\n\n"

    return StreamingResponse(generate(), media_type="text/event-stream")

@app.post("/suggest")
async def suggest(req: SuggestRequest):
    prompt = SUGGEST_PROMPT.format(
        last_ai_message=req.last_ai_message,
        topic=req.topic,
        cefr=req.cefr
    )
    
    async with lock_model_fast:
        res = llm_fast.create_chat_completion(
            messages=[{"role": "user", "content": prompt}],
            max_tokens=150,
            temperature=0.7,
            response_format={"type": "json_object"}
        )
    
    try:
        content = res["choices"][0]["message"]["content"]
        # Fast model might add markdown backticks, clean it
        content = content.replace('```json', '').replace('```', '').strip()
        data = json.loads(content)
        return data
    except Exception as e:
        print("Suggest parsing error:", e)
        return {"suggestions": ["Ja.", "Nein.", "Ich verstehe."]}

@app.post("/grammar")
async def grammar(req: GrammarRequest):
    prompt = GRAMMAR_PROMPT.format(text=req.text, cefr=req.cefr)
    
    async with lock_model_fast:
        res = llm_fast.create_chat_completion(
            messages=[{"role": "user", "content": prompt}],
            max_tokens=250,
            temperature=0.1,
            response_format={"type": "json_object"}
        )
        
    try:
        content = res["choices"][0]["message"]["content"]
        content = content.replace('```json', '').replace('```', '').strip()
        data = json.loads(content)
        return data
    except Exception as e:
        print("Grammar parsing error:", e, res["choices"][0]["message"]["content"])
        return {"hasError": False, "corrections": []}

if __name__ == "__main__":
    print("[*] Server starting on http://0.0.0.0:8000")
    uvicorn.run(app, host="0.0.0.0", port=8000)
