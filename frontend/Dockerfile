## --- Building the frontend
# The base image to start from
FROM node:14-alpine as builder-container

# Setup a working directory for our app
WORKDIR /app

# Only copy package files needed for installing dependencies
COPY package*.json ./

# Install the node modules
RUN npm install

# Copy the application files
COPY . .

# Expose port 8080 from Vue
EXPOSE 8080

# The command that builds the app
RUN npm run build

## --- Serving the frontend
# The base image to start from
FROM nginx:alpine

# Copy the static files to the server root
COPY --from=builder-container /app/dist /usr/share/nginx/html
