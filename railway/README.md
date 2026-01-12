# Railway deployment notes (Django Oscar)

This repo deploys a Django Oscar storefront to Railway using a managed Postgres add-on.

## Railway setup

1) Create a Railway project.
2) Add a **PostgreSQL** plugin to the project.
3) Create a service for the app (Dockerfile at repo root).

Railway will inject `DATABASE_URL` into the app service automatically when the Postgres plugin
is attached to the project.

## Required environment variables (app service)

- `SECRET_KEY` (Django secret key)
- `DEBUG` (set to `false` in production)
- `ALLOWED_HOSTS` (comma-separated hostnames, or `*`)
- `CSRF_TRUSTED_ORIGINS` (comma-separated https origins)

## GitHub Actions secrets

Add these secrets in your GitHub repo:
- `RAILWAY_TOKEN`
- `RAILWAY_PROJECT_ID`
- `RAILWAY_SERVICE_APP`

After that, pushes to `main` will deploy the app service.
