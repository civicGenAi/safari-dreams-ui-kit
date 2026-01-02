# Send Email Edge Function

This Supabase Edge Function handles sending emails for the DeMi Tours & Travel website.

## Environment Variables

Configure these in your Supabase project settings:

```bash
SMTP_HOST=mail.demitours.com          # Your Hostgator mail server
SMTP_PORT=587                         # Port for TLS (or 465 for SSL, 25 for no encryption)
SMTP_USER=info@demitours.com         # Your email username
SMTP_PASS=your_email_password        # Your email password
FROM_EMAIL=info@demitours.com        # From email address
FROM_NAME=DeMi Tours & Travel Africa # From name
```

## Deployment

### 1. Install Supabase CLI

```bash
npm install -g supabase
```

### 2. Login to Supabase

```bash
supabase login
```

### 3. Link to your project

```bash
supabase link --project-ref your-project-ref
```

### 4. Set environment variables (secrets)

```bash
supabase secrets set SMTP_HOST=mail.demitours.com
supabase secrets set SMTP_PORT=587
supabase secrets set SMTP_USER=info@demitours.com
supabase secrets set SMTP_PASS=your_actual_password
supabase secrets set FROM_EMAIL=info@demitours.com
supabase secrets set FROM_NAME="DeMi Tours & Travel Africa"
```

### 5. Deploy the function

```bash
supabase functions deploy send-email
```

## Testing Locally

### 1. Start Supabase locally

```bash
supabase start
```

### 2. Create a .env file in `supabase/.env`

```env
SMTP_HOST=mail.demitours.com
SMTP_PORT=587
SMTP_USER=info@demitours.com
SMTP_PASS=your_password
FROM_EMAIL=info@demitours.com
FROM_NAME=DeMi Tours & Travel Africa
```

### 3. Serve the function locally

```bash
supabase functions serve send-email --env-file supabase/.env
```

### 4. Test with curl

```bash
curl -i --location --request POST 'http://localhost:54321/functions/v1/send-email' \
  --header 'Authorization: Bearer YOUR_ANON_KEY' \
  --header 'Content-Type: application/json' \
  --data '{"to":"test@example.com","subject":"Test Email","html":"<h1>Hello!</h1><p>This is a test email.</p>"}'
```

## Usage in Frontend

The frontend code already calls this endpoint:

```typescript
await fetch('/api/send-email', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    to: 'info@demitours.com',
    subject: 'New Booking Request',
    html: '<h2>New Booking</h2><p>Details here...</p>'
  })
})
```

## Hostgator SMTP Settings

Common Hostgator SMTP configurations:

- **Server:** mail.yourdomain.com (or mail.demitours.com)
- **Port:**
  - 587 (TLS/STARTTLS - Recommended)
  - 465 (SSL)
  - 25 (No encryption - not recommended)
- **Username:** Your full email address (info@demitours.com)
- **Password:** Your email password
- **Encryption:** TLS

## Troubleshooting

### Email not sending

1. Check Supabase logs: `supabase functions logs send-email`
2. Verify SMTP credentials in Hostgator cPanel
3. Check if Hostgator requires SSL instead of TLS
4. Verify firewall/security settings allow SMTP connections

### Permission errors

Make sure the function has proper CORS headers set for your domain.

### Rate limiting

Consider implementing rate limiting to prevent abuse:
- Add Redis/Upstash for tracking requests
- Implement per-IP limits
- Add captcha for public forms

## Alternative: Using SendGrid/Mailgun

If Hostgator SMTP is problematic, you can easily switch to SendGrid or Mailgun:

### SendGrid Example

```typescript
const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${SENDGRID_API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    personalizations: [{ to: [{ email: to }] }],
    from: { email: FROM_EMAIL, name: FROM_NAME },
    subject: subject,
    content: [{ type: 'text/html', value: html }]
  })
})
```

### Mailgun Example

```typescript
const formData = new FormData()
formData.append('from', `${FROM_NAME} <${FROM_EMAIL}>`)
formData.append('to', to)
formData.append('subject', subject)
formData.append('html', html)

const response = await fetch(
  `https://api.mailgun.net/v3/${MAILGUN_DOMAIN}/messages`,
  {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${btoa(`api:${MAILGUN_API_KEY}`)}`
    },
    body: formData
  }
)
```

## Security Notes

- Never commit `.env` files
- Store all credentials as Supabase secrets
- Enable row-level security on database tables
- Consider adding rate limiting
- Validate and sanitize all email content
- Use HTTPS only
