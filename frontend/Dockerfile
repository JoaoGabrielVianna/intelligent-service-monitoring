# Use the official Node.js image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the development server port
EXPOSE 3000

# Command to run the development server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3000"]