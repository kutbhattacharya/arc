@echo off
echo 🚀 Setting up Rust Marketing Intelligence Platform...

REM Check if pnpm is installed
where pnpm >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ pnpm is not installed. Please install pnpm first:
    echo npm install -g pnpm
    pause
    exit /b 1
)

REM Check if Docker is running
docker info >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Docker is not running. Please start Docker first.
    pause
    exit /b 1
)

echo 📦 Installing dependencies...
pnpm install

echo 🐳 Starting Docker services...
docker compose up -d

echo ⏳ Waiting for services to be ready...
timeout /t 10 /nobreak >nul

echo 🗄️ Setting up database...
pnpm db:push

echo 🌱 Seeding database with demo data...
pnpm db:seed

echo ✅ Setup complete!
echo.
echo 🌐 Web App: http://localhost:3000
echo 🔌 API: http://localhost:4000
echo 📚 API Docs: http://localhost:4000/api/docs
echo 🤖 ML Service: http://localhost:8000
echo.
echo Demo account: demo@rust.app / DemoPassword123!
pause
