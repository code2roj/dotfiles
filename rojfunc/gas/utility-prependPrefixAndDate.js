/**
 * Prepends a prefix and the current date (YYYY-MM-DD) to a filename.
 *
 * @param {string} originalFileName The original name of the file.
 * @param {string} prefix The prefix to add before the date (e.g., "XXX").
 * @return {string} The new filename in the format "PREFIX-YYYY-MM-DD-originalFileName".
 */
function prependPrefixAndDate(originalFileName, prefix) {
  const today = new Date();
  // Get the script's timezone to format the date correctly
  const timeZone = Session.getScriptTimeZone(); 
  const formattedDate = Utilities.formatDate(today, timeZone, 'yyyy-MM-dd');
  
  const newFileName = `${prefix}-${formattedDate}-${originalFileName}`;
  return newFileName;
}