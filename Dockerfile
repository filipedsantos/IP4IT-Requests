FROM node:17

RUN npm install -g nodemon

WORKDIR /usr/src/app

COPY  package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:prod"]