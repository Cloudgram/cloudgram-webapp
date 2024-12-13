FROM node:16-alpine

WORKDIR /webapp

#COPY webapp/package.json .
#COPY webapp/package-lock.json .

COPY . .

RUN npm install

CMD npm start