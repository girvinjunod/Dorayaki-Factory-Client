FROM node:14-alpine
COPY ["package.json", "package-lock.json", "/app/"]
WORKDIR /app
RUN npm install
COPY . /app/
RUN npm run build
CMD ["npm", "run" ,"start"]