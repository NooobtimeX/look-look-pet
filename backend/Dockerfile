# Use an official Node.js runtime
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of your app’s source code
COPY . .

# Build the project (adjust command if needed)
RUN npm run build

# Expose the port defined in your env (3001)
EXPOSE 3001

# Start the application in production mode
CMD [ "npm", "run", "start:prod" ]
