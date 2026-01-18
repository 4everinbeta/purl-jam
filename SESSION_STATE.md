# Purl Jam Railway Deployment - Session State

**Date:** 2026-01-18
**Last Commit:** 6f27958 - Update logo and favicon to use Purl_Jam_Primary_Logo.png

## Problem Summary
Django e-commerce app (django-oscar) was building successfully on Railway but returning 502 errors initially. This was fixed, but then 500 errors were observed on the storefront due to a template error. After fixing functionality, visual assets (logo and favicon) needed correction.

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
- **Problem:** Application returning HTTP 500 on pages using `layout.html`.
- **Root Cause:** Invalid template tag `{% basket_add_item as basket %}` in `templates/oscar/layout.html`.
- **Solution:** Replaced with `{{ request.basket.num_items }}`.
- **Commit:** 53a3d75

### 5. Incorrect Logo and Missing Favicon (FIXED)
- **Problem:** Upper right logo was using `logo_set.png` (incorrect) and favicon was missing.
- **Solution:** Updated `templates/oscar/layout.html` to use `Purl_Jam_Primary_Logo.png` and added favicon link in `templates/oscar/base.html`.
- **Commit:** 6f27958 (JUST PUSHED)

## Current State
- Code changes committed and pushed to Railway.
- Waiting for deployment to complete (approx 2-3 mins).
- Application should be fully functional and visually correct.

## Files Modified

### `/home/rbrown/workspace/purl-jam/templates/oscar/layout.html`
- Updated logo `src` to `{% static 'brand/Purl_Jam_Primary_Logo.png' %}`.

### `/home/rbrown/workspace/purl-jam/templates/oscar/base.html`
- Added favicon `<link>` tag.

### `/home/rbrown/workspace/purl-jam/start.sh`
- Complete rewrite with stderr logging

### `/home/rbrown/workspace/purl-jam/purljam/settings.py`
- Auto-adds `healthcheck.railway.app` to ALLOWED_HOSTS

### `/home/rbrown/workspace/purl-jam/railway.toml`
- Removed `restartPolicyType = "never"` line

## Next Steps
- Verify visual changes at: https://purl-jam-production.up.railway.app