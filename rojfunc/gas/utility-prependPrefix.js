/**
 * Prepends a prefix to a filename.
 *
 * @param {string} originalFileName The original name of the file.
 * @param {string} prefix The prefix to add (e.g., "XXX").
 * @return {string} The new filename in the format "PREFIX-originalFileName".
 */
function prependPrefix(originalFileName, prefix) {
  return `${prefix}-${originalFileName}`;
}
