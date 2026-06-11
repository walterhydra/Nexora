import crypto from 'crypto';

const SECRET_KEY = process.env.OTP_SECRET || 'nexora-otp-secret-key-2026';

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

    // Generate 6-digit random numeric OTP
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

    // Expire in 5 minutes (300,000 ms)
    const newExpiry = Date.now() + 5 * 60 * 1000;

    // Create stateless verification token
    const hash = crypto
      .createHmac('sha256', SECRET_KEY)
      .update(`${email}:${generatedOtp}:${newExpiry}`)
      .digest('hex');

    const verificationToken = `${newExpiry}.${hash}`;

    const brevoApiKey = process.env.BREVO_API_KEY;
    const smtpEmail = process.env.SMTP_EMAIL;
    const smtpPassword = process.env.SMTP_PASSWORD;

    try {
      const emailHtml = `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 500px; margin: 0 auto; background: #0B1120; color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1);">
          <div style="background: linear-gradient(135deg, #1a1a2e 0%, #0B1120 100%); padding: 30px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.05);">
            <h1 style="margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px; color: #ffffff;">Nexora Studio</h1>
            <p style="margin: 6px 0 0; color: #6b7280; font-size: 12px;">Verification Code</p>
          </div>
          <div style="padding: 30px; text-align: center;">
            <p style="color: #d1d5db; font-size: 15px; margin: 0 0 24px;">
              Your one-time passcode (OTP) for Nexora Assistant is:
            </p>
            <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 16px; display: inline-block; font-size: 32px; font-weight: 800; letter-spacing: 6px; color: #00F5FF; margin-bottom: 24px;">
              ${generatedOtp}
            </div>
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">
              This code will expire in 5 minutes.
            </p>
          </div>
          <div style="background: rgba(255,255,255,0.02); padding: 16px; text-align: center; border-top: 1px solid rgba(255,255,255,0.05);">
            <p style="margin: 0; color: #4b5563; font-size: 11px;">
              © ${new Date().getFullYear()} Nexora Studio. All rights reserved.
            </p>
          </div>
        </div>
      `;

      if (brevoApiKey) {
        const senderEmail = process.env.BREVO_SENDER || 'realme11119412@gmail.com';
        const response = await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'api-key': brevoApiKey,
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            sender: { name: 'Nexora Studio', email: senderEmail },
            to: [{ email: email }],
            subject: `🔑 ${generatedOtp} is your Nexora Verification Code`,
            htmlContent: emailHtml
          })
        });

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.message || 'Brevo API error');
        }
      } else {
        throw new Error('No email provider setup found (BREVO_API_KEY is missing)');
      }

      return res.status(200).json({
        success: true,
        token: verificationToken,
        expiry: newExpiry
      });

    } catch (error) {
      console.error('[OTP Send Error]:', error);
      return res.status(500).json({ error: 'Failed to send OTP email', details: error.message });
    }
  }

  if (action === 'verify') {
    if (!email || !otp || !token) {
      return res.status(400).json({ error: 'Email, OTP, and verification token are required' });
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
