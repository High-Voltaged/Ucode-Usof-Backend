FROM node:14-alpine

WORKDIR /app

COPY package.json /app

RUN apk add --update \
  git \
  openssh-client \
&& rm -rf /var/cache/apk/*

RUN npm config set registry http://registry.npmjs.org/
RUN npm install

COPY . .

EXPOSE 8000

CMD ["npm", "start"]
