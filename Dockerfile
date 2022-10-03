FROM node:14-alpine

WORKDIR /app

COPY package.json /app

RUN mkdir -p public/images/users

RUN npm install

COPY . .

EXPOSE 8000

RUN rm -rf /var/cache/apk/*

CMD ["npm", "start"]
