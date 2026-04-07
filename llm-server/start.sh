#!/bin/bash

MODEL="/home/linguagerman/llm-server/Mistral-7B-Instruct-v0.3-Q4_K_M.gguf"
SERVER="/home/linguagerman/llama.cpp/build/bin/llama-server"

echo "================================================"
echo "  Qwen2.5-7B-Instruct | RTX 4060 Ti | CUDA"
echo "================================================"

nvidia-smi --query-gpu=name,memory.total,memory.used --format=csv,noheader
echo ""

$SERVER \
  -m $MODEL \
  -ngl 99 \
  -c 4096 \
  -t 8 \
  --host 0.0.0.0 \
  --port 8000
