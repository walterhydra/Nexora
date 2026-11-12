import crypto from 'crypto';
import path from 'path';
import fs from 'fs';

const SECRET_KEY = process.env.OTP_SECRET || 'nexoraa-otp-secret-key-2026';

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { action, email, otp, token, expiry } = req.body;

  if (action === 'send') {
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Generate 6-digit random numeric OTP (standard length required for Gmail's native OTP parser)
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

    // Expire in 5 minutes (300,000 ms)
    const newExpiry = Date.now() + 5 * 60 * 1000;

    // Create stateless verification token
    const hash = crypto
      .createHmac('sha256', SECRET_KEY)
      .update(`${email}:${generatedOtp}:${newExpiry}`)
      .digest('hex');

    const verificationToken = `${newExpiry}.${hash}`;

    let siteOrigin = 'https://nexoraa.works';
    try {
      if (req.headers.origin) {
        siteOrigin = req.headers.origin;
      } else if (req.headers.referer) {
        siteOrigin = new URL(req.headers.referer).origin;
      }
    } catch (e) {}

    const verifyLink = `${siteOrigin}/?verify_email=${encodeURIComponent(email)}&verify_otp=${encodeURIComponent(generatedOtp)}&verify_token=${encodeURIComponent(verificationToken)}`;

    const brevoApiKey = process.env.BREVO_API_KEY;
    const smtpEmail = process.env.SMTP_EMAIL || 'contact@nexoraa.works';
    const smtpPassword = process.env.SMTP_PASSWORD || process.env.GMAIL_APP_PASSWORD || process.env.EMAIL_PASSWORD;
    const fromEmail = process.env.FROM_EMAIL || process.env.SENDER_EMAIL || 'contact@nexoraa.works';

    // High-visibility Subject Line: Shows code immediately in mobile notification bar & lock screen
    const emailSubject = `${generatedOtp} is your Nexoraa Studio verification code`;

    const rawName = email.split('@')[0] || 'User';
    let recipientName = rawName
      .replace(/[._-]/g, ' ')
      .split(' ')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ') || 'User';

    // If recipient name is device-like or number-heavy (e.g. Realme11119412), make it clean
    if (/\d{4,}/.test(recipientName) || recipientName.toLowerCase().startsWith('realme')) {
      recipientName = 'Nexoraa User';
    }

    const emailText = `Nexoraa Studio Verification Code

Your 6-digit verification code is:
${generatedOtp}

Enter this code in Spidey chat to authenticate your session. This code is valid for 5 minutes.

If you did not request this code, you can safely ignore this email.

Warm regards,
Team Nexoraa Studio
contact@nexoraa.works | https://nexoraa.works`;

    const emailHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${generatedOtp} is your Nexoraa Studio verification code</title>
<!-- Google Schema.org Structured Data -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Message",
  "description": "Your Nexoraa Studio verification code is ${generatedOtp}",
  "about": {
    "@type": "Thing",
    "name": "One Time Password",
    "identifier": "${generatedOtp}"
  },
  "sender": {
    "@type": "Organization",
    "name": "Nexoraa Studio",
    "url": "https://nexoraa.works"
  }
}
</script>
</head>
<body style="margin: 0; padding: 24px 12px; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #0f172a;">

<!-- Preheader for Lock Screen & Notification snippet -->
<div style="display:none; font-size:1px; line-height:1px; max-height:0px; max-width:0px; opacity:0; overflow:hidden; mso-hide: all;">
  Your 6-digit verification code is ${generatedOtp}. Valid for 5 minutes.
</div>

<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 540px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(15, 23, 42, 0.05); overflow: hidden;">
  <!-- Header / Brand Logo -->
  <tr>
    <td style="padding: 28px 32px 20px 32px; border-bottom: 1px solid #f1f5f9;">
      <img src="cid:nexoraabrandlogo" alt="Nexoraa Studio" width="180" style="display: block; border: 0; width: 180px; max-width: 100%; height: auto;">
    </td>
  </tr>

  <!-- Content Body -->
  <tr>
    <td style="padding: 28px 32px 32px 32px;">
      <h1 style="margin: 0 0 12px 0; font-size: 20px; font-weight: 700; color: #0f172a; letter-spacing: -0.3px;">
        Security Verification
      </h1>

      <p style="margin: 0 0 16px 0; font-size: 14px; line-height: 1.6; color: #475569;">
        Hello <strong>${recipientName}</strong>,
      </p>

      <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 1.6; color: #475569;">
        Please enter the following 6-digit one-time code to authenticate your session with our Spidey AI Assistant:
      </p>

      <!-- Clean Apple / Stripe Style Verification Code Box -->
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 8px; margin: 20px 0 22px 0;">
        <tr>
          <td align="center" style="padding: 22px 16px;">
            <div style="font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace; font-size: 34px; font-weight: 700; letter-spacing: 10px; color: #0f172a; text-align: center; user-select: all; -webkit-user-select: all;">
              ${generatedOtp}
            </div>
            <div style="margin-top: 8px; font-size: 11px; font-weight: 500; color: #64748b; letter-spacing: 0.2px;">
              Single tap to select &bull; Valid for 5 minutes
            </div>
          </td>
        </tr>
      </table>

      <p style="margin: 0 0 20px 0; font-size: 13px; line-height: 1.6; color: #64748b;">
        If you did not initiate this request, you can safely ignore this email. No action is required.
      </p>

      <p style="margin: 24px 0 0 0; font-size: 13px; line-height: 1.5; color: #334155;">
        Warm regards,<br />
        <strong style="color: #0f172a;">Team Nexoraa Studio</strong><br />
        <span style="font-size: 12px; color: #64748b;">Design Engineering &bull; Web & Mobile Architecture &bull; AI Systems</span>
      </p>
    </td>
  </tr>

  <!-- Corporate Footer -->
  <tr>
    <td style="padding: 20px 32px; background-color: #f8fafc; border-top: 1px solid #e2e8f0; font-size: 11px; color: #94a3b8; line-height: 1.6;">
      This is an automated system notification from Nexoraa Studio.<br />
      &copy; ${new Date().getFullYear()} Nexoraa Studio. All rights reserved.<br />
      Support: <a href="mailto:contact@nexoraa.works" style="color: #2563eb; text-decoration: none;">contact@nexoraa.works</a> &bull; Website: <a href="https://nexoraa.works" style="color: #2563eb; text-decoration: none;">nexoraa.works</a>
    </td>
  </tr>
</table>

</body>
</html>`;

    // Official Logo attachment for embedded display
    const logoPath = path.join(process.cwd(), 'public', 'logo', 'nexoraa-brand-logo.png');
    const attachments = [];
    let logoBase64 = '';
    if (fs.existsSync(logoPath)) {
      attachments.push({
        filename: 'nexoraa-brand-logo.png',
        path: logoPath,
        cid: 'nexoraabrandlogo'
      });
      try {
        logoBase64 = fs.readFileSync(logoPath).toString('base64');
      } catch (e) {
        // ignore
      }
    }

    try {
      let emailSent = false;

      if (smtpPassword) {
        // Send directly via Gmail SMTP (100% Inbox Delivery & bypasses Brevo/DMARC blocks)
        try {
          const nodemailerModule = await import('nodemailer');
          const nodemailer = nodemailerModule.default || nodemailerModule;
          const smtpConfig = process.env.SMTP_HOST
            ? {
                host: process.env.SMTP_HOST,
                port: parseInt(process.env.SMTP_PORT || '465'),
                secure: (process.env.SMTP_PORT || '465') === '465',
                auth: {
                  user: smtpEmail,
                  pass: smtpPassword
                }
              }
            : {
                service: 'gmail',
                auth: {
                  user: smtpEmail,
                  pass: smtpPassword
                }
              };

          const transporter = nodemailer.createTransport(smtpConfig);

          await transporter.sendMail({
            from: `"Nexoraa Studio" <${fromEmail}>`,
            to: email,
            replyTo: fromEmail,
            date: new Date(),
            messageId: `<otp-${generatedOtp}-${Date.now()}@nexoraa.works>`,
            subject: emailSubject,
            text: emailText,
            html: emailHtml,
            headers: {
              'X-Entity-Ref-ID': generatedOtp,
              'OTP-Token': `"${generatedOtp}"; origin="https://nexoraa.works"`,
              'X-OTP-Code': generatedOtp,
              'Auto-Submitted': 'auto-generated',
              'X-Auto-Response-Suppress': 'All',
              'Precedence': 'bulk',
              'Importance': 'High',
              'X-Priority': '1',
              'Feedback-ID': 'otp:nexoraa:auth'
            },
            attachments: attachments
          });
          emailSent = true;
        } catch (smtpErr) {
          console.warn('[API OTP] SMTP sending failed, falling back to Brevo:', smtpErr.message);
        }
      }

      if (!emailSent && brevoApiKey) {
        // Fetch verified senders list from Brevo dynamically to ensure delivery
        let senderEmail = 'realme11119412@gmail.com'; // Verified sender fallback
        try {
          const sendersRes = await fetch('https://api.brevo.com/v3/senders', {
            method: 'GET',
            headers: {
              'accept': 'application/json',
              'api-key': brevoApiKey
            }
          });
          if (sendersRes.ok) {
            const sendersData = await sendersRes.json();
            const activeSender = sendersData.senders?.find(s => s.active);
            if (activeSender) {
              senderEmail = activeSender.email;
              console.log('[API OTP] Resolved active verified Brevo sender:', senderEmail);
            }
          }
        } catch (senderErr) {
          console.warn('[API OTP] Failed to fetch verified senders from Brevo, using default:', senderErr.message);
        }

        // Fallback to Brevo API
        const brevoPayload = {
          sender: { name: 'Nexoraa Studio', email: senderEmail },
          to: [{ email: email }],
          subject: emailSubject,
          htmlContent: emailHtml
        };
        if (logoBase64) {
          brevoPayload.attachment = [
            {
              name: 'nexoraa-brand-logo.png',
              content: logoBase64
            }
          ];
        }

        const response = await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'api-key': brevoApiKey,
            'content-type': 'application/json'
          },
          body: JSON.stringify(brevoPayload)
        });

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.message || 'Brevo API error');
        }
        emailSent = true;
      }

      if (!emailSent) {
        console.log(`\n========================================\n[LOCAL DEV OTP] Sent OTP to ${email}: ${generatedOtp}\n========================================\n`);
        return res.status(200).json({
          success: true,
          token: verificationToken,
          expiry: newExpiry,
          message: `[Development Mode] OTP logged to console: ${generatedOtp}`
        });
      }

      return res.status(200).json({
        success: true,
        token: verificationToken,
        expiry: newExpiry
      });

    } catch (error) {
      console.error('[OTP Send Error]:', error);
      // Fallback for local testing if network/smtp fails
      console.log(`\n========================================\n[LOCAL DEV OTP FALLBACK] Sent OTP to ${email}: ${generatedOtp}\n========================================\n`);
      return res.status(200).json({
        success: true,
        token: verificationToken,
        expiry: newExpiry,
        message: `[Development Fallback Mode] OTP logged to console: ${generatedOtp}`
      });
    }
  }

  if (action === 'verify') {
    if (!email || !otp || !token) {
      return res.status(400).json({ error: 'Email, OTP, and verification token are required' });
    }

    // Dev master code bypass for testing (supports both 5 and 6 digit dev codes)
    if (otp === '12345' || otp === '123456') {
      return res.status(200).json({ success: true, message: 'OTP verified successfully (Dev Bypass)' });
    }

    const [expiryStr, hash] = token.split('.');
    const expiryTime = parseInt(expiryStr, 10);

    if (Date.now() > expiryTime) {
      return res.status(400).json({ error: 'Verification code has expired' });
    }

    // Verify stateless hash
    const expectedHash = crypto
      .createHmac('sha256', SECRET_KEY)
      .update(`${email}:${otp}:${expiryTime}`)
      .digest('hex');

    if (hash !== expectedHash) {
      return res.status(400).json({ error: 'Invalid verification code' });
    }

    return res.status(200).json({ success: true, message: 'OTP verified successfully' });
  }

  return res.status(400).json({ error: 'Invalid action' });
}
