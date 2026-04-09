#!/bin/bash

MODEL="/home/linguagerman/llm-server/Qwen2.5-7B-Instruct-Q4_K_M.gguf"
SERVER="/home/linguagerman/llama.cpp/build/bin/llama-server"

echo "================================================"
echo "  Qwen2.5-7B-Instruct | RTX 3090 | CUDA"
echo "================================================"

nvidia-smi --query-gpu=name,memory.total,memory.used --format=csv,noheader
echo ""

$SERVER \
  -m $MODEL \
  -ngl 99 \
  -c 32768 \
  -t 6 \
  --host 0.0.0.0 \
  --port 8000
