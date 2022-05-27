FROM node:12

RUN mkdir -p /app
WORKDIR /app

COPY web-react/package.json .
COPY web-react/package-lock.json .
RUN npm install && mv node_modules /app

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
