/* eslint-env node */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' })
    return
  }

  const apiKey = process.env.RESEND_API_KEY
  const RESEND_FROM = process.env.RESEND_FROM || 'onboarding@resend.dev'
  const EMAIL_PROVIDER = (process.env.EMAIL_PROVIDER || 'auto').toLowerCase() // 'auto' | 'resend' | 'smtp'
  const EMAIL_BCC = process.env.EMAIL_BCC
  const SMTP_HOST = process.env.SMTP_HOST
  const SMTP_PORT = Number(process.env.SMTP_PORT || 0)
  const SMTP_USER = process.env.SMTP_USER
  const SMTP_PASS = process.env.SMTP_PASS
  const SMTP_FROM = process.env.SMTP_FROM
  // If SMTP_FROM isn't explicitly set, default to the authenticated user with a nice display name
  const SMTP_FROM_EFF = SMTP_FROM || (SMTP_USER ? `Analytica DSSA <${SMTP_USER}>` : undefined)

  try {
    // Non-sensitive configuration snapshot to help diagnose provider selection in logs
    console.info('[sendEmail] config', {
      providerMode: EMAIL_PROVIDER,
      hasResendKey: Boolean(apiKey),
      hasSmtp:
        Boolean(SMTP_HOST) && Boolean(SMTP_PORT) && Boolean(SMTP_FROM_EFF),
    })

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
      recipients,
    } = req.body || {}

    if (!leader_email || !team_name || !leader_name) {
      res.status(400).json({ error: 'Missing required fields' })
      return
    }

    const subject = `🎉 IndustryX Registration Confirmation – Team ${team_name}`
    const toList = Array.isArray(recipients) && recipients.length
      ? recipients.filter(Boolean)
      : [leader_email]

    const text = `Hi ${leader_name},\n\nYour team "${team_name}" has been successfully registered for the IndustryX Event (DSSA).\n\nTeam\n- Leader: ${leader_name} (${leader_email})\n- Phone: ${leader_phone || '-'}\n- Division: ${division || '-'}  Year: ${year_of_study || '-'}\n\nProblem Statements\n1) ${problem1_title || '-'}\n2) ${problem2_title || '-'}\n3) ${problem3_title || '-'}\n\nThank you for registering! More event details will follow soon.\n\n— Analytica DSSA`

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

    // Decide provider
    const tryResendFirst = EMAIL_PROVIDER === 'resend' || (EMAIL_PROVIDER === 'auto' && apiKey)
  const trySmtpFirst = EMAIL_PROVIDER === 'smtp' && SMTP_HOST && SMTP_PORT && SMTP_FROM_EFF

    // Prefer Resend when configured (or forced), else SMTP
    if (tryResendFirst) {
      const resp = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: `Analytica DSSA <${RESEND_FROM}>`,
          to: toList,
          bcc: EMAIL_BCC ? [EMAIL_BCC] : undefined,
          reply_to: leader_email,
          subject,
          html,
          text,
        }),
      })

      if (!resp.ok) {
        // Try to read JSON response for better diagnostics
        let payload
        try {
          payload = await resp.clone().json()
        } catch {
          try { payload = { raw: await resp.text() } } catch { payload = {} }
        }
        console.error('Resend error:', resp.status, payload)

        // If Resend blocks test-mode addresses (403 validation_error) and SMTP is configured, fall back automatically
        const isValidation403 = resp.status === 403 && (payload?.name === 'validation_error' || payload?.statusCode === 403)
        if ((EMAIL_PROVIDER === 'auto' || EMAIL_PROVIDER === 'smtp') && isValidation403 && SMTP_HOST && SMTP_PORT && SMTP_FROM_EFF) {
          try {
            const nodemailer = (await import('nodemailer')).default
            const transporter = nodemailer.createTransport({
              host: SMTP_HOST,
              port: SMTP_PORT,
              secure: SMTP_PORT === 465,
              auth: SMTP_USER && SMTP_PASS ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
            })
            const info = await transporter.sendMail({
              from: SMTP_FROM_EFF,
              to: toList,
              bcc: EMAIL_BCC,
              replyTo: leader_email,
              subject,
              html,
              text,
            })
            res.status(200).json({ ok: true, id: info?.messageId, provider: 'smtp', fallbackFrom: 'resend-403' })
            return
          } catch (smtpErr) {
            console.error('SMTP fallback failed:', smtpErr)
            // continue to return the original resend error below
          }
        }

        res.status(502).json({ error: 'Failed to send email via Resend', details: payload })
        return
      }

      const json = await resp.json().catch(() => ({}))
      res.status(200).json({ ok: true, id: json.id, provider: 'resend' })
      return
    }

    if (trySmtpFirst || (SMTP_HOST && SMTP_PORT && SMTP_FROM_EFF && !apiKey)) {
      const nodemailer = (await import('nodemailer')).default
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_PORT === 465, // true for 465, false for others
        auth: SMTP_USER && SMTP_PASS ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
      })

      const info = await transporter.sendMail({
        from: SMTP_FROM_EFF,
        to: toList,
        bcc: EMAIL_BCC,
        replyTo: leader_email,
        subject,
        html,
        text,
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
