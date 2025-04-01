FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm i -g serve

COPY . .

RUN npm run dev

#CMD ["tail", "-f", "/dev/null"]
#
#EXPOSE 3000
#
#CMD [ "serve", "-s", "dist" ]