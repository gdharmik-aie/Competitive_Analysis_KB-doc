FROM node:14.19.3-alpine

RUN mkdir -p /app
WORKDIR /app
COPY api/src ./src
COPY api/babel.config.js api/package.json api/package-lock.json ./

EXPOSE 4001
RUN npm install
CMD ["npm", "start"]
