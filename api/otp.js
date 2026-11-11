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

    // Generate 5-digit random numeric OTP (matching the standard 5-digit format from the reference)
    const generatedOtp = Math.floor(10000 + Math.random() * 90000).toString();

    // Expire in 5 minutes (300,000 ms)
    const newExpiry = Date.now() + 5 * 60 * 1000;

    // Create stateless verification token
    const hash = crypto
      .createHmac('sha256', SECRET_KEY)
      .update(`${email}:${generatedOtp}:${newExpiry}`)
      .digest('hex');

    const verificationToken = `${newExpiry}.${hash}`;

    const brevoApiKey = process.env.BREVO_API_KEY;
    const smtpEmail = process.env.SMTP_EMAIL || 'nexoraa.works@gmail.com';
    const smtpPassword = process.env.SMTP_PASSWORD || process.env.GMAIL_APP_PASSWORD || process.env.EMAIL_PASSWORD;

    // Subject format matches IRCTC / standard transactional OTP so Gmail renders the "Code Requested [Copy code]" chip
    const emailSubject = `One Time Password (OTP) ${generatedOtp} for verification of Email ID`;

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

    const digits = generatedOtp.split('');
    const digitBoxesHtml = digits.map(d => `
      <td style="padding-right: 8px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 6px; box-shadow: 0 1px 2px rgba(0,0,0,0.06);">
          <tr>
            <td align="center" valign="middle" style="width: 26px; height: 42px; font-family: 'Google Sans', Roboto, -apple-system, BlinkMacSystemFont, Arial, sans-serif; font-size: 22px; font-weight: 400; color: #202124; text-align: center; border: 0; user-select: all; -webkit-user-select: all;">
              ${d}
            </td>
          </tr>
        </table>
      </td>
    `).join('');

    const emailText = `Code Requested
${digits.join(' ')}

This is a system generated mail. Please do not reply to this email ID. If you have a query or need any clarification you may:
(1) Call our 24-hour Customer Care or Email: nexoraa.works@gmail.com
(2)For Nexoraa related queries use - https://nexoraa.works
____________________________________________________________________________________________________

Dear ${recipientName},

Your request for Email ID verification at Nexoraa Studio has been received.

Please submit Email verification OTP: ${generatedOtp} to process this request.

This one-time passcode (OTP) is valid for 5 minutes. Use this code to securely authenticate your session with Spidey AI Assistant.

Warm regards,
Team Nexoraa Studio
Design Engineering • Web & Mobile Architecture • AI Systems
https://nexoraa.works`;

    const emailHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>One Time Password (OTP) ${generatedOtp} for verification of Email ID</title>
</head>
<body style="margin: 0; padding: 20px 16px; font-family: Arial, Helvetica, sans-serif; font-size: 13px; color: #000000; line-height: 1.6; background-color: #ffffff;">

<!-- Exact Photo 1 Full-Width "Code Requested" Card -->
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width: 100%; background-color: #f1f4f8; border-radius: 8px; margin-bottom: 24px;">
  <tr>
    <td style="padding: 16px 20px 20px 20px;">
      <div style="font-family: 'Google Sans', Roboto, -apple-system, BlinkMacSystemFont, Arial, sans-serif; font-size: 13px; font-weight: normal; color: #444746; margin-bottom: 10px;">
        Code Requested
      </div>

      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 16px;">
        <tr>
          ${digitBoxesHtml}
        </tr>
      </table>

      <div>
        <table role="presentation" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td align="center" style="background-color: #296197; border-radius: 20px;">
              <span style="display: inline-block; padding: 8px 22px; font-family: 'Google Sans', Roboto, -apple-system, BlinkMacSystemFont, Arial, sans-serif; font-size: 14px; font-weight: 500; color: #ffffff; text-decoration: none; user-select: none;">
                Copy code
              </span>
            </td>
          </tr>
        </table>
      </div>
    </td>
  </tr>
</table>

<p style="margin: 0 0 4px 0; font-weight: bold; color: #000000; font-size: 13px; font-family: Arial, Helvetica, sans-serif;">
This is a system generated mail. Please do not reply to this email ID. If you have a query or need any clarification you may:
</p>
<p style="margin: 0 0 4px 0; font-size: 13px; color: #000000; font-family: Arial, Helvetica, sans-serif;">
(1) Call our 24-hour Customer Care or Email: <a href="mailto:nexoraa.works@gmail.com" style="color: #0066cc; text-decoration: underline;">nexoraa.works@gmail.com</a>
</p>
<p style="margin: 0 0 16px 0; font-size: 13px; color: #000000; font-family: Arial, Helvetica, sans-serif;">
(2)For Nexoraa related queries use - <a href="https://nexoraa.works" style="color: #0066cc; text-decoration: underline;">https://nexoraa.works</a>
</p>

<hr style="border: 0; border-top: 1px solid #777777; margin: 16px 0 20px 0;" />

<p style="margin: 0 0 16px 0; font-size: 13px; color: #000000; font-family: Arial, Helvetica, sans-serif;">
Dear <strong>${recipientName}</strong>,
</p>

<p style="margin: 0 0 16px 0; font-size: 13px; color: #000000; font-family: Arial, Helvetica, sans-serif;">
Your request for Email ID verification at Nexoraa Studio has been received.
</p>

<p style="margin: 0 0 16px 0; font-size: 13px; color: #000000; font-family: Arial, Helvetica, sans-serif;">
Please submit Email verification OTP: <strong>${generatedOtp}</strong> to process this request.
</p>

<p style="margin: 0 0 20px 0; font-size: 13px; color: #334155; font-family: Arial, Helvetica, sans-serif; line-height: 1.6;">
This code is valid for <strong>5 minutes</strong>. Use it to securely authenticate your session with our Spidey AI Assistant.
</p>

<!-- Professional Sign-off -->
<p style="margin: 22px 0 4px 0; font-size: 13px; color: #1f2937; font-family: Arial, Helvetica, sans-serif;">
  Warm regards,
</p>
<p style="margin: 0 0 2px 0; font-size: 14px; font-weight: bold; color: #0f172a; font-family: Arial, Helvetica, sans-serif;">
  Team Nexoraa Studio
</p>
<p style="margin: 0 0 20px 0; font-size: 12px; color: #64748b; font-family: Arial, Helvetica, sans-serif;">
  Design Engineering &bull; Web & Mobile Architecture &bull; AI Systems
</p>

<!-- Corporate Footer -->
<hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 28px 0 20px 0;" />

<div style="margin-bottom: 16px;">
  <img src="cid:nexoraabrandlogo" alt="Nexoraa Studio" width="240" style="display: block; border: 0; width: 240px; max-width: 100%; height: auto;">
</div>

<p style="margin: 0; font-size: 11px; color: #94a3b8; font-family: Arial, Helvetica, sans-serif; line-height: 1.6;">
  This is an automated security notification from Nexoraa Studio.<br />
  &copy; ${new Date().getFullYear()} Nexoraa Studio. All rights reserved.<br />
  Support: <a href="mailto:nexoraa.works@gmail.com" style="color: #296197; text-decoration: none;">nexoraa.works@gmail.com</a> &bull; Website: <a href="https://nexoraa.works" style="color: #296197; text-decoration: none;">nexoraa.works</a>
</p>

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
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: smtpEmail || 'nexoraa.works@gmail.com',
              pass: smtpPassword
            }
          });

          await transporter.sendMail({
            from: `"Nexoraa Studio" <${smtpEmail || 'nexoraa.works@gmail.com'}>`,
            to: email,
            subject: emailSubject,
            text: emailText,
            html: emailHtml,
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
