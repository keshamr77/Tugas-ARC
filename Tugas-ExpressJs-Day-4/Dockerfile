FROM node:21

WORKDIR /Tugas-ExpressJs-Day-4

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=8080

EXPOSE 8080

CMD [ "npm", "start" ]