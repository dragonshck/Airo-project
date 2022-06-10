FROM node:16
WORKDIR /airo/src/app
COPY package*.json /airo/src/app/
RUN npm install && mv /airo/src/app/node_modules /node_modules
COPY . /airo/src/app
EXPOSE 8080
CMD [ "node app.js" ]