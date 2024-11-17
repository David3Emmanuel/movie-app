FROM node:18-alpine

RUN npm -v
RUN npm install -g npm@9.8.1
RUN npm -v

WORKDIR /app
COPY package.json ./

RUN npm config set strict-ssl false
RUN npm install
COPY . .
RUN npm run build

CMD ["node", "dist/main.js"]