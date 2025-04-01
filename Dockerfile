FROM node:22

WORKDIR /app

COPY package.json .
COPY tsconfig.json .

RUN npm install\
    && npm install typescript -g\
    npm install vite -g

COPY . .

RUN tsc

CMD npm run build