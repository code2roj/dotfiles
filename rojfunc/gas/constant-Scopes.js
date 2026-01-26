/**CONSTANT: OAUTH2 SCOPES
|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
|<<<<<<<<<<<<<<<<<<<<<<<<<<<{ CONSTANT: OAUTH2 SCOPES ---<<<<<<<<<<<<<<<|
|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
*/

const SA_OAUTH_SCOPES = {
  BASIC_BOT: [
    'https://www.googleapis.com/auth/chat.bot'
  ],
  CREATE_MESSAGE : [
    'https://www.googleapis.com/auth/chat.bot',
    'https://www.googleapis.com/auth/chat.messages',
    'https://www.googleapis.com/auth/chat.messages.create'
    
  ],
  
  USER_INFO_EMAIL_PROFILE: [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
    // 'openid'
  ],
  SHEETS: [
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/spreadsheets'
  ],
  CALENDAR_EVENTS: [
    'https://www.googleapis.com/auth/calendar.events'
  ],
  ADMIN_DIRECTORY_READONLY: [
    'https://www.googleapis.com/auth/admin.directory.group.readonly',
    'https://www.googleapis.com/auth/admin.directory.user.readonly'
  ],
  DRIVE: [
    "https://www.googleapis.com/auth/chat.bot",
    "https://www.googleapis.com/auth/drive.file",
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/documents",
    "https://www.googleapis.com/auth/drive"
    ],
  CURRENT_SCOPES: [
    "https://www.googleapis.com/auth/chat.bot",
    "https://www.googleapis.com/auth/drive.file",
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/documents",
    "https://www.googleapis.com/auth/drive",
    'https://www.googleapis.com/auth/chat.bot',
    'https://www.googleapis.com/auth/chat.messages',
    'https://www.googleapis.com/auth/chat.messages.create'

  ]
};
