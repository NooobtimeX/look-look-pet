# Use an official Node.js runtime
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the project files
COPY . .

# Build the Next.js app
RUN npm run build

# Expose Next.js port (3000)
EXPOSE 3000

# Start the Next.js server
CMD [ "npm", "start" ]
