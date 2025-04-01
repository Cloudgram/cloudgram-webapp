FROM node:22-alpine

WORKDIR /app

COPY . .

RUN npm install
RUN npm install typescript -g
RUN npm i -g serve
RUN npm install vite @vitejs/plugin-react

RUN npm run build

CMD ["tail", "-f", "/dev/null"]
#
#EXPOSE 3000
#
#CMD [ "serve", "-s", "dist" ]