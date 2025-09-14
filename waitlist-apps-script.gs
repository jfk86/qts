/**
 * MyMaktab Waitlist Form Handler
 * Google Apps Script to process waitlist form submissions
 */

// Configuration
const SPREADSHEET_ID = '1z1sVMI9kR4HS4va3filYdEWbjVS881nLx26qpE3YFu8';
const SHEET_NAME = 'Waitlist';

/**
 * Handle POST requests from the waitlist form
 */
function doPost(e) {
  try {
    // Log the incoming request for debugging
    console.log('Received POST request:', JSON.stringify(e.parameter));
    
    // Parse the form data
    const formData = e.parameter;
    
    // Open the spreadsheet
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    // Ensure headers exist
    if (sheet.getLastRow() === 0) {
      setupHeaders(sheet);
    }
    
    // Process and add the data
    const rowData = processFormData(formData);
    sheet.appendRow(rowData);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Waitlist registration submitted successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error processing form submission:', error);
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: 'Failed to process registration: ' + error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle GET requests (for testing)
 */
function doGet(e) {
  return ContentService
    .createTextOutput('MyMaktab Waitlist API is running! Use POST to submit form data.')
    .setMimeType(ContentService.MimeType.TEXT);
}

/**
 * Set up column headers in the sheet
 */
function setupHeaders(sheet) {
  const headers = [
    'Timestamp',
    'Full Name', 
    'Email',
    'Phone',
    'Address',
    'Parent First Name',
    'Parent Last Name',
    'Selected Madrasahs',
    'Additional Info',
    'Data Consent',
    'Children Count',
    'Child 1 First Name',
    'Child 1 Last Name', 
    'Child 1 Age',
    'Child 1 School Year',
    'Child 1 Notes',
    'Child 2 First Name',
    'Child 2 Last Name',
    'Child 2 Age', 
    'Child 2 School Year',
    'Child 2 Notes',
    'Child 3 First Name',
    'Child 3 Last Name',
    'Child 3 Age',
    'Child 3 School Year', 
    'Child 3 Notes',
    'Child 4 First Name',
    'Child 4 Last Name',
    'Child 4 Age',
    'Child 4 School Year',
    'Child 4 Notes',
    'Child 5 First Name',
    'Child 5 Last Name',
    'Child 5 Age',
    'Child 5 School Year',
    'Child 5 Notes'
  ];
  
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Format headers
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#4285f4');
  headerRange.setFontColor('white');
}

/**
 * Process form data into a row array
 */
function processFormData(formData) {
  // Get timestamp
  const timestamp = new Date().toLocaleString();
  
  // Basic info
  const fullName = (formData.parentFirstName || '') + ' ' + (formData.parentLastName || '');
  const email = formData.email || '';
  const phone = formData.phone || '';
  const address = formData.address || '';
  const parentFirstName = formData.parentFirstName || '';
  const parentLastName = formData.parentLastName || '';
  
  // Parse selected madrasahs
  let selectedMadrasahs = '';
  try {
    if (formData.selectedMadrasahs) {
      const madrasahsArray = JSON.parse(formData.selectedMadrasahs);
      selectedMadrasahs = madrasahsArray.join(', ');
    }
  } catch (e) {
    console.log('Error parsing madrasahs:', e);
    selectedMadrasahs = formData.selectedMadrasahs || '';
  }
  
  const additionalInfo = formData.additionalInfo || '';
  const dataConsent = formData.dataConsent || 'false';
  
  // Parse children data
  let children = [];
  let childrenCount = 0;
  
  try {
    if (formData.children) {
      children = JSON.parse(formData.children);
      childrenCount = children.length;
    }
  } catch (e) {
    console.log('Error parsing children data:', e);
    // Fallback: try to extract individual child fields
    for (let i = 1; i <= 5; i++) {
      const firstName = formData[`childFirstName${i}`];
      const lastName = formData[`childLastName${i}`];
      const age = formData[`childAge${i}`];
      const schoolYear = formData[`schoolYear${i}`];
      const notes = formData[`childNotes${i}`];
      
      if (firstName || lastName || schoolYear) {
        children.push({
          firstName: firstName || '',
          lastName: lastName || '',
          age: age || '',
          schoolYear: schoolYear || '',
          notes: notes || ''
        });
        childrenCount++;
      }
    }
  }
  
  // Build the row data array
  const rowData = [
    timestamp,
    fullName.trim(),
    email,
    phone,
    address,
    parentFirstName,
    parentLastName,
    selectedMadrasahs,
    additionalInfo,
    dataConsent,
    childrenCount
  ];
  
  // Add up to 5 children's data
  for (let i = 0; i < 5; i++) {
    if (i < children.length) {
      const child = children[i];
      rowData.push(
        child.firstName || '',
        child.lastName || '',
        child.age || '',
        child.schoolYear || '',
        child.notes || ''
      );
    } else {
      // Empty cells for unused child slots
      rowData.push('', '', '', '', '');
    }
  }
  
  return rowData;
}

/**
 * Test function to verify the script works
 */
function testScript() {
  const testData = {
    parentFirstName: 'John',
    parentLastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '416-555-0123',
    address: '123 Main St, Toronto, ON',
    selectedMadrasahs: '["Al-Noor Islamic Academy", "Darul Uloom Institute"]',
    additionalInfo: 'Test submission',
    dataConsent: 'true',
    children: '[{"firstName":"Ahmed","lastName":"Doe","age":"8","schoolYear":"Grade 3","notes":"Loves reading"}]'
  };
  
  const result = processFormData(testData);
  console.log('Test result:', result);
  
  return result;
}
