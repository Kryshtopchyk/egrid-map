FROM node:16 as build

WORKDIR /app/client
COPY . /app/client

RUN npm ci 
RUN npm run build

FROM nginx:1.22.0-alpine

COPY --from=build /app/client/dist/client /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]