# syntax=docker/dockerfile:1

# ---------- 1. Build stage: all deps + compile ----------
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# ---------- 2. Production deps only ----------
FROM node:22-alpine AS prod-deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

# ---------- 3. Runtime: minimal, no npm/yarn/corepack ----------
FROM node:22-alpine AS runtime
ENV NODE_ENV=production
WORKDIR /app

# Patch OS packages, then remove the package managers that ship with the
# Node image (source of the npm CVEs: brace-expansion, pacote, picomatch, ...)
RUN apk upgrade --no-cache \
 && rm -rf /usr/local/lib/node_modules/npm \
           /usr/local/lib/node_modules/corepack \
           /opt/yarn-* \
 && rm -f /usr/local/bin/npm /usr/local/bin/npx /usr/local/bin/corepack \
          /usr/local/bin/yarn /usr/local/bin/yarnpkg

COPY --from=prod-deps --chown=node:node /app/node_modules ./node_modules
COPY --from=build     --chown=node:node /app/dist ./dist
COPY --chown=node:node package.json ./

USER node
EXPOSE 3000
CMD ["node", "dist/main.js"]