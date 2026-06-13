import nodemailer from 'nodemailer';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

  const { firstName, lastName, email, purpose } = req.body;

  if (!firstName || !lastName || !email || !purpose) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const resolvedSmtpEmail = process.env.SMTP_EMAIL || 'nexoraa.works@gmail.com';
  const resolvedSmtpPassword = process.env.SMTP_PASSWORD || process.env.GMAIL_APP_PASSWORD || process.env.EMAIL_PASSWORD;

  console.log('[API Send-Agreement] Environment keys check:', {
    BREVO_API_KEY: process.env.BREVO_API_KEY ? `Present (len: ${process.env.BREVO_API_KEY.length})` : 'Missing',
    SMTP_EMAIL: resolvedSmtpEmail ? 'Present' : 'Missing',
    SMTP_PASSWORD: resolvedSmtpPassword ? 'Present' : 'Missing',
  });

  try {
    const fullName = `${firstName} ${lastName}`;
    const siteUrl = process.env.SITE_URL || 'https://nexoraa.works';

    // HTML Emails
    const clientHtml = `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0B1120; color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1);">
          <div style="background: linear-gradient(135deg, #1a1a2e 0%, #0B1120 100%); padding: 40px 30px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.05);">
            <h1 style="margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px; color: #ffffff;">Nexora Studio</h1>
            <p style="margin: 8px 0 0; color: #6b7280; font-size: 13px;">Client Agreement Document</p>
          </div>
          <div style="padding: 30px;">
            <p style="color: #d1d5db; font-size: 15px; line-height: 1.7; margin: 0 0 20px;">
              Hi <strong style="color: #ffffff;">${fullName}</strong>,
            </p>
            <p style="color: #d1d5db; font-size: 15px; line-height: 1.7; margin: 0 0 20px;">
              Thank you for your interest in working with Nexora Studio. Please find the Client Agreement attached to this email.
            </p>
            <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 20px; margin: 24px 0;">
              <p style="margin: 0 0 8px; font-size: 12px; color: #6b7280; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Your Details</p>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="color: #9ca3af; padding: 6px 0; font-size: 14px;">Name</td><td style="color: #ffffff; padding: 6px 0; font-size: 14px; text-align: right;">${fullName}</td></tr>
                <tr><td style="color: #9ca3af; padding: 6px 0; font-size: 14px;">Email</td><td style="color: #ffffff; padding: 6px 0; font-size: 14px; text-align: right;">${email}</td></tr>
                <tr><td style="color: #9ca3af; padding: 6px 0; font-size: 14px;">DOB</td><td style="color: #ffffff; padding: 6px 0; font-size: 14px; text-align: right;">${dob}</td></tr>
                <tr><td style="color: #9ca3af; padding: 6px 0; font-size: 14px;">Purpose</td><td style="color: #ffffff; padding: 6px 0; font-size: 14px; text-align: right;">${purpose}</td></tr>
              </table>
            </div>
            <p style="color: #d1d5db; font-size: 15px; line-height: 1.7; margin: 0 0 20px;">
              You can also download the agreement directly:
            </p>
            <div style="text-align: center; margin: 24px 0;">
              <a href="${siteUrl}/Video/Nexoraa_Client_Agreement.pdf" style="display: inline-block; background: linear-gradient(135deg, #5BA4E6, #8B5CF6); color: #ffffff; padding: 14px 32px; border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 14px; letter-spacing: 0.5px;">
                📄 Download Agreement PDF
              </a>
            </div>
            <p style="color: #6b7280; font-size: 13px; line-height: 1.6; margin: 24px 0 0; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 20px;">
              If you have any questions, feel free to reply to this email or contact us at <a href="mailto:Nexoraa.works@gmail.com" style="color: #5BA4E6; text-decoration: none;">Nexoraa.works@gmail.com</a>
            </p>
          </div>
          <div style="background: rgba(255,255,255,0.02); padding: 20px 30px; text-align: center; border-top: 1px solid rgba(255,255,255,0.05);">
            <p style="margin: 0; color: #4b5563; font-size: 12px;">
              © ${new Date().getFullYear()} Nexora Studio. All rights reserved.
            </p>
          </div>
        </div>
    `;

    const adminHtml = `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>New Client Agreement Request</h2>
          <table style="border-collapse: collapse; width: 100%;">
            <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Name</td><td style="padding: 8px; border: 1px solid #ddd;">${fullName}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email</td><td style="padding: 8px; border: 1px solid #ddd;">${email}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Purpose</td><td style="padding: 8px; border: 1px solid #ddd;">${purpose}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Time</td><td style="padding: 8px; border: 1px solid #ddd;">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</td></tr>
          </table>
        </div>
    `;

    // Read local PDF file for buffer
    let pdfBuffer;
    try {
      const apiPdfPath = join(__dirname, 'Nexoraa_Client_Agreement.pdf');
      pdfBuffer = readFileSync(apiPdfPath);
    } catch (apiErr) {
      console.warn('Could not read PDF from api folder:', apiErr.message);
      try {
        const localPdfPath = join(process.cwd(), 'public', 'Video', 'Nexoraa_Client_Agreement.pdf');
        pdfBuffer = readFileSync(localPdfPath);
      } catch (e) {
        console.warn('Could not read local public PDF buffer:', e.message);
      }
    }

    const brevoApiKey = process.env.BREVO_API_KEY;

    // 1. BREVO PROVIDER (API-based, no App Password needed)
    if (brevoApiKey) {
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
            console.log('[API Send-Agreement] Resolved active verified Brevo sender:', senderEmail);
          }
        }
      } catch (senderErr) {
        console.warn('[API Send-Agreement] Failed to fetch verified senders from Brevo, using default:', senderErr.message);
      }

      const payload = {
        sender: { name: 'Nexora Studio', email: senderEmail },
        to: [{ email: email, name: fullName }],
        subject: '📄 Nexora Client Agreement',
        htmlContent: clientHtml,
      };

      if (pdfBuffer) {
        payload.attachment = [
          {
            content: pdfBuffer.toString('base64'),
            name: 'Nexoraa_Client_Agreement.pdf'
          }
        ];
      } else {
        payload.attachment = [
          {
            url: `${siteUrl}/Video/Nexoraa_Client_Agreement.pdf`,
            name: 'Nexoraa_Client_Agreement.pdf'
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
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Brevo API error');
      }

      // Notification email to admin
      const adminEmail = process.env.ADMIN_EMAIL || 'nexoraa.works@gmail.com';
      await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'api-key': brevoApiKey,
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          sender: { name: 'Agreement Portal', email: senderEmail },
          to: [{ email: adminEmail, name: 'Nexora Admin' }],
          subject: `📋 New Agreement Request — ${fullName}`,
          htmlContent: adminHtml
        })
      });

      return res.status(200).json({ success: true, message: 'Agreement sent successfully via Brevo' });
    }

    // 2. RESEND PROVIDER (API-based, no App Password needed)
    if (process.env.RESEND_API_KEY) {
      const payload = {
        from: 'Nexora Studio <onboarding@resend.dev>', // Default Resend test domain sender
        to: email,
        subject: '📄 Nexora Client Agreement',
        html: clientHtml,
      };

      // Add verified custom domain if set in environment
      if (process.env.RESEND_SENDER) {
        payload.from = process.env.RESEND_SENDER;
      }

      if (pdfBuffer) {
        payload.attachments = [
          {
            filename: 'Nexoraa_Client_Agreement.pdf',
            content: pdfBuffer.toString('base64')
          }
        ];
      }

      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Resend API error');
      }

      // Send admin notification
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: payload.from,
          to: 'nexoraa.works@gmail.com',
          subject: `📋 New Agreement Request — ${fullName}`,
          html: adminHtml
        })
      });

      return res.status(200).json({ success: true, message: 'Agreement sent successfully via Resend' });
    }

    const smtpEmail = process.env.SMTP_EMAIL || 'nexoraa.works@gmail.com';
    const smtpPassword = process.env.SMTP_PASSWORD || process.env.GMAIL_APP_PASSWORD || process.env.EMAIL_PASSWORD;

    // 3. SMTP PROVIDER (Gmail/Outlook fallback)
    if (smtpEmail && smtpPassword) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: smtpEmail,
          pass: smtpPassword,
        },
      });

      const clientMailOptions = {
        from: `"Nexora Studio" <${smtpEmail}>`,
        to: email,
        subject: '📄 Nexora Client Agreement',
        html: clientHtml,
        attachments: [
          {
            filename: 'Nexoraa_Client_Agreement.pdf',
            content: pdfBuffer || `${siteUrl}/Video/Nexoraa_Client_Agreement.pdf`
          }
        ]
      };

      const adminMailOptions = {
        from: `"Agreement Portal" <${smtpEmail}>`,
        to: smtpEmail,
        subject: `📋 New Agreement Request — ${fullName}`,
        html: adminHtml
      };

      await transporter.sendMail(clientMailOptions);
      await transporter.sendMail(adminMailOptions);

      return res.status(200).json({ success: true, message: 'Agreement sent successfully via SMTP' });
    }

    throw new Error('No email provider API keys or SMTP credentials found in environment variables.');

  } catch (error) {
    console.error('Email send error:', error);
    return res.status(500).json({ 
      error: 'Failed to send email', 
      details: error.message 
    });
  }
}
