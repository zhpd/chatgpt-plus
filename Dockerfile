# build front-end
FROM node:lts-alpine AS frontend

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

COPY /service/package.json /app

COPY /service/package-lock.json /app

RUN npm install --production && rm -rf /usr/local/share/.cache /tmp/*

COPY /service /app

COPY --from=frontend /app/dist /app/public

COPY --from=backend /app/build /app/build

EXPOSE 3000

CMD ["npm", "run", "start"]
