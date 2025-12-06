#!/usr/bin/env bash
set -euo pipefail

# usage: ./deploy.sh release-YYYYMMDD-HHMMSS.tgz
RELEASE_TGZ="/home/rojgari/${1:?Usage: $0 <release-file.tgz>}"
APP_DIR="/home/demo.rojgariindia.com"
REL_NAME="$(basename "$RELEASE_TGZ" .tgz)"
REL_DIR="$APP_DIR/releases/$REL_NAME"

# ensure Node in PATH if using nvm
if [ -d "$HOME/.nvm/versions/node" ]; then
  export PATH="$HOME/.nvm/versions/node/$(ls "$HOME"/.nvm/versions/node | sort -V | tail -1)/bin:$PATH"
fi

echo "🚀 Deploying $REL_NAME"

mkdir -p "$REL_DIR"
tar --warning=no-unknown-keyword --no-xattrs --no-acls -xzf "$RELEASE_TGZ" -C "$REL_DIR"

# link shared files (optional but recommended)
# ln -sfn "$APP_DIR/shared/.env" "$REL_DIR/.env"

# Build inside the release directory
cd "$REL_DIR"

# Next.js needs dev deps to build. Install full deps, build, then prune to production.
npm ci
npm run build
npm prune --production

# Switch current atomically only after a successful build
ln -sfn "$REL_DIR" "$APP_DIR/current"

# Ensure ecosystem file lives at app root but runs in cwd=current
cp -f ecosystem.config.js "$APP_DIR/"

# Reload app
pm2 startOrReload "$APP_DIR/ecosystem.config.js"
pm2 save

# keep only last 5 releases
cd "$APP_DIR/releases"
ls -1t | sed -n '6,$p' | xargs -r rm -rf

echo "✅ Deploy complete for $REL_NAME"
