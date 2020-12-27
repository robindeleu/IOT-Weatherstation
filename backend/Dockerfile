# The base image to start from
FROM node:14-alpine3.12

# Setup a working directory for our app
WORKDIR /app

# Only copy package files needed for installing dependencies
COPY package*.json ./

# Install the node modules
RUN npm install
# RUN npm ci --only=production

# Copy the application files
COPY . .

# Expose port 3030 from Feathers
EXPOSE 3030

# The final command that starts the app
CMD npm start