# Start the server
cd server
Start-Process npm -ArgumentList "run dev" -NoNewWindow

# Start the client
cd ../client
Start-Process npm -ArgumentList "start" -NoNewWindow

# Return to the root folder (optional)
cd ../
