FROM node:22-alpine AS builder

RUN corepack enable && corepack prepare pnpm@10.5.2 --activate

WORKDIR /app

COPY pnpm-workspace.yaml package.json pnpm-lock.yaml* tsconfig.base.json ./
COPY packages/shared/package.json ./packages/shared/
COPY packages/backoffice/package.json ./packages/backoffice/

RUN pnpm install --frozen-lockfile || pnpm install

COPY packages/shared ./packages/shared
COPY packages/backoffice ./packages/backoffice

RUN pnpm --filter @kk/backoffice run build

FROM nginx:alpine

RUN chown -R nginx:nginx /var/cache/nginx /var/log/nginx /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && chown nginx:nginx /var/run/nginx.pid

COPY --from=builder --chown=nginx:nginx /app/packages/backoffice/dist /usr/share/nginx/html
COPY --chown=nginx:nginx packages/backoffice/nginx.conf /etc/nginx/conf.d/default.conf

USER nginx

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/ || exit 1

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
