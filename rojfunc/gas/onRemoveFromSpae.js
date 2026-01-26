/**
 * Responds to a REMOVED_FROM_SPACE event in Chat.
 * @param {object} event the event object from Chat
 * @param {object} event the event object from Chat
 * @see https://developers.google.com/hangouts/chat/reference/message-formats/events
 */
function onRemoveFromSpace(event) {
  console.log('App removed from ', event.space.name);
}
