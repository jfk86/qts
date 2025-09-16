/**
 * MyMaktab Multi-Madrasah Waitlist Service - Secure API Gateway
 * Handles all data operations securely without exposing sensitive information
 */

// Configuration - Update these values for your setup
const CONFIG = {
  WAITLIST_SPREADSHEET_ID: 'YOUR_WAITLIST_SPREADSHEET_ID_HERE',
  MOSQUE_SPREADSHEET_ID: 'YOUR_MOSQUE_SPREADSHEET_ID_HERE',
  WAITLIST_SHEET_NAME: 'Waitlist_Submissions',
  MOSQUE_SHEET_NAME: 'Mosque_Directory',
  EMAIL_NOTIFICATIONS: true,
  ADMIN_EMAIL: 'admin@mymaktab.com'
};

/**
 * Main entry point for all requests
 */
function doGet(e) {
  const action = e.parameter.action;

  try {
    switch(action) {
      case 'getMosques':
        return getMosqueDirectory(e);
      case 'test':
        return ContentService
          .createTextOutput('API is working!')
          .setMimeType(ContentService.MimeType.TEXT);
      default:
        return ContentService
          .createTextOutput(JSON.stringify({ error: 'Invalid action' }))
          .setMimeType(ContentService.MimeType.JSON);
    }
  } catch (error) {
    console.error('Error in doGet:', error);
    return ContentService
      .createTextOutput(JSON.stringify({ error: 'Server error' }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle POST requests (form submissions)
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;

    switch(action) {
      case 'submitWaitlist':
        return submitWaitlistForm(data);
      default:
        return ContentService
          .createTextOutput(JSON.stringify({ success: false, message: 'Invalid action' }))
          .setMimeType(ContentService.MimeType.JSON);
    }
  } catch (error) {
    console.error('Error in doPost:', error);
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, message: 'Server error' }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Get mosque directory data securely
 */
function getMosqueDirectory(e) {
  try {
    const search = e.parameter.search || '';
    const type = e.parameter.type || '';
    const city = e.parameter.city || '';

    const spreadsheet = SpreadsheetApp.openById(CONFIG.MOSQUE_SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(CONFIG.MOSQUE_SHEET_NAME);

    if (!sheet) {
      throw new Error('Mosque directory sheet not found');
    }

    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const rows = data.slice(1);

    // Convert to objects
    let mosques = rows.map(row => {
      const mosque = {};
      headers.forEach((header, index) => {
        mosque[header.toLowerCase().replace(/\s+/g, '_')] = row[index];
      });
      return mosque;
    });

    // Apply filters
    if (search) {
      const searchLower = search.toLowerCase();
      mosques = mosques.filter(mosque => 
        mosque.name?.toLowerCase().includes(searchLower) ||
        mosque.address?.toLowerCase().includes(searchLower) ||
        mosque.city?.toLowerCase().includes(searchLower) ||
        mosque.services?.toLowerCase().includes(searchLower)
      );
    }

    if (type && type !== 'all') {
      mosques = mosques.filter(mosque => 
        mosque.type?.toLowerCase() === type.toLowerCase()
      );
    }

    if (city && city !== 'all') {
      mosques = mosques.filter(mosque => 
        mosque.city?.toLowerCase() === city.toLowerCase()
      );
    }

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, data: mosques }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    console.error('Error getting mosque directory:', error);
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: 'Failed to load mosque directory' }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Submit waitlist form securely
 */
function submitWaitlistForm(data) {
  try {
    // Validate required fields
    if (!validateWaitlistData(data)) {
      return ContentService
        .createTextOutput(JSON.stringify({ success: false, message: 'Invalid form data' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Get or create spreadsheet
    const sheet = getOrCreateWaitlistSheet();

    // Save data
    const result = saveWaitlistToSheet(sheet, data);

    // Send notifications if enabled
    if (CONFIG.EMAIL_NOTIFICATIONS && result.success) {
      sendWaitlistNotifications(data);
    }

    return ContentService
      .createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    console.error('Error submitting waitlist:', error);
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, message: 'Server error occurred' }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Validate waitlist form data
 */
function validateWaitlistData(data) {
  const required = ['parentName', 'email', 'phone', 'children'];

  for (let field of required) {
    if (!data[field]) {
      console.error(`Missing required field: ${field}`);
      return false;
    }
  }

  // Validate children data
  if (!Array.isArray(data.children) || data.children.length === 0) {
    console.error('No children data provided');
    return false;
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    console.error('Invalid email format');
    return false;
  }

  return true;
}

/**
 * Get or create the waitlist spreadsheet and sheet
 */
function getOrCreateWaitlistSheet() {
  try {
    const spreadsheet = SpreadsheetApp.openById(CONFIG.WAITLIST_SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName(CONFIG.WAITLIST_SHEET_NAME);

    if (!sheet) {
      sheet = spreadsheet.insertSheet(CONFIG.WAITLIST_SHEET_NAME);
      setupWaitlistHeaders(sheet);
    }

    return sheet;

  } catch (error) {
    console.error('Error accessing waitlist spreadsheet:', error);
    throw new Error('Could not access waitlist spreadsheet');
  }
}

/**
 * Setup waitlist sheet headers
 */
function setupWaitlistHeaders(sheet) {
  const headers = [
    'Timestamp',
    'Parent Name',
    'Email',
    'Phone',
    'Address',
    'Emergency Contact',
    'Emergency Phone',
    'Preferred Madrasahs',
    'Children Count',
    'Children Details',
    'Special Requirements',
    'Data Consent',
    'Status',
    'Priority Score'
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  sheet.setFrozenRows(1);
}

/**
 * Save waitlist data to sheet
 */
function saveWaitlistToSheet(sheet, data) {
  try {
    const timestamp = new Date();

    // Format children data
    const childrenDetails = data.children.map(child => 
      `${child.name} (Age: ${child.age}, School Year: ${child.schoolYear}${child.notes ? ', Notes: ' + child.notes : ''})`
    ).join('; ');

    // Calculate priority score
    const priorityScore = calculatePriorityScore(data.children);

    const rowData = [
      timestamp,
      data.parentName,
      data.email,
      data.phone,
      data.address || '',
      data.emergencyContact || '',
      data.emergencyPhone || '',
      Array.isArray(data.preferredMadrasahs) ? data.preferredMadrasahs.join(', ') : data.preferredMadrasahs,
      data.children.length,
      childrenDetails,
      data.specialRequirements || '',
      data.dataConsent ? 'Yes' : 'No',
      'Pending',
      priorityScore
    ];

    sheet.appendRow(rowData);

    return { 
      success: true, 
      message: 'Application submitted successfully',
      timestamp: timestamp,
      priorityScore: priorityScore
    };

  } catch (error) {
    console.error('Error saving waitlist to sheet:', error);
    return { success: false, message: 'Failed to save application' };
  }
}

/**
 * Calculate priority score based on children ages and other factors
 */
function calculatePriorityScore(children) {
  let score = 0;

  children.forEach(child => {
    const age = parseInt(child.age) || 0;
    // Younger children get higher priority (inverse scoring)
    score += Math.max(0, 18 - age) * 10;

    // Add points for specific school years
    const yearPoints = {
      'reception': 50,
      'year1': 45,
      'year2': 40,
      'year3': 35,
      'year4': 30,
      'year5': 25,
      'year6': 20
    };

    score += yearPoints[child.schoolYear] || 0;
  });

  // Add random component for tie-breaking
  score += Math.floor(Math.random() * 100);

  return score;
}

/**
 * Send email notifications for waitlist
 */
function sendWaitlistNotifications(data) {
  try {
    // Send confirmation to parent
    sendParentConfirmation(data);

    // Send notification to admin
    sendAdminNotification(data);

  } catch (error) {
    console.error('Error sending notifications:', error);
  }
}

/**
 * Send confirmation email to parent
 */
function sendParentConfirmation(data) {
  const subject = 'MyMaktab Waitlist - Application Received';
  const body = `
Dear ${data.parentName},

Thank you for submitting your waitlist application to MyMaktab.

Application Details:
- Parent: ${data.parentName}
- Email: ${data.email}
- Phone: ${data.phone}
- Children: ${data.children.length}
- Preferred Madrasahs: ${Array.isArray(data.preferredMadrasahs) ? data.preferredMadrasahs.join(', ') : data.preferredMadrasahs}

Children Details:
${data.children.map(child => `- ${child.name} (Age: ${child.age}, School Year: ${child.schoolYear})`).join('\n')}

We will review your application and contact you when places become available at your preferred madrasahs.

Best regards,
MyMaktab Team

---
This is an automated message. Please do not reply to this email.
  `;

  MailApp.sendEmail(data.email, subject, body);
}

/**
 * Send notification to admin
 */
function sendAdminNotification(data) {
  const subject = 'New Waitlist Application - MyMaktab';
  const body = `
New waitlist application received:

Parent: ${data.parentName}
Email: ${data.email}
Phone: ${data.phone}
Children: ${data.children.length}
Preferred Madrasahs: ${Array.isArray(data.preferredMadrasahs) ? data.preferredMadrasahs.join(', ') : data.preferredMadrasahs}

Children Details:
${data.children.map(child => `- ${child.name} (Age: ${child.age}, School Year: ${child.schoolYear})`).join('\n')}

Please review in the admin dashboard.

View Application: [Link to your admin interface]
  `;

  MailApp.sendEmail(CONFIG.ADMIN_EMAIL, subject, body);
}

/**
 * Initialize mosque directory sheet with sample data
 */
function initializeMosqueDirectory() {
  try {
    const spreadsheet = SpreadsheetApp.openById(CONFIG.MOSQUE_SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName(CONFIG.MOSQUE_SHEET_NAME);

    if (!sheet) {
      sheet = spreadsheet.insertSheet(CONFIG.MOSQUE_SHEET_NAME);
    }

    // Clear existing data
    sheet.clear();

    // Set headers
    const headers = [
      'Name', 'Type', 'Address', 'City', 'Phone', 'Email', 'Website',
      'Services', 'Imam', 'Established', 'Capacity'
    ];

    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');

    // Add sample data
    const sampleData = [
      ['Al-Noor Islamic Center', 'Mosque', '123 Main Street', 'London', '020-1234-5678', 'info@alnoor.org', 'www.alnoor.org', 'Daily prayers, Friday prayers, Islamic education, Community events', 'Imam Abdullah', '1995', '500'],
      ['Baitul Mukarram Mosque', 'Mosque', '456 Oak Avenue', 'Birmingham', '0121-234-5678', 'contact@baitulmukarram.org', 'www.baitulmukarram.org', 'Daily prayers, Friday prayers, Quran classes, Youth programs', 'Imam Muhammad', '1988', '300'],
      ['Green Lane Masjid', 'Mosque', '789 Green Lane', 'Birmingham', '0121-345-6789', 'admin@greenlane.org', 'www.greenlane.org', 'Daily prayers, Islamic school, Community center, Halal food bank', 'Imam Yusuf', '1979', '800'],
      ['East London Mosque', 'Mosque', '82-92 Whitechapel Road', 'London', '020-7650-3000', 'info@eastlondonmosque.org.uk', 'www.eastlondonmosque.org.uk', 'Daily prayers, Education center, Community services, Interfaith dialogue', 'Imam Hassan', '1985', '1500'],
      ['Manchester Islamic Centre', 'Islamic Centre', '335 Dickenson Road', 'Manchester', '0161-248-4248', 'info@mic-uk.org', 'www.mic-uk.org', 'Daily prayers, Educational programs, Social services, Cultural events', 'Imam Omar', '1967', '600']
    ];

    sheet.getRange(2, 1, sampleData.length, headers.length).setValues(sampleData);

    console.log('Mosque directory initialized successfully');

  } catch (error) {
    console.error('Error initializing mosque directory:', error);
  }
}

/**
 * Test functions for development
 */
function testWaitlistSubmission() {
  const testData = {
    action: 'submitWaitlist',
    parentName: 'Test Parent',
    email: 'test@example.com',
    phone: '1234567890',
    address: '123 Test Street',
    emergencyContact: 'Emergency Contact',
    emergencyPhone: '0987654321',
    preferredMadrasahs: ['Al-Noor Islamic Center', 'Baitul Mukarram Mosque'],
    children: [
      { name: 'Child 1', age: '8', schoolYear: 'year3', notes: 'Loves reading' },
      { name: 'Child 2', age: '10', schoolYear: 'year5', notes: '' }
    ],
    specialRequirements: 'No special requirements',
    dataConsent: true
  };

  const result = submitWaitlistForm(testData);
  console.log('Test result:', result.getContent());
}

function testMosqueDirectory() {
  const mockEvent = {
    parameter: {
      action: 'getMosques',
      search: '',
      type: 'all',
      city: 'all'
    }
  };

  const result = getMosqueDirectory(mockEvent);
  console.log('Mosque directory test:', result.getContent());
}
