FROM node:16

WORKDIR /app/server
COPY . /app/server

RUN npm install pm2 -g --silent 

RUN npm ci
RUN npm run build

CMD ["pm2-runtime", "start", "npm", "--", "run", "start:prod"]