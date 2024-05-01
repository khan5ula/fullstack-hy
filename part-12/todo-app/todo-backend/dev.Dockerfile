FROM node:16

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci

CMD npm run dev