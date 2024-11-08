ARG NODE_VERSION=20-alpine
FROM node:${NODE_VERSION}
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
RUN npm run build
COPY ./.env ./build
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh
EXPOSE 3333
CMD ["./start.sh"]