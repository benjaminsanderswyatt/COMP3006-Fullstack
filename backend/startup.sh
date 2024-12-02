#!/bin/bash
set -e # Exit on error

echo "Installing dependencies..."
npm install cors express mongoose bcryptjs jsonwebtoken


echo "Starting server..."
node server.js