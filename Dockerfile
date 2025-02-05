FROM node:20-alpine AS build

WORKDIR /app

COPY package.json ./

RUN npm install --force

COPY . .

RUN npm run build -- --output-path=dist

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
