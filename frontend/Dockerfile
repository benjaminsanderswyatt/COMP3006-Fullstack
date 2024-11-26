# Stage 1: Build the React app
FROM node:22 AS build

WORKDIR /app

# Copy package.json and package-lock.json (if present)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app source code
COPY . .

# Build the React app for production
RUN npm run build

# Stage 2: Serve the React app using Nginx
FROM nginx:alpine

# Copy the build output from the build stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 (Nginx default port)
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]