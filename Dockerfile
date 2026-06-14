# syntax=docker/dockerfile:1

# ---------- Stage 1: build the static bundle ----------
FROM node:22-alpine AS build
WORKDIR /app

# Install dependencies first so this layer is cached unless the lockfile changes.
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the source and produce the production build in /app/dist.
COPY . .
RUN npm run build

# ---------- Stage 2: serve the bundle with nginx ----------
FROM nginx:alpine AS serve

# SPA-aware nginx config (history fallback, asset caching, fast-fail /api).
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Static assets produced by the build stage.
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
