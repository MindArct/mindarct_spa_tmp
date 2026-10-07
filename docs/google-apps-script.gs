/**
 * MindArct contact form -> Google Sheet
 *
 * Setup:
 * 1. Create a Google Sheet. In row 1 add headers:
 *    Timestamp | Name | Email | Company | Service | Message
 * 2. Extensions > Apps Script. Paste this file in.
 * 3. Project Settings > Script properties > add  SECRET = <long random string>
 *    (Only if the script was NOT opened from the sheet, also add SHEET_ID = the long id in the
 *    sheet URL: docs.google.com/spreadsheets/d/<SHEET_ID>/edit)
 * 4. Deploy > New deployment > type "Web app"
 *      Execute as: Me
 *      Who has access: Anyone
 *    Copy the Web app URL.
 * 5. In Vercel set env vars:
 *      GOOGLE_SCRIPT_URL    = <web app URL>
 *      GOOGLE_SCRIPT_SECRET = <same SECRET value>
 * After editing this script later, use Deploy > Manage deployments > Edit > New version.
 */
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var secret = PropertiesService.getScriptProperties().getProperty("SECRET");
    if (!secret || data.secret !== secret) return json({ ok: false, error: "unauthorized" });

    // Bound script (opened from the sheet via Extensions > Apps Script): uses that sheet.
    // Standalone script (script.google.com): set a SHEET_ID script property instead.
    var sheetId = PropertiesService.getScriptProperties().getProperty("SHEET_ID");
    var ss = sheetId ? SpreadsheetApp.openById(sheetId) : SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheets()[0];
    sheet.appendRow([
      new Date(),
      clean(data.name),
      clean(data.email),
      clean(data.company),
      clean(data.service),
      clean(data.message),
    ]);
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

// Prefix a quote if a value could be read as a formula (prevents spreadsheet formula injection).
function clean(v) {
  var s = String(v || "");
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
