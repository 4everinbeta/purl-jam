#!/usr/bin/env bash
set -euo pipefail

python manage.py migrate --noinput
python manage.py oscar_populate_countries --initial-only || true

exec gunicorn purljam.wsgi:application \
  --bind 0.0.0.0:${PORT:-8000} \
  --access-logfile - \
  --error-logfile - \
  --log-level info \
  --workers 2 \
  --threads 4 \
  --timeout 120
