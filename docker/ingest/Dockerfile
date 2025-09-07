# Multi-stage Dockerfile for Node.js ingest worker

FROM node:18-alpine AS base
RUN apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare pnpm@8.6.12 --activate

# Dependencies stage
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY services/ingest/package.json ./services/ingest/
COPY packages/db/package.json ./packages/db/
RUN pnpm install --frozen-lockfile

# Build stage
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build --filter=ingest

# Development stage
FROM base AS development
WORKDIR /app
ENV NODE_ENV=development
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY services/ingest/package.json ./services/ingest/
COPY packages/db/package.json ./packages/db/
RUN pnpm install
CMD ["pnpm", "dev", "--filter", "ingest"]

# Production stage
FROM base AS production
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 worker

COPY --from=builder --chown=worker:nodejs /app/services/ingest/dist ./services/ingest/dist
COPY --from=builder --chown=worker:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=worker:nodejs /app/packages ./packages

USER worker

CMD ["node", "services/ingest/dist/main.js"]


