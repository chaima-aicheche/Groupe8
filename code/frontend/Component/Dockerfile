FROM node:16-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine as stage-1

COPY --from=builder /app/dist /usr/share/nginx/html

COPY ./app_nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]
