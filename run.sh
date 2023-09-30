#!/bin/bash

# Change to the server directory and start the server
cd server
npm run dev &

# Change to the client directory and start the client
cd ../client
npm start &

# Wait for both processes to finish (optional)
wait
