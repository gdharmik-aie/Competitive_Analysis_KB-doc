FROM node:14.19.3-alpine

RUN mkdir -p /app
WORKDIR /app
COPY src ./src
COPY babel.config.js package.json package-lock.json ./

EXPOSE 4001
RUN npm install
CMD ["npm", "start"]