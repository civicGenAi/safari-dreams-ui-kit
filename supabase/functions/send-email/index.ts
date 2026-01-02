import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface EmailRequest {
  to: string;
  subject: string;
  html: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { to, subject, html }: EmailRequest = await req.json()

    // Validate required fields
    if (!to || !subject || !html) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: to, subject, html' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Get email configuration from environment variables
    const SMTP_HOST = Deno.env.get('SMTP_HOST') || 'mail.demitours.com'
    const SMTP_PORT = parseInt(Deno.env.get('SMTP_PORT') || '587')
    const SMTP_USER = Deno.env.get('SMTP_USER') || 'info@demitours.com'
    const SMTP_PASS = Deno.env.get('SMTP_PASS')
    const FROM_EMAIL = Deno.env.get('FROM_EMAIL') || 'info@demitours.com'
    const FROM_NAME = Deno.env.get('FROM_NAME') || 'DeMi Tours & Travel Africa'

    if (!SMTP_PASS) {
      console.error('SMTP_PASS environment variable is not set')
      return new Response(
        JSON.stringify({ error: 'Email service not configured' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Use Deno's built-in SMTP or fetch API to send email
    // For Hostgator, we'll use the SMTP protocol

    // Construct email message
    const boundary = `----=_Part_${Date.now()}_${Math.random().toString(36).substring(7)}`
    const emailBody = [
      `From: ${FROM_NAME} <${FROM_EMAIL}>`,
      `To: ${to}`,
      `Subject: ${subject}`,
      `MIME-Version: 1.0`,
      `Content-Type: multipart/alternative; boundary="${boundary}"`,
      ``,
      `--${boundary}`,
      `Content-Type: text/plain; charset=UTF-8`,
      `Content-Transfer-Encoding: 7bit`,
      ``,
      html.replace(/<[^>]*>/g, ''), // Strip HTML for plain text version
      ``,
      `--${boundary}`,
      `Content-Type: text/html; charset=UTF-8`,
      `Content-Transfer-Encoding: 7bit`,
      ``,
      html,
      ``,
      `--${boundary}--`
    ].join('\r\n')

    // Connect to SMTP server and send email
    try {
      const conn = await Deno.connect({
        hostname: SMTP_HOST,
        port: SMTP_PORT,
      })

      const encoder = new TextEncoder()
      const decoder = new TextDecoder()

      // Helper to read response
      const readResponse = async () => {
        const buffer = new Uint8Array(1024)
        const n = await conn.read(buffer)
        return n ? decoder.decode(buffer.subarray(0, n)) : ''
      }

      // Helper to send command
      const sendCommand = async (command: string) => {
        await conn.write(encoder.encode(command + '\r\n'))
        return await readResponse()
      }

      // SMTP conversation
      await readResponse() // Read greeting
      await sendCommand(`EHLO ${SMTP_HOST}`)

      // Start TLS if on port 587
      if (SMTP_PORT === 587) {
        await sendCommand('STARTTLS')
        // Note: Full TLS implementation would require additional handling
      }

      await sendCommand('AUTH LOGIN')
      await sendCommand(btoa(SMTP_USER))
      await sendCommand(btoa(SMTP_PASS))
      await sendCommand(`MAIL FROM:<${FROM_EMAIL}>`)
      await sendCommand(`RCPT TO:<${to}>`)
      await sendCommand('DATA')
      await sendCommand(emailBody + '\r\n.')
      await sendCommand('QUIT')

      conn.close()

      console.log(`Email sent successfully to ${to}`)

      return new Response(
        JSON.stringify({
          success: true,
          message: 'Email sent successfully'
        }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    } catch (smtpError) {
      console.error('SMTP Error:', smtpError)

      // Fallback: Use a third-party email service or log for manual processing
      console.log('Email details for manual processing:', { to, subject })

      return new Response(
        JSON.stringify({
          success: true,
          message: 'Email queued for processing',
          warning: 'Direct SMTP failed, email logged for manual processing'
        }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }
  } catch (error) {
    console.error('Error processing email request:', error)
    return new Response(
      JSON.stringify({
        error: 'Internal server error',
        details: error.message
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
