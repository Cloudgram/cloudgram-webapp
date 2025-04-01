FROM node:22

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm install --save-dev typescript

COPY . .

RUN npx tsc -b
CMD npm run build