FROM node:18

WORKDIR /app

COPY package.json .
COPY tsconfig.json .

RUN npm install\
    && npm install typescript -g\
    && npm install vite @vitejs/plugin-react

RUN npm install --save-dev @types/react @types/react-dom

RUN npm i -S @vitejs/plugin-react

COPY . .

RUN tsc

CMD npm run build