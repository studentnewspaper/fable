FROM node:16

WORKDIR /app

COPY package*.json ./
RUN npm i

COPY . .

ARG TZ
ENV TZ=${TZ}
ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}

RUN npm run gen:gql
RUN npm run build

EXPOSE 8076
CMD ["node", "build/index.js"]