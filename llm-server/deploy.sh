#!/bin/bash
set -e

echo "================================================"
echo "  LinguaGerman LLM Server - GPU Deploy Script"
echo "  Model: Qwen2.5-7B-Instruct (Q4_K_M)"
echo "  Engine: llama.cpp (native CUDA build)"
echo "  Target: RTX 4060 Ti 15GB VRAM"
echo "================================================"

# 1. Install system dependencies
echo ""
echo "[1/5] Installing system dependencies..."
apt-get update -qq
apt-get install -y -qq cmake build-essential curl git ninja-build

# 2. Build llama.cpp with CUDA
echo ""
echo "[2/5] Building llama.cpp with CUDA support..."
cd /home/linguagerman
if [ ! -d "llama.cpp" ]; then
    git clone https://github.com/ggerganov/llama.cpp
fi
cd llama.cpp
git pull

export PATH="/usr/local/cuda/bin:$PATH"
cmake -B build -DGGML_CUDA=ON -DCMAKE_CUDA_COMPILER=/usr/local/cuda/bin/nvcc
cmake --build build --config Release -j$(nproc)
echo "[*] llama.cpp built successfully with CUDA!"

# 3. Download model if needed
echo ""
echo "[3/5] Checking model file..."
cd /home/linguagerman/llm-server
MODEL_FILE="Qwen2.5-7B-Instruct-Q4_K_M.gguf"
if [ ! -f "$MODEL_FILE" ]; then
    echo "[*] Downloading $MODEL_FILE from HuggingFace..."
    pip install huggingface-hub
    python3 -c "
from huggingface_hub import hf_hub_download
import shutil
path = hf_hub_download(repo_id='Qwen/Qwen2.5-7B-Instruct-GGUF', filename='$MODEL_FILE')
shutil.copy(path, '$MODEL_FILE')
print(f'[*] Model saved: $MODEL_FILE')
"
else
    echo "[*] Model file already exists: $MODEL_FILE"
fi

# 4. Install cloudflared (optional)
echo ""
echo "[4/5] Installing cloudflared..."
if ! command -v cloudflared &> /dev/null; then
    curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
    dpkg -i cloudflared.deb
    rm cloudflared.deb
    echo "[*] cloudflared installed"
else
    echo "[*] cloudflared already installed"
fi

# 5. Done
echo ""
echo "================================================"
echo "  Setup complete!"
echo "================================================"
echo ""
echo "To start the LLM server:"
echo "  cd /home/linguagerman/llm-server"
echo "  bash start.sh"
echo ""
echo "Or manually:"
echo "  /home/linguagerman/llama.cpp/build/bin/llama-server \\"
echo "    -m /home/linguagerman/llm-server/Qwen2.5-7B-Instruct-Q4_K_M.gguf \\"
echo "    -ngl 99 -c 8192 --host 0.0.0.0 --port 8000"
echo ""
