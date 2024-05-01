FROM oven/bun:latest

WORKDIR /usr/src/app

COPY . .

ENV REACT_APP_BACKEND_URL="http://localhost:3001/api"

RUN bun install

CMD bun run dev