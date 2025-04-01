FROM node:22.13.1-alpine

WORKDIR /app

COPY . .

RUN npm install

CMD npm run build