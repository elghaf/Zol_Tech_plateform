FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose port 3000
EXPOSE 3000

# Use nodemon for development to enable hot-reloading
RUN npm install -g nodemon

# Start the application with nodemon
CMD ["npm", "run", "dev"] 
