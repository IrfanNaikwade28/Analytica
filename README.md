# Analytica

IndustryX registration app built with React + Vite, Supabase, Tailwind.

## Setup

1) Install dependencies

```powershell
npm install
```

2) Environment variables

Create a `.env` file (see `.env.example` for a template). Minimal SMTP (Gmail) example:

```ini
EMAIL_PROVIDER=smtp

SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your@gmail.com
SMTP_PASS=YOUR_GMAIL_APP_PASSWORD
SMTP_FROM="Analytica DSSA <your@gmail.com>"

VITE_SUPABASE_URL=...your supabase url...
VITE_SUPABASE_ANON_KEY=...your supabase anon key...
```

Notes:
- Gmail requires an App Password (Google Account → Security → 2‑Step Verification → App passwords).
- If you later verify a custom domain in Resend, you can switch to `EMAIL_PROVIDER=auto` with `RESEND_API_KEY` and `RESEND_FROM=no-reply@yourdomain.com`.

3) Local run with API routes

Vite alone won’t serve `/api/*`. Use Vercel CLI to run the frontend and serverless functions together:

```powershell
# one-time
npm install -g vercel
vercel login
vercel link

# run
vercel dev
```

Open the printed URL (usually http://localhost:3000). Submitting the registration form should send confirmation emails.

## Email Confirmation

After a successful IndustryX team registration, the app triggers a serverless function (`/api/sendEmail`) that sends a confirmation email to the team leader using Resend.

- Backend function: `api/sendEmail.js`
- Client helper: `src/lib/sendEmail.js`
- Trigger point: `src/pages/IndustryX.jsx` (after Supabase insert)

Notes:

- Email sending is fire-and-forget and won’t block the UI. Errors are logged to the console.
- The subject line is: `🎉 IndustryX Registration Confirmation – Team {team_name}`

Local dev:
- Use `vercel dev` so `/api/sendEmail` works.
- Providers:
  - SMTP (recommended with Gmail): set `EMAIL_PROVIDER=smtp` and SMTP_* vars.
  - Resend: set `RESEND_API_KEY` and `RESEND_FROM` (requires verified domain to email anyone).

Deploy on Vercel:
- Add the same env vars in Project Settings → Environment Variables (Preview + Production) and redeploy.
