#!/bin/bash

cd /apps/smart-panel/

if ! lsof -i -P -n | grep :3000 >/dev/null ; then
    node server.js &
fi

chromium-browser --no-sandbox http://localhost:3000

# Turn TV on
echo on 0 | cec-client -s -d 1

# Disable screensaver
export DISPLAY=:0
xset q
xset s off
xset -dpms
xset s noblank
