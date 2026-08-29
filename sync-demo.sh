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

# Vite always names its build entry index.html. This repo's own landing
# page is already index.html, so the vendored demo's entry gets renamed
# to app.html to avoid two files named index.html in the repo.
if [ -f demo/index.html ]; then
  mv demo/index.html demo/app.html
fi

# The in-app "Reset Demo" button does a hard `window.location.href =
# "/demo/login"` navigation (by design, to force a full remount) rather
# than a client-side route change. "/demo/login" isn't a real file on
# static hosting (GitHub Pages has no server-side rewrites), so that hard
# nav would 404. Reset already clears the auth token first, and the app's
# router has a catch-all "*" route that redirects unauthenticated users to
# /login client-side — so pointing the hard nav at the real app.html file
# (which always exists) lands on the login screen correctly without
# needing any extra file. This patches that one literal in the built JS;
# fix it at the source (cue-platform) to make this step unnecessary.
for f in demo/assets/*.js; do
  if grep -q '"/demo/login"' "$f" 2>/dev/null; then
    sed -i 's#"/demo/login"#"/demo/app.html"#g' "$f"
  fi
done

echo "Done. Review the diff, then commit:"
echo "  git add demo && git commit -m 'Update embedded CUE demo'"
