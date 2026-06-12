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

  const { name, email, message, budget } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required fields' });
  }

  const adminEmail = process.env.ADMIN_EMAIL || 'nexoraa.works@gmail.com';
  const resolvedSmtpEmail = process.env.SMTP_EMAIL || 'nexoraa.works@gmail.com';
  const resolvedSmtpPassword = process.env.SMTP_PASSWORD || process.env.GMAIL_APP_PASSWORD || process.env.EMAIL_PASSWORD;
  const brevoApiKey = process.env.BREVO_API_KEY;
  const resendApiKey = process.env.RESEND_API_KEY;

  console.log('[API Contact] Inquiry details received:', { name, email, budget, hasMessage: !!message });

  // High-fidelity dark themed contact submission email template
  const emailHtml = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0B1120; color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1);">
      <div style="background: linear-gradient(135deg, #1a1a2e 0%, #0B1120 100%); padding: 40px 30px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.05);">
        <h1 style="margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px; color: #ffffff;">Nexora Studio</h1>
        <p style="margin: 8px 0 0; color: #00F5FF; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px;">New Project Inquiry</p>
      </div>
      <div style="padding: 30px;">
        <p style="color: #d1d5db; font-size: 15px; line-height: 1.7; margin: 0 0 20px;">
          Hello Nexora Team,
        </p>
        <p style="color: #d1d5db; font-size: 15px; line-height: 1.7; margin: 0 0 20px;">
          You have received a new project inquiry from the website contact form. Here are the client's details:
        </p>
        
        <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 20px; margin: 24px 0;">
          <p style="margin: 0 0 12px; font-size: 12px; color: #6b7280; text-transform: uppercase; letter-spacing: 1px; font-weight: 600; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 8px;">Inquiry Metadata</p>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="color: #9ca3af; padding: 8px 0; font-size: 14px; font-weight: 500;">Client Name</td>
              <td style="color: #ffffff; padding: 8px 0; font-size: 14px; text-align: right; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="color: #9ca3af; padding: 8px 0; font-size: 14px; font-weight: 500;">Email Address</td>
              <td style="color: #00F5FF; padding: 8px 0; font-size: 14px; text-align: right; font-weight: 600;"><a href="mailto:${email}" style="color: #00F5FF; text-decoration: none;">${email}</a></td>
            </tr>
            ${budget ? `
            <tr>
              <td style="color: #9ca3af; padding: 8px 0; font-size: 14px; font-weight: 500;">Project Budget</td>
              <td style="color: #ffffff; padding: 8px 0; font-size: 14px; text-align: right; font-weight: 600; color: #34D399;">${budget}</td>
            </tr>
            ` : ''}
            <tr>
              <td style="color: #9ca3af; padding: 8px 0; font-size: 14px; font-weight: 500;">Submitted At</td>
              <td style="color: #ffffff; padding: 8px 0; font-size: 14px; text-align: right; font-weight: 500;">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} (IST)</td>
            </tr>
          </table>
        </div>

        <p style="margin: 0 0 8px; font-size: 12px; color: #6b7280; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Message Detail</p>
        <div style="background: rgba(255,255,255,0.02); border-left: 3px solid #8B5CF6; border-radius: 4px; padding: 16px; margin: 12px 0 24px; color: #e5e7eb; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</div>

        <div style="text-align: center; margin: 24px 0 10px;">
          <a href="mailto:${email}?subject=Re: Your Project Inquiry with Nexora Studio" style="display: inline-block; background: linear-gradient(135deg, #00F5FF, #8B5CF6); color: #000000; padding: 14px 32px; border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 14px; letter-spacing: 0.5px; box-shadow: 0 4px 15px rgba(0, 245, 255, 0.3);">
            ✉️ Reply to Client
          </a>
        </div>
      </div>
      <div style="background: rgba(255,255,255,0.02); padding: 20px 30px; text-align: center; border-top: 1px solid rgba(255,255,255,0.05);">
        <p style="margin: 0; color: #4b5563; font-size: 12px;">
          © ${new Date().getFullYear()} Nexora Studio. All rights reserved.
        </p>
      </div>
    </div>
  `;

  try {
    // 1. BREVO SMTP PROVIDER (API-based, doesn't require SMTP username/password setup)
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
            console.log('[API Contact] Resolved active verified Brevo sender:', senderEmail);
          }
        }
      } catch (senderErr) {
        console.warn('[API Contact] Failed to fetch verified senders from Brevo, using default:', senderErr.message);
      }

      console.log('[API Contact] Sending via Brevo API key to:', adminEmail);

      const response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'api-key': brevoApiKey,
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          sender: { name: `Nexora Inquiry Portal`, email: senderEmail },
          to: [{ email: adminEmail, name: 'Nexora Admin' }],
          replyTo: { email: email, name: name },
          subject: `🚀 Nexora Inquiry: ${name} (${budget || 'Contact Page'})`,
          htmlContent: emailHtml
        })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Brevo API error');
      }

      return res.status(200).json({ success: true, message: 'Inquiry sent successfully via Brevo' });
    }

    // 2. RESEND PROVIDER
    if (resendApiKey) {
      console.log('[API Contact] Sending via Resend API to:', adminEmail);
      const senderEmail = process.env.RESEND_SENDER || 'inquiry@resend.dev';

      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: `Nexora Portal <${senderEmail}>`,
          to: adminEmail,
          reply_to: email,
          subject: `🚀 Nexora Inquiry: ${name} (${budget || 'Contact Page'})`,
          html: emailHtml
        })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Resend API error');
      }

      return res.status(200).json({ success: true, message: 'Inquiry sent successfully via Resend' });
    }

    // 3. SMTP PROVIDER (Gmail/Outlook fallback)
    if (resolvedSmtpEmail && resolvedSmtpPassword) {
      console.log('[API Contact] Sending via SMTP direct transport to:', adminEmail);
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: resolvedSmtpEmail,
          pass: resolvedSmtpPassword
        }
      });

      await transporter.sendMail({
        from: `"${name} via Nexora Portal" <${resolvedSmtpEmail}>`,
        to: adminEmail,
        replyTo: email,
        subject: `🚀 Nexora Inquiry: ${name} (${budget || 'Contact Page'})`,
        html: emailHtml
      });

      return res.status(200).json({ success: true, message: 'Inquiry sent successfully via SMTP' });
    }

    throw new Error('No email provider API keys (Brevo/Resend) or SMTP credentials configured in .env');

  } catch (error) {
    console.error('[API Contact Error]:', error);
    return res.status(500).json({
      error: 'Failed to dispatch contact inquiry email',
      details: error.message
    });
  }
}
