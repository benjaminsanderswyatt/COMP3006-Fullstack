# Stage 1: Build the React app
FROM node:22.9.0 AS build

WORKDIR /app

# Copy package.json and package-lock.json (if present)
COPY package*.json ./ package-lock.json ./

# Install dependencies
RUN npm install 

# Copy the rest of the app source code
COPY . .

# Build the React app for production
RUN npm run build

# Stage 2: Serve the React app
FROM node:22.9.0 AS serve

WORKDIR /app

# Copy only production dependencies
COPY package*.json ./
RUN npm install --production

# Copy the build output to serve the app
COPY --from=build /app/build ./build

# Add server.js for serving static files
COPY server.js ./

# Expose port 80
EXPOSE 80

# Start the server
CMD ["node", "server.js"]