#!/usr/bin/env bash
# Local Hugo dev server. Restarts cleanly each run.
set -euo pipefail
cd "$(dirname "$0")/.."

PORT="${PORT:-1313}"
LOG="${LOG:-/tmp/hugo-moatlab.log}"

pkill -f "hugo server.*--port $PORT" 2>/dev/null || true
sleep 1

nohup hugo server --bind 127.0.0.1 --port "$PORT" \
  --disableFastRender --noBuildLock \
  > "$LOG" 2>&1 &

for _ in $(seq 1 10); do
  if curl -sf -o /dev/null "http://localhost:$PORT/"; then
    echo "Hugo serving at http://localhost:$PORT/  (log: $LOG)"
    exit 0
  fi
  sleep 1
done

echo "Hugo failed to start. Tail of $LOG:" >&2
tail -20 "$LOG" >&2
exit 1
