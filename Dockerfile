# для прода
FROM node:22-alpine AS builder

WORKDIR /app

COPY . .

RUN npm install --legacy-peer-deps
RUN npm run build




# для разработки
FROM node:22-alpine AS development
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/dist ./dist
EXPOSE 5174
CMD ["serve", "-s", "dist", "-l", "5174"]
