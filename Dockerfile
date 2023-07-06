# # build front-end
# FROM node:lts-alpine AS frontend

# WORKDIR /app

# COPY . /app
# COPY ./package.json /app
# COPY ./package-lock.json /app
# RUN npm install --registry=https://registry.npmmirror.com
# RUN npm run build

# RUN rm -rf ./node_modules

# # build backend
# FROM node:lts-alpine AS backend

# WORKDIR /app

# COPY ./service /app
# COPY ./service/package.json /app
# COPY ./service/package-lock.json /app
# RUN npm install --registry=https://registry.npmmirror.com
# RUN npm run build

# RUN rm -rf ./node_modules

# service
FROM node:lts-alpine

RUN apk add --no-cache bash

RUN mkdir -p /app/log

WORKDIR /app
# # copy front-end -- 从docker构建中复制,运行太慢
# COPY --from=frontend /app/.next/standalone /app/web
# COPY --from=frontend /app/.next/static /app/web/.next/static
# COPY ./public /app/web/public

# copy .next/front -- 从源码构建结果中复制
COPY .next/standalone /app/web
COPY .next/static /app/web/.next/static
COPY ./public /app/web/public

WORKDIR /app/service
# # copy backend -- 从docker构建中复制,运行太慢
# COPY --from=backend /app/dist /app/service/dist

# copy service/dist/backend -- 从源码构建结果中复制
COPY service/dist /app/service/dist

# start.sh
COPY ./docker-start.sh /app

EXPOSE 3000

EXPOSE 3002

WORKDIR /app

CMD [ "/bin/sh", "./docker-start.sh" ]
