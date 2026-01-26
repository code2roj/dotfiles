
/**
 * @OnlyCurrentDoc
 * The above comment directs Apps Script to limit the scope of file access for this script
 * to only the current document (the Form). It's a good practice for security.
 */

// --- Configuration ---
// !!! IMPORTANT: Replace these placeholder values !!!

// 1. ID of the target folder in your Shared Drive.
//    Open the folder in Google Drive, the ID is the last part of the URL.
//    e.g., drive.google.com/drive/folders/THIS_IS_THE_ID
const SHARED_DRIVE_FOLDER_ID = '1EGEFWW3-iIUJ84d6MVMHSfkcWsP_16OW'; // Looks correct based on your link
// 2. Find the exact title of the question in your form that asks for the file upload.
const FILE_UPLOAD_QUESTION_TITLE = 'فایلی هەواڵەکە هەڵبژێرە';
// 3. Find the exact title of the CHECKBOX question listing the destinations.
const CHECKBOX_QUESTION_TITLE = 'ئەوگروپانەی کە بڕیارە لە سەر ئەم هەواڵە کار بکەن هەڵبژێرە'; // !!! REPLACE with your actual checkbox question title !!!

// 4. Map the checkbox option text to an object containing the destination Folder ID and the specific Prefix for that destination.
//    !!! REPLACE folder IDs, adjust prefixes, and add space names (spaces/AAAA...) as needed !!!
const DESTINATION_MAP = {
  'بەڕێوبەرایەتی':       { folderId: '1bGIXvKp58V3XX_4p2BkCiJQi3dZeTrf3', prefix: 'MANAGEMENT', spaceName: 'spaces/AAAALb9Msvk' }, // Replace with actual space names if needed
  'کوردی سۆرانی':      { folderId: '1FIfJunza6612DRPGoVtwaXB-8y7rzeGP', prefix: 'SORANI',     spaceName: 'spaces/AAAA0xVOVKg' },
  'کوردی کورمانجی':     { folderId: '1HyjEExhvau_GVOrWiwL27qDpAVeJ0ntZ', prefix: 'KURMANCI',   spaceName: 'spaces/AAQA-APn9wk' },
  'ئێنگلیسی':          { folderId: '1CgZ6DXbhTmw147JY-4tq_w3aX1i8miQm', prefix: 'ENGLISH',    spaceName: 'spaces/AAAA2P8V28M' },
  'گروپی تایبەت بە تێست': { folderId: '1Xav22yKZUGaT5tehc6pGtLqErHE95Aqf',        prefix: 'TEST',       spaceName: 'spaces/AAAAKDKGYIo' } // Replace folder ID & space name if needed
  // Add more mappings as needed: 'Checkbox Option Text': { folderId: 'Folder_ID', prefix: 'PREFIX', spaceName: 'spaces/...' }
};

// 5. The prefix for the *initial* rename (before moving). Keep this if you still want the XXX-Date-Name format initially.
const INITIAL_PREFIX = "NEWS"; 

// --- End Configuration ---

/**
 * Trigger function that runs automatically when the form is submitted.
 * Moves the uploaded file to a specified Shared Drive folder and logs its ID.
 *
 * @param {Object} e The event object passed to the function by the trigger.
 */
function onFormSubmit(e) {
  try {
    if (!SHARED_DRIVE_FOLDER_ID || SHARED_DRIVE_FOLDER_ID === 'YOUR_SHARED_DRIVE_FOLDER_ID_HERE') { // Check against placeholder
      throw new Error("SHARED_DRIVE_FOLDER_ID is not set. Please edit the script and add the correct folder ID.");
    }
    if (!FILE_UPLOAD_QUESTION_TITLE || FILE_UPLOAD_QUESTION_TITLE === 'Your File Upload Question Title Here') { // Check against placeholder
       throw new Error("FILE_UPLOAD_QUESTION_TITLE is not set. Please edit the script and add the correct question title.");
    }
    // Add checks for the new configuration constants
    if (!CHECKBOX_QUESTION_TITLE || CHECKBOX_QUESTION_TITLE === 'کام بەش پێویستی بەم هەواڵەیە؟') { // Check against placeholder or default
      throw new Error("CHECKBOX_QUESTION_TITLE is not set. Please edit the script and add the correct question title.");
    }
    if (Object.keys(DESTINATION_MAP).length === 0 || !DESTINATION_MAP['بەڕێوبەرایەتی']?.folderId || !DESTINATION_MAP['بەڕێوبەرایەتی']?.spaceName || DESTINATION_MAP['گروپی تایبەت بە تێست']?.folderId === 'FOLDER_ID_FOR_TEST_GROUP') { // Basic check if map seems unconfigured
      Logger.log("Warning: DESTINATION_MAP might not be configured correctly. Please check the folder IDs.");
    }

    const formResponse = e.response;
    const itemResponses = formResponse.getItemResponses();
    Logger.log(`Attempting to get folder with ID: ${SHARED_DRIVE_FOLDER_ID}`); // Log before the call
    const destinationFolder = DriveApp.getFolderById(SHARED_DRIVE_FOLDER_ID); // Get destination folder object
    Logger.log(`Successfully retrieved folder: ${destinationFolder.getName()}`); // Log after the call

    let copiedFilesInfo = {}; // Object to store { DestinationName: CopiedFileID }
    let movedFileIds = []; // To store the IDs of the files after moving

    let fileToCopy = null; // Variable to hold the file object after moving/renaming
    Logger.log('Processing form submission. Checking item responses...');
    for (const itemResponse of itemResponses) {
        const currentQuestionTitle = itemResponse.getItem().getTitle();
        Logger.log(`Checking question: "${currentQuestionTitle}"`); // Log title being checked
        if (itemResponse.getItem().getTitle() === FILE_UPLOAD_QUESTION_TITLE) {
          Logger.log(`Found matching question: "${FILE_UPLOAD_QUESTION_TITLE}"`); // Confirm match
          const fileIds = itemResponse.getResponse(); // File upload response is an array of file IDs
  
          // Since we know there's only one file allowed per submission for this question:
          if (fileIds && fileIds.length > 0) {
            const fileId = fileIds[0]; // Get the first (and only) file ID
            const file = DriveApp.getFileById(fileId);
            const originalName = file.getName(); // Get the original name
            const newName = prependPrefixAndDate(originalName, INITIAL_PREFIX); // Use the initial prefix constant
            file.setName(newName); // Rename the file in Drive
            file.moveTo(destinationFolder); // Move the file
            fileToCopy = file; // Store the file object for later copying
        Logger.log(`Renamed to "${newName}" and moved file (ID: ${fileId}) to folder "${destinationFolder.getName()}".`);
        movedFileIds.push(fileId); // Store the ID
        }
        // Don't break here yet, we need to find the checkbox response too
        }
    }

    // Now, find the checkbox response and process the copies
    if (fileToCopy) { // Only proceed if a file was successfully moved
      Logger.log('Checking for checkbox responses...');
      for (const itemResponse of itemResponses) {
        if (itemResponse.getItem().getTitle() === CHECKBOX_QUESTION_TITLE) {
          const selectedDestinations = itemResponse.getResponse(); // This is an array of checked options
          if (selectedDestinations && selectedDestinations.length > 0) {
            Logger.log(`User selected destinations: ${selectedDestinations.join(', ')}`);
            for (const destinationName of selectedDestinations) {
              const destinationInfo = DESTINATION_MAP[destinationName]; // Get the object {folderId, prefix}
              // Check if we found info and if the folderId looks valid (not a placeholder)
              if (destinationInfo && destinationInfo.folderId && destinationInfo.folderId !== 'FOLDER_ID_FOR_TEST_GROUP' && destinationInfo.spaceName && destinationInfo.spaceName !== 'spaces/AAAAKDKGYIo') { // Check spaceName now
                // Pass the specific folderId and prefix from the map
                const copiedId = copyAndPrefixFile(fileToCopy, destinationInfo.folderId, destinationInfo.prefix); 
                if (copiedId) { // If copying was successful and returned an ID
                  copiedFilesInfo[destinationName] = copiedId; // Store the ID with the destination name as the key
                  
                  // --- Send message to chat ---
                  // Get the copied file object to retrieve its URL
                  const copiedFile = DriveApp.getFileById(copiedId);
                  const fileUrl = copiedFile.getUrl();
                  const fileName = copiedFile.getName(); // Get the final name (e.g., SORANI-NEWS-Date-OriginalName)
                  
                  // Construct the formatted message for Google Chat (uses simple markdown)
                  const message = `*هەواڵی نوێ زیادکرا بۆ: ${destinationName}*\n\n📝 *ناوی فایل:* ${fileName}\n\n🔗 *لینکی فایل:* ${fileUrl}\n\n---\nسیستەمی ئۆتۆماتیکی`; // Customize further if needed
                  const chatResult = sendMessageToChat(message, destinationInfo.spaceName); // Pass spaceName now
                  Logger.log(`Chat notification result for ${destinationName}: ${JSON.stringify(chatResult)}`);
                  // --- End send message ---
                }
              } else {
                Logger.log(`Warning: No valid folder ID found in DESTINATION_MAP for checkbox option: "${destinationName}" or it's still a placeholder.`);
              }
            }
          } else {
            Logger.log('No destinations selected in the checkbox question.');
          }
          break; // Found the checkbox question, no need to check further
        }
      }
    } else {
      Logger.log('Skipping copy process because no file was moved initially.');
    }

    Logger.log('Original file moved ID: ' + (movedFileIds.length > 0 ? movedFileIds[0] : 'None'));
    Logger.log('Copied file IDs by destination: ' + JSON.stringify(copiedFilesInfo)); // Log the collected IDs
    // You can add more actions here, like sending an email with the IDs, or writing them to a spreadsheet.

  } catch (error) {
    Logger.log('Error processing form submission: ' + error.toString() + '\nStack: ' + error.stack);
    // Consider sending an error notification email
    // MailApp.sendEmail('your-admin-email@example.com', 'Form File Mover Script Error', 'Error: ' + error.toString());
  }
}

/**
 * Copies a file to a new destination and prepends a prefix to the copy's name.
 * Uses the prependPrefix function (expected to be in the same project).
 *
 * @param {GoogleAppsScript.Drive.File} sourceFile The file object to copy (already moved/renamed).
 * @param {string} destinationFolderId The ID of the folder to copy the file into.
 * @param {string} prefix The prefix to add to the copied file's name.
 * @return {string|null} The ID of the copied file, or null if an error occurred.
 */
function copyAndPrefixFile(sourceFile, destinationFolderId, prefix) {
  try {
    const destinationFolder = DriveApp.getFolderById(destinationFolderId);
    const sourceFileName = sourceFile.getName(); // Get the name of the source file (e.g., XXX-Date-OriginalName)
    
    // Use the prependPrefix function to create the final name for the copy
    // using the source file's name as the base.
    const finalCopiedName = prependPrefix(sourceFileName, prefix); 
    
    // Make the copy and immediately rename it
    const copiedFile = sourceFile.makeCopy(finalCopiedName, destinationFolder);
        
    Logger.log(`Copied file to "${destinationFolder.getName()}" as "${finalCopiedName}" (Copy ID: ${copiedFile.getId()}, Source ID: ${sourceFile.getId()}).`);
    return copiedFile.getId(); // Return the ID of the successful copy
  } catch (error) {
    Logger.log(`Error copying or renaming file "${sourceFile.getName()}" (ID: ${sourceFile.getId()}) to folder ID ${destinationFolderId}: ${error.toString()}`);
    // Consider adding more specific error handling if needed
    return null; // Return null to indicate failure
  }
}
