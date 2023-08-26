FROM node:18-alpine

WORKDIR /usr/app

COPY . /usr/app

RUN npm install

CMD ["node", "/usr/app/server.js"]