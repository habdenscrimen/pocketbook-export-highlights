FROM node:8-alpine

RUN apk add python

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY public ./public
COPY server ./server

EXPOSE 9000

CMD ["npm", "run", "server"]
