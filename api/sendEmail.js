/* eslint-env node */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' })
    return
  }

  const apiKey = process.env.RESEND_API_KEY
  const SMTP_HOST = process.env.SMTP_HOST
  const SMTP_PORT = Number(process.env.SMTP_PORT || 0)
  const SMTP_USER = process.env.SMTP_USER
  const SMTP_PASS = process.env.SMTP_PASS
  const SMTP_FROM = process.env.SMTP_FROM

  try {
    const {
      leader_name,
      leader_email,
      team_name,
      leader_phone,
      division,
      year_of_study,
      problem1_title,
      problem2_title,
      problem3_title,
    } = req.body || {}

    if (!leader_email || !team_name || !leader_name) {
      res.status(400).json({ error: 'Missing required fields' })
      return
    }

    const subject = `🎉 IndustryX Registration Confirmation – Team ${team_name}`

    const html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>IndustryX Registration Successful</title>
    <style>
      body { font-family: "Inter", sans-serif; background-color: #f9fafb; margin: 0; padding: 0; }
      .container { max-width: 600px; margin: 30px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.08); }
      .header { background-color: #2563eb; color: white; text-align: center; padding: 20px 0; font-size: 1.3rem; font-weight: 600; }
      .content { padding: 25px; color: #111827; }
      .team { background: #f3f4f6; padding: 15px; border-radius: 8px; margin-top: 10px; }
      .problems { background: #eef2ff; padding: 10px; border-radius: 8px; margin-top: 10px; }
      .footer { text-align: center; color: #6b7280; font-size: 0.85rem; padding: 15px; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">🎉 Registration Successful!</div>
      <div class="content">
        <p>Hi <strong>${escapeHtml(leader_name)}</strong>,</p>
        <p>
          Your team <strong>${escapeHtml(team_name)}</strong> has been successfully registered
          for the <strong>IndustryX Event</strong> organized by DSSA.
        </p>

        <div class="team">
          <p><strong>Team Name:</strong> ${escapeHtml(team_name)}</p>
          <p><strong>Leader:</strong> ${escapeHtml(leader_name)} (${escapeHtml(leader_email)})</p>
          <p><strong>Phone:</strong> ${escapeHtml(leader_phone || '-') }</p>
          <p><strong>Division:</strong> ${escapeHtml(division || '-')}, Year: ${escapeHtml(year_of_study || '-')}</p>
        </div>

        <h3>🧩 Problem Statements</h3>
        <div class="problems">
          <p>1️⃣ ${escapeHtml(problem1_title || '-')}</p>
          <p>2️⃣ ${escapeHtml(problem2_title || '-')}</p>
          <p>3️⃣ ${escapeHtml(problem3_title || '-')}</p>
        </div>

        <p>
          Thank you for registering! Keep an eye on your inbox — more event details will follow soon.
        </p>
      </div>
      <div class="footer">
        © 2025 Analytica DSSA | Data Science Student Association
      </div>
    </div>
  </body>
</html>`

    // Prefer Resend when configured, else fall back to SMTP (for local/dev)
    if (apiKey) {
      const resp = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Analytica DSSA <onboarding@resend.dev>',
          to: [leader_email],
          subject,
          html,
        }),
      })

      if (!resp.ok) {
        const text = await resp.text().catch(() => '')
        console.error('Resend error:', resp.status, text)
        res.status(502).json({ error: 'Failed to send email via Resend' })
        return
      }

      const json = await resp.json().catch(() => ({}))
      res.status(200).json({ ok: true, id: json.id, provider: 'resend' })
      return
    }

    if (SMTP_HOST && SMTP_PORT && SMTP_FROM) {
      const nodemailer = (await import('nodemailer')).default
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_PORT === 465, // true for 465, false for others
        auth: SMTP_USER && SMTP_PASS ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
      })

      const info = await transporter.sendMail({
        from: SMTP_FROM,
        to: leader_email,
        subject,
        html,
      })
      res.status(200).json({ ok: true, id: info?.messageId, provider: 'smtp' })
      return
    }

    console.error('Email not configured: missing RESEND_API_KEY or SMTP_* env vars')
    res.status(500).json({ error: 'Server not configured for email' })
  } catch (e) {
    console.error('Email handler error:', e)
    res.status(500).json({ error: 'Unexpected error' })
  }
}

// Simple HTML escaping to avoid breaking the template
function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
