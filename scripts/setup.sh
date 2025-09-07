#!/bin/bash

echo "🚀 Setting up Rust Marketing Intelligence Platform..."

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm is not installed. Please install pnpm first:"
    echo "npm install -g pnpm"
    exit 1
fi

# Check if Docker is running
if ! docker info &> /dev/null; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

echo "📦 Installing dependencies..."
pnpm install

echo "🐳 Starting Docker services..."
docker compose up -d

echo "⏳ Waiting for services to be ready..."
sleep 10

echo "🗄️ Setting up database..."
pnpm db:push

echo "🌱 Seeding database with demo data..."
pnpm db:seed

echo "✅ Setup complete!"
echo ""
echo "🌐 Web App: http://localhost:3000"
echo "🔌 API: http://localhost:4000"
echo "📚 API Docs: http://localhost:4000/api/docs"
echo "🤖 ML Service: http://localhost:8000"
echo ""
echo "Demo account: demo@rust.app / DemoPassword123!"
