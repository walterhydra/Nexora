# Nexoraa Studio - Cold Outreach Automation

Automated, niche-personalized cold email dispatch system with human approval gate and missing email detection.

## Files
- `leads.csv`: The spreadsheet where you add businesses (Clinic, Gym, Coaching, Hotel). Open in Excel or Google Sheets.
- `templates.js`: Category-specific pitch templates that address the exact pain points of each niche.
- `outreach.js`: The automation engine powered by your official `contact@nexoraa.works` Hostinger SMTP.

## How To Use

### Step 1: Check / Preview Leads
```bash
node outreach/outreach.js --preview
```
This shows how many emails are ready, which ones are missing emails (`NEED_EMAIL`), and shows a preview draft.

### Step 2: Test on Yourself First
```bash
node outreach/outreach.js --test yourpersonalemail@gmail.com
```
Sends a sample email directly to your inbox so you can check how it looks.

### Step 3: Approve Leads
Open `leads.csv` in Excel:
- Add missing emails for any red rows.
- Change `status` from `PENDING_APPROVAL` to `APPROVED` for the ones you want to email.
*(Or run `node outreach/outreach.js --approve-all` to approve all pending leads with valid emails).*

### Step 4: Dispatch
```bash
node outreach/outreach.js --send
```
Emails will be dispatched with a safe 2-second gap between each email. Successfully sent leads are marked as `SENT` with a timestamp so you never duplicate!

