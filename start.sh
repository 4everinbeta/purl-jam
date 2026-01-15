#!/usr/bin/env bash
set -euo pipefail

# Ensure we have a port
PORT="${PORT:-8000}"
echo "Starting on PORT: $PORT"

# Set Django settings module
export DJANGO_SETTINGS_MODULE=purljam.settings

# Check if we can import Django settings
echo "Testing Django configuration..."
python -c "import django; django.setup(); print('Django OK')" || {
  echo "Django configuration failed!"
  exit 1
}

# Run migrations
echo "Running migrations..."
python manage.py migrate --noinput
python manage.py oscar_populate_countries --initial-only || true

# Start Gunicorn with preload to catch startup errors
echo "Starting Gunicorn..."
exec gunicorn purljam.wsgi:application \
  --config /dev/null \
  --bind "0.0.0.0:$PORT" \
  --workers 1 \
  --worker-class sync \
  --threads 1 \
  --timeout 120 \
  --preload \
  --log-level info \
  --access-logfile - \
  --error-logfile -