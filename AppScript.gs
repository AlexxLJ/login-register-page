//envía datos a frontend

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSheet();
  const rows = sheet.getDataRange().getValues();

  const data = JSON.parse(e.postData.contents); 
  const action = data.action; 
  const email = data.email;
  const username = data.username;
  const password = data.password;

  Logger.log("ACTION RECEIVED: " + action);
  

  // ==================== ACTION: REGISTER ====================
  if (action === "register") {
    

    for (let i = 1; i < rows.length; i++) {
      if (rows[i][0] === email) {
        Logger.log("Duplicate email found at row " + i);
        return ContentService
          .createTextOutput(JSON.stringify({ status: "error", message: "email_exists" }))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }

    // Check for duplicate username
    for (let i = 1; i < rows.length; i++) {
      if (rows[i][1] === username) {
        Logger.log("Duplicate username found at row " + i);
        return ContentService
          .createTextOutput(JSON.stringify({ status: "error", message: "username_exists" }))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }

    // If no duplicates, proceed with registration
    Logger.log("No duplicates found, proceeding with registration...");
    Logger.log("Adding user data...");
    
    sheet.appendRow([
      email,
      username,
      password,
      new Date(),
      0,
      0
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "ok", message: "Form_success" }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  // ==================== ACTION: LOGIN ====================
  if (action === "login") {
    let userCount = 0;

    // Count real users (excluding header row and empty rows)
    for (let i = 1; i < rows.length; i++) {
      if (rows[i][0] && rows[i][1] && rows[i][2]) {
        userCount++;
      }
    }
    Logger.log("👥 Total users counted: " + userCount);

    // Search for matching login credentials
    for (let i = 1; i < rows.length; i++) {
      if (rows[i][1] === username && rows[i][2] === password) {
        Logger.log("✅ Successful login for: " + username);
        
        return ContentService
          .createTextOutput(JSON.stringify({
            status: "ok",       
            message: "user_exists",
            count: userCount 
          }))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }

    // If the loop ends without a return, credentials are invalid
    Logger.log("❌ Invalid credentials for: " + username);
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: "invalid_credentials" }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  // Fallback response in case an unknown action is sent
  return ContentService
    .createTextOutput(JSON.stringify({ status: "error", message: "unknown_action" }))
    .setMimeType(ContentService.MimeType.JSON);
}
