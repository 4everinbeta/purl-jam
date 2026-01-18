# Purl Jam Railway Deployment - Session State

**Date:** 2026-01-18
**Last Commit:** 53a3d75 - Fix basket item count template tag error

## Problem Summary
Django e-commerce app (django-oscar) was building successfully on Railway but returning 502 errors initially. This was fixed, but then 500 errors were observed on the storefront due to a template error.

## Issues Fixed (in order)

### 1. Health Check Timeout (FIXED)
- **Problem:** Health checks timing out after 5 minutes, no logs visible
- **Root Cause:** Logs not being captured by Railway
- **Solution:** Rewrote `start.sh` to redirect all output to stderr with timestamps
- **Commit:** dbb260d

### 2. ALLOWED_HOSTS Rejection (FIXED)
- **Problem:** Health checks returning HTTP 400 "Invalid HTTP_HOST header: 'healthcheck.railway.app'"
- **Root Cause:** Django rejecting Railway's health check requests
- **Solution:** Modified `purljam/settings.py` to automatically add `healthcheck.railway.app` to ALLOWED_HOSTS
- **Commit:** d230583

### 3. Container Stopping After Health Check (FIXED)
- **Problem:** Health checks passing (HTTP 200) but container stopping 3 seconds later, causing 502 errors
- **Root Cause:** `restartPolicyType = "never"` in `railway.toml` preventing container from staying running
- **Solution:** Removed `restartPolicyType = "never"` from `railway.toml`
- **Commit:** 4d353e2

### 4. Template Syntax Error (FIXED)
- **Problem:** Application returning HTTP 500 on pages using `layout.html` (including "Shop the yarn wall" button).
- **Root Cause:** Invalid template tag `{% basket_add_item as basket %}` in `templates/oscar/layout.html`. The tag was not defined in `basket_tags`.
- **Solution:** Replaced with `{{ request.basket.num_items }}`.
- **Commit:** 53a3d75
- **Verification:**
    - Deployment successful (logs show "Health check: OK").
    - `/shop/catalogue/` returns HTTP 200.
    - `/shop/basket/` returns HTTP 200.

## Current State
- Application is live and stable.
- Major critical issues resolved.

## Files Modified

### `/home/rbrown/workspace/purl-jam/templates/oscar/layout.html`
- Replaced invalid `basket_add_item` tag with `request.basket`.

### `/home/rbrown/workspace/purl-jam/start.sh`
- Complete rewrite with stderr logging
- Non-fatal migrations
- Django config validation
- Improved gunicorn flags

### `/home/rbrown/workspace/purl-jam/purljam/settings.py`
- Auto-adds `healthcheck.railway.app` to ALLOWED_HOSTS

### `/home/rbrown/workspace/purl-jam/purljam/urls.py`
- Supports both `/health` and `/health/` paths

### `/home/rbrown/workspace/purl-jam/purljam/views.py`
- Enhanced health check logging

### `/home/rbrown/workspace/purl-jam/railway.toml`
- Removed `restartPolicyType = "never"` line

## Next Steps
- Monitor for any other runtime errors.
- Confirm with user if they see any other issues.
- Access application at: https://purl-jam-production.up.railway.app
