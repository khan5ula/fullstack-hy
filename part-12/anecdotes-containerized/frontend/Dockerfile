FROM oven/bun:latest AS build-stage

WORKDIR /usr/src/app

COPY . .

ENV VITE_REACT_APP_BACKEND_URL="http://localhost:8080/api"

RUN bun install

RUN bun run build

FROM nginx:1.20-alpine AS production-stage

COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html