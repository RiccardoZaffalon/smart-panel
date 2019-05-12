#!/bin/bash

# Launch Node server
node server

# Turn TV ON
echo "on 0" | cec-client -s

# Start App in Kiosk mode
chromium-browser --kiosk http://localhost:3000/