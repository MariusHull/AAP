FROM node:10.15.1

#Set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# Adds the path to the env variables
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# Copies the dependencies files, and install them
COPY package.json /usr/src/app/package.json
RUN npm install --silent
RUN npm install react-scripts@3.0.0 -g --silent

CMD ["npm", "start"]

