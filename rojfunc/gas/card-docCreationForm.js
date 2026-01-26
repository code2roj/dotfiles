/**FUNCTION: CREATE NEW DOC CARD
|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
|<<<<<<<<<<<<<<<<<<<<<<<< FUNCTION: CREATE NEW DOC CARD>>>>>>>>>>>>>>>>>>>>>|
|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|

/**
 * Creates an interactive card for users to input details for a new document.
 *
 * @returns {Object} A Google Chat card object for new document creation.
 */
function createNewDocCard() {
  return {
    actionResponse: {
      type: "UPDATE_MESSAGE"
    },
    cardsV2: [
      {
        cardId: "create_new_doc_display",
        card: {
          header: {
            title: "HChat",
            subtitle: "Hengaw Organization's Internal App",
            imageUrl: CUSTOM_IMAGE_URLS.HCHAT_LOGO,
            imageType: "SQUARE"
          },
          sections: [
            {
              header: "Enter Document Details",
              widgets: [
                {
                  decoratedText: {
                    topLabel: "",
                    text: "",
                    wrapText: true
                  }
                },
                {
                  image: {
                    imageUrl: CUSTOM_IMAGE_URLS.PROMPTS.DOCUMENT_CREATE,
                    altText: "Gsuite Dashboard"
                  }
                },
                {
                  textInput: {
                    name: "document_name_input",
                    label: "...ناوی دۆکیومێنتی تازه‌"
                  }
                },
                {
                  buttonList: {
                    buttons: [
                      {
                        text: "Create",
                        onClick: {
                          action: {
                            function: "createNewDoc"
                          }
                        }
                      },
                      {
                        text: "Go Back!",
                        onClick: {
                          action: {
                            function: "backToInitialDocCard"
                          }
                        }
                      }
                    ]
                  }
                }
              ]
            }
          ]
        }
      }
    ]
  };
}
