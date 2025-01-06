FROM node:18 as build-stage
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
RUN npm run build -- --configuration=${BUILD_CONFIGURATION} --output-path=./dist/out

FROM nginx:alpine
COPY --from=build-stage /app/dist/out/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]