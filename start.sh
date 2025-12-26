#!/bin/bash
set -e

export NODE_ENV=production
export PORT=3022

# app directory already contains server.js + .next + node_modules
exec node server.js
