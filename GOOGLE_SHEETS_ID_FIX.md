# Google Sheets ID Configuration Fix

## Issue Summary
The MyMaktab waitlist form was submitting data to the **wrong Google Sheets** due to an incorrect Google Apps Script URL configuration.

## Problem Details
- **Wrong Spreadsheet ID**: `1XZ4cnq5_QyRjvu7csEVHsPKabBnarXx5NrEmQU1oVAQ`
- **Correct Spreadsheet ID**: `1z1sVMI9kR4HS4va3filYdEWbjVS881nLx26qpE3YFu8`
- **Root Cause**: The HTML form was using a hardcoded Google Apps Script URL that was deployed with the wrong spreadsheet configuration

## Files Fixed

### 1. `waitlist-apps-script.gs`
- ✅ **Already had correct spreadsheet ID**
- ✅ Added comments to clarify the correct vs incorrect IDs
- ✅ Added deployment reminder comments

### 2. `docs/waitlist-form.html`
- ❌ **Had incorrect Google Apps Script URL**
- ✅ **FIXED**: Replaced hardcoded URL with placeholder
- ✅ Added clear TODO comments for deployment
- ✅ Documented the old (incorrect) URL for reference

### 3. `WAITLIST_FIX_INSTRUCTIONS.md`
- ✅ Updated to reflect the actual problem (wrong script URL)
- ✅ Added step-by-step deployment instructions
- ✅ Emphasized the need to disable/delete old script

## What You Need to Do

### CRITICAL: Deploy New Google Apps Script
1. **Create new Google Apps Script project**
2. **Copy code from `waitlist-apps-script.gs`**
3. **Verify spreadsheet ID is correct**: `1z1sVMI9kR4HS4va3filYdEWbjVS881nLx26qpE3YFu8`
4. **Deploy as Web App**
5. **Copy the new deployment URL**

### Update HTML Form
1. **Open `docs/waitlist-form.html`**
2. **Find line 561**: `const scriptUrl = 'REPLACE_WITH_NEW_GOOGLE_APPS_SCRIPT_URL';`
3. **Replace placeholder with your new script URL**
4. **Save and deploy**

### Clean Up
1. **Disable/delete the old Google Apps Script** (the one with wrong spreadsheet ID)
2. **Test the form submission**
3. **Verify data appears in correct spreadsheet**

## Verification Steps
1. Submit a test form entry
2. Check that data appears in spreadsheet: `1z1sVMI9kR4HS4va3filYdEWbjVS881nLx26qpE3YFu8`
3. Confirm data does NOT appear in old spreadsheet: `1XZ4cnq5_QyRjvu7csEVHsPKabBnarXx5NrEmQU1oVAQ`

## Technical Details
- The Google Apps Script code itself was correct
- The issue was in the deployment/URL configuration
- The HTML form was pointing to an old script deployment
- This is why form submissions went to the wrong spreadsheet

---

**Status**: ✅ Code fixed, ⏳ Deployment required
**Next Step**: Deploy new Google Apps Script and update HTML form URL
