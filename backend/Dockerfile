# backend/Dockerfile

# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of your backend source code
COPY . .

# Build the backend (modify if your build command differs)
RUN npm run build

# Expose the port your app listens on
EXPOSE 3001

# Start the backend in production mode
CMD ["npm", "run", "start:prod"]
