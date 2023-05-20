# build front-end
FROM node:lts-alpine AS frontend

WORKDIR /app

COPY . /app
COPY ./package.json /app
COPY ./package-lock.json /app
RUN npm install
RUN npm run build

RUN rm -rf ./node_modules

# build backend
FROM node:lts-alpine AS backend

WORKDIR /app

COPY ./service /app
COPY ./service/package.json /app
COPY ./service/package-lock.json /app
RUN npm install
RUN npm run build

RUN rm -rf ./node_modules

RUN yarn install --production --ignore-scripts --prefer-offline

# service
FROM node:lts-alpine

RUN apk add --no-cache bash

RUN mkdir -p /app/log

WORKDIR /app
# copy front-end
COPY --from=frontend /app/.next/standalone /app/web
COPY --from=frontend /app/.next/static /app/web/.next/static
COPY ./public /app/web/public

WORKDIR /app/service
# copy backend
COPY --from=backend /app/dist /app/service/dist
COPY --from=backend /app/package.json /app/service
COPY --from=backend /app/package-lock.json /app/service
COPY --from=backend /app/node_modules /app/service
# RUN npm install --production && rm -rf /usr/local/share/.cache /tmp/*

# start.sh
COPY ./docker-start.sh /app

EXPOSE 3000

EXPOSE 3002

WORKDIR /app

CMD [ "/bin/sh", "./docker-start.sh" ]
