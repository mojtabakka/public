# -------- Base --------
FROM --platform=linux/amd64 node:20-alpine AS base

WORKDIR /app

# -------- Dependencies --------
FROM base AS deps

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install --frozen-lockfile --verboses


# -------- Build --------
FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .


RUN yarn build


# -------- Production --------
FROM --platform=linux/amd64 node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# فقط فایل‌های ضروری
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.* ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["yarn", "start"]