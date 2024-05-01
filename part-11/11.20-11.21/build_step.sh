#!/bin/bash

echo "Build script"

echo "Installing frontend dependencies"
cd frontend
npm install
cd ..

echo "Installing backend dependencies"
npm install

echo "Creating frontend build"
cd frontend
npm run build

echo "Successfully built"