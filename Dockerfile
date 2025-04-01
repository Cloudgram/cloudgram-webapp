FROM node:18

WORKDIR /app

COPY package.json .
COPY tsconfig.json .

RUN npm install\
    && npm install typescript -g\
    && npm install -g vite

RUN npm install --save-dev @types/react @types/react-dom

COPY . .

RUN tsc

CMD npm run build