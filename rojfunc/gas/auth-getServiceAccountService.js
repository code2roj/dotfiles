/** 
 * ==========================================================================
 * ----------------Function: function getServiceAccountService()-------------
 * ==========================================================================
 */
function getServiceAccountService() {
  // Using the original service name to maintain consistency
  return OAuth2.createService('GoogleRemoteManager') 
    .setTokenUrl('https://oauth2.googleapis.com/token')
    .setPrivateKey(SERVICE_ACCOUNT_KEY.private_key)
    .setIssuer(SERVICE_ACCOUNT_KEY.client_email)
    .setSubject("automation.agent@hengaw.net")
    .setPropertyStore(PropertiesService.getScriptProperties())
    // Passing as a space-separated string is the most "original" stable format
    .setScope([
    'https://www.googleapis.com/auth/admin.reports.audit.readonly',
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/spreadsheets'
  ]);
}

function testServiceAccountConnection() {
  try {
    const service = getServiceAccountService();
    if (!service.hasAccess()) {
      Logger.log("❌ AUTH FAILED: " + service.getLastError());
      return;
    }
    
    Logger.log("✅ AUTH SUCCESS: Token generated.");
    
    // Attempt to pull the last 1 activity from the logs
    const report = AdminReports.Activities.list('all', 'chat', {
      maxResults: 1
    });
    
    Logger.log("✅ API SUCCESS: Connection to Admin Reports established.");
    Logger.log("Recent activity found: " + (report.items ? "Yes" : "No (But connection works)"));
    
  } catch (e) {
    Logger.log("❌ CRITICAL ERROR: " + e.toString());
  }
}

/** 
 * ==========================================================================
 * ----------------Function: resetService------------------------------------
 * ==========================================================================
 */
function resetService() {
  getServiceAccountService().reset();
  console.log("✅ Service Reset: The old token is cleared. Run runAutomation again.");
}