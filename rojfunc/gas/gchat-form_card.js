/**
 * Responds to Google Chat events, specifically looking for a slash command
 * to display a Google Form card.
 *
 * @param {Object} event The event object from Google Chat. See https://developers.google.com/chat/api/reference/rest/v1/Event
 * @returns {Object | undefined} A card message object if the slash command matches, otherwise undefined.
 */
function handleChatEvent(event) {
  // --- Configuration ---
  const targetSlashCommand = '/showMyForm'; // The slash command users will type
  const formUrl = 'YOUR_GOOGLE_FORM_URL_HERE'; // <-- Replace with your actual Google Form URL
  const formTitle = 'Submit Your Feedback'; // <-- Customize the title shown on the card
  const formDescription = 'Please click the button below to open the feedback form.'; // <-- Customize description
  const buttonText = 'Open Feedback Form'; // <-- Customize button text
  // --- End Configuration ---

  // Check if it's a message event and contains a slash command
  if (event.type === 'MESSAGE' && event.message && event.message.slashCommand) {

    // Check if the command name matches our target
    // Note: Google Chat includes the leading slash in commandName
    if (event.message.slashCommand.commandName === targetSlashCommand) {

      // Basic validation: Ensure the form URL has been set
      if (!formUrl || formUrl === 'YOUR_GOOGLE_FORM_URL_HERE') {
        console.error(`Form URL is not configured for the ${targetSlashCommand} command.`);
        // Send a helpful message back to the user in Chat
        return {
          text: `Sorry, the form URL hasn't been configured for the ${targetSlashCommand} command yet.`
        };
      }

      // Construct and return the card
      return createGoogleFormCard(formUrl, formTitle, formDescription, buttonText);
    }
  }

  // If it's not the target slash command, ignore the event (return nothing)
  // You could add other handlers here if needed.
  return undefined;
}

/**
 * Creates the Google Chat Card JSON for linking to a Google Form.
 *
 * @param {string} formUrl The URL of the Google Form.
 * @param {string} title The title for the card header.
 * @param {string} description The text description shown on the card.
 * @param {string} buttonText The text for the button linking to the form.
 * @returns {Object} The card message object, formatted for the Google Chat API.
 */
function createGoogleFormCard(formUrl, title, description, buttonText) {
  const card = {
    cardsV2: [{
      cardId: 'googleFormLinkCard', // An identifier for the card
      card: {
        header: {
          title: title,
          subtitle: 'Google Form',
          imageUrl: 'https://ssl.gstatic.com/docs/forms/device_home/forms_logo_standard_lockup_48dp.png', // Official Google Forms icon
          imageType: 'CIRCLE' // Or SQUARE
        },
        sections: [
          {
            widgets: [
              {
                textParagraph: {
                  text: description
                }
              },
              {
                buttonList: {
                  buttons: [{
                    text: buttonText,
                    onClick: { openLink: { url: formUrl } }
                  }]
                }
              }
            ]
          }
        ]
      }
    }]
  };
  return card;
}

// --- How to use (Example with Google Apps Script) ---
// 1. Create a new Google Apps Script project.
// 2. Copy the code above into a script file (e.g., Code.gs or gchat-form_card.js).
// 3. **IMPORTANT:** Replace 'YOUR_GOOGLE_FORM_URL_HERE' with the actual URL of your Google Form.
// 4. Define the entry point function that Google Chat calls (usually doPost or onMessage):
/*
function onMessage(event) {
  console.log(JSON.stringify(event, null, 2)); // Log the event for debugging
  const response = handleChatEvent(event);
  if (response) {
    return response;
  } else {
    // Optionally handle other messages or do nothing
    return { text: "I didn't understand that command." }; // Example default response
  }
}

// You might use doPost if integrating via HTTP endpoint
function doPost(e) {
  const event = JSON.parse(e.postData.contents);
  const response = handleChatEvent(event);
  if (response) {
     return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON);
  } else {
     // Return an empty response to acknowledge receipt but not post a message
     return ContentService.createTextOutput(JSON.stringify({})).setMimeType(ContentService.MimeType.JSON);
  }
}
*/
// 5. Deploy the script as a Google Chat Bot.
// 6. Configure the slash command `/showMyForm` (or your chosen command) in the Google Cloud Console for your Chat App configuration.
// 7. Add the bot to a Chat space and type `/showMyForm`.