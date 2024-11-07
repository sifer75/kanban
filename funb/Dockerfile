ARG NODE_VERSION=20-bookworm
FROM node:${NODE_VERSION}
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
RUN npm run build
COPY ./.env ./build
EXPOSE 3333
CMD ["node", "./build/bin/server.js"]