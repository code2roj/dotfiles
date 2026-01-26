/**
 * Updates the value of a specific cell in a given spreadsheet and tab.
 * * @param {string} spreadsheetId - The ID of the Google Sheet.
 * @param {string} tabName - The name of the sheet tab.
 * @param {string} cellName - The A1 notation of the cell (e.g., "B2", "A10").
 * @param {any} value - The new value to place in the cell.
 */
function updateCell(spreadsheetId, tabName, cellName, value) {
  try {
    const ss = SpreadsheetApp.openById(spreadsheetId);
    const sheet = ss.getSheetByName(tabName);

    if (!sheet) {
      throw new Error(`Sheet tab "${tabName}" not found.`);
    }

    // Access the specific cell and set the new value
    sheet.getRange(cellName).setValue(value);
    
    console.log(`Cell ${cellName} in ${tabName} updated to: ${value}`);
    return true;

  } catch (e) {
    console.error(`Failed to update cell: ${e.message}`);
    return false;
  }
}
