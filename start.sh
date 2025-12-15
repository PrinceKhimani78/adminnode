#!/bin/bash
set -e

export NODE_ENV=production
export PORT=3020

cd /home/rojgariindia.com/app

echo ">>> Starting rojgariindia.com on port 3020"

exec node server.js
