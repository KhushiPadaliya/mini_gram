# Backend Dockerfile for mini-gram
FROM node:20-alpine AS builder
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . ./

FROM node:20-alpine
WORKDIR /usr/src/app

COPY --from=builder /usr/src/app .

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "server.js"]
