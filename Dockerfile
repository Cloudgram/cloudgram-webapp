# Билд-стейдж
FROM node:22-alpine AS builder

WORKDIR /app
COPY . . 

RUN npm install --legacy-peer-deps
RUN npm run build

# Прод-стейдж
FROM node:22-alpine AS production

WORKDIR /app

# Устанавливаем serve
RUN npm install -g serve

# Копируем только собранные файлы
COPY --from=builder /app/dist ./dist

# Порт, который слушает "serve"
EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
