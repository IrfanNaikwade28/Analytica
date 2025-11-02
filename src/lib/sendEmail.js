// Client-side helper to request confirmation email. Non-blocking, logs errors.
export async function sendRegistrationConfirmationEmail(payload) {
  try {
    const res = await fetch('/api/sendEmail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      const text = await res.text().catch(() => '')
      console.error('sendEmail failed:', res.status, text)
    }
  } catch (e) {
    console.error('sendEmail network error:', e)
  }
}
