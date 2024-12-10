#!/bin/bash
set -e # Exit on error

echo "Installing dependencies..."
npm install cors express mongoose bcryptjs jsonwebtoken ws


echo "Starting server..."
node server.js