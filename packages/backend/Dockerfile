FROM node:22-alpine AS builder

RUN corepack enable && corepack prepare pnpm@10.5.2 --activate

WORKDIR /app

COPY pnpm-workspace.yaml package.json pnpm-lock.yaml* tsconfig.base.json ./
COPY packages/shared/package.json ./packages/shared/
COPY packages/backend/package.json ./packages/backend/

RUN pnpm install --frozen-lockfile || pnpm install

COPY packages/shared ./packages/shared
COPY packages/backend ./packages/backend

RUN pnpm --filter @kk/shared run build && pnpm --filter @kk/backend run build

FROM node:22-alpine

WORKDIR /app

COPY --from=builder --chown=node:node /app/packages/backend/dist ./dist
COPY --from=builder --chown=node:node /app/packages/backend/package.json ./
COPY --from=builder --chown=node:node /app/packages/backend/node_modules ./node_modules
COPY --from=builder --chown=node:node /app/packages/shared/dist ./node_modules/@kk/shared/dist
COPY --from=builder --chown=node:node /app/packages/shared/package.json ./node_modules/@kk/shared/package.json

COPY --from=builder --chown=node:node /app/packages/backend/src/infra/graphql/common.graphql ./dist/infra/graphql/
COPY --from=builder --chown=node:node /app/packages/backend/src/modules/auth/auth.graphql ./dist/modules/auth/
COPY --from=builder --chown=node:node /app/packages/backend/src/modules/user/user.graphql ./dist/modules/user/
COPY --from=builder --chown=node:node /app/packages/backend/src/modules/kingdom/kingdom.graphql ./dist/modules/kingdom/
COPY --from=builder --chown=node:node /app/packages/backend/src/modules/village/village.graphql ./dist/modules/village/
COPY --from=builder --chown=node:node /app/packages/backend/src/modules/house/house.graphql ./dist/modules/house/
COPY --from=builder --chown=node:node /app/packages/backend/src/modules/content/content.graphql ./dist/modules/content/
COPY --from=builder --chown=node:node /app/packages/backend/src/modules/challenge/challenge.graphql ./dist/modules/challenge/
COPY --from=builder --chown=node:node /app/packages/backend/src/modules/badge/badge.graphql ./dist/modules/badge/
COPY --from=builder --chown=node:node /app/packages/backend/src/modules/leaderboard/leaderboard.graphql ./dist/modules/leaderboard/

COPY --from=builder --chown=node:node /app/packages/backend/src/infra/database/migrations ./dist/infra/database/migrations

ENV NODE_ENV=production

USER node

HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:4000/graphql || exit 1

EXPOSE 4000

CMD ["node", "dist/index.js"]
