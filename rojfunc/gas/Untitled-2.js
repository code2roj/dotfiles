/*
Copyright 2022 Google LLC
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
    https://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

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

/**
 * Responds to a REMOVED_FROM_SPACE event in Chat.
 * @param {object} event the event object from Chat
 * @param {object} event the event object from Chat
 * @see https://developers.google.com/hangouts/chat/reference/message-formats/events
 */
function onRemoveFromSpace(event) {
  console.log('App removed from ', event.space.name);
}


/**
 * Responds to a MESSAGE event triggered in Chat.
 * @param {object} event the event object from Chat
 * @return {function} call the respective function
 */
function onMessage(event) {
  const message = event.message;

  if (message.slashCommand) {
    switch (message.slashCommand.commandId) {
      case 1: // Help command
        return createHelpCard();
      case 2: // Block out day command
        return blockDayOut();
      case 3: // Cancel all meetings command
        return cancelAllMeetings();
      case 4: // Set auto reply command
        return setAutoReply();
    }
  }
}

function createHelpCard() {
  return {
    "cardsV2": [
      {
        "cardId": "2",
        "card": {
          "sections": [
            {
              "header": "",
              "widgets": [
                {
                  "decoratedText": {
                    "topLabel": "",
                    "text": "Hi! 👋 I'm here to help you with your out of office tasks.<br><br>Here's a list of commands I understand.",
                    "wrapText": true
                  }
                }
              ]
            },
            {
              "widgets": [
                {
                  "decoratedText": {
                    "topLabel": "",
                    "text": "<b>/blockDayOut</b>: I will block out your calendar for you.",
                    "wrapText": true
                  }
                },
                {
                  "decoratedText": {
                    "topLabel": "",
                    "text": "<b>/cancelAllMeetings</b>: I will cancel all your meetings for the day.",
                    "wrapText": true
                  }
                },
                {
                  "decoratedText": {
                    "topLabel": "",
                    "text": "<b>/setAutoReply</b>: Set an out of office auto reply in Gmail.",
                    "wrapText": true
                  }
                }
              ]
            }
          ],
          "header": {
            "title": "OOO app",
            "subtitle": "Helping you manage your OOO",
            "imageUrl": "https://goo.gle/3SfMkjb",
            "imageType": "SQUARE"
          }
        }
      }
    ]
  }
}


function createResponseCard(responseText) {
  return {
    "cardsV2": [
      {
        "cardId": "1",
        "card": {
          "sections": [
            {
              "widgets": [
                {
                  "decoratedText": {
                    "topLabel": "",
                    "text": responseText,
                    "startIcon": {
                      "knownIcon": "NONE",
                      "altText": "Task done",
                      "iconUrl": "https://fonts.gstatic.com/s/i/short-term/web/system/1x/task_alt_gm_grey_48dp.png"
                    },
                    "wrapText": true
                  }
                }
              ]
            }
          ],
          "header": {
            "title": "OOO app",
            "subtitle": "Helping you manage your OOO",
            "imageUrl": "https://goo.gle/3SfMkjb",
            "imageType": "CIRCLE"
          }
        }
      }
    ]
  }
}

