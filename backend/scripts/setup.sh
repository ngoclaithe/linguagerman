#!/bin/bash

# Exit on error
set -e

echo "Starting VPS Setup for JLearn..."

# 1. Update system
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git build-essential

# 2. Install Node.js 20
echo "Installing Node.js 20..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# 3. Install PostgreSQL
echo "Installing PostgreSQL..."
sudo apt install -y postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Configure Database (matching backend/.env)
echo "Configuring Database..."
sudo -u postgres psql -c "ALTER USER postgres WITH PASSWORD 'test1234';"
sudo -u postgres psql -c "CREATE DATABASE jleaning;" || echo "Database already exists"

# 4. Install PM2
echo "Installing PM2..."
sudo npm install -g pm2

echo "Setup Complete! Please ensure you have cloned the repository into /home/jlearn and configured your .env files."
