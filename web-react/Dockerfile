FROM node:14.19.3-alpine as builder

RUN mkdir -p /app
WORKDIR /app
COPY web-react/img ./img
COPY web-react/public ./public
COPY web-react/src ./src
COPY web-reactpackage.json web-react/package-lock.json ./

RUN npm install

RUN echo -e "\
REACT_APP_GRAPHQL_URI=/graphql\n\
PROXY=http://127.0.0.1:4001/graphql\n\
SKIP_PREFLIGHT_CHECK=true\n\
" > .env

RUN npm run build

#RUN npm run start
# ------------------------------------------------------
# Production Build
# ------------------------------------------------------
FROM nginx:1.22.0-alpine

RUN apk add --no-cache --update \
      apache2-utils
COPY --from=builder /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf /etc/nginx/nginx.conf

COPY nginx/appconfig.conf /etc/nginx/conf.d
COPY nginx/nginx.conf /etc/nginx/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
