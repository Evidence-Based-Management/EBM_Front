
# stage 1

FROM node:alpine AS evidence-based-management-build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# stage 2

FROM nginx:alpine
COPY --from=evidence-based-management-build /app/docs/ /usr/share/nginx/html
EXPOSE 80