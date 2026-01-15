#!/usr/bin/env bash
set -euo pipefail

# python manage.py migrate --noinput
# python manage.py oscar_populate_countries --initial-only || true

echo "PORT is set to: $PORT"

exec gunicorn purljam.wsgi:application \
  --bind 0.0.0.0:${PORT:-8000} \
  --access-logfile - \
  --error-logfile - \
  --log-level debug \
  --capture-output \
  --workers 1 \
  --threads 1 \
  --timeout 120