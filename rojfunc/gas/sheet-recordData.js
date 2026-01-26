/**
 * Appends a single row to a specific spreadsheet tab based on header matching.
 * * @param {string} spreadsheetId - The ID of the Google Sheet.
 * @param {string} tabName - The name of the sheet tab (e.g., "METADATA").
 * @param {Object} dataObject - Key-value pairs where keys match the column headers.
 */
function appendDataToSheet(spreadsheetId, tabName, dataObject) {
  try {
    // 1. Open the spreadsheet and specific tab
    const ss = SpreadsheetApp.openById(spreadsheetId);
    const sheet = ss.getSheetByName(tabName);
    
    if (!sheet) {
      throw new Error(`Sheet tab "${tabName}" not found in spreadsheet.`);
    }

    // 2. Retrieve headers from the first row
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

    // 3. Map the dataObject to the header order
    // This ensures data goes into the correct column regardless of object property order.
    const rowToAppend = headers.map(header => {
      return dataObject.hasOwnProperty(header) ? dataObject[header] : "";
    });

    // 4. Append the row
    sheet.appendRow(rowToAppend);
    
    console.log(`Successfully appended row to ${tabName}.`);
    return true;

  } catch (e) {
    console.error(`Failed to append row: ${e.message}`);
    return false;
  }
}