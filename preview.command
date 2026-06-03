#!/bin/bash
# ----------------------------------------------------------------------
#  Double-click this file to PREVIEW your website on your own computer.
#  (macOS opens it in Terminal automatically.)
#
#  It serves the site at http://localhost:8000 and opens your browser.
#  Edit content.json, save, then refresh the browser to see changes.
#  To stop the preview: press  Ctrl + C , or just close this window.
# ----------------------------------------------------------------------

cd "$(dirname "$0")" || exit 1

PORT=8000
echo ""
echo "  Starting a local preview of your website..."
echo "  ➜  http://localhost:$PORT"
echo ""
echo "  Edit content.json, save, and refresh the browser to see changes."
echo "  Press Ctrl+C (or close this window) to stop."
echo ""

# Open the browser a moment after the server starts.
( sleep 1; open "http://localhost:$PORT" ) &

# Serve the current folder. This stays running until you stop it.
python3 -m http.server "$PORT"
