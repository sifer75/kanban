ARG NODE_VERSION=20-alpine
FROM node:${NODE_VERSION}
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
RUN npm run build
COPY ./.env ./build
RUN apk update && apk add --no-cache postgresql-client
EXPOSE 3333
CMD ["npm", "start"]