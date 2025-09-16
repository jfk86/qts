# MyMaktab Secure Waitlist Service - Deployment Guide

## 🔒 Security Overview

This secure implementation eliminates all client-side exposure of sensitive information by:
- Using Google Apps Script as a secure API gateway
- Removing all direct Google Sheets API calls from HTML
- Hiding spreadsheet IDs and API keys from public view
- Centralizing all data operations in server-side code

## 📦 Package Contents

### Secure Files (Use These):
1. **secure-google-apps-script.gs** - Secure API gateway script
2. **secure-waitlist-form.html** - Secure waitlist registration form
3. **secure-mosque-directory.html** - Secure mosque directory
4. **mosque_directory_data.xlsx** - Sample mosque data

### Legacy Files (For Reference Only):
- google-apps-script.gs, waitlist-form.html, mosque-directory.html

## 🚀 Quick Deployment Steps

### Step 1: Setup Google Sheets

#### Create Waitlist Spreadsheet:
1. Go to [sheets.google.com](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "MyMaktab Waitlist Data"
4. Copy the Spreadsheet ID from URL: `https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit`
5. Keep this ID handy

#### Create Mosque Directory Spreadsheet:
1. Create another new spreadsheet
2. Name it "MyMaktab Mosque Directory"
3. Upload the provided `mosque_directory_data.xlsx` or manually create with columns:
   - Name, Type, Address, City, Phone, Email, Website, Services, Imam, Established, Capacity
4. Copy this Spreadsheet ID as well

### Step 2: Deploy Google Apps Script

1. **Open Google Apps Script:**
   - Go to [script.google.com](https://script.google.com)
   - Click "New Project"

2. **Setup the Script:**
   - Delete the default `myFunction()` code
   - Copy and paste the entire content from `secure-google-apps-script.gs`
   - Name your project "MyMaktab Secure API"

3. **Configure Settings:**
   - Find the CONFIG section at the top of the script
   - Replace `YOUR_WAITLIST_SPREADSHEET_ID_HERE` with your waitlist spreadsheet ID
   - Replace `YOUR_MOSQUE_SPREADSHEET_ID_HERE` with your mosque directory spreadsheet ID
   - Update `ADMIN_EMAIL` with your admin email address

4. **Deploy as Web App:**
   - Click "Deploy" → "New deployment"
   - Choose "Web app" as the deployment type
   - Set "Execute as" to "Me"
   - Set "Who has access" to "Anyone"
   - Click "Deploy"
   - **IMPORTANT:** Copy the Web app URL - you'll need this for Step 3

5. **Grant Permissions:**
   - When prompted, review and grant the necessary permissions
   - The script needs access to Google Sheets and Gmail for notifications

### Step 3: Configure HTML Files

#### Update Waitlist Form:
1. Open `secure-waitlist-form.html` in a text editor
2. Find this line: `const API_URL = 'YOUR_SECURE_GOOGLE_APPS_SCRIPT_URL_HERE';`
3. Replace `YOUR_SECURE_GOOGLE_APPS_SCRIPT_URL_HERE` with your actual Web app URL from Step 2
4. Save the file

#### Update Mosque Directory:
1. Open `secure-mosque-directory.html` in a text editor
2. Find this line: `const API_URL = 'YOUR_SECURE_GOOGLE_APPS_SCRIPT_URL_HERE';`
3. Replace with the same Web app URL
4. Save the file

### Step 4: Upload and Test

1. **Upload Files:**
   - Upload both HTML files to your web hosting service
   - Ensure your hosting supports HTTPS (required for secure operation)

2. **Test the System:**
   - Open `secure-waitlist-form.html` in your browser
   - Try submitting a test application
   - Check that data appears in your Google Sheets
   - Test the mosque directory functionality
   - Verify email notifications are working

## 🔧 Advanced Configuration

### Email Notifications
The system automatically sends:
- Confirmation emails to parents
- Notification emails to administrators

To customize email templates, edit the `sendParentConfirmation()` and `sendAdminNotification()` functions in the Google Apps Script.

### Adding More Madrasahs
To add more madrasah options:
1. Edit `secure-waitlist-form.html`
2. Find the madrasah checkbox section
3. Add new checkbox items following the existing pattern

### Customizing Mosque Data
1. Edit your mosque directory spreadsheet directly
2. The changes will automatically appear in the directory
3. No need to update any code files

### Priority Scoring System
The system includes an automatic priority scoring algorithm that considers:
- Child ages (younger children get higher priority)
- School year preferences
- Random component for tie-breaking

Modify the `calculatePriorityScore()` function to adjust the scoring logic.

## 🛡️ Security Features

### What's Protected:
- ✅ Google Sheets IDs are hidden from public view
- ✅ No API keys exposed in client-side code
- ✅ All data operations happen server-side
- ✅ Form validation on both client and server
- ✅ CORS protection through Google Apps Script

### Additional Security Recommendations:
1. **Enable HTTPS:** Ensure your website uses HTTPS
2. **Regular Monitoring:** Check your Google Apps Script execution logs regularly
3. **Access Control:** Consider restricting the Google Apps Script to specific domains
4. **Data Backup:** Regularly backup your Google Sheets data
5. **CAPTCHA:** Consider adding CAPTCHA for production use

## 🔍 Testing Checklist

- [ ] Waitlist form submits successfully
- [ ] Data appears correctly in Google Sheets
- [ ] Email notifications are sent
- [ ] Mosque directory loads and displays data
- [ ] Search and filtering work properly
- [ ] Forms work on mobile devices
- [ ] No console errors in browser developer tools
- [ ] No sensitive information visible in page source

## 🚨 Troubleshooting

### Common Issues:

**1. Form not submitting:**
- Check that the Google Apps Script URL is correct in both HTML files
- Verify the script is deployed as a web app with "Anyone" access
- Check browser console for error messages

**2. No email notifications:**
- Ensure Gmail permissions are granted to the script
- Check the ADMIN_EMAIL setting in the CONFIG section
- Verify the parent email address is valid

**3. Mosque directory not loading:**
- Confirm the mosque spreadsheet ID is correct
- Check that the spreadsheet has the correct column headers
- Verify the sheet name matches CONFIG.MOSQUE_SHEET_NAME

**4. Data not saving:**
- Check spreadsheet permissions (script should have edit access)
- Verify the spreadsheet IDs are correct
- Look at Google Apps Script execution logs for errors

### Getting Help:
1. Check Google Apps Script execution logs: script.google.com → your project → Executions
2. Use browser developer tools to check for JavaScript errors
3. Test the API directly by visiting: `YOUR_SCRIPT_URL?action=test`

## 📊 Monitoring and Analytics

### Google Apps Script Logs:
- Monitor execution logs for errors
- Track form submission frequency
- Monitor API response times

### Google Sheets Analytics:
- Track waitlist applications over time
- Analyze popular madrasah preferences
- Monitor mosque directory usage

## 🔄 Maintenance

### Regular Tasks:
1. **Monthly:** Review and clean up test submissions
2. **Quarterly:** Update mosque directory information
3. **Annually:** Review and update madrasah options

### Updates:
- To update the system, modify the Google Apps Script
- HTML files only need updates for UI changes
- Always test changes in a development environment first

## 📈 Scaling Considerations

### Current Limits:
- Google Apps Script: 6 minutes execution time per function
- Google Sheets: 10 million cells per spreadsheet
- Gmail: 100 emails per day (can be increased)

### For High Volume:
- Consider splitting data across multiple spreadsheets
- Implement batch processing for large datasets
- Consider upgrading to Google Workspace for higher limits

## 🎯 Next Steps

After successful deployment:
1. **User Training:** Train staff on managing waitlist data
2. **Integration:** Consider integrating with existing MyMaktab systems
3. **Analytics:** Set up tracking for form submissions and usage
4. **Feedback:** Collect user feedback for improvements

---

## 📞 Support

For technical issues:
1. Check this deployment guide
2. Review Google Apps Script documentation
3. Test with the provided sample data
4. Contact your development team for custom modifications

**Last Updated:** September 2025  
**Version:** 2.0 (Secure Implementation)
