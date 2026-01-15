FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
      build-essential \
      libpq-dev \
      libjpeg62-turbo-dev \
      zlib1g-dev \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN python manage.py collectstatic --noinput

ENV PORT=8000

EXPOSE 8000

CMD gunicorn purljam.wsgi:application --bind 0.0.0.0:${PORT:-8000} --log-level debug --access-logfile - --error-logfile - --workers 1 --threads 2 --timeout 120
