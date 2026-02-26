import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { to, subject, html, text } = body;

    // Use Hostinger credentials or defaults
    const emailUser = Deno.env.get("SMTP_USER") || Deno.env.get("EMAIL_USER");
    const emailPass = Deno.env.get("SMTP_PASS") || Deno.env.get("EMAIL_PASS");
    const SMTP_HOST = Deno.env.get("SMTP_HOST") || "smtp.hostinger.com";
    const SMTP_PORT = Number(Deno.env.get("SMTP_PORT") || 465);
    const FROM_NAME = Deno.env.get("FROM_NAME") || "DeMi Tours & Travel Africa";

    if (!emailUser || !emailPass) {
      throw new Error("SMTP credentials are not configured in Supabase secrets.");
    }

    // Dynamic import of nodemailer (works natively in Deno Edge Functions)
    const nodemailer = await import("npm:nodemailer@6.9.4");

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465, // true for 465 (SSL), false for 587 (TLS)
      auth: {
        user: emailUser,
        pass: emailPass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Send email
    // Fallback to sending TO the admin (emailUser) if 'to' field isn't mapped
    const recipient = to || emailUser;

    await transporter.sendMail({
      from: `"${FROM_NAME}" <${emailUser}>`,
      to: recipient,
      subject: subject || "New Notification",
      html: html || text || "You have a new message.",
    });

    console.log(`Email successfully sent to ${recipient}`);

    return new Response(
      JSON.stringify({ success: true, message: "Email sent successfully" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error processing email request:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
