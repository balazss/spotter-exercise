FROM node:18.12.1-slim@sha256:b9c3c98eb7cf4a45daceac4cb12880f4529889f6f39a59edc0661aea0bb0880b AS builder
WORKDIR /app

ARG NODE_ENV
ARG NPM_TOKEN

ENV NODE_ENV=$NODE_ENV
ENV NPM_TOKEN=$NPM_TOKEN

COPY .npmrc .npmrc
COPY package*.json ./

RUN if [ "$NODE_ENV" = "development" ]; \ 
  then npm install; \
  else npm ci --omit=dev; \
  fi

RUN rm .npmrc

COPY . ./
EXPOSE 3000

RUN npm run build

FROM nginx:1.22-alpine as server
COPY --from=builder /app/nginx/nginx.conf /etc/nginx/conf.d/nginx.conf
COPY --from=builder ./app/build/ /usr/share/nginx/html

EXPOSE 3000

WORKDIR /usr/share/nginx/html

# Add bash
RUN apk add --no-cache bash

ENTRYPOINT ["nginx", "-g", "daemon off;"]
