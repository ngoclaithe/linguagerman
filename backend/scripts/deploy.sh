#!/bin/bash

# Exit on error
set -e

PROJECT_ROOT="/home/jlearn"
BACKEND_DIR="$PROJECT_ROOT/backend"
FRONTEND_DIR="$PROJECT_ROOT/frontend"
REPO_URL="https://github.com/newli5737/JLearn.git"

echo "Deploying JLearn..."

# Check if directory exists, if not clone it
if [ ! -d "$PROJECT_ROOT" ]; then
    echo "Cloning repository..."
    cd /home
    git clone $REPO_URL jlearn
fi

cd $PROJECT_ROOT

# 1. Pull latest changes
echo "Pulling latest changes..."
git pull origin main

# 2. Backend Deployment
echo "Building Backend..."
cd $BACKEND_DIR
npm install
npx prisma generate
npx prisma migrate deploy
npm run build

# 3. Frontend Deployment
echo "Building Frontend..."
cd $FRONTEND_DIR
npm install
npm run build

# 4. Start/Restart with PM2
echo "Restarting services with PM2..."
cd $BACKEND_DIR
pm2 delete jlearn-backend || true
pm2 start dist/main.js --name jlearn-backend --env PORT=3050

cd $FRONTEND_DIR
pm2 delete jlearn-frontend || true
pm2 start "npm run start" --name jlearn-frontend -- --port 3000

pm2 save

echo "Deployment Successful!"
