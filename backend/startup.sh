#!/bin/bash
set -e # Exit on error


echo "Installing dependencies..."
npm install express mongoose cors bcryptjs jsonwebtoken socket.io-client

echo "Starting server..."
node server.js