# для прода
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps
RUN npm rebuild @rollup/rollup-linux-x64-musl

COPY . .
