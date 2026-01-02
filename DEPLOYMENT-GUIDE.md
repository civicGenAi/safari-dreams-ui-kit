# Email Edge Function Deployment Guide

This guide will help you deploy the email sending functionality for your DeMi Tours website.

## Overview

You have **two options** for sending emails:

1. **Direct SMTP** (Hostgator) - More complex setup
2. **Resend.com** (Recommended) - Simpler and more reliable

## Option 1: Resend.com (Recommended) ⭐

Resend is a modern email API that's easier to set up and has better deliverability than direct SMTP.

### Step 1: Create Resend Account

1. Go to https://resend.com
2. Sign up for a free account (100 emails/day free)
3. Verify your email
4. Add your domain (demitours.com) in the Resend dashboard
5. Add the DNS records they provide to your Hostgator DNS settings

### Step 2: Get API Key

1. In Resend dashboard, go to "API Keys"
2. Create a new API key
3. Copy the key (starts with `re_`)

### Step 3: Deploy the Edge Function

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project (get project ref from Supabase dashboard URL)
supabase link --project-ref YOUR_PROJECT_REF

# Set secrets
supabase secrets set RESEND_API_KEY=re_your_api_key_here
supabase secrets set FROM_EMAIL=info@demitours.com
supabase secrets set FROM_NAME="DeMi Tours & Travel Africa"

# Deploy the simple email function
supabase functions deploy send-email --no-verify-jwt
```

### Step 4: Update Frontend

The frontend code is already configured to use the email utility functions.
The Edge Function will be automatically called at:
`https://YOUR_PROJECT_REF.supabase.co/functions/v1/send-email`

### Step 5: Test

Test your email function:

```bash
curl -i --location --request POST \
  'https://YOUR_PROJECT_REF.supabase.co/functions/v1/send-email' \
  --header 'Content-Type: application/json' \
  --data '{"to":"your-test-email@example.com","subject":"Test","html":"<h1>Test Email</h1>"}'
```

---

## Option 2: Direct SMTP (Hostgator)

### Step 1: Get SMTP Credentials

1. Login to your Hostgator cPanel
2. Go to "Email Accounts"
3. Note your email settings:
   - Server: `mail.demitours.com` (or mail.yourdomain.com)
   - Port: `587` (TLS) or `465` (SSL)
   - Username: `info@demitours.com`
   - Password: Your email password

### Step 2: Deploy with SMTP

```bash
# Set SMTP secrets
supabase secrets set SMTP_HOST=mail.demitours.com
supabase secrets set SMTP_PORT=587
supabase secrets set SMTP_USER=info@demitours.com
supabase secrets set SMTP_PASS=your_email_password
supabase secrets set FROM_EMAIL=info@demitours.com
supabase secrets set FROM_NAME="DeMi Tours & Travel Africa"

# Deploy the SMTP email function
cd supabase/functions/send-email
supabase functions deploy send-email --no-verify-jwt
```

**Note:** Direct SMTP can be problematic with:
- Firewall restrictions
- TLS/SSL certificate issues
- Rate limiting
- IP blocking

---

## Database Tables Setup

Create the required database tables in Supabase SQL Editor:

```sql
-- Newsletter Subscriptions
CREATE TABLE newsletter_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('active', 'unsubscribed'))
);

CREATE INDEX idx_newsletter_email ON newsletter_subscriptions(email);
CREATE INDEX idx_newsletter_status ON newsletter_subscriptions(status);

-- Contact Submissions
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('new', 'read', 'responded')),
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE INDEX idx_contact_status ON contact_submissions(status);
CREATE INDEX idx_contact_date ON contact_submissions(submitted_at DESC);

-- Booking Requests
CREATE TABLE booking_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  destination TEXT NOT NULL,
  travel_style TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  adults INTEGER NOT NULL,
  children INTEGER NOT NULL,
  accommodation TEXT NOT NULL,
  budget TEXT,
  special_requirements TEXT,
  package_title TEXT,
  package_slug TEXT,
  status TEXT NOT NULL CHECK (status IN ('new', 'contacted', 'quoted', 'booked', 'cancelled')),
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE INDEX idx_booking_status ON booking_requests(status);
CREATE INDEX idx_booking_date ON booking_requests(submitted_at DESC);
```

---

## Verifying Setup

### 1. Check Edge Function is Deployed

```bash
supabase functions list
```

You should see `send-email` in the list.

### 2. Test Newsletter Subscription

1. Go to your website
2. Enter an email in the newsletter signup
3. Check:
   - Email appears in `newsletter_subscriptions` table in Supabase
   - Email notification sent to info@demitours.com
   - Admin can see it in `/admin/newsletter`

### 3. Test Contact Form

1. Fill out the contact form at `/contact`
2. Check:
   - Submission appears in `contact_submissions` table
   - Email sent to info@demitours.com
   - Admin can see it in `/admin/contacts`

### 4. Test Booking Form

1. Click "Request Quote" on any package
2. Fill out booking form
3. Check:
   - Request appears in `booking_requests` table
   - Email sent to info@demitours.com
   - Admin can see it in `/admin/bookings`

---

## Troubleshooting

### Emails not sending

1. **Check Edge Function logs:**
   ```bash
   supabase functions logs send-email
   ```

2. **Check secrets are set:**
   ```bash
   supabase secrets list
   ```

3. **Verify CORS is working:**
   The Edge Function has CORS headers enabled for all origins (`*`).
   In production, you may want to restrict this to your domain.

### Database errors

1. Make sure tables are created
2. Check Supabase dashboard > Database > Tables
3. Verify insert permissions in RLS policies

### Frontend errors

1. Open browser console (F12)
2. Check for network errors
3. Verify `VITE_SUPABASE_URL` is set in `.env`

---

## Security Best Practices

1. **Never commit secrets** to git
2. **Use environment variables** for all credentials
3. **Enable RLS** (Row Level Security) on database tables:

```sql
-- Enable RLS
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_requests ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (forms)
CREATE POLICY "Allow public inserts" ON newsletter_subscriptions
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow public inserts" ON contact_submissions
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow public inserts" ON booking_requests
  FOR INSERT TO anon WITH CHECK (true);

-- Only admins can read
CREATE POLICY "Admin read access" ON newsletter_subscriptions
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admin read access" ON contact_submissions
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admin read access" ON booking_requests
  FOR SELECT TO authenticated USING (true);

-- Only admins can update
CREATE POLICY "Admin update access" ON newsletter_subscriptions
  FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Admin update access" ON contact_submissions
  FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Admin update access" ON booking_requests
  FOR UPDATE TO authenticated USING (true);
```

4. **Rate limiting** - Consider adding Cloudflare or Supabase rate limiting
5. **Input validation** - Already implemented in forms
6. **Spam protection** - Consider adding hCaptcha or reCAPTCHA

---

## Support

If you encounter issues:

1. Check Supabase documentation: https://supabase.com/docs/guides/functions
2. Check Resend documentation: https://resend.com/docs
3. View logs: `supabase functions logs send-email --tail`

---

## Cost Breakdown

**Resend Free Tier:**
- 100 emails/day
- 3,000 emails/month
- Perfect for starting out

**Resend Paid Plan ($20/month):**
- 50,000 emails/month
- Better support
- Custom domains

**Supabase:**
- Edge Functions: Free tier includes 500K invocations/month
- Database: Free tier is sufficient for most use cases

---

## Next Steps After Deployment

1. ✅ Create database tables
2. ✅ Deploy Edge Function
3. ✅ Set up email service (Resend or SMTP)
4. ✅ Test all forms
5. 📧 Set up email templates (optional)
6. 🔒 Configure RLS policies
7. 📊 Monitor usage in Supabase dashboard
8. 🎨 Customize email HTML templates if needed

Your email system is now production-ready! 🎉
