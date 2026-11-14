import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { whatsappTemplates } from './whatsapp_templates.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outreachDir = __dirname;

// Paths
const SENT_TRACKER_FILE = path.join(outreachDir, 'whatsapp_sent.json');
const USER_DATA_DIR = path.join(outreachDir, '.wadata');

// Load or initialize sent tracker
function getSentTracker() {
  if (fs.existsSync(SENT_TRACKER_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(SENT_TRACKER_FILE, 'utf8'));
    } catch (e) {
      return {};
    }
  }
  return {};
}

function saveSentTracker(tracker) {
  fs.writeFileSync(SENT_TRACKER_FILE, JSON.stringify(tracker, null, 2), 'utf8');
}

// Helper to parse CSV cleanly
function parseCSV(text) {
  const lines = text.trim().split(/\r?\n/);
  if (lines.length < 2) return [];

  function parseLine(line) {
    const result = [];
    let cur = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"' || char === "'") {
        if (inQuotes && line[i + 1] === char) {
          cur += char;
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        result.push(cur.trim());
        cur = '';
      } else {
        cur += char;
      }
    }
    result.push(cur.trim());
    return result;
  }

  const headers = parseLine(lines[0]).map(h => h.toLowerCase());
  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    const values = parseLine(lines[i]);
    const obj = {};
    headers.forEach((h, idx) => {
      obj[h] = values[idx] || '';
    });
    rows.push(obj);
  }
  return rows;
}

// Extract Phones from string
function extractMobile(str) {
  if (!str) return null;
  const mobileMatches = str.match(/(?:(?:\+?91[\s-]?)?[6-9]\d{4}[\s-]?\d{5})/g) || [];
  if (mobileMatches.length > 0) {
    const digits = mobileMatches[0].replace(/\D/g, '');
    return digits.length === 10 ? '91' + digits : (digits.length === 12 && digits.startsWith('91') ? digits : null);
  }
  return null;
}

// Sector configuration
const sectorConfigs = [
  { id: 'gym', name: 'Gyms & Fitness', filePrefix: 'porbandar gym' },
  { id: 'hotel', name: 'Hotels & Resorts', filePrefix: 'porbandar hotel' },
  { id: 'clinic', name: 'Healthcare & Clinics', filePrefix: 'porbandar clinic' },
  { id: 'lifestyle', name: 'Lifestyle & Salons', filePrefix: 'porbandar lifestyle' },
  { id: 'realestate', name: 'Real Estate & Builders', filePrefix: 'porbandar realestate' },
  { id: 'retail', name: 'Retail & Showrooms', filePrefix: 'porbandar retail' },
  { id: 'professional', name: 'Professional Services', filePrefix: 'porbandar professional' },
  { id: 'education', name: 'Education & Coaching', filePrefix: 'porbandar education' },
  { id: 'industrial', name: 'Industrial & Manufacturing', filePrefix: 'porbandar industrial' }
];

// Load leads for specific sector or all
function loadLeads(targetSector = 'gym', lang = 'gujarati') {
  const leads = [];
  const targets = targetSector === 'all' 
    ? sectorConfigs 
    : sectorConfigs.filter(s => s.id === targetSector.toLowerCase());

  for (const sec of targets) {
    const withoutWebFile = path.join(outreachDir, `${sec.filePrefix} (withoutwebsite).csv`);
    const withWebFile = path.join(outreachDir, `${sec.filePrefix} (website).csv`);

    const files = [withoutWebFile, withWebFile];
    for (const f of files) {
      if (!fs.existsSync(f)) continue;
      const parsed = parseCSV(fs.readFileSync(f, 'utf8'));
      for (const item of parsed) {
        if (!item.business_name) continue;
        const phone = extractMobile(item.notes || '');
        if (!phone) continue;

        const templateGroup = whatsappTemplates[sec.id] || whatsappTemplates.default;
        const msg = lang === 'hinglish' ? templateGroup.hinglish(item) : templateGroup.gujarati(item);

        leads.push({
          id: `${sec.id}_${item.id || item.business_name}`,
          business_name: item.business_name,
          contact_person: item.contact_person || 'Owner / Management',
          category: sec.id,
          sectorName: sec.name,
          phone: phone,
          message: msg
        });
      }
    }
  }
  return leads;
}

// Sleep helper
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function runAutoSender() {
  const args = process.argv.slice(2);
  
  // CLI flags
  const sectorIdx = args.indexOf('--sector');
  const targetSector = sectorIdx !== -1 ? args[sectorIdx + 1] : 'gym';

  const limitIdx = args.indexOf('--limit');
  const sendLimit = limitIdx !== -1 ? parseInt(args[limitIdx + 1], 10) : 5;

  const langIdx = args.indexOf('--lang');
  const lang = langIdx !== -1 ? args[langIdx + 1] : 'gujarati';

  const testIdx = args.indexOf('--test');
  const testPhone = testIdx !== -1 ? args[testIdx + 1].replace(/\D/g, '') : null;

  console.log('\n======================================================');
  console.log('⚡ Nexoraa Studio — WhatsApp Autonomous Dispatch Engine');
  console.log('======================================================');

  if (testPhone) {
    console.log(`🧪 TEST MODE: Will dispatch 1 sample test message to: +${testPhone}`);
  } else {
    console.log(`🎯 TARGET SECTOR: [${targetSector.toUpperCase()}] | BATCH LIMIT: ${sendLimit} messages`);
    console.log(`🌐 LANGUAGE: ${lang.toUpperCase()}`);
  }

  const leads = testPhone ? [{
    id: 'test_sample',
    business_name: 'Nexoraa Test Lead',
    contact_person: 'Milan Pandavadra',
    category: 'test',
    sectorName: 'Test',
    phone: testPhone.length === 10 ? '91' + testPhone : testPhone,
    message: whatsappTemplates.default[lang]({ business_name: 'Nexoraa Test Lead', contact_person: 'Milan' })
  }] : loadLeads(targetSector, lang);

  const sentTracker = getSentTracker();
  const pendingLeads = testPhone ? leads : leads.filter(l => !sentTracker[l.phone]);

  console.log(`📊 Total available leads in [${targetSector}]: ${leads.length}`);
  console.log(`⏳ Unsent leads remaining: ${pendingLeads.length}`);

  if (pendingLeads.length === 0) {
    console.log('✅ Sabhi leads ko pehle hi send ho chuka hai! Koi pending lead nahi bachi.');
    return;
  }

  const batch = pendingLeads.slice(0, sendLimit);
  console.log(`🚀 Starting dispatch of ${batch.length} leads in this run...`);
  console.log('⚠️  Launching dedicated Chrome window with persistent WhatsApp session...');

  const browser = await puppeteer.launch({
    headless: false,
    userDataDir: USER_DATA_DIR,
    defaultViewport: null,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--start-maximized'
    ]
  });

  const pages = await browser.pages();
  const page = pages.length > 0 ? pages[0] : await browser.newPage();

  console.log('⏳ Connecting to WhatsApp Web...');
  await page.goto('https://web.whatsapp.com', { waitUntil: 'networkidle2' });

  // Check login: wait for main search input or chat list
  console.log('📲 Agar QR Code dikh raha hai to apne phone se 1 baar SCAN karein (Next time auto-login rahega).');
  try {
    await page.waitForSelector('div[contenteditable="true"][data-tab="3"], #side, div[role="textbox"]', {
      timeout: 120000 // 2 minutes to scan QR if first time
    });
    console.log('✅ WhatsApp Web successfully logged in and ready!\n');
  } catch (e) {
    console.log('❌ WhatsApp login timeout. Please run again and scan QR code.');
    await browser.close();
    return;
  }

  let successCount = 0;

  for (let i = 0; i < batch.length; i++) {
    const lead = batch[i];
    console.log(`\n------------------------------------------------------`);
    console.log(`[#${i + 1}/${batch.length}] Preparing: ${lead.business_name} (+${lead.phone})`);

    const encoded = encodeURIComponent(lead.message);
    const chatUrl = `https://web.whatsapp.com/send?phone=${lead.phone}&text=${encoded}`;

    try {
      // Navigate to chat
      await page.goto(chatUrl, { waitUntil: 'networkidle2' });

      // Wait for send button or invalid number popup
      const sendButtonSelector = 'button[aria-label="Send"], span[data-icon="send"]';
      const invalidPopupSelector = 'div[data-animate-modal-popup="true"]';

      console.log('   ⏳ Waiting for chat input to load...');
      
      const readyState = await Promise.race([
        page.waitForSelector(sendButtonSelector, { timeout: 35000 }),
        page.waitForSelector(invalidPopupSelector, { timeout: 35000 }).catch(() => null)
      ]);

      // Check if invalid phone popup appeared
      const isInvalid = await page.$(invalidPopupSelector);
      if (isInvalid) {
        console.log(`   ⚠️ Number +${lead.phone} is not registered on WhatsApp. Skipping.`);
        sentTracker[lead.phone] = { status: 'INVALID_NUMBER', date: new Date().toISOString() };
        saveSentTracker(sentTracker);
        continue;
      }

      // Small natural human pause before clicking send
      const humanPause = 2000 + Math.floor(Math.random() * 2000);
      await sleep(humanPause);

      // Click send
      const sendBtn = await page.$(sendButtonSelector);
      if (sendBtn) {
        await sendBtn.click();
        console.log(`   📤 Clicked Send!`);
      } else {
        // Fallback: press Enter key on the active element
        await page.keyboard.press('Enter');
        console.log(`   📤 Pressed Enter to Send!`);
      }

      // Wait for message to be sent
      await sleep(3000);

      console.log(`   ✅ Successfully SENT message to ${lead.business_name}!`);
      sentTracker[lead.phone] = {
        business_name: lead.business_name,
        category: lead.category,
        status: 'SENT',
        sent_at: new Date().toISOString()
      };
      saveSentTracker(sentTracker);
      successCount++;

      // Safe pause before next lead (12 to 18 seconds)
      if (i < batch.length - 1) {
        const nextDelay = 12000 + Math.floor(Math.random() * 6000);
        console.log(`   ⏳ Safe human delay: waiting ${(nextDelay / 1000).toFixed(1)}s before next lead...`);
        await sleep(nextDelay);
      }

    } catch (err) {
      console.log(`   ❌ Error sending to ${lead.business_name}:`, err.message);
    }
  }

  console.log('\n======================================================');
  console.log(`🎉 BATCH COMPLETE: ${successCount}/${batch.length} messages delivered successfully!`);
  console.log('📂 Sent history logged in: whatsapp_sent.json');
  console.log('======================================================\n');

  console.log('Window will remain open for 5 seconds, then safely close.');
  await sleep(5000);
  await browser.close();
}

runAutoSender().catch(err => {
  console.error('Fatal Auto-Sender Error:', err);
});

