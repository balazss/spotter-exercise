# ---------------------------- BASE ----------------------------
FROM node:18.12.1-slim@sha256:b9c3c98eb7cf4a45daceac4cb12880f4529889f6f39a59edc0661aea0bb0880b as base
# installs tini (https://github.com/krallin/tini)
# RUN apt-get update && apt-get install -y tini
ENV TINI_VERSION v0.19.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini
# installs curl
RUN apt-get update && apt-get install -y curl

# installs postgresql-client
RUN apt-get update && apt-get install -y postgresql-client

# sets workdir
WORKDIR /app

# ---------------------------- DEPENDENCIES ----------------------------
FROM base AS dependencies
# copies package*.json files
COPY package*.json .
# copies schema.prisma and .env to generate prisma client while installing modules (https://www.prisma.io/)
COPY prisma/schema.prisma .
COPY prisma/.env .
COPY prisma/migrations ./prisma/migrations
COPY prisma/wait_for_db.sh .

# installs production modules
ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV

ARG DB_HOST
ENV DB_HOST=$DB_HOST

ARG POSTGRES_USER
ENV POSTGRES_USER=$POSTGRES_USER


RUN if [ "$NODE_ENV" = "development" ]; \ 
  then npm install; \
  else npm ci --omit=dev; \
  fi

# ---------------------------- RELEASE ----------------------------
FROM base AS release
# sets user (node) to use when running the image and for any RUN, CMD and ENTRYPOINT instructions
USER node
# sets tini as entry point

ENTRYPOINT ["/tini", "--"]
# sets NODE_ENV to production
ENV NODE_ENV --from=dependencies $NODE_ENV
# copies package*.json files from dependencies stage
COPY --chown=node:node --from=dependencies /app/package*.json .
# copies the production modules from the dependencies stage
COPY --chown=node:node --from=dependencies /app/node_modules node_modules/
# copies prisma .env to resolve database credentials from the dependencies image
COPY --chown=node:node --from=dependencies /app/.env .
# Copies the files from the build image
COPY --chown=node:node . ./

# exposes port
EXPOSE 4000
# Generates the Prisma Client
RUN npx prisma generate

CMD [ "npm", "run", "index.js" ]

