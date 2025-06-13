# Google Form Setup Guide for Tajweed Assessment

## Step 1: Create a New Google Form

1. Go to [Google Forms](https://forms.google.com)
2. Click "+" to create a new form
3. Title: "Tajweed Assessment Results"
4. Description: "Automated submission of student Tajweed assessment results"

## Step 2: Add Form Fields

Create the following fields in your Google Form (in this exact order):

### Basic Information
1. **Student Name** (Short answer text)
2. **Surah Name (English)** (Short answer text)
3. **Surah Name (Arabic)** (Short answer text)
4. **Assessment Date** (Short answer text)

### Scores
5. **Final Weighted Score** (Short answer text)
6. **Core Tajweed Score** (Short answer text)
7. **Pronunciation Score** (Short answer text)
8. **Additional Categories Score** (Short answer text)

### Core Tajweed Mistakes
9. **Ghunna Mistakes** (Short answer text)
10. **Ikhfaa Mistakes** (Short answer text)
11. **Idghaam Mistakes** (Short answer text)
12. **Qalqalah Mistakes** (Short answer text)

### Pronunciation (Makhraj) Mistakes
13. **Nasal Mistakes** (Short answer text)
14. **Lips Mistakes** (Short answer text)
15. **Tongue Mistakes** (Short answer text)
16. **Throat Mistakes** (Short answer text)
17. **Chest Mistakes** (Short answer text)

### Checklist Mistakes
18. **Madd Mistakes** (Paragraph text)
19. **Waqf/Ibtidaa Mistakes** (Paragraph text)
20. **Minor Mistakes** (Paragraph text)
21. **Major Mistakes** (Paragraph text)

### Additional Information
22. **Examiner Comments** (Paragraph text)

## Step 3: Get Form Entry IDs

1. After creating all fields, click "Send" button
2. Click the link icon (<>)
3. Copy the form URL (it will look like: `https://docs.google.com/forms/d/e/FORM_ID_HERE/viewform`)
4. Open the form URL in a new tab
5. Right-click and select "Inspect Element" or press F12
6. Look for input fields with names like `entry.123456789`
7. Note down each entry ID for each field in order

## Step 4: Update the Code

Replace the entry IDs in the SubmissionForm.tsx file with your actual entry IDs from step 3.

## Step 5: Test the Form

1. Fill out the form manually to ensure all fields work
2. Test the submission from your app
3. Check that responses appear in the Google Form responses tab

## Form URL Format

Your submission URL should be:
`https://docs.google.com/forms/d/e/YOUR_ACTUAL_FORM_ID/formResponse`

Replace `YOUR_ACTUAL_FORM_ID` with the actual ID from your form URL.

## Viewing Responses

1. Go to your Google Form
2. Click "Responses" tab
3. You can view individual responses or export to Google Sheets
4. Set up email notifications for new responses if needed

## Security Note

The form submissions use 'no-cors' mode, which means:
- The app cannot read the response from Google Forms
- This is normal and expected behavior
- Success/error status is determined by whether the fetch completes without throwing an error
