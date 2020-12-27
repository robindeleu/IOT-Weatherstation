# The base image to start from
FROM node:14-alpine3.12

# Setup a working directory for our app
WORKDIR /app

# Only copy package files needed for installing dependencies
COPY package*.json ./

# Install the node modules
RUN npm install

# Enable ts-node command globally
RUN npm install ts-node -g

# Copy the application files
COPY . .

# The final command that starts the app
CMD ts-node index.ts