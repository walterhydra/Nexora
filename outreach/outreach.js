import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import { templates } from './templates.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const ENV_FILE = path.join(ROOT_DIR, '.env');

// Simple native .env loader without external dependencies
function loadEnv() {
  if (fs.existsSync(ENV_FILE)) {
    const content = fs.readFileSync(ENV_FILE, 'utf-8');
    content.split('\n').forEach(line => {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        let key = match[1];
        let value = match[2] || '';
        // Remove surrounding quotes if any
        if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
        if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
        process.env[key] = process.env[key] || value;
      }
    });
  }
}
loadEnv();

// Configure Transporter with existing Hostinger SMTP / Brevo settings
function createTransporter() {
  const host = process.env.SMTP_HOST || 'smtp.hostinger.com';
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const user = process.env.SMTP_EMAIL || 'contact@nexoraa.works';
  const pass = process.env.SMTP_PASSWORD;

  return nodemailer.createTransport({
    host: host,
    port: port,
    secure: port === 465,
    auth: { user, pass },
    tls: { rejectUnauthorized: false }
  });
}

// Minimal CSV Reader & Writer (handles basic quotes and commas)
function parseCSV(content) {
  const lines = content.trim().split(/\r?\n/).filter(line => line.trim().length > 0);
  if (lines.length < 2) return [];
  const headers = lines[0].split(',').map(h => h.trim());
  
  return lines.slice(1).map(line => {
    // Basic regex split handling quoted cells
    const regex = /(?:^|,)(?:"([^"]*)"|([^,]*))/g;
    const values = [];
    let match;
    while ((match = regex.exec(line)) !== null) {
      values.push((match[1] !== undefined ? match[1] : match[2] || '').trim());
      if (match.index === regex.lastIndex) regex.lastIndex++;
    }
    // Clean trailing empty element if split matched line-end
    if (values.length > headers.length) values.length = headers.length;
    
    const row = {};
    headers.forEach((h, i) => {
      row[h] = values[i] || '';
    });
    return row;
  });
}

function stringifyCSV(rows) {
  if (!rows || rows.length === 0) return '';
  const headers = Object.keys(rows[0]);
  const lines = [headers.join(',')];

  rows.forEach(row => {
    const values = headers.map(h => {
      const val = row[h] || '';
      return val.includes(',') || val.includes('"') ? `"${val.replace(/"/g, '""')}"` : val;
    });
    lines.push(values.join(','));
  });

  return lines.join('\n');
}

// Detect sub-specialty for clinics, gyms, coachings
function detectTemplateKey(lead) {
  const cat = (lead.category || 'default').toLowerCase().trim();
  const searchCorpus = `${lead.business_name || ''} ${lead.notes || ''} ${lead.email || ''} ${lead.website || ''}`.toLowerCase();

  if (cat === 'clinic' || cat === 'hospital' || cat === 'doctor') {
    if (/dental|dentist|tooth|teeth|smile|implant/i.test(searchCorpus)) {
      return 'clinic_dental';
    }
    if (/skin|derma|aesthetic|laser|hair|cosmetic/i.test(searchCorpus)) {
      return 'clinic_skin';
    }
    if (/ivf|fertility|maternity|gynae|baby|women/i.test(searchCorpus)) {
      return 'clinic_ivf';
    }
    if (/hospital|multispeciality|surgery|surgical|critical|emergency/i.test(searchCorpus)) {
      return 'clinic_hospital';
    }
    return 'clinic';
  }

  return cat;
}

const LOGO_PATH = path.join(ROOT_DIR, 'public', 'logo', 'nexoraa-brand-logo.png');

// Format text body with Google Font 'Quicksand', bold styling, clean linebreaks, brand logo, and privacy opt-out
function formatEmailHtml(bodyText, lead) {
  const formattedText = bodyText
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\*\*(.*?)\*\*/g, '<strong style="font-weight: 700; color: #0f172a;">$1</strong>')
    // 1. Convert standard URLs cleanly, stripping any trailing punctuation like ), , or /
    .replace(/(https?:\/\/[^\s<"']+)/g, (fullMatch) => {
      let cleanUrl = fullMatch.replace(/[,\.\)\]]+$/, '');
      if (cleanUrl.endsWith('/')) cleanUrl = cleanUrl.slice(0, -1);
      const trailingPunctuation = fullMatch.slice(cleanUrl.length);
      return `<a href="${cleanUrl}" target="_blank" style="color: #0284c7; text-decoration: underline;">${cleanUrl}</a>${trailingPunctuation}`;
    })
    // 2. Convert phone number to clean WhatsApp link (after URLs are done)
    .replace(/\+91 73833 03388/g, '<a href="https://wa.me/917383303388" style="color: #0284c7; text-decoration: underline; font-weight: 600;">+91 73833 03388</a>')
    // 3. Convert email to mailto link
    .replace(/contact@nexoraa\.works/g, '<a href="mailto:contact@nexoraa.works" style="color: #0284c7; text-decoration: underline;">contact@nexoraa.works</a>')
    .replace(/\r?\n/g, '<br>');

  const bizName = (lead && lead.business_name) ? lead.business_name : 'your organization';

  return `
    <html>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap" rel="stylesheet">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap');
          * {
            font-family: 'Quicksand', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important;
          }
        </style>
      </head>
      <body style="margin: 0; padding: 0;">
        <div dir="ltr" style="font-family: 'Quicksand', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 15px; line-height: 1.68; color: #1e293b; letter-spacing: 0.1px;">
          ${formattedText}
          <br><br>
          <img src="cid:nexoraaLogo" alt="Nexoraa Studio" style="width: 280px; max-width: 100%; height: auto; display: block;" border="0">
          <div style="margin-top: 26px; padding-top: 14px; border-top: 1px solid #e2e8f0; font-size: 11.5px; color: #94a3b8; line-height: 1.55;">
            This consultative observation was prepared specifically regarding ${bizName}'s digital patient experience. If you would prefer not to receive future design notes, please reply with "Opt-out" and we will remove your contact details immediately.
          </div>
        </div>
      </body>
    </html>
  `;
}

// Generate email data from lead
function generateEmail(lead) {
  const templateKey = detectTemplateKey(lead);
  const template = templates[templateKey] || templates[lead.category] || templates.default;
  const subject = template.subject.replace(/\{\{business_name\}\}/g, lead.business_name || 'your business');
  const body = template.body(lead);
  const html = formatEmailHtml(body, lead);

  return { subject, body, html, templateKey };
}

// Scrape email from website if provided and email is missing
async function tryFindWebsiteEmail(website) {
  if (!website || website.toLowerCase() === 'none') return null;
  let targetUrl = website.trim();
  if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
    targetUrl = 'https://' + targetUrl;
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    const res = await fetch(targetUrl, {
      signal: controller.signal,
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    });
    clearTimeout(timeout);
    if (!res.ok) return null;
    const text = await res.text();
    const ignoredDomains = ['dial4trade.com', 'textileinfomedia.com', 'indiamart.com', 'justdial.com', 'globallinker.com', 'sentry.io', 'wixpress.com', 'domain.com', 'example.com', 'wordpress.com', 'w3.org', 'cloudflare.com'];

    // Search mailto: or general email regex
    const mailtoMatch = text.match(/mailto:([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i);
    if (mailtoMatch) {
      const e = mailtoMatch[1].toLowerCase();
      if (!ignoredDomains.some(d => e.endsWith(d)) && !e.endsWith('.png') && !e.endsWith('.jpg')) {
        return mailtoMatch[1];
      }
    }
    
    const emails = text.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g);
    if (emails) {
      for (const raw of emails) {
        const e = raw.toLowerCase();
        if (!ignoredDomains.some(d => e.endsWith(d)) && !e.endsWith('.png') && !e.endsWith('.jpg')) {
          return raw;
        }
      }
    }
  } catch (err) {
    // Website unreachable or blocked, fallback
  }
  return null;
}

// Main CLI logic
async function run() {
  const args = process.argv.slice(2);
  const isPreview = args.includes('--preview');
  const isSend = args.includes('--send');
  const isApproveAll = args.includes('--approve-all');
  const testIndex = args.indexOf('--test');
  const testEmail = testIndex !== -1 ? args[testIndex + 1] : null;

  const fileArgIdx = args.indexOf('--file');
  const LEADS_FILE = fileArgIdx !== -1 && args[fileArgIdx + 1]
    ? path.resolve(args[fileArgIdx + 1])
    : (fs.existsSync(path.join(__dirname, 'porbandar clinic (website).csv'))
        ? path.join(__dirname, 'porbandar clinic (website).csv')
        : path.join(__dirname, 'leads.csv'));

  if (!fs.existsSync(LEADS_FILE)) {
    console.error(`❌ Leads file not found at: ${LEADS_FILE}`);
    process.exit(1);
  }

  const raw = fs.readFileSync(LEADS_FILE, 'utf-8');
  let leads = parseCSV(raw);

  console.log(`\n======================================================`);
  console.log(`⚡ Nexoraa Studio - Cold Outreach Engine`);
  console.log(`📂 Loaded ${leads.length} leads from: ${path.basename(LEADS_FILE)}`);
  console.log(`======================================================\n`);

  // Scan and detect missing emails
  let modified = false;
  for (const lead of leads) {
    if (!lead.email || lead.email.trim() === '') {
      if (lead.website && lead.website.trim() !== '' && lead.website !== 'none') {
        console.log(`🔍 Searching email on website for: ${lead.business_name} (${lead.website})...`);
        const found = await tryFindWebsiteEmail(lead.website);
        if (found) {
          console.log(`   ✨ Found email: ${found}`);
          lead.email = found;
          lead.status = 'PENDING_APPROVAL';
          modified = true;
          continue;
        }
      }
      if (lead.status !== 'NEED_EMAIL') {
        lead.status = 'NEED_EMAIL';
        modified = true;
      }
    }
  }

  // Handle Approve All
  if (isApproveAll) {
    leads.forEach(lead => {
      if (lead.status === 'PENDING_APPROVAL' && lead.email) {
        lead.status = 'APPROVED';
        modified = true;
      }
    });
    console.log(`✅ Marked all verified pending leads as APPROVED!`);
  }

  // Save changes if any
  if (modified) {
    fs.writeFileSync(LEADS_FILE, stringifyCSV(leads), 'utf-8');
  }

  // Test Email Mode
  if (testEmail) {
    console.log(`🧪 Sending test sample to: ${testEmail}...`);
    const sampleLead = leads.find(l => l.category === 'clinic') || leads[0];
    const { subject, body, html } = generateEmail(sampleLead);
    const transporter = createTransporter();
    const attachments = fs.existsSync(LOGO_PATH) ? [{
      filename: 'nexoraa-brand-logo.png',
      path: LOGO_PATH,
      cid: 'nexoraaLogo'
    }] : [];
    
    await transporter.sendMail({
      from: `"Nexoraa Studio" <${process.env.SMTP_EMAIL || 'contact@nexoraa.works'}>`,
      to: testEmail,
      bcc: 'contact@nexoraa.works',
      replyTo: process.env.ADMIN_EMAIL || 'contact@nexoraa.works',
      subject: subject,
      text: body,
      html: html,
      attachments: attachments
    });
    console.log(`✅ Test email sent successfully to ${testEmail}! Check your inbox/spam.\n`);
    return;
  }

  // Preview Mode
  if (isPreview || (!isSend && !isApproveAll)) {
    console.log(`📋 [PREVIEW & STATUS SUMMARY]\n`);
    let approvedCount = 0;
    let pendingCount = 0;
    let needEmailCount = 0;
    let sentCount = 0;

    const shownTemplates = new Set();

    leads.forEach((lead) => {
      const emailStatus = lead.email ? `✉️  ${lead.email}` : `⚠️  [NO EMAIL FOUND - ADD IN CSV]`;
      const { subject, body, templateKey } = generateEmail(lead);
      const specTag = `[${templateKey}]`.padEnd(18);
      console.log(`[#${String(lead.id).padStart(2)}] ${lead.business_name.padEnd(30)} | Type: ${specTag} | Status: [${lead.status}]`);
      console.log(`     ${emailStatus}`);
      
      if (lead.status === 'APPROVED') approvedCount++;
      if (lead.status === 'PENDING_APPROVAL') pendingCount++;
      if (lead.status === 'NEED_EMAIL') needEmailCount++;
      if (lead.status === 'SENT') sentCount++;

      // Print one sample preview for each distinct template
      if (!shownTemplates.has(templateKey) && lead.email) {
        shownTemplates.add(templateKey);
        console.log(`\n     --- 📝 Custom Draft for ${templateKey.toUpperCase()} (${lead.business_name}) ---`);
        console.log(`     Subject: ${subject}`);
        console.log(`     Snippet:\n     ` + body.split('\n').slice(0, 7).join('\n     ') + '\n     ...');
        console.log(`     --------------------------------------------------------------------\n`);
      }
    });

    console.log(`\n📊 SUMMARY STATS:`);
    console.log(`   🟢 Ready to send (APPROVED):     ${approvedCount}`);
    console.log(`   🟡 Pending review (PENDING):    ${pendingCount}`);
    console.log(`   🔴 Missing emails (NEED_EMAIL): ${needEmailCount}`);
    console.log(`   ⚪ Already sent (SENT):          ${sentCount}`);
    console.log(`\n👉 NEXT COMMANDS:`);
    console.log(`   1. Open 'leads.csv' in Excel to add emails or edit status to 'APPROVED'.`);
    console.log(`   2. Run 'node outreach.js --approve-all' to auto-approve all valid pending leads.`);
    console.log(`   3. Run 'node outreach.js --send' to dispatch emails to all APPROVED leads.`);
    console.log(`   4. Run 'node outreach.js --test your-email@gmail.com' to test send on yourself.\n`);
    return;
  }

  // Send Mode
  if (isSend) {
    const toSend = leads.filter(l => l.status === 'APPROVED');
    if (toSend.length === 0) {
      console.log(`ℹ️  No leads are marked 'APPROVED'. Change status in leads.csv or run with --approve-all.`);
      return;
    }

    console.log(`🚀 Found ${toSend.length} APPROVED lead(s). Starting dispatch...\n`);
    const transporter = createTransporter();
    let successCount = 0;

    for (const lead of toSend) {
      if (!lead.email) {
        console.log(`⚠️  Skipping #${lead.id} ${lead.business_name} (Missing email)`);
        lead.status = 'NEED_EMAIL';
        continue;
      }

      const { subject, body, html } = generateEmail(lead);
      console.log(`📤 Sending to: ${lead.business_name} <${lead.email}>...`);
      const attachments = fs.existsSync(LOGO_PATH) ? [{
        filename: 'nexoraa-brand-logo.png',
        path: LOGO_PATH,
        cid: 'nexoraaLogo'
      }] : [];

      try {
        const info = await transporter.sendMail({
          from: `"Nexoraa Studio" <${process.env.SMTP_EMAIL || 'contact@nexoraa.works'}>`,
          to: lead.email,
          bcc: 'milanpandavadra84@gmail.com',
          replyTo: process.env.ADMIN_EMAIL || 'contact@nexoraa.works',
          subject: subject,
          text: body,
          html: html,
          attachments: attachments
        });

        lead.status = 'SENT';
        lead.sent_at = new Date().toISOString();
        successCount++;
        console.log(`   ✅ Sent successfully!`);
        console.log(`   📬 Proof copy delivered to your Gmail: milanpandavadra84@gmail.com`);

        // Log to local sent history
        const logEntry = `[${lead.sent_at}] SENT #${lead.id} "${lead.business_name}" <${lead.email}> | MessageId: ${info.messageId || 'ok'}\n`;
        fs.appendFileSync(path.join(__dirname, 'sent_history.log'), logEntry, 'utf-8');
        
        // Small delay (2 seconds) between emails to prevent spam filters
        await new Promise(r => setTimeout(r, 2000));
      } catch (err) {
        console.error(`   ❌ Failed to send to ${lead.email}:`, err.message);
      }
    }

    fs.writeFileSync(LEADS_FILE, stringifyCSV(leads), 'utf-8');
    console.log(`\n🎉 Dispatch complete! Sent: ${successCount}/${toSend.length}. leads.csv updated with status 'SENT'.\n`);
  }
}

run().catch(console.error);
