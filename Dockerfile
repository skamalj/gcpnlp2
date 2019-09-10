FROM node:10

COPY app /home/app

WORKDIR /home/app

RUN npm install

CMD ["node", "app.js"]