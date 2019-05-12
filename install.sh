#!/bin/bash

sudo cp smartpanel.service /etc/systemd/system
sudo systemctl enable smartpanel.service