FROM node:22

WORKDIR /usr/src/app

COPY . .

RUN yarn

EXPOSE 3000

# yarn start:dev
CMD ["yarn", "start:dev"]