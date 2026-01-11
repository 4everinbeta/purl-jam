# Railway deployment notes

This repo is set up for two Railway services:

1) `sqlserver` (Docker image: SQL Server Express)
2) `nopcommerce` (Docker image built from repo root, theme baked in)

## Required Railway service settings

Create a Railway project and two services, then add these env vars:

### sqlserver service
- `SA_PASSWORD` (strong password, 8+ chars with upper/lower/number/symbol)

If you have Railway volumes, mount one to `/var/opt/mssql` to persist the DB.

### nopcommerce service
- `SA_PASSWORD` (same as sqlserver)
- `CONNECTIONSTRINGS__DEFAULTCONNECTION`
  - Example: `Server=${{RAILWAY_PRIVATE_DOMAIN}};Database=nopCommerce;User Id=sa;Password=YOUR_PASSWORD;TrustServerCertificate=True;`
  - Use the private domain/host of the SQL Server service in Railway.
- `NOPCOMMERCE_URL` (your public Railway URL, https)
- `NopCommerce__StoreUrl` (same as above)
- `ASPNETCORE_URLS` set to `http://+:$PORT`

## GitHub Actions secrets

Add these secrets in your GitHub repo:
- `RAILWAY_TOKEN`
- `RAILWAY_PROJECT_ID`
- `RAILWAY_SERVICE_SQLSERVER`
- `RAILWAY_SERVICE_NOPCOMMERCE`

After that, pushes to `main` will deploy both services.
