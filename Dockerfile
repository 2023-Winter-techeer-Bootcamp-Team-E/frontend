# Use the specified Node.js version
FROM node:18.12.1-alpine

# Set the user to root for necessary permissions
USER root

# Set the working directory inside the container
WORKDIR /frontend

# Copy the package.json and yarn.lock files first to leverage Docker cache
COPY package.json .

# Install dependencies
RUN yarn install

# Copy the entire project to the working directory
COPY . .

# Run the build command
RUN yarn build