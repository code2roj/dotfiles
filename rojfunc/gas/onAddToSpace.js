/**
 * Responds to an ADDED_TO_SPACE event in Chat.
 * @param {object} event the event object from Chat
 * @return {object} JSON-formatted response
 * @see https://developers.google.com/hangouts/chat/reference/message-formats/events
 */
function onAddToSpace(event) {
  let message = 'Thank you for adding me to ';
  if (event.space.type === 'DM') {
    message += 'a DM, ' + event.user.displayName + '!';
  } else {
    message += event.space.displayName;
  }
  return { text: message };
}

