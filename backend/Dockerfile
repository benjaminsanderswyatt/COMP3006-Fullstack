# Build
FROM node:22.9.0 AS build

WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./ package-lock.json ./

# Install dependencies
RUN npm install 

# Copy the rest of the app source code
COPY . .

# Expose port 9000
EXPOSE 9000

CMD ["node", "server.js"]