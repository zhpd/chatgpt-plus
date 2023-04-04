# build front-end
FROM node:lts-alpine as frontend

WORKDIR /app

COPY ./package.json /app

COPY ./package-lock.json /app

RUN npm install

COPY . /app

RUN npm run build

# build backend
FROM node:lts-alpine as backend

WORKDIR /app

COPY ./service/package.json /app

COPY ./service/package-lock.json /app

RUN npm install

COPY ./service /app

RUN npm run build

# service
FROM node:lts-alpine

WORKDIR /app

COPY --from=frontend /app/dist /app/web

COPY --from=backend /app/dist /app/service

EXPOSE 3000

EXPOSE 3002

CMD ["cd web", "npm", "run", "start"]
CMD ["cd service", "npm", "run", "start"]
