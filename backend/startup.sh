#!/bin/bash
set -e # Exit on error


echo "Installing dependencies..."

echo "Installing express"
npm install express

echo "Installing mongoose"
npm install mongoose

echo "Installing cors"
npm install cors

echo "Installing bcryptjs"
npm install bcryptjs

echo "Installing jsonwebtoken"
npm install jsonwebtoken

echo "Installing socket.io-client"
npm install socket.io-client


echo "Starting server..."
node server.js