FROM node:14.19.3-alpine as builder

RUN mkdir -p /app
WORKDIR /app
COPY api ./api
COPY .eslintrc.json .prettierrc.json app.json relate.project.json vercel.json package.json package-lock.json ./

WORKDIR /app/api

RUN echo -e "\
NEO4J_URI=bolt://neo4j:7687\n\
NEO4J_USER=neo4j\n\
NEO4J_PASSWORD=mySecurePassword\n\
GRAPHQL_SERVER_HOST=0.0.0.0\n\
GRAPHQL_SERVER_PORT=4001\n\
GRAPHQL_SERVER_PATH=/graphql\n\
" > .env

RUN npm install
WORKDIR /app/web-react
RUN echo -e "\
REACT_APP_GRAPHQL_URI=/graphql\n\
PROXY=http://127.0.0.1:4001/graphql\n\
SKIP_PREFLIGHT_CHECK=true\n\
" > .env

RUN npm install

WORKDIR /app
RUN npm install concurrently
RUN npm run build

WORKDIR /app/api
#RUN npm run start
# ------------------------------------------------------
# Production Build
# ------------------------------------------------------
FROM nginx:1.22.0-alpine

RUN apk add --no-cache --update \
      apache2-utils
COPY --from=builder /app/web-react/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf /etc/nginx/nginx.conf

COPY nginx/appconfig.conf /etc/nginx/conf.d
COPY nginx/nginx.conf /etc/nginx/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
# ENTRYPOINT ["/run.sh"]