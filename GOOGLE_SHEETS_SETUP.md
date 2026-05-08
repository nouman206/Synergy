# Google Sheets Setup Steps

---

## 1. Get Provider Data (Read from Google Sheet)

1. Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet
2. Name it **"Providers"**
3. In Row 1, add these column headers:

   | id | name | title | photo | specialties | insurance | city | state | zip | gender | languages | bio | therapyTypes | sessionTypes | modalities | ageMin | ageMax |

4. Fill in provider data starting from Row 2
   - For columns with multiple values (specialties, insurance, languages, etc.) separate them with commas inside the same cell
5. Go to **File > Share > Publish to web**
6. Under "Link", select **Sheet 1** from the first dropdown
7. Select **Comma-separated values (.csv)** from the second dropdown
8. Click **Publish**
9. Click **OK** on the confirmation popup
10. Copy the generated URL — this is the provider data endpoint

---

## 2. Save Contact Form Submissions (Write to Google Sheet)

1. Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet
2. Name it **"Contact Submissions"**
3. In Row 1, add these column headers:

   | Timestamp | Name | Phone |

4. Go to **Extensions > Apps Script**
5. Delete any existing code and paste this:

   ```
   function doPost(e) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    sheet.appendRow([new Date(), data.name || "", data.email || ""]);
    return ContentService.createTextOutput(JSON.stringify({ result: "success" })).setMimeType(ContentService.MimeType.JSON);
   }
   ```

6. Click the **Save** icon (or Ctrl+S)
7. Click **Deploy > New deployment**
8. Click the gear icon next to "Select type" and choose **Web app**
9. Set **Execute as** to **Me**
10. Set **Who has access** to **Anyone**
11. Click **Deploy**
12. Authorize the app when prompted (click through the Google permissions)
13. Copy the generated Web app URL — this is the contact form endpoint
