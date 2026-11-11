export default async function handler(req, res) {
  const url = new URL(req.url, 'http://localhost:5173');
  const code = url.searchParams.get('code') || '';

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.end(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Copying Code...</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: #0b1120;
      color: #f8fafc;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .card {
      background-color: #1e293b;
      border: 1px solid #334155;
      border-radius: 14px;
      padding: 24px 32px;
      text-align: center;
      max-width: 360px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    }
    .badge {
      display: inline-block;
      background: #059669;
      color: #fff;
      font-size: 13px;
      font-weight: 600;
      padding: 4px 14px;
      border-radius: 20px;
      margin-bottom: 12px;
    }
    .code {
      font-size: 32px;
      font-weight: 700;
      letter-spacing: 6px;
      color: #38bdf8;
      font-family: monospace;
      margin: 8px 0 12px;
    }
    .desc {
      font-size: 13px;
      color: #94a3b8;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">✓ Code Copied!</div>
    <div class="code" id="codeVal">${code}</div>
    <div class="desc" id="statusMsg">Closing this window... Paste in chat!</div>
  </div>

  <script>
    const otp = '${code}';
    async function doCopy() {
      try {
        if (navigator.clipboard && otp) {
          await navigator.clipboard.writeText(otp);
        } else {
          const input = document.createElement('input');
          input.value = otp;
          document.body.appendChild(input);
          input.select();
          document.execCommand('copy');
          document.body.removeChild(input);
        }
      } catch (e) {
        console.error(e);
      }

      // Try closing immediately
      setTimeout(() => {
        window.close();
      }, 400);

      // If browser prevents window.close(), update text
      setTimeout(() => {
        const msg = document.getElementById('statusMsg');
        if (msg) msg.innerText = '✓ Code is copied! Switch back to chat to paste.';
      }, 900);
    }

    doCopy();
  </script>
</body>
</html>`);
}
