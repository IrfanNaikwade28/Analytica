# Analytica

IndustryX registration app built with React + Vite, Supabase, Tailwind.

## Setup

1. Install dependencies

```bash
npm install
```

2. Create a `.env` file at the project root and add:

```bash
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
RESEND_API_KEY=...
```

Configure the same variables in Vercel Project Settings → Environment Variables for deployments.

## Email Confirmation

After a successful IndustryX team registration, the app triggers a serverless function (`/api/sendEmail`) that sends a confirmation email to the team leader using Resend.

- Backend function: `api/sendEmail.js`
- Client helper: `src/lib/sendEmail.js`
- Trigger point: `src/pages/IndustryX.jsx` (after Supabase insert)

Notes:

- Email sending is fire-and-forget and won’t block the UI. Errors are logged to the console.
- The subject line is: `🎉 IndustryX Registration Confirmation – Team {team_name}`

Local dev:
- Vite’s dev server doesn’t run serverless functions. Use the Vercel CLI: `vercel dev` so `/api/sendEmail` is available, and set env vars in `.env`.
- You can use either provider locally:
	- Resend: set `RESEND_API_KEY=...`
	- SMTP: set `SMTP_HOST`, `SMTP_PORT`, `SMTP_FROM`, and optionally `SMTP_USER`, `SMTP_PASS`
	- The function prefers Resend if set; otherwise it falls back to SMTP.
