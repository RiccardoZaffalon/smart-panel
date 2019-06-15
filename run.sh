#!/bin/bash

# Turn TV on
echo on 0 | cec-client -s -d 1 &

# Disable screensaver
export DISPLAY=:0
xset q
xset s off
xset -dpms
xset s noblank

chromium-browser --no-sandbox http://localhost:3000 &