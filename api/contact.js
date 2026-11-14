import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, service, message, budget, source } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required fields' });
  }

  const adminEmail = process.env.ADMIN_EMAIL || 'contact@nexoraa.works';
  const resolvedSmtpEmail = process.env.SMTP_EMAIL || 'contact@nexoraa.works';
  const resolvedSmtpPassword = process.env.SMTP_PASSWORD || process.env.GMAIL_APP_PASSWORD || process.env.EMAIL_PASSWORD;
  const brevoApiKey = process.env.BREVO_API_KEY;
  const resendApiKey = process.env.RESEND_API_KEY;

  console.log('[API Contact] Inquiry details received:', { name, email, phone, service, budget, source });

  const submissionTime = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'short'
  });

  // Sleek, Executive Studio-Grade Email Template (Clean, modern & ultra-professional)
  const emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Project Inquiry</title>
</head>
<body style="margin: 0; padding: 24px 12px; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; color: #0f172a; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center">
        <!-- Main Card -->
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(15, 23, 42, 0.04);">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #090d16; padding: 28px 32px; border-bottom: 2px solid #00F5FF;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <div style="font-size: 20px; font-weight: 800; color: #ffffff; letter-spacing: -0.3px; margin-bottom: 4px;">
                      NEXORAA STUDIO
                    </div>
                    <div style="font-size: 13px; color: #94a3b8; font-weight: 500;">
                      New Project Inquiry Notification
                    </div>
                  </td>
                  <td align="right" valign="middle">
                    <span style="display: inline-block; padding: 5px 12px; background-color: rgba(0, 245, 255, 0.1); border: 1px solid rgba(0, 245, 255, 0.3); border-radius: 20px; font-size: 11px; font-weight: 700; color: #00F5FF; letter-spacing: 0.8px; text-transform: uppercase;">
                      New Lead
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Client Overview Table -->
          <tr>
            <td style="padding: 28px 32px 16px;">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.2px; color: #64748b; margin-bottom: 12px;">
                Client Specification
              </div>

              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="border: 1px solid #f1f5f9; border-radius: 8px; overflow: hidden; background-color: #f8fafc;">
                <tr>
                  <td width="35%" style="padding: 12px 18px; font-size: 13px; color: #64748b; font-weight: 600; border-bottom: 1px solid #edf2f7;">
                    Full Name
                  </td>
                  <td style="padding: 12px 18px; font-size: 14px; color: #0f172a; font-weight: 700; border-bottom: 1px solid #edf2f7;">
                    ${name}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 18px; font-size: 13px; color: #64748b; font-weight: 600; border-bottom: 1px solid #edf2f7;">
                    Email Address
                  </td>
                  <td style="padding: 12px 18px; font-size: 14px; border-bottom: 1px solid #edf2f7;">
                    <a href="mailto:${email}" style="color: #0284c7; text-decoration: none; font-weight: 600;">${email}</a>
                  </td>
                </tr>
                ${phone ? `
                <tr>
                  <td style="padding: 12px 18px; font-size: 13px; color: #64748b; font-weight: 600; border-bottom: 1px solid #edf2f7;">
                    Phone Number
                  </td>
                  <td style="padding: 12px 18px; font-size: 14px; color: #0f172a; font-weight: 600; border-bottom: 1px solid #edf2f7;">
                    <a href="tel:${phone}" style="color: #0f172a; text-decoration: none;">${phone}</a>
                  </td>
                </tr>
                ` : ''}
                ${service ? `
                <tr>
                  <td style="padding: 12px 18px; font-size: 13px; color: #64748b; font-weight: 600; border-bottom: 1px solid #edf2f7;">
                    Selected Service
                  </td>
                  <td style="padding: 12px 18px; font-size: 14px; color: #0284c7; font-weight: 700; border-bottom: 1px solid #edf2f7;">
                    ${service}
                  </td>
                </tr>
                ` : ''}
                ${budget ? `
                <tr>
                  <td style="padding: 12px 18px; font-size: 13px; color: #64748b; font-weight: 600; border-bottom: 1px solid #edf2f7;">
                    Budget / Scope
                  </td>
                  <td style="padding: 12px 18px; font-size: 14px; color: #0f172a; font-weight: 600; border-bottom: 1px solid #edf2f7;">
                    ${budget}
                  </td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 12px 18px; font-size: 13px; color: #64748b; font-weight: 600;">
                    Received At
                  </td>
                  <td style="padding: 12px 18px; font-size: 13px; color: #334155; font-weight: 500;">
                    ${submissionTime} (IST)
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message Section -->
          <tr>
            <td style="padding: 12px 32px 32px;">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.2px; color: #64748b; margin-bottom: 10px;">
                Project Details & Requirements
              </div>
              <div style="background-color: #f8fafc; border-left: 3px solid #00F5FF; border-radius: 4px; padding: 18px 20px; font-size: 14px; line-height: 1.7; color: #1e293b; white-space: pre-wrap; word-break: break-word;">${message}</div>
            </td>
          </tr>

          <!-- Clean Professional Footer -->
          <tr>
            <td style="background-color: #f1f5f9; padding: 18px 32px; border-top: 1px solid #e2e8f0; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #64748b;">
                Nexoraa Studio · Lead Notification System · <a href="https://nexoraa.works" style="color: #0284c7; text-decoration: none; font-weight: 500;">nexoraa.works</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  // Clean Plain Text Fallback
  const emailText = `
NEXORAA STUDIO — NEW PROJECT INQUIRY
====================================
Client Name:    ${name}
Email Address:  ${email}
${phone ? `Phone Number:   ${phone}\n` : ''}${service ? `Service:        ${service}\n` : ''}${budget ? `Budget / Scope: ${budget}\n` : ''}Date & Time:    ${submissionTime} (IST)

PROJECT REQUIREMENTS:
------------------------------------
${message}
------------------------------------

Nexoraa Studio · Lead Notification System
  `.trim();

  const subject = `🚀 New Project Inquiry: ${name} — ${service || 'Nexoraa'}`;
  let lastError = null;

  // 1. PRIMARY PROVIDER: Direct Hostinger / Custom SMTP
  if (resolvedSmtpEmail && resolvedSmtpPassword) {
    try {
      console.log('[API Contact] Sending professional email via SMTP to:', adminEmail);
      const smtpConfig = process.env.SMTP_HOST
        ? {
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || '465'),
            secure: (process.env.SMTP_PORT || '465') === '465',
            auth: {
              user: resolvedSmtpEmail,
              pass: resolvedSmtpPassword
            }
          }
        : {
            service: 'gmail',
            auth: {
              user: resolvedSmtpEmail,
              pass: resolvedSmtpPassword
            }
          };

      const transporter = nodemailer.createTransport(smtpConfig);

      // replyTo ensures Hostinger's native "Reply" button sends directly to the client
      await transporter.sendMail({
        from: `"Nexoraa Studio" <${resolvedSmtpEmail}>`,
        to: adminEmail,
        replyTo: `"${name}" <${email}>`,
        subject: subject,
        text: emailText,
        html: emailHtml
      });

      console.log('[API Contact] Professional inquiry sent successfully via SMTP to:', adminEmail);
      return res.status(200).json({ success: true, message: 'Inquiry sent successfully via SMTP' });
    } catch (smtpErr) {
      console.warn('[API Contact] SMTP transport failed, trying next provider:', smtpErr.message);
      lastError = smtpErr;
    }
  }

  // 2. FALLBACK PROVIDER: Brevo API
  if (brevoApiKey) {
    try {
      console.log('[API Contact] Sending via Brevo API to:', adminEmail);
      let senderEmail = process.env.BREVO_SENDER || 'contact@nexoraa.works';
      
      const response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'api-key': brevoApiKey,
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          sender: { name: 'Nexoraa Studio', email: senderEmail },
          to: [{ email: adminEmail, name: 'Nexoraa Admin' }],
          replyTo: { email: email, name: name },
          subject: subject,
          textContent: emailText,
          htmlContent: emailHtml
        })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || `Brevo API HTTP ${response.status}`);
      }

      console.log('[API Contact] Inquiry sent successfully via Brevo');
      return res.status(200).json({ success: true, message: 'Inquiry sent successfully via Brevo' });
    } catch (brevoErr) {
      console.warn('[API Contact] Brevo API failed, trying next provider:', brevoErr.message);
      lastError = brevoErr;
    }
  }

  // 3. FALLBACK PROVIDER: Resend API
  if (resendApiKey) {
    try {
      console.log('[API Contact] Sending via Resend API to:', adminEmail);
      const senderEmail = process.env.RESEND_SENDER || 'onboarding@resend.dev';

      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: `Nexoraa <${senderEmail}>`,
          to: adminEmail,
          reply_to: email,
          subject: subject,
          text: emailText,
          html: emailHtml
        })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || `Resend API HTTP ${response.status}`);
      }

      console.log('[API Contact] Inquiry sent successfully via Resend');
      return res.status(200).json({ success: true, message: 'Inquiry sent successfully via Resend' });
    } catch (resendErr) {
      console.warn('[API Contact] Resend API failed:', resendErr.message);
      lastError = resendErr;
    }
  }

  return res.status(500).json({
    error: 'Failed to dispatch contact inquiry email',
    details: lastError ? lastError.message : 'No email credentials configured'
  });
}
