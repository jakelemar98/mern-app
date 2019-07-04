FROM node:latest

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY . /usr/src/app/

RUN npm install

CMD [ "node", "index.js"]