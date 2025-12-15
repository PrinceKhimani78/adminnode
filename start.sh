#!/bin/bash

export NODE_ENV=production
export PORT=3020

cd /home/rojgariindia.com/app

echo ">>> Starting rojgariindia.com (custom Next.js server) on port 3020"

exec node server.js
