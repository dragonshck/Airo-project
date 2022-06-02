FROM node:16
RUN npm install -g nodemon
WORKDIR /airo/src/app
COPY package*.json /airo/src/app/
RUN npm install && mv /airo/src/app/node_modules /node_modules
COPY . /airo/src/app
EXPOSE 8080
CMD [ "nodemon" ]