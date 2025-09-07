# Rust - Marketing Intelligence Platform

> Turn vibes into revenue. Comments, trends, and spend decoded. Timing, hooks, and ROI recommended.

Rust is a production-ready marketing intelligence platform built for creators and SMBs. It combines social media analytics, sentiment analysis, trend detection, and ROI optimization in one powerful, creator-centric platform.

## 🚀 Quick Start

Get the entire platform running locally in under 5 minutes:

```bash
# Clone the repository
git clone https://github.com/your-org/rust-marketing-intelligence.git
cd rust-marketing-intelligence

# Install dependencies
pnpm install

# Start the development environment
docker compose up -d

# Wait for services to be ready (check logs)
docker compose logs -f

# Setup database
pnpm db:push
pnpm db:seed

# Open the application
open http://localhost:3000
```

That's it! You now have:
- 🌐 **Web App** running on http://localhost:3000
- 🔌 **API** running on http://localhost:4000 
- 🤖 **ML Service** running on http://localhost:8000
- 👷 **Ingest Worker** processing in background
- 📊 **API Docs** at http://localhost:4000/api/docs

## 🏗️ Architecture

### Monorepo Structure
```
rust/
├── apps/
│   ├── web/          # Next.js 14 (App Router, TypeScript)
│   └── api/          # NestJS REST API
├── services/
│   ├── ml/           # FastAPI (Python) - NLP & Recommendations
│   └── ingest/       # Node.js Worker (BullMQ + Redis)
├── packages/
│   └── db/           # Prisma ORM + Database Schema
└── docs/             # Documentation
```

### Technology Stack

#### Frontend (apps/web)
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **TailwindCSS** + **shadcn/ui** for design system
- **Framer Motion** for animations
- **NextAuth** for authentication

#### Backend (apps/api)
- **NestJS** with TypeScript
- **JWT** authentication + RBAC
- **OpenAPI/Swagger** documentation
- **Class-validator** for DTOs
- **Helmet** for security

#### ML Service (services/ml)
- **FastAPI** with Python 3.11
- **Transformers** for sentiment analysis
- **KeyBERT** for topic extraction
- **Prophet** for trend detection
- **Transparent** rule-based recommendations

#### Data Layer
- **PostgreSQL 15** with Row Level Security
- **Prisma ORM** with migrations
- **Redis** for queues and caching
- **Multi-tenant** workspace isolation

#### Infrastructure
- **Docker Compose** for local development
- **Turborepo** for monorepo management
- **pnpm** for package management
- **GitHub Actions** for CI/CD

## 🎨 Design System

### Typography
- **Bricolage Grotesque** (Variable) - Hero headlines
- **Space Grotesk** - Display text and UI
- **Plus Jakarta Sans** - Body text and UI

### Brand Colors
```css
--brand-violet: #8B5CF6
--brand-purple: #A855F7
--brand-indigo: #6366F1
--brand-blue: #3B82F6
--brand-cyan: #06B6D4
```

### Sentiment Colors
```css
--sentiment-positive: #10B981
--sentiment-neutral: #6B7280
--sentiment-negative: #EF4444
```

## 📊 Features

### Core Analytics
- **Comments Explorer** - AI-powered sentiment analysis and topic clustering
- **Trends Dashboard** - Real-time trend detection with velocity tracking
- **ROI Analytics** - Multi-attribution ROAS and CAC tracking
- **Content Planner** - Smart scheduling with optimal timing windows

### Integrations (Compliant)
- ✅ **YouTube Data API v3** - Video stats, comments (public only)
- ✅ **Instagram Graph API** - Business/Creator accounts only
- 🚧 **TikTok API** - Stub with TODOs (access restricted)
- 🚧 **X (Twitter) API** - Stub with TODOs (access restricted)
- ✅ **Google Ads API** - Campaign performance
- ✅ **Meta Ads API** - Ad spend and conversions
- ✅ **Shopify/Stripe** - Revenue tracking
- 📊 **CSV Uploads** - Fallback for any data source

### AI-Powered Insights
- **Sentiment Analysis** - Fine-tuned RoBERTa model
- **Topic Clustering** - KeyBERT + semantic search
- **Trend Detection** - Velocity-based with spike alerts
- **Smart Recommendations** - Transparent, feature-based

### Security & Compliance
- 🔒 **Multi-tenant** workspace isolation
- 🛡️ **Row Level Security** (RLS) in PostgreSQL
- 🔐 **Encrypted secrets** at rest
- 📝 **GDPR/CCPA** compliant data handling
- 🎯 **Minimal OAuth scopes** with rotation
- 📋 **Audit logging** for all sensitive operations

## 🛠️ Development

### Prerequisites
- **Node.js 18+**
- **Python 3.11+**
- **Docker & Docker Compose**
- **pnpm** (recommended)

### Environment Setup
```bash
# Copy environment template
cp .env.example .env

# Edit with your API keys
vim .env

# Required for basic functionality:
# - DATABASE_URL
# - REDIS_URL
# - NEXTAUTH_SECRET
# - JWT_SECRET

# Optional for full features:
# - YOUTUBE_API_KEY
# - META_APP_ID & META_APP_SECRET
# - GOOGLE_ADS_* credentials
# - SHOPIFY_ACCESS_TOKEN
# - STRIPE_SECRET_KEY
```

### Development Commands
```bash
# Install dependencies
pnpm install

# Start all services
pnpm dev

# Start specific service
pnpm dev --filter web
pnpm dev --filter api
pnpm dev --filter ml
pnpm dev --filter ingest

# Database operations
pnpm db:push     # Apply schema changes
pnpm db:seed     # Seed with demo data
pnpm db:studio   # Open Prisma Studio
pnpm db:reset    # Reset database

# Code quality
pnpm lint        # Lint all packages
pnpm test        # Run tests
pnpm type-check  # TypeScript check
pnpm format      # Format code
```

### Database Schema
The platform uses a comprehensive multi-tenant schema:

```sql
-- Core entities
User, Workspace, WorkspaceMember

-- Connections & Data
AccountConnection, Channel, ContentItem, Comment

-- Marketing
Campaign, Spend, ROIView

-- Intelligence
Trend, Recommendation, JobRun

-- Audit & Security
AuditLog (for compliance)
```

See [packages/db/prisma/schema.prisma](packages/db/prisma/schema.prisma) for the complete schema.

## 🚀 Deployment

### Free Tier Setup (Vercel + Render + Neon + Upstash)

1. **Databases**
   ```bash
   # Create Neon PostgreSQL (free tier)
   # Visit: neon.tech
   # Get connection string

   # Create Upstash Redis (free tier)
   # Visit: upstash.com
   # Get Redis URL
   ```

2. **Deploy Web App (Vercel)**
   ```bash
   # Connect GitHub repo to Vercel
   # Set root directory: apps/web
   # Add environment variables:
   # - NEXTAUTH_SECRET
   # - DATABASE_URL (Neon)
   # - REDIS_URL (Upstash)
   # - NEXT_PUBLIC_API_URL
   # - NEXT_PUBLIC_ML_URL
   ```

3. **Deploy API (Render/Railway)**
   ```bash
   # Deploy as Node.js service
   # Build command: pnpm build --filter api
   # Start command: pnpm start --filter api
   # Add same environment variables
   ```

4. **Deploy ML Service (Render/Railway)**
   ```bash
   # Deploy as Python service
   # Build command: pip install -r services/ml/requirements.txt
   # Start command: uvicorn main:app --host 0.0.0.0 --port $PORT
   ```

5. **Deploy Worker (Render/Railway)**
   ```bash
   # Deploy as Background Worker
   # Build command: pnpm build --filter ingest
   # Start command: pnpm start --filter ingest
   ```

See [docs/deploy.md](docs/deploy.md) for detailed deployment instructions.

## 📈 Demo Data

The platform includes rich demo data:
- **1 Demo Workspace** with sample SMB setup
- **2 Marketing Campaigns** (Q4 push + Product launch)
- **10 YouTube Videos** with realistic metrics
- **~300 Comments** with sentiment analysis
- **~120 Spend Records** across Google/Meta Ads
- **12 AI Recommendations** with explanations
- **Sample Trends** for trending topics

Access demo account:
- **Email**: demo@rust.app
- **Password**: DemoPassword123!

## 🎯 Creator-Centric Features

### Landing Page (Nothing.tech Inspired)
- **Bold Typography** - Bricolage Grotesque hero text
- **Calendar Module** - Interactive posting window visualization
- **Clock Module** - Live audience activity tracking
- **Playful Mode** - Optional cursor trails and micro-interactions
- **Accessibility** - Full keyboard navigation, screen reader support

### Voice & Tone
- **Creator-first** language ("your crew", "pull weight", "crushing it")
- **Actionable** insights with clear next steps
- **Transparent** AI explanations and feature lists
- **Helpful** without being condescending

### UX Highlights
- **Command Palette** (Cmd/Ctrl+K) for power users
- **Keyboard Shortcuts** throughout the app
- **Optimistic Updates** for snappy interactions
- **Glass Morphism** design with subtle animations
- **Mobile-first** responsive design

## 🛡️ Security Features

### Authentication & Authorization
- **NextAuth** with Email/Password + Google OAuth
- **JWT tokens** with short expiration
- **Role-based access** (OWNER/MANAGER/MEMBER)
- **Workspace isolation** enforced at DB and API level

### Data Protection
- **Encryption at rest** for sensitive tokens
- **HTTPS-only** in production
- **Strict CORS** policies
- **CSP headers** to prevent XSS
- **Rate limiting** per user and IP
- **Input validation** on all endpoints

### Compliance
- **Minimal data collection** - only what's needed
- **Data export/delete** endpoints for GDPR
- **Audit logging** for sensitive operations
- **Retention policies** (18 months default)
- **Pseudonymization** options for comment authors

## 📚 API Documentation

### REST API (NestJS)
- **OpenAPI/Swagger** docs at `/api/docs`
- **JWT Bearer** authentication
- **Consistent error** handling with HTTP status codes
- **Cursor pagination** for large datasets
- **Rate limiting** with Redis

### ML API (FastAPI)
- **Interactive docs** at `/docs`
- **Batch processing** for efficiency
- **Transparent** feature explanations
- **Background tasks** for long-running jobs

Key endpoints:
```bash
# Authentication
POST /api/v1/auth/login
POST /api/v1/auth/register
GET  /api/v1/auth/me

# Analytics  
GET  /api/v1/analytics/comments
GET  /api/v1/analytics/roi
GET  /api/v1/analytics/trends

# ML Services
POST /nlp/sentiment-batch
POST /nlp/topics
POST /recommendations/generate
```

## 🧪 Testing

### Test Setup
```bash
# Run all tests
pnpm test

# Run tests for specific package
pnpm test --filter web
pnpm test --filter api
pnpm test --filter ml

# Run tests with coverage
pnpm test:cov
```

### Test Coverage Goals
- **API**: >90% coverage on business logic
- **ML**: >85% coverage on core algorithms
- **Web**: >70% coverage on components
- **E2E**: Critical user journeys

## 🤝 Contributing

### Development Workflow
1. **Fork** the repository
2. **Create** a feature branch (`feature/amazing-feature`)
3. **Commit** changes with conventional commits
4. **Test** your changes thoroughly
5. **Submit** a pull request

### Code Standards
- **TypeScript** for type safety
- **ESLint + Prettier** for code formatting
- **Conventional Commits** for clear history
- **Testing** required for new features
- **Documentation** for public APIs

### Commit Convention
```bash
feat: add CSV upload for campaign spend
fix: resolve sentiment analysis batch timeout
docs: update API documentation
style: improve landing page animations
refactor: optimize database queries
test: add e2e tests for auth flow
```

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🙏 Acknowledgments

- **Nothing** for design inspiration
- **OpenAI** for powering AI features
- **Vercel** for hosting the demo
- **Creator community** for feedback and testing

---

**Built with ❤️ for creators who want to turn their vibes into revenue.**

## 📞 Support

- 📧 **Email**: hello@rust.app
- 💬 **Discord**: [Join our community](https://discord.gg/rust)
- 📖 **Docs**: [docs.rust.app](https://docs.rust.app)
- 🐛 **Issues**: [GitHub Issues](https://github.com/your-org/rust/issues)

---

**Ready to turn vibes into revenue? [Start your free trial →](https://rust.app)**


