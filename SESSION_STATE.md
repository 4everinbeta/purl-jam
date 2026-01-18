# Purl Jam Railway Deployment - Session State

**Date:** 2026-01-18
**Last Commit:** 8dc4fd1 - Fix 500 error on product detail page by correcting recently_viewed_products tag usage

## Problem Summary
User reported:
1. Favicon should be the "P" mark from the top-right corner of `logo_set.png`.
2. Images were not loading on the "Shop the yarn wall" page.
3. 500 error on product detail pages (e.g. `minimalist-hooks_12`).

## Issues Fixed (in order)

### 1-9. Previous Fixes (See history below)
- Health check, ALLOWED_HOSTS, container restart, template syntax, shop pages logo, homepage logo/favicon, product population, favicon image extraction, media serving.

### 10. Product Detail Page 500 Error (FIXED)
- **Problem:** `TemplateSyntaxError` in `templates/oscar/catalogue/detail.html`. The `recently_viewed_products` tag was being used as an assignment tag (`as recent_products`), but it is an inclusion tag.
- **Solution:**
    1.  Removed incorrect usage in `detail.html`.
    2.  Created `templates/oscar/customer/history/recently_viewed_products.html` to override the default inclusion template and match the site's styling.
    3.  Updated `detail.html` to simply call `{% recently_viewed_products current_product=product %}`.
- **Commit:** 8dc4fd1 (JUST PUSHED)

## Current State
- Code committed and pushed.
- Deployment in progress.
- **Expectation:**
    - Product detail pages should load (HTTP 200).
    - Images should appear (due to media serving fix in previous commit).
    - "Recently Viewed" section should look correct.

## Files Modified

### `/home/rbrown/workspace/purl-jam/templates/oscar/catalogue/detail.html`
- Corrected tag usage.

### `/home/rbrown/workspace/purl-jam/templates/oscar/customer/history/recently_viewed_products.html` (NEW)
- Custom template for the inclusion tag.

## Next Steps
- Verify at: https://purl-jam-production.up.railway.app/shop/catalogue/minimalist-hooks_12/
