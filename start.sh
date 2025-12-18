#!/bin/bash
npm install
npm run build
pm2 restart adminnode || pm2 start ecosystem.config.js
