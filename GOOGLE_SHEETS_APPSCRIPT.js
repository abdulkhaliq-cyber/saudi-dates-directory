/**
 * DatesSouq.com - Automated Data Cleaning Script
 * This script cleans Outscraper Google Maps data for import to DatesSouq.com
 * 
 * HOW TO USE:
 * 1. Open your Google Sheet with Outscraper data
 * 2. Go to Extensions → Apps Script
 * 3. Delete any existing code
 * 4. Paste this entire script
 * 5. Click Save (disk icon)
 * 6. Refresh your Google Sheet
 * 7. You'll see a new menu: "DatesSouq Cleaner"
 * 8. Click: DatesSouq Cleaner → Clean Data
 * 9. Wait for completion message
 */

// ============================================
// CONFIGURATION - Adjust these if needed
// ============================================

// Keywords that indicate NON-dates businesses (to be deleted)
const NON_DATES_KEYWORDS = [
  'hospital', 'مستشفى', 'clinic', 'عيادة',
  'pharmacy', 'صيدلية', 'bank', 'بنك',
  'hotel', 'فندق', 'school', 'مدرسة',
  'restaurant', 'مطعم', 'coffee', 'قهوة',
  'university', 'جامعة', 'gas station', 'محطة وقود',
  'mosque', 'مسجد', 'mall', 'مول'
];

// Invalid categories (will be deleted)
const INVALID_CATEGORIES = [
  'hospital', 'المستشفى الحكومي', 'clinic',
  'pharmacy', 'school', 'bank', 'hotel',
  'restaurant', 'attractions', 'معالم سياحية'
];

// Standard categories (will standardize to these)
const CATEGORY_MAP = {
  // Arabic variations
  'متجر': 'Dates Shop',
  'محل': 'Dates Shop',
  'معرض': 'Dates Shop',
  'مصنع': 'Dates Manufacturer',
  'مزرعة': 'Dates Farm',
  'تاجر جملة': 'Dates Wholesaler',
  'مورد': 'Dates Supplier',
  
  // English variations
  'store': 'Dates Shop',
  'shop': 'Dates Shop',
  'factory': 'Dates Manufacturer',
  'manufacturer': 'Dates Manufacturer',
  'farm': 'Dates Farm',
  'wholesaler': 'Dates Wholesaler',
  'wholesale': 'Dates Wholesaler',
  'supplier': 'Dates Supplier',
  'exporter': 'Dates Supplier',
  
  // Default
  '': 'Dates Supplier'
};

// Fields to keep (in this order)
const REQUIRED_FIELDS = [
  'Business Name',
  'Category',
  'City',
  'Phone',
  'Website',
  'Rating',
  'Maps URL',
  'Address',
  'Latitude',
  'Longitude'
];

// ============================================
// MAIN FUNCTIONS
// ============================================

/**
 * Creates custom menu in Google Sheets
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('🌴 DatesSouq Cleaner')
    .addItem('✨ Clean Data', 'cleanAllData')
    .addSeparator()
    .addItem('📊 Show Statistics', 'showStatistics')
    .addItem('❓ Help', 'showHelp')
    .addToUi();
}

/**
 * Main cleaning function - runs all cleaning steps
 */
function cleanAllData() {
  const ui = SpreadsheetApp.getUi();
  const sheet = SpreadsheetApp.getActiveSheet();
  
  // Confirmation dialog
  const response = ui.alert(
    '🌴 DatesSouq Data Cleaner',
    'This will clean your data:\n\n' +
    '✓ Remove non-dates businesses\n' +
    '✓ Standardize categories\n' +
    '✓ Remove duplicates\n' +
    '✓ Remove invalid rows\n' +
    '✓ Keep only required fields\n\n' +
    'Continue?',
    ui.ButtonSet.YES_NO
  );
  
  if (response !== ui.Button.YES) {
    return;
  }
  
  ui.alert('⏳ Cleaning started...\nThis may take 1-2 minutes.\nDon\'t close the sheet!');
  
  try {
    // Get initial count
    const initialRows = sheet.getLastRow() - 1;
    
    // Run cleaning steps
    Logger.log('Step 1: Removing non-dates businesses...');
    removeNonDateBusinesses(sheet);
    
    Logger.log('Step 2: Standardizing categories...');
    standardizeCategories(sheet);
    
    Logger.log('Step 3: Removing invalid rows...');
    removeInvalidRows(sheet);
    
    Logger.log('Step 4: Removing duplicates...');
    removeDuplicates(sheet);
    
    Logger.log('Step 5: Organizing columns...');
    organizeColumns(sheet);
    
    Logger.log('Step 6: Cleaning up formatting...');
    cleanupFormatting(sheet);
    
    // Get final count
    const finalRows = sheet.getLastRow() - 1;
    const removed = initialRows - finalRows;
    
    // Success message
    ui.alert(
      '✅ Cleaning Complete!',
      `Started with: ${initialRows} rows\n` +
      `Removed: ${removed} invalid rows\n` +
      `Final count: ${finalRows} clean listings\n\n` +
      `Ready to import to DatesSouq.com!`,
      ui.ButtonSet.OK
    );
    
  } catch (error) {
    ui.alert('❌ Error', 'Something went wrong:\n' + error.toString(), ui.ButtonSet.OK);
    Logger.log('Error: ' + error.toString());
  }
}

/**
 * Step 1: Remove non-dates businesses
 */
function removeNonDateBusinesses(sheet) {
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const nameIndex = headers.indexOf('Business Name') >= 0 ? headers.indexOf('Business Name') : 0;
  const categoryIndex = headers.indexOf('Category') >= 0 ? headers.indexOf('Category') : 1;
  
  // Mark rows to delete (start from bottom to avoid index shifting)
  for (let i = data.length - 1; i > 0; i--) {
    const name = String(data[i][nameIndex]).toLowerCase();
    const category = String(data[i][categoryIndex]).toLowerCase();
    
    // Check if business name or category contains non-dates keywords
    let isNonDates = false;
    
    for (const keyword of NON_DATES_KEYWORDS) {
      if (name.includes(keyword.toLowerCase()) || category.includes(keyword.toLowerCase())) {
        isNonDates = true;
        break;
      }
    }
    
    // Check if category is in invalid list
    for (const invalid of INVALID_CATEGORIES) {
      if (category === invalid.toLowerCase()) {
        isNonDates = true;
        break;
      }
    }
    
    // Delete row if non-dates
    if (isNonDates) {
      sheet.deleteRow(i + 1);
      Logger.log(`Deleted non-dates business: ${data[i][nameIndex]}`);
    }
  }
}

/**
 * Step 2: Standardize categories
 */
function standardizeCategories(sheet) {
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const categoryIndex = headers.indexOf('Category') >= 0 ? headers.indexOf('Category') : 1;
  
  if (categoryIndex < 0) return;
  
  for (let i = 1; i < data.length; i++) {
    let category = String(data[i][categoryIndex]).trim();
    let standardized = 'Dates Supplier'; // Default
    
    // Check category map for matches
    const lowerCategory = category.toLowerCase();
    for (const [key, value] of Object.entries(CATEGORY_MAP)) {
      if (lowerCategory.includes(key.toLowerCase())) {
        standardized = value;
        break;
      }
    }
    
    // Update cell if changed
    if (category !== standardized) {
      sheet.getRange(i + 1, categoryIndex + 1).setValue(standardized);
    }
  }
}

/**
 * Step 3: Remove rows with empty business names or cities
 */
function removeInvalidRows(sheet) {
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const nameIndex = headers.indexOf('Business Name') >= 0 ? headers.indexOf('Business Name') : 0;
  const cityIndex = headers.indexOf('City') >= 0 ? headers.indexOf('City') : 2;
  
  // Delete from bottom to top to avoid index issues
  for (let i = data.length - 1; i > 0; i--) {
    const name = String(data[i][nameIndex]).trim();
    const city = String(data[i][cityIndex]).trim();
    
    // Delete if name is empty OR city is empty
    if (!name || name === '' || name === 'null' || !city || city === '' || city === 'null') {
      sheet.deleteRow(i + 1);
      Logger.log(`Deleted invalid row: ${name || '(empty name)'}`);
    }
  }
}

/**
 * Step 4: Remove duplicate business names
 */
function removeDuplicates(sheet) {
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const nameIndex = headers.indexOf('Business Name') >= 0 ? headers.indexOf('Business Name') : 0;
  
  const seen = new Set();
  
  // Delete duplicates from bottom to top
  for (let i = data.length - 1; i > 0; i--) {
    const name = String(data[i][nameIndex]).trim().toLowerCase();
    
    if (seen.has(name)) {
      sheet.deleteRow(i + 1);
      Logger.log(`Deleted duplicate: ${data[i][nameIndex]}`);
    } else {
      seen.add(name);
    }
  }
}

/**
 * Step 5: Organize columns to match required fields
 */
function organizeColumns(sheet) {
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  
  // Create new organized data
  const organizedData = [REQUIRED_FIELDS]; // New headers
  
  for (let i = 1; i < data.length; i++) {
    const row = [];
    
    for (const field of REQUIRED_FIELDS) {
      const index = headers.indexOf(field);
      if (index >= 0) {
        row.push(data[i][index]);
      } else {
        row.push(''); // Empty if field doesn't exist
      }
    }
    
    organizedData.push(row);
  }
  
  // Clear sheet and write organized data
  sheet.clear();
  sheet.getRange(1, 1, organizedData.length, REQUIRED_FIELDS.length).setValues(organizedData);
}

/**
 * Step 6: Format and clean up
 */
function cleanupFormatting(sheet) {
  const lastRow = sheet.getLastRow();
  const lastCol = sheet.getLastColumn();
  
  // Format header row
  const headerRange = sheet.getRange(1, 1, 1, lastCol);
  headerRange.setBackground('#3B7A57');
  headerRange.setFontColor('#FFFFFF');
  headerRange.setFontWeight('bold');
  headerRange.setHorizontalAlignment('center');
  
  // Auto-resize columns
  for (let i = 1; i <= lastCol; i++) {
    sheet.autoResizeColumn(i);
  }
  
  // Freeze header row
  sheet.setFrozenRows(1);
  
  // Add borders
  sheet.getRange(1, 1, lastRow, lastCol).setBorder(
    true, true, true, true, true, true,
    '#E6D4B0', SpreadsheetApp.BorderStyle.SOLID
  );
}

/**
 * Show statistics about current data
 */
function showStatistics() {
  const ui = SpreadsheetApp.getUi();
  const sheet = SpreadsheetApp.getActiveSheet();
  const data = sheet.getDataRange().getValues();
  
  if (data.length <= 1) {
    ui.alert('No data found!');
    return;
  }
  
  const headers = data[0];
  const nameIndex = headers.indexOf('Business Name') >= 0 ? headers.indexOf('Business Name') : 0;
  const categoryIndex = headers.indexOf('Category') >= 0 ? headers.indexOf('Category') : 1;
  const cityIndex = headers.indexOf('City') >= 0 ? headers.indexOf('City') : 2;
  
  // Count statistics
  let total = data.length - 1;
  let withPhone = 0;
  let withRating = 0;
  let emptyNames = 0;
  let emptyCities = 0;
  const categories = {};
  const cities = {};
  
  for (let i = 1; i < data.length; i++) {
    const name = String(data[i][nameIndex]).trim();
    const category = String(data[i][categoryIndex]).trim();
    const city = String(data[i][cityIndex]).trim();
    
    if (!name) emptyNames++;
    if (!city) emptyCities++;
    
    if (data[i][3]) withPhone++; // Phone column
    if (data[i][5]) withRating++; // Rating column
    
    // Count categories
    if (category) {
      categories[category] = (categories[category] || 0) + 1;
    }
    
    // Count cities
    if (city) {
      cities[city] = (cities[city] || 0) + 1;
    }
  }
  
  // Format category breakdown
  let categoryBreakdown = '';
  for (const [cat, count] of Object.entries(categories)) {
    categoryBreakdown += `${cat}: ${count}\n`;
  }
  
  // Show statistics
  ui.alert(
    '📊 Data Statistics',
    `Total Rows: ${total}\n\n` +
    `✅ With Phone: ${withPhone}\n` +
    `✅ With Rating: ${withRating}\n` +
    `❌ Empty Names: ${emptyNames}\n` +
    `❌ Empty Cities: ${emptyCities}\n\n` +
    `📍 Unique Cities: ${Object.keys(cities).length}\n` +
    `🏷️ Categories:\n${categoryBreakdown}`,
    ui.ButtonSet.OK
  );
}

/**
 * Show help information
 */
function showHelp() {
  const ui = SpreadsheetApp.getUi();
  
  ui.alert(
    '❓ How to Use DatesSouq Cleaner',
    '1. Get data from Outscraper\n' +
    '2. Paste into this Google Sheet\n' +
    '3. Click: DatesSouq Cleaner → Clean Data\n' +
    '4. Wait for completion (1-2 min)\n' +
    '5. Review cleaned data\n' +
    '6. Use Make.com to import to DatesSouq.com\n\n' +
    'What it does:\n' +
    '✓ Removes hospitals, clinics, banks\n' +
    '✓ Standardizes categories\n' +
    '✓ Removes duplicates\n' +
    '✓ Removes rows with empty names/cities\n' +
    '✓ Organizes columns properly\n\n' +
    'Questions? Check: GOOGLE_SHEETS_CLEANUP_GUIDE.md',
    ui.ButtonSet.OK
  );
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Check if a string contains dates-related keywords
 */
function isDatesRelated(text) {
  const datesKeywords = [
    'date', 'dates', 'تمر', 'تمور',
    'ajwa', 'عجوة', 'sukkari', 'سكري',
    'medjool', 'مجهول', 'safawi', 'صفوي'
  ];
  
  const lowerText = String(text).toLowerCase();
  
  for (const keyword of datesKeywords) {
    if (lowerText.includes(keyword.toLowerCase())) {
      return true;
    }
  }
  
  return false;
}

/**
 * Log to sheet (for debugging)
 */
function logToSheet(message) {
  Logger.log(message);
}

