#!/usr/bin/env bash
set -euo pipefail

# Ensure we have a port
PORT="${PORT:-8000}"

# Log everything with explicit flushing
log() {
    echo "[$(date -u +%Y-%m-%dT%H:%M:%S.%3NZ)] $*" >&2
}

log "=== PURL JAM STARTUP ==="
log "Starting on PORT: $PORT"
log "Python version: $(python --version)"

# Set Django settings module
export DJANGO_SETTINGS_MODULE=purljam.settings
log "DJANGO_SETTINGS_MODULE=$DJANGO_SETTINGS_MODULE"

# Check if we can import Django settings
log "Testing Django configuration..."
if ! python -c "import django; django.setup(); print('Django OK')" 2>&1; then
  log "ERROR: Django configuration failed!"
  log "Attempting to show Python path and installed packages..."
  python -c "import sys; print('Python path:', sys.path)" 2>&1 || true
  pip list 2>&1 || true
  exit 1
fi

log "Django configuration successful"

# Run migrations with error handling
log "Running migrations..."
if ! python manage.py migrate --noinput 2>&1; then
  log "WARNING: Migrations failed, but continuing..."
fi

log "Populating countries..."
python manage.py oscar_populate_countries --initial-only 2>&1 || log "WARNING: Country population failed, continuing..."

log "Populating products..."
python populate_products.py 2>&1 || log "WARNING: Product population failed, continuing..."

log "Clearing thumbnail cache..."
python manage.py thumbnail clear 2>&1 || log "WARNING: Thumbnail cache clear failed, continuing..."

# Start Gunicorn
log "Starting Gunicorn on 0.0.0.0:$PORT..."
exec gunicorn purljam.wsgi:application \
  --bind "0.0.0.0:$PORT" \
  --workers 1 \
  --worker-class sync \
  --timeout 120 \
  --log-level debug \
  --access-logfile - \
  --error-logfile - \
  --capture-output \
  --enable-stdio-inheritance