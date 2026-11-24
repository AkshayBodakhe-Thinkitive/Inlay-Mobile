#!/usr/bin/env bash
# Runs a command on the Node version in .nvmrc (Expo SDK 58 needs Node >= 22.13).
# Usage: scripts/with-node.sh expo run:ios --device
export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
if [ -s "$NVM_DIR/nvm.sh" ]; then
  # shellcheck disable=SC1091
  . "$NVM_DIR/nvm.sh"
  nvm install >/dev/null 2>&1 || nvm use >/dev/null 2>&1
  nvm use >/dev/null
else
  echo "nvm not found; using $(node -v). Expo needs Node >= 22.13." >&2
fi
exec "$@"
