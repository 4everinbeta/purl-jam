#!/usr/bin/env bash
set -euo pipefail

# Ensure we have a port
PORT="${PORT:-8000}"
echo "Starting on PORT: $PORT"

# Run migrations (commented out for speed debugging)
# python manage.py migrate --noinput
# python manage.py oscar_populate_countries --initial-only || true

exec gunicorn purljam.wsgi:application \
  --bind "0.0.0.0:$PORT" \
  --workers 1 \
  --threads 2 \
  --timeout 120 \
  --log-level debug \
  --access-logfile - \
  --error-logfile - \
  --capture-output \
  --enable-stdio-inheritance