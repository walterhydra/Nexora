import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { whatsappTemplates } from './whatsapp_templates.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outreachDir = __dirname;

// Read Nexoraa Official Logo as Base64
const logoPath = path.join(outreachDir, '..', 'public', 'logo', 'nexoraa-official-logo.jpg');
let logoBase64 = '';
if (fs.existsSync(logoPath)) {
  const buf = fs.readFileSync(logoPath);
  logoBase64 = `data:image/jpeg;base64,${buf.toString('base64')}`;
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
function extractPhoneInfo(str) {
  if (!str) return { mobile: null, landline: null, display: '' };

  const mobileMatches = str.match(/(?:(?:\+?91[\s-]?)?[6-9]\d{4}[\s-]?\d{5})/g) || [];
  const landlineMatches = str.match(/0286[\s-]?\d{6,7}/g) || [];

  let cleanMobile = null;
  if (mobileMatches.length > 0) {
    const digits = mobileMatches[0].replace(/\D/g, '');
    cleanMobile = digits.length === 10 ? '91' + digits : (digits.length === 12 && digits.startsWith('91') ? digits : null);
  }

  const cleanLandline = landlineMatches.length > 0 ? landlineMatches[0] : null;

  return {
    mobile: cleanMobile,
    landline: cleanLandline,
    display: mobileMatches[0] || cleanLandline || ''
  };
}

const PRAY = '\u{1F64F}';
const WEB = '\u{1F310}';

// Follow-up message generators
function getFollowups(b, lang) {
  if (lang === 'gujarati') {
    return {
      fu1: `Namaste ${b.contact_person || 'Sir'} ${PRAY}
Hu Milan Pandavadra (Nexoraa Studio, Porbandar).

Parso aapne amari web design & local lead generation services babate ek short message moklyo hato. Just follow-up leva mate message karyo ke aapne amaro portfolio jovano time malyo?

${WEB} https://nexoraa.works
Jo free ho to 2 minute chat kari shakiye? Aabhar ${PRAY}`,
      fu2: `Namaste ${b.contact_person || 'Sir'} ${PRAY}
Milan Pandavadra here.

Aap busy hasho etle call nathi karyo. Jo hal ma ${b.business_name} mate website ke branding ni requirement na hoi to no problem sir. Future ma jarur pade to maro aa number save rakhi sakho cho.

Have a great week ahead! ${PRAY}`
    };
  } else {
    return {
      fu1: `Namaste ${b.contact_person || 'Sir'} ${PRAY}
Main Milan Pandavadra (Nexoraa Studio, Porbandar).

Maine 2 din pehle aapke saath humara web design & lead funnel ka intro share kiya tha. Just follow-up lene ke liye message kiya ki kya aapko portfolio dekhne ka time mila?

${WEB} https://nexoraa.works
Jab bhi convenient ho batayein. Regards ${PRAY}`,
      fu2: `Namaste ${b.contact_person || 'Sir'} ${PRAY}
Milan Pandavadra here.

Aap busy honge isliye call nahi kiya. Agar abhi ${b.business_name} ke liye website ki requirement nahi hai to koi baat nahi sir. Future me jab bhi digital presence scale karni ho, aap mera ye number save rakh sakte hain.

Wishing you great business ahead! ${PRAY}`
    };
  }
}

// Sectors configuration
const sectorConfigs = [
  { id: 'clinic', name: 'Healthcare & Clinics', filePrefix: 'porbandar clinic' },
  { id: 'gym', name: 'Gyms & Fitness', filePrefix: 'porbandar gym' },
  { id: 'education', name: 'Education & Coaching', filePrefix: 'porbandar education' },
  { id: 'realestate', name: 'Real Estate & Builders', filePrefix: 'porbandar realestate' },
  { id: 'retail', name: 'Retail & Showrooms', filePrefix: 'porbandar retail' },
  { id: 'professional', name: 'Professional Services', filePrefix: 'porbandar professional' },
  { id: 'industrial', name: 'Industrial & Manufacturing', filePrefix: 'porbandar industrial' },
  { id: 'lifestyle', name: 'Lifestyle & Salons', filePrefix: 'porbandar lifestyle' },
  { id: 'hotel', name: 'Hotels & Dining', filePrefix: 'porbandar hotel' },
];

const allLeads = [];
let leadCounter = 1;

for (const sec of sectorConfigs) {
  const withoutWebFile = path.join(outreachDir, `${sec.filePrefix} (withoutwebsite).csv`);
  const withWebFile = path.join(outreachDir, `${sec.filePrefix} (website).csv`);

  const files = [
    { p: withoutWebFile, type: 'Without Website' },
    { p: withWebFile, type: 'With Website' }
  ];

  for (const f of files) {
    if (!fs.existsSync(f.p)) continue;
    const content = fs.readFileSync(f.p, 'utf8');
    const parsed = parseCSV(content);

    for (const item of parsed) {
      if (!item.business_name) continue;
      const notes = item.notes || '';
      const phoneInfo = extractPhoneInfo(notes);

      // Clean location extraction
      let location = 'Porbandar';
      if (notes.includes('|')) {
        location = notes.split('|')[0].trim();
      }

      const templateGroup = whatsappTemplates[sec.id] || whatsappTemplates.default;
      const gujMsg = templateGroup.gujarati(item);
      const hinMsg = templateGroup.hinglish(item);

      const gujFu = getFollowups(item, 'gujarati');
      const hinFu = getFollowups(item, 'hinglish');

      allLeads.push({
        uid: `lead_${leadCounter++}`,
        business_name: item.business_name,
        contact_person: item.contact_person || 'Owner / Management',
        category: sec.id,
        sectorName: sec.name,
        sourceType: f.type,
        city: item.city || 'Porbandar',
        location: location,
        email: item.email || '',
        website: item.website || '',
        notes: notes,
        phoneDisplay: phoneInfo.display,
        mobileNumber: phoneInfo.mobile,
        landlineNumber: phoneInfo.landline,
        hasMobile: !!phoneInfo.mobile,
        hasLandline: !!phoneInfo.landline,
        messages: {
          gujarati: {
            pitch: gujMsg,
            fu1: gujFu.fu1,
            fu2: gujFu.fu2
          },
          hinglish: {
            pitch: hinMsg,
            fu1: hinFu.fu1,
            fu2: hinFu.fu2
          }
        }
      });
    }
  }
}

const totalMobiles = allLeads.filter(l => l.hasMobile).length;
const totalLandlines = allLeads.filter(l => l.hasLandline && !l.hasMobile).length;

const dashboardHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nexoraa Studio — Outreach Hub</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #09090b;
      --surface: #121215;
      --surface-elevated: #18181c;
      --border: #27272a;
      --border-subtle: #1e1e24;
      --text: #fafafa;
      --text-muted: #a1a1aa;
      --text-dim: #71717a;
      --wa-green: #25D366;
      --wa-dark: #128C7E;
      --accent: #ffffff;
      --danger: #ef4444;
      --warning: #f59e0b;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: var(--bg);
      color: var(--text);
      font-family: 'Quicksand', -apple-system, BlinkMacSystemFont, 'Segoe UI Emoji', 'Apple Color Emoji', 'Noto Color Emoji', sans-serif;
      padding: 0;
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
    }
    
    /* Layout */
    .app-header {
      border-bottom: 1px solid var(--border);
      background: rgba(9, 9, 11, 0.85);
      backdrop-filter: blur(12px);
      position: sticky;
      top: 0;
      z-index: 50;
      padding: 14px 28px;
    }
    .header-inner {
      max-width: 1480px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
    }
    .brand-wrap {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .brand-capsule {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      background: #000000;
      border: 1px solid rgba(255, 255, 255, 0.16);
      padding: 6px 18px 6px 8px;
      border-radius: 9999px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1);
      transition: all 0.2s ease;
      user-select: none;
    }
    .brand-capsule:hover {
      border-color: rgba(255, 255, 255, 0.35);
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.8), 0 0 16px rgba(0, 210, 255, 0.15);
    }
    .brand-icon-wrap {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #000000;
      flex-shrink: 0;
    }
    .brand-icon-img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      display: block;
    }
    .brand-capsule-text {
      font-family: 'Quicksand', sans-serif;
      font-size: 16px;
      font-weight: 700;
      letter-spacing: 0.24em;
      color: #ffffff;
      text-transform: uppercase;
      padding-right: 4px;
    }
    .brand-sep {
      width: 1px;
      height: 24px;
      background: var(--border);
    }
    .brand-meta {
      display: flex;
      flex-direction: column;
    }
    .brand-title {
      font-size: 14px;
      font-weight: 600;
      letter-spacing: -0.2px;
      color: var(--text);
    }
    .brand-sub {
      font-size: 12px;
      color: var(--text-dim);
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .author-pill {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      color: var(--text-muted);
      background: var(--surface);
      border: 1px solid var(--border);
      padding: 6px 12px;
      border-radius: 8px;
    }
    .author-pill strong { color: var(--text); }
    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--wa-green);
      box-shadow: 0 0 8px rgba(37, 211, 102, 0.6);
    }

    /* Language Switcher */
    .segmented-control {
      display: inline-flex;
      background: #18181c;
      border: 1px solid var(--border);
      padding: 3px;
      border-radius: 8px;
    }
    .seg-btn {
      background: transparent;
      border: none;
      color: var(--text-muted);
      font-size: 12px;
      font-weight: 500;
      padding: 5px 12px;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .seg-btn.active {
      background: var(--accent);
      color: #000;
      font-weight: 600;
    }

    /* Container */
    .main-wrap {
      max-width: 1480px;
      margin: 0 auto;
      padding: 24px 28px 80px;
    }

    /* Metrics Strip */
    .metrics-strip {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      margin-bottom: 24px;
    }
    .metric-box {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 16px 20px;
    }
    .metric-label {
      font-size: 12px;
      font-weight: 500;
      color: var(--text-dim);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 6px;
    }
    .metric-val {
      font-size: 24px;
      font-weight: 700;
      letter-spacing: -0.5px;
      color: var(--text);
    }
    .metric-sub {
      font-size: 12px;
      color: var(--text-muted);
      margin-top: 4px;
    }

    /* Filter Bar */
    .filter-bar {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 14px 18px;
      margin-bottom: 20px;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .filter-top-row {
      display: flex;
      gap: 12px;
      align-items: center;
      flex-wrap: wrap;
    }
    .search-input-wrap {
      flex: 1;
      min-width: 300px;
      position: relative;
    }
    .search-input {
      width: 100%;
      background: var(--bg);
      border: 1px solid var(--border);
      border-radius: 8px;
      color: var(--text);
      padding: 9px 12px 9px 34px;
      font-size: 13px;
      outline: none;
      font-family: inherit;
      transition: border-color 0.15s ease;
    }
    .search-input:focus { border-color: #52525b; }
    .search-icon-svg {
      position: absolute;
      left: 11px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-dim);
      width: 14px;
      height: 14px;
    }

    /* Filter Pills */
    .pill-group {
      display: flex;
      gap: 6px;
      align-items: center;
      flex-wrap: wrap;
    }
    .pill {
      background: transparent;
      border: 1px solid var(--border);
      color: var(--text-muted);
      font-size: 12px;
      font-weight: 500;
      padding: 6px 12px;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .pill:hover { color: var(--text); border-color: #3f3f46; }
    .pill.active {
      background: #27272a;
      border-color: #3f3f46;
      color: var(--text);
      font-weight: 600;
    }
    .pill-tag {
      font-size: 11px;
      color: var(--text-dim);
      margin-left: 4px;
    }

    /* Sectors Horizontal Scroll */
    .sector-scroll {
      display: flex;
      gap: 6px;
      overflow-x: auto;
      padding-bottom: 4px;
      scrollbar-width: none;
    }
    .sector-scroll::-webkit-scrollbar { display: none; }
    .sector-chip {
      background: var(--surface-elevated);
      border: 1px solid var(--border-subtle);
      color: var(--text-muted);
      font-size: 12px;
      font-weight: 500;
      padding: 5px 12px;
      border-radius: 6px;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.15s;
    }
    .sector-chip:hover { color: var(--text); border-color: var(--border); }
    .sector-chip.active {
      background: #fafafa;
      color: #000;
      font-weight: 600;
      border-color: #fafafa;
    }

    /* Table Container */
    .table-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 12px;
      overflow: hidden;
    }
    .data-table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      font-size: 13px;
    }
    .data-table th {
      background: #151518;
      color: var(--text-dim);
      font-weight: 600;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      padding: 12px 16px;
      border-bottom: 1px solid var(--border);
      white-space: nowrap;
    }
    .data-table td {
      padding: 14px 16px;
      border-bottom: 1px solid var(--border-subtle);
      color: var(--text-muted);
      vertical-align: middle;
    }
    .data-table tr:hover td {
      background: rgba(255, 255, 255, 0.02);
    }
    .data-table tr.contacted-row td {
      opacity: 0.55;
    }

    /* Column Styles */
    .col-biz {
      color: var(--text);
      font-weight: 600;
      font-size: 13px;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .col-person {
      font-size: 12px;
      color: var(--text-dim);
      font-weight: 400;
    }
    .sector-badge {
      display: inline-block;
      font-size: 11px;
      font-weight: 500;
      color: var(--text-muted);
      background: var(--surface-elevated);
      border: 1px solid var(--border);
      padding: 3px 8px;
      border-radius: 4px;
      white-space: nowrap;
    }
    .phone-text {
      font-family: 'JetBrains Mono', monospace;
      font-size: 12.5px;
      color: var(--text);
      display: inline-flex;
      align-items: center;
      gap: 6px;
      white-space: nowrap;
      letter-spacing: 0.2px;
    }
    .phone-text.mobile { color: var(--wa-green); font-weight: 600; }
    .phone-text.landline { color: var(--warning); }
    .phone-text.none { color: var(--text-dim); }

    /* Action Buttons */
    .action-group {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .btn-send-wa {
      background: #1e3328;
      border: 1px solid rgba(37, 211, 102, 0.3);
      color: #25D366;
      font-size: 12px;
      font-weight: 600;
      padding: 6px 12px;
      border-radius: 6px;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.15s ease;
      white-space: nowrap;
    }
    .btn-send-wa:hover {
      background: #25D366;
      color: #000;
      border-color: #25D366;
      box-shadow: 0 0 12px rgba(37, 211, 102, 0.4);
    }
    .btn-send-wa.disabled {
      background: transparent;
      border-color: var(--border-subtle);
      color: var(--text-dim);
      cursor: not-allowed;
      pointer-events: none;
      opacity: 0.5;
    }
    .btn-icon-subtle {
      background: transparent;
      border: 1px solid var(--border);
      color: var(--text-muted);
      font-size: 11px;
      font-weight: 500;
      padding: 6px 10px;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.15s;
      white-space: nowrap;
    }
    .btn-icon-subtle:hover {
      background: var(--surface-elevated);
      color: var(--text);
      border-color: #3f3f46;
    }

    /* Checkbox Status */
    .status-toggle {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      cursor: pointer;
      user-select: none;
    }
    .status-toggle input {
      accent-color: var(--wa-green);
      cursor: pointer;
      width: 15px;
      height: 15px;
    }

    /* Drawer Side Panel */
    .drawer-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(4px);
      z-index: 100;
      opacity: 0;
      visibility: hidden;
      transition: all 0.2s ease;
    }
    .drawer-overlay.open { opacity: 1; visibility: visible; }
    .drawer-panel {
      position: fixed;
      top: 0;
      right: 0;
      width: 580px;
      max-width: 90vw;
      height: 100vh;
      background: var(--surface);
      border-left: 1px solid var(--border);
      z-index: 101;
      transform: translateX(100%);
      transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      display: flex;
      flex-direction: column;
    }
    .drawer-overlay.open .drawer-panel { transform: translateX(0); }

    .drawer-header {
      padding: 20px 24px;
      border-bottom: 1px solid var(--border);
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 16px;
    }
    .drawer-title { font-size: 18px; font-weight: 700; color: var(--text); }
    .drawer-close {
      background: transparent;
      border: none;
      color: var(--text-dim);
      font-size: 20px;
      cursor: pointer;
      padding: 4px;
    }
    .drawer-close:hover { color: var(--text); }

    .drawer-body {
      padding: 24px;
      overflow-y: auto;
      flex: 1;
    }
    .drawer-info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
      background: var(--bg);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 14px 18px;
      margin-bottom: 24px;
      font-size: 12px;
    }
    .info-item-label { color: var(--text-dim); margin-bottom: 2px; }
    .info-item-val { color: var(--text); font-weight: 500; }

    /* Tabs inside Drawer */
    .drawer-tabs {
      display: flex;
      border-bottom: 1px solid var(--border);
      gap: 18px;
      margin-bottom: 16px;
    }
    .drawer-tab {
      background: transparent;
      border: none;
      border-bottom: 2px solid transparent;
      color: var(--text-dim);
      font-size: 13px;
      font-weight: 600;
      padding: 8px 0;
      cursor: pointer;
    }
    .drawer-tab.active {
      color: var(--text);
      border-bottom-color: var(--accent);
    }
    .msg-box {
      background: var(--bg);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 16px;
      font-size: 13px;
      color: #e4e4e7;
      line-height: 1.6;
      white-space: pre-wrap;
      font-family: 'Quicksand', 'Segoe UI Emoji', 'Apple Color Emoji', sans-serif;
      margin-bottom: 20px;
    }

    .drawer-actions {
      display: flex;
      gap: 10px;
    }
    .btn-primary-wa {
      flex: 1;
      background: var(--wa-green);
      color: #000;
      font-weight: 700;
      font-size: 13px;
      padding: 12px 18px;
      border-radius: 8px;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      cursor: pointer;
      text-decoration: none;
      transition: all 0.15s;
    }
    .btn-primary-wa:hover { background: #1eb956; }

    /* Toast */
    .toast {
      position: fixed;
      bottom: 28px;
      right: 28px;
      background: #18181b;
      border: 1px solid var(--border);
      color: #fff;
      padding: 10px 18px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 500;
      display: none;
      z-index: 999;
      box-shadow: 0 10px 25px rgba(0,0,0,0.4);
    }

    /* Pagination */
    .pagination-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 14px 18px;
      border-top: 1px solid var(--border);
      font-size: 12px;
      color: var(--text-dim);
    }
    .page-btns {
      display: flex;
      gap: 6px;
    }
  </style>
</head>
<body>

  <!-- Top Header -->
  <header class="app-header">
    <div class="header-inner">
      <div class="brand-wrap">
        <div class="brand-capsule">
          <div class="brand-icon-wrap">
            <img src="nova-glow-icon.png" alt="Nexoraa" class="brand-icon-img" onerror="this.src='../public/logo/nova-glow-icon.png'">
          </div>
          <span class="brand-capsule-text">NEXORAA</span>
        </div>
        <div class="brand-sep"></div>
        <div class="brand-meta">
          <div class="brand-title">Porbandar Outreach Operations</div>
          <div class="brand-sub">Direct B2B Market Execution Engine</div>
        </div>
      </div>

      <div class="header-actions">
        <div class="author-pill">
          <span class="status-dot"></span>
          <span>Milan Pandavadra <strong>(+91 73833 03388)</strong></span>
        </div>

        <div class="segmented-control">
          <button class="seg-btn active" id="btnGuj" onclick="switchLang('gujarati')">Gujarati</button>
          <button class="seg-btn" id="btnHin" onclick="switchLang('hinglish')">Hinglish</button>
        </div>
      </div>
    </div>
  </header>

  <!-- Main Content -->
  <main class="main-wrap">
    
    <!-- Metrics -->
    <div class="metrics-strip">
      <div class="metric-box">
        <div class="metric-label">Total Mapped Businesses</div>
        <div class="metric-val">${allLeads.length}</div>
        <div class="metric-sub">Across 9 Porbandar sectors</div>
      </div>
      <div class="metric-box">
        <div class="metric-label">Direct WhatsApp (Mobile)</div>
        <div class="metric-val" style="color: var(--wa-green);">${totalMobiles}</div>
        <div class="metric-sub">1-Click click-to-chat ready</div>
      </div>
      <div class="metric-box">
        <div class="metric-label">Landline (Direct Call)</div>
        <div class="metric-val" style="color: var(--warning);">${totalLandlines}</div>
        <div class="metric-sub">0286 landline contacts</div>
      </div>
      <div class="metric-box">
        <div class="metric-label">Outreach Progress</div>
        <div class="metric-val" id="statContactedCount">0 <span style="font-size: 14px; font-weight: 500; color: var(--text-dim);">/ ${totalMobiles}</span></div>
        <div class="metric-sub" id="statContactedPercent">0% of mobile leads reached</div>
      </div>
    </div>

    <!-- Filter & Search Bar -->
    <div class="filter-bar">
      <!-- Sector Scroll -->
      <div class="sector-scroll" id="sectorScroll">
        <button class="sector-chip active" onclick="setSector('all')">All Sectors (${allLeads.length})</button>
        ${sectorConfigs.map(s => {
  const count = allLeads.filter(l => l.category === s.id).length;
  return `<button class="sector-chip" onclick="setSector('${s.id}')">${s.name} (${count})</button>`;
}).join('')}
      </div>

      <!-- Search & Status Pills -->
      <div class="filter-top-row">
        <div class="search-input-wrap">
          <svg class="search-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input type="text" id="searchInput" class="search-input" placeholder="Search business, owner name, location, or phone..." oninput="handleSearch()">
        </div>

        <div class="pill-group">
          <button class="pill active" onclick="setStatusFilter('all')">All Leads</button>
          <button class="pill" onclick="setStatusFilter('mobile')">WhatsApp Ready <span class="pill-tag">${totalMobiles}</span></button>
          <button class="pill" onclick="setStatusFilter('pending')">Uncontacted</button>
          <button class="pill" onclick="setStatusFilter('contacted')">Contacted</button>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="table-card">
      <table class="data-table">
        <thead>
          <tr>
            <th style="width: 48px;">#</th>
            <th>Business & Contact</th>
            <th style="width: 150px;">Sector</th>
            <th>Location</th>
            <th style="width: 175px; white-space: nowrap;">Contact Number</th>
            <th style="width: 220px; white-space: nowrap;">Direct Action</th>
            <th style="width: 90px; white-space: nowrap;">Status</th>
          </tr>
        </thead>
        <tbody id="tableBody"></tbody>
      </table>

      <!-- Pagination -->
      <div class="pagination-bar">
        <div id="paginationInfo">Showing 0 of 0 leads</div>
        <div class="page-btns">
          <button class="btn-icon-subtle" id="btnPrevPage" onclick="changePage(-1)">Previous</button>
          <button class="btn-icon-subtle" id="btnNextPage" onclick="changePage(1)">Next</button>
        </div>
      </div>
    </div>

  </main>

  <!-- Slide-out Drawer Panel -->
  <div class="drawer-overlay" id="drawerOverlay" onclick="closeDrawer(event)">
    <div class="drawer-panel" onclick="event.stopPropagation()">
      <div class="drawer-header">
        <div>
          <div class="drawer-title" id="drawerBizName">Business Details</div>
          <div style="font-size: 12px; color: var(--text-dim);" id="drawerSector">Sector</div>
        </div>
        <button class="drawer-close" onclick="closeDrawer()">&times;</button>
      </div>

      <div class="drawer-body">
        <div class="drawer-info-grid">
          <div>
            <div class="info-item-label">CONTACT PERSON</div>
            <div class="info-item-val" id="drawerContactPerson">-</div>
          </div>
          <div>
            <div class="info-item-label">PHONE NUMBER</div>
            <div class="info-item-val" id="drawerPhone">-</div>
          </div>
          <div style="grid-column: 1/-1;">
            <div class="info-item-label">ADDRESS / NOTES</div>
            <div class="info-item-val" id="drawerAddress">-</div>
          </div>
        </div>

        <div class="drawer-tabs">
          <button class="drawer-tab active" id="tabPitch" onclick="switchDrawerTab('pitch')">1. Initial Pitch</button>
          <button class="drawer-tab" id="tabFu1" onclick="switchDrawerTab('fu1')">2. Follow-Up 1 (Day 2)</button>
          <button class="drawer-tab" id="tabFu2" onclick="switchDrawerTab('fu2')">3. Follow-Up 2 (Day 4)</button>
        </div>

        <div class="msg-box" id="drawerMsgText">Message text...</div>

        <div class="drawer-actions">
          <a href="#" target="_blank" class="btn-primary-wa" id="drawerWaBtn">
            <span>💬 Send via WhatsApp</span>
          </a>
          <button class="btn-icon-subtle" style="padding: 12px 18px;" onclick="copyDrawerMsg()">
            📋 Copy Message
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="toast" id="toast">Message copied to clipboard!</div>

  <script>
    const allLeads = ${JSON.stringify(allLeads)};
    let currentSector = 'all';
    let currentStatusFilter = 'all';
    let currentLang = 'gujarati';
    let searchQuery = '';
    let currentPage = 1;
    const pageSize = 50;

    let contactedSet = new Set(JSON.parse(localStorage.getItem('nexoraa_wa_contacted') || '[]'));
    let activeDrawerLead = null;
    let activeDrawerTab = 'pitch';

    function getWhatsAppUrl(mobileNumber, text) {
      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      const cleanPhone = String(mobileNumber).replace(/\D/g, '');
      const base = isMobile ? 'https://api.whatsapp.com/send/' : 'https://web.whatsapp.com/send/';
      return base + '?phone=' + cleanPhone + '&text=' + encodeURIComponent(text);
    }

    function updateStats() {
      const contactedCount = contactedSet.size;
      const totalMobiles = ${totalMobiles};
      document.getElementById('statContactedCount').innerHTML = contactedCount + ' <span style="font-size: 14px; font-weight: 500; color: var(--text-dim);">/ ' + totalMobiles + '</span>';
      const pct = totalMobiles > 0 ? Math.round((contactedCount / totalMobiles) * 100) : 0;
      document.getElementById('statContactedPercent').textContent = pct + '% of mobile leads reached';
    }

    function switchLang(lang) {
      currentLang = lang;
      document.getElementById('btnGuj').classList.toggle('active', lang === 'gujarati');
      document.getElementById('btnHin').classList.toggle('active', lang === 'hinglish');
      renderTable();
      if (activeDrawerLead) renderDrawerContent();
      showToast('Switched to ' + (lang === 'gujarati' ? 'Gujarati' : 'Hinglish'));
    }

    function setSector(sec) {
      currentSector = sec;
      currentPage = 1;
      document.querySelectorAll('#sectorScroll .sector-chip').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('onclick').includes("'" + sec + "'"));
      });
      renderTable();
    }

    function setStatusFilter(st) {
      currentStatusFilter = st;
      currentPage = 1;
      document.querySelectorAll('.pill-group .pill').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('onclick').includes("'" + st + "'"));
      });
      renderTable();
    }

    function handleSearch() {
      searchQuery = document.getElementById('searchInput').value.toLowerCase().trim();
      currentPage = 1;
      renderTable();
    }

    function toggleContacted(uid, e) {
      if (e) e.stopPropagation();
      if (contactedSet.has(uid)) {
        contactedSet.delete(uid);
      } else {
        contactedSet.add(uid);
      }
      localStorage.setItem('nexoraa_wa_contacted', JSON.stringify(Array.from(contactedSet)));
      updateStats();
      renderTable();
    }

    function markAutoContacted(uid) {
      if (!contactedSet.has(uid)) {
        contactedSet.add(uid);
        localStorage.setItem('nexoraa_wa_contacted', JSON.stringify(Array.from(contactedSet)));
        updateStats();
        renderTable();
      }
    }

    function getFilteredLeads() {
      return allLeads.filter(l => {
        if (currentSector !== 'all' && l.category !== currentSector) return false;
        if (currentStatusFilter === 'mobile' && !l.hasMobile) return false;
        if (currentStatusFilter === 'pending' && contactedSet.has(l.uid)) return false;
        if (currentStatusFilter === 'contacted' && !contactedSet.has(l.uid)) return false;

        if (searchQuery) {
          const match = l.business_name.toLowerCase().includes(searchQuery) ||
                        l.contact_person.toLowerCase().includes(searchQuery) ||
                        l.location.toLowerCase().includes(searchQuery) ||
                        (l.phoneDisplay && l.phoneDisplay.toLowerCase().includes(searchQuery));
          if (!match) return false;
        }
        return true;
      });
    }

    function renderTable() {
      const filtered = getFilteredLeads();
      const totalFiltered = filtered.length;
      const totalPages = Math.ceil(totalFiltered / pageSize) || 1;
      if (currentPage > totalPages) currentPage = totalPages;

      const start = (currentPage - 1) * pageSize;
      const end = Math.min(start + pageSize, totalFiltered);
      const pageData = filtered.slice(start, end);

      document.getElementById('paginationInfo').textContent = 'Showing ' + (totalFiltered > 0 ? (start + 1) : 0) + '–' + end + ' of ' + totalFiltered + ' leads';
      document.getElementById('btnPrevPage').disabled = currentPage <= 1;
      document.getElementById('btnNextPage').disabled = currentPage >= totalPages;

      const tbody = document.getElementById('tableBody');
      if (pageData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 48px; color: var(--text-dim);">No business leads matched your search or filters.</td></tr>';
        return;
      }

      tbody.innerHTML = pageData.map((lead, idx) => {
        const isContacted = contactedSet.has(lead.uid);
        const pitchText = lead.messages[currentLang].pitch;
        const waLink = lead.hasMobile ? getWhatsAppUrl(lead.mobileNumber, pitchText) : '#';

        let phoneHTML = '<span class="phone-text none">—</span>';
        if (lead.hasMobile) {
          phoneHTML = '<span class="phone-text mobile">' + lead.phoneDisplay + '</span>';
        } else if (lead.hasLandline) {
          phoneHTML = '<span class="phone-text landline">' + lead.phoneDisplay + '</span>';
        }

        return \`
          <tr class="\${isContacted ? 'contacted-row' : ''}">
            <td style="color: var(--text-dim); font-size: 11px;">\${start + idx + 1}</td>
            <td>
              <div class="col-biz">
                <span>\${lead.business_name}</span>
                <span class="col-person">\${lead.contact_person}</span>
              </div>
            </td>
            <td><span class="sector-badge">\${lead.sectorName}</span></td>
            <td style="max-width: 240px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="\${lead.location}">
              \${lead.location}
            </td>
            <td style="white-space: nowrap; width: 175px;">\${phoneHTML}</td>
            <td>
              <div class="action-group">
                \${lead.hasMobile ? \`
                  <a href="\${waLink}" target="_blank" class="btn-send-wa" onclick="markAutoContacted('\${lead.uid}')">
                    <span>💬 Open WA</span>
                  </a>
                \` : \`
                  <span class="btn-send-wa disabled">No WA</span>
                \`}
                <button class="btn-icon-subtle" onclick="copyLeadMsg('\${lead.uid}')">Copy</button>
                <button class="btn-icon-subtle" onclick="openDrawer('\${lead.uid}')">View</button>
              </div>
            </td>
            <td>
              <label class="status-toggle" onclick="event.stopPropagation()">
                <input type="checkbox" \${isContacted ? 'checked' : ''} onchange="toggleContacted('\${lead.uid}', event)">
                <span style="font-size: 11px; color: \${isContacted ? 'var(--wa-green)' : 'var(--text-dim)'};">\${isContacted ? 'Done' : 'Pending'}</span>
              </label>
            </td>
          </tr>
        \`;
      }).join('');
    }

    function changePage(delta) {
      currentPage += delta;
      renderTable();
      window.scrollTo({ top: 200, behavior: 'smooth' });
    }

    function copyLeadMsg(uid) {
      const lead = allLeads.find(l => l.uid === uid);
      if (!lead) return;
      const text = lead.messages[currentLang].pitch;
      navigator.clipboard.writeText(text).then(() => {
        showToast('Message copied for ' + lead.business_name);
      });
    }

    function openDrawer(uid) {
      activeDrawerLead = allLeads.find(l => l.uid === uid);
      if (!activeDrawerLead) return;
      activeDrawerTab = 'pitch';

      document.getElementById('drawerBizName').textContent = activeDrawerLead.business_name;
      document.getElementById('drawerSector').textContent = activeDrawerLead.sectorName;
      document.getElementById('drawerContactPerson').textContent = activeDrawerLead.contact_person;
      document.getElementById('drawerPhone').textContent = activeDrawerLead.phoneDisplay || 'Not Available';
      document.getElementById('drawerAddress').textContent = activeDrawerLead.notes || activeDrawerLead.location;

      renderDrawerContent();
      document.getElementById('drawerOverlay').classList.add('open');
    }

    function closeDrawer(e) {
      if (e && e.target !== document.getElementById('drawerOverlay') && !e.target.classList.contains('drawer-close')) return;
      document.getElementById('drawerOverlay').classList.remove('open');
      activeDrawerLead = null;
    }

    function switchDrawerTab(tab) {
      activeDrawerTab = tab;
      document.querySelectorAll('.drawer-tabs .drawer-tab').forEach(btn => {
        btn.classList.toggle('active', btn.id === 'tab' + tab.charAt(0).toUpperCase() + tab.slice(1));
      });
      renderDrawerContent();
    }

    function renderDrawerContent() {
      if (!activeDrawerLead) return;
      const msgs = activeDrawerLead.messages[currentLang];
      const text = msgs[activeDrawerTab] || msgs.pitch;
      document.getElementById('drawerMsgText').textContent = text;

      const waBtn = document.getElementById('drawerWaBtn');
      if (activeDrawerLead.hasMobile) {
        waBtn.style.display = 'flex';
        waBtn.href = getWhatsAppUrl(activeDrawerLead.mobileNumber, text);
        waBtn.onclick = () => markAutoContacted(activeDrawerLead.uid);
      } else {
        waBtn.style.display = 'none';
      }
    }

    function copyDrawerMsg() {
      const text = document.getElementById('drawerMsgText').textContent;
      navigator.clipboard.writeText(text).then(() => {
        showToast('Message copied to clipboard!');
      });
    }

    function showToast(msg) {
      const t = document.getElementById('toast');
      t.textContent = msg;
      t.style.display = 'block';
      setTimeout(() => { t.style.display = 'none'; }, 2200);
    }

    // Init
    updateStats();
    renderTable();
  </script>
</body>
</html>`;

fs.writeFileSync(path.join(outreachDir, 'whatsapp_dashboard.html'), dashboardHTML, 'utf8');
console.log('Successfully re-generated ultra-professional WhatsApp Outreach Hub HTML.');
