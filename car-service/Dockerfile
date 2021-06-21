FROM node:alpine

WORKDIR /home/app

COPY package*.json /home/app/
RUN npm install --production

# create and set app directory as current dir
WORKDIR /home/app
COPY ./ /home/app/

RUN npm run build

EXPOSE 3000
CMD ['npm', 'start']
