# 🚀 Quick Setup Instructions

## Prerequisites
- **Node.js 18+** installed
- **pnpm** installed (`npm install -g pnpm`)
- **Docker Desktop** running

## Step 1: Create Environment File
Create a `.env` file in the root directory with the following content:

```bash
# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/rust
REDIS_URL=redis://localhost:6379

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=dev-secret-change-in-production

# JWT Settings
JWT_SECRET=dev-jwt-secret-change-in-production
JWT_EXPIRES_IN=24h

# API URLs for frontend
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_ML_URL=http://localhost:8000

# Environment
NODE_ENV=development
ENVIRONMENT=development
```

## Step 2: Install Dependencies
```bash
pnpm install
```

## Step 3: Start Docker Services
```bash
docker compose up -d
```

## Step 4: Setup Database
```bash
pnpm db:push
pnpm db:seed
```

## Step 5: Start Development
```bash
pnpm dev
```

## Access the Application
- 🌐 **Web App**: http://localhost:3000
- 🔌 **API**: http://localhost:4000
- 📚 **API Docs**: http://localhost:4000/api/docs
- 🤖 **ML Service**: http://localhost:8000

## Demo Account
- **Email**: demo@rust.app
- **Password**: DemoPassword123!

## Troubleshooting

### If you get "Environment variable not found: DATABASE_URL"
Make sure you've created the `.env` file in the root directory with the content above.

### If Docker services fail to start
Make sure Docker Desktop is running and try:
```bash
docker compose down
docker compose up -d
```

### If database connection fails
Wait a few seconds for PostgreSQL to fully start, then try:
```bash
pnpm db:push
```

## What's Included
- ✅ **Complete monorepo** with 4 packages
- ✅ **Nothing-inspired landing page** with interactive modules
- ✅ **NestJS API** with authentication and OpenAPI docs
- ✅ **FastAPI ML service** for sentiment analysis
- ✅ **PostgreSQL database** with rich demo data
- ✅ **Docker setup** for easy development
- ✅ **Comprehensive documentation**

Ready to turn vibes into revenue! 🚀
