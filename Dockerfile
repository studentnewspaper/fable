FROM node:16

WORKDIR /app

COPY package*.json ./
RUN npm i

COPY . .

ENV TZ={TZ}
ENV NODE_ENV=${NODE_ENV}
ENV VITE_SENTRY_DSN=${SENTRY_DSN}
ENV VITE_GIT_COMMIT_SHA=${CAPROVER_GIT_COMMIT_SHA}

RUN npm run gen:gql
RUN npm run build

EXPOSE 8076
CMD ["node", "build/index.js"]