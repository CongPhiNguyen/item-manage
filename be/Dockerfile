FROM node:20-alpine
WORKDIR /app
COPY package.json ./
RUN yarn install
COPY . .
RUN yarn prisma generate
RUN yarn build
EXPOSE 3000
ENTRYPOINT ["node", "dist/main"]
