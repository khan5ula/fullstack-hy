FROM oven/bun:latest

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN bun install

USER bun

CMD bun start