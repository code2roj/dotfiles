/**
 * Gets the ID of a Google Drive file.
 *
 * @param {File} file The Google Drive File object.
 * @return {string} The ID of the file.
 */
function get_file_id(file) {
  return file.getId();
}
