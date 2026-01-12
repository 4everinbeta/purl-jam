#!/usr/bin/env bash
set -euo pipefail

python manage.py migrate --noinput
python manage.py oscar_populate_countries --noinput || true

gunicorn purljam.wsgi:application --bind 0.0.0.0:${PORT:-8000}
