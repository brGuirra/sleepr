FROM node:alpine As development

WORKDIR /usr/app/src

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install

COPY . .

RUN pnpm run build

FROM node:alpine As production

ARG NOVE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/app/src

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install --prod --ignore-scripts

COPY --from=development /usr/app/src/dist ./dist

CMD ["node", "dist/apps/reservations/main"]
