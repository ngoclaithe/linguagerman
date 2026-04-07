#!/bin/bash
set -e

echo "================================================"
echo "  LinguaGerman LLM Server - GPU Deploy Script"
echo "  Model: Qwen2.5-7B-Instruct (Q4_K_M)"
echo "  Target: RTX 4060 Ti 15GB VRAM"
echo "================================================"

# 1. Install system dependencies
echo ""
echo "[1/6] Installing system dependencies..."
apt-get update -qq
apt-get install -y -qq python3-pip python3-venv cmake build-essential curl

# 2. Install Cloudflare Tunnel
echo ""
echo "[2/6] Installing cloudflared..."
if ! command -v cloudflared &> /dev/null; then
    curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
    dpkg -i cloudflared.deb
    rm cloudflared.deb
    echo "[*] cloudflared installed successfully"
else
    echo "[*] cloudflared already installed"
fi

# 3. Setup Python environment
echo ""
echo "[3/6] Setting up Python virtual environment..."
cd "$(dirname "$0")"
python3 -m venv .venv
source .venv/bin/activate

# 4. Install Python dependencies with CUDA support
echo ""
echo "[4/6] Installing Python dependencies (with CUDA)..."
pip install --upgrade pip
CMAKE_ARGS="-DGGML_CUDA=on" pip install llama-cpp-python --force-reinstall --no-cache-dir
pip install fastapi uvicorn huggingface-hub pydantic

# 5. Download model if needed
echo ""
echo "[5/6] Checking model file..."
MODEL_FILE="qwen2.5-7b-instruct-q4_k_m.gguf"
if [ ! -f "$MODEL_FILE" ]; then
    echo "[*] Downloading $MODEL_FILE from HuggingFace..."
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

# 6. Instructions
echo ""
echo "================================================"
echo "  Setup complete!"
echo "================================================"
echo ""
echo "To start the LLM server:"
echo "  source .venv/bin/activate"
echo "  python main.py"
echo ""
echo "To create Cloudflare Tunnel (run in a separate terminal):"
echo "  cloudflared tunnel --url http://localhost:8000"
echo ""
echo "Copy the tunnel URL (e.g. https://xxx.trycloudflare.com)"
echo "and set it in your backend .env file:"
echo "  OPENAI_BASE_URL=\"https://xxx.trycloudflare.com/v1\""
echo ""
