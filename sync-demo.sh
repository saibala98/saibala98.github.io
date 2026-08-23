#!/usr/bin/env bash
# Rebuilds the CUE demo from the cue-platform source and re-vendors the
# static output into ./demo/. Run this whenever cue-platform's demo mode
# changes and you want the portfolio's embedded copy updated.
#
# Usage (from this repo's root):
#   ./sync-demo.sh [path-to-cue-platform]
#
# Defaults to ../cue-platform, assuming this repo is checked out as a
# sibling of cue-platform (adjust the default below, or pass a path, if not).

set -euo pipefail

CUE_PLATFORM_DIR="${1:-../cue-platform}"
FRONTEND_DIR="$CUE_PLATFORM_DIR/frontend"

if [ ! -d "$FRONTEND_DIR" ]; then
  echo "error: $FRONTEND_DIR not found. Pass the cue-platform path as an argument:"
  echo "  ./sync-demo.sh /path/to/cue-platform"
  exit 1
fi

echo "Building demo from $FRONTEND_DIR (base path /demo/)..."
(
  cd "$FRONTEND_DIR"
  npm install
  # MSYS_NO_PATHCONV: on Git Bash for Windows, a bare /demo/ argument gets
  # silently rewritten into a Windows path (e.g. /Program Files/Git/demo/)
  # by MSYS's POSIX-path auto-conversion. This disables that for this
  # command only. Harmless (a no-op) on macOS/Linux.
  MSYS_NO_PATHCONV=1 VITE_BASE_PATH=/demo/ npm run build:demo
)

echo "Copying build output into ./demo/..."
rm -rf demo
mkdir -p demo
cp -r "$FRONTEND_DIR/dist/." demo/

echo "Done. Review the diff, then commit:"
echo "  git add demo && git commit -m 'Update embedded CUE demo'"
