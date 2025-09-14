# Waitlist Form Fix Instructions

## Problem Identified
The waitlist form submission was not working correctly because:
1. The form was sending comprehensive data (parent info, children details, madrasah selections)
2. The Google Apps Script was not properly handling all the form fields
3. The Google Sheets structure didn't match the form data

## Solution Implemented

### 1. Updated Google Sheets Structure
- Updated the "Waitlist" sheet in the MyMaktab-Backend spreadsheet
- Added proper column headers to capture all form data:
  - Parent information (name, email, phone, address)
  - Children details (up to 5 children with names, ages, school years, notes)
  - Selected madrasahs
  - Additional information and consent

### 2. Created New Google Apps Script
- Created `waitlist-apps-script.gs` with proper form handling
- Handles both JSON data and individual form fields
- Includes error handling and logging
- Supports up to 5 children per family

## Deployment Steps

### Step 1: Deploy the New Google Apps Script

1. Go to [Google Apps Script](https://script.google.com/)
2. Click "New Project"
3. Replace the default code with the content from `waitlist-apps-script.gs`
4. Save the project with name "MyMaktab Waitlist Handler"
5. Click "Deploy" → "New Deployment"
6. Choose type: "Web app"
7. Set execute as: "Me"
8. Set access: "Anyone"
9. Click "Deploy"
10. **Copy the new Web App URL** (it will look like: `https://script.google.com/macros/s/[SCRIPT_ID]/exec`)

### Step 2: Update the Form

1. Open `docs/waitlist-form.html`
2. Find this line (around line 400):
   ```javascript
   const scriptUrl = 'https://script.google.com/macros/s/AKfycbzIDchg9r1eEB7sfyTTzbN9x-43f_o7y7MwzH5-cM5snQzDs0p4uBGkqfAcKRbdVAWL5A/exec';
   ```
3. Replace the URL with your new Web App URL from Step 1
4. Save the file

### Step 3: Test the Integration

1. Open the waitlist form in a browser
2. Fill out the form with test data:
   - Parent information
   - At least one child with school year
   - Select at least one madrasah
   - Add additional information
   - Check the consent checkbox
3. Submit the form
4. Check the "Waitlist" sheet in the MyMaktab-Backend spreadsheet
5. Verify all data appears correctly

## Current Form Fields Captured

The new script captures all these fields:
- **Parent Info**: First name, last name, email, phone, address
- **Children Info**: Up to 5 children with first name, last name, age, school year, special notes
- **Madrasah Selection**: All selected madrasahs (comma-separated)
- **Additional Info**: Any special requirements or notes
- **Consent**: Data usage consent status
- **Timestamp**: Automatic submission timestamp

## Troubleshooting

### If form submission fails:
1. Check browser console for JavaScript errors
2. Verify the Google Apps Script URL is correct
3. Ensure the Google Apps Script is deployed as a web app with "Anyone" access
4. Check the Google Apps Script execution logs for errors

### If data is missing:
1. Verify the Google Sheets has the correct column headers
2. Check that the form field names match what the script expects
3. Review the Google Apps Script logs for parsing errors

### If you get permission errors:
1. Make sure the Google Apps Script is set to execute as "Me" (the owner)
2. Ensure the script has permission to access Google Sheets
3. Check that the spreadsheet ID in the script matches your actual spreadsheet

## Files Modified/Created

1. **Created**: `waitlist-apps-script.gs` - New Google Apps Script code
2. **Updated**: Google Sheets "Waitlist" tab headers
3. **To Update**: `docs/waitlist-form.html` - Update script URL after deployment

## Next Steps

1. Deploy the Google Apps Script and get the new URL
2. Update the form with the new script URL
3. Test the complete flow
4. Commit and push changes to GitHub
5. Deploy the updated form to your web server

The form should now capture ALL submitted data properly in the Google Sheets!
