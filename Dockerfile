# Use an official Node runtime as a base image
FROM node:16-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application to the working directory
COPY . .

# Build the React app
RUN npm run build

# Expose port 80 (or the port your application runs on)
EXPOSE 80

# Command to run the application
CMD ["npm", "start"]
