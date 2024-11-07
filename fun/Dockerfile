ARG NODE_VERSION=22-alpine
FROM node:${NODE_VERSION} AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .

FROM node:${NODE_VERSION} AS production
WORKDIR /app
COPY --from=build /app/dist /app/dist
RUN npm install -g serve
EXPOSE 80
CMD ["serve", "-s", "dist", "-l", "80"]