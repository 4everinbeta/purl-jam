# Purl Jam (Django Oscar)

Django Oscar storefront customized with the Purl Jam theme and ready for Railway + Postgres.

## Local setup

```
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
export SECRET_KEY="dev"
python manage.py migrate
python manage.py oscar_populate_countries
python manage.py createsuperuser
python manage.py runserver
```

Open `http://127.0.0.1:8000/`.

## Railway

- Create a Railway project
- Add a Postgres plugin
- Create a service from this repo (Dockerfile at root)
- Set environment variables:
  - `SECRET_KEY`
  - `DEBUG=false`
  - `ALLOWED_HOSTS=*` or your Railway domain
  - `CSRF_TRUSTED_ORIGINS=https://<your-railway-domain>`

GitHub Actions deploys on pushes to `main` when these secrets are set:
- `RAILWAY_TOKEN`
- `RAILWAY_PROJECT_ID`
- `RAILWAY_SERVICE_APP`
