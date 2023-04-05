# build front-end
FROM node:lts-alpine AS frontend

WORKDIR /app

COPY ./package.json /app

# COPY ./package-lock.json /app

RUN npm install

COPY . /app

RUN npm run build

# build backend
FROM node:lts-alpine AS backend

WORKDIR /app

COPY ./service/package.json /app

COPY ./service/package-lock.json /app

RUN npm install

COPY ./service /app

RUN npm run build

# service
FROM node:lts-alpine

RUN apk add --no-cache bash

WORKDIR /app

RUN mkdir -p /app/log

# copy front-end
COPY --from=frontend /app/.next/standalone /app/web
COPY --from=frontend /app/.next/static /app/web/.next/static
COPY ./public /app/web/public


WORKDIR /app/service

# copy backend
COPY ./service/package.json /app/service

COPY ./service/package-lock.json /app/service

RUN npm install --production && rm -rf /usr/local/share/.cache /tmp/*

COPY --from=backend /app/dist /app/service/dist

# start.sh
COPY ./docker-start.sh /app

EXPOSE 3000

EXPOSE 3002

WORKDIR /app

CMD [ "/bin/sh", "./docker-start.sh" ]
