FROM node:20-alpine AS build-stage
WORKDIR /app
COPY package.json ./
RUN yarn install
COPY . .
RUN yarn build

FROM nginx:alpine
WORKDIR /app
COPY --from=build-stage /app/dist .
COPY --from=build-stage /app/docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 4000
CMD ["nginx", "-g", "daemon off;"]