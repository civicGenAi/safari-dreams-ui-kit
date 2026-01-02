/**
 * Email utility for sending emails via Supabase Edge Function
 */

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

interface EmailData {
  to: string;
  subject: string;
  html: string;
}

/**
 * Send an email using the Supabase Edge Function
 *
 * @param emailData - Email details (to, subject, html)
 * @returns Promise with success status
 */
export const sendEmail = async (emailData: EmailData): Promise<boolean> => {
  try {
    // Check if Supabase URL is configured
    if (!SUPABASE_URL) {
      console.error('VITE_SUPABASE_URL is not configured');
      return false;
    }

    // Call the Supabase Edge Function
    const response = await fetch(
      `${SUPABASE_URL}/functions/v1/send-email`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error('Email sending failed:', error);
      return false;
    }

    const result = await response.json();
    console.log('Email sent successfully:', result);
    return true;
  } catch (error) {
    console.error('Error calling email function:', error);
    return false;
  }
};

/**
 * Send a newsletter subscription notification
 */
export const sendNewsletterNotification = async (email: string): Promise<boolean> => {
  return sendEmail({
    to: 'info@demitours.com',
    subject: 'New Newsletter Subscription',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">New Newsletter Subscription</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
        <hr style="border: 1px solid #eee; margin: 20px 0;">
        <p style="color: #666; font-size: 12px;">
          This is an automated notification from your DeMi Tours website.
        </p>
      </div>
    `
  });
};

/**
 * Send a contact form submission notification
 */
export const sendContactNotification = async (data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}): Promise<boolean> => {
  return sendEmail({
    to: 'info@demitours.com',
    subject: `New Contact Form: ${data.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">New Contact Form Submission</h2>

        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #555; margin-top: 0;">Contact Information</h3>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
          ${data.phone ? `<p><strong>Phone:</strong> <a href="tel:${data.phone}">${data.phone}</a></p>` : ''}
        </div>

        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #555; margin-top: 0;">Subject</h3>
          <p>${data.subject}</p>
        </div>

        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #555; margin-top: 0;">Message</h3>
          <p style="white-space: pre-wrap;">${data.message}</p>
        </div>

        <p style="color: #999; font-size: 12px; margin-top: 30px;">
          Submitted on ${new Date().toLocaleString()}
        </p>
      </div>
    `
  });
};

/**
 * Send a booking request notification
 */
export const sendBookingNotification = async (data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  destination: string;
  travelStyle: string;
  startDate: string;
  endDate: string;
  adults: number;
  children: number;
  accommodation: string;
  budget?: string;
  specialRequirements?: string;
  packageTitle?: string;
  duration: number;
}): Promise<boolean> => {
  return sendEmail({
    to: 'info@demitours.com',
    subject: `New Booking Request - ${data.firstName} ${data.lastName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">New Booking Request</h2>

        ${data.packageTitle ? `
          <div style="background: #e8f4f8; padding: 15px; border-left: 4px solid #0066cc; margin: 20px 0;">
            <strong>Package:</strong> ${data.packageTitle}
          </div>
        ` : ''}

        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #555; margin-top: 0;">Personal Information</h3>
          <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
          <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
          <p><strong>Phone:</strong> <a href="tel:${data.phone}">${data.phone}</a></p>
        </div>

        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #555; margin-top: 0;">Trip Details</h3>
          <p><strong>Destination:</strong> ${data.destination}</p>
          <p><strong>Travel Style:</strong> ${data.travelStyle}</p>
          <p><strong>Dates:</strong> ${data.startDate} to ${data.endDate} (${data.duration} days)</p>
          <p><strong>Travelers:</strong> ${data.adults} adults${data.children > 0 ? `, ${data.children} children` : ''}</p>
          <p><strong>Accommodation:</strong> ${data.accommodation}</p>
          ${data.budget ? `<p><strong>Budget:</strong> ${data.budget}</p>` : ''}
        </div>

        ${data.specialRequirements ? `
          <div style="background: #fff9e6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #555; margin-top: 0;">Special Requirements</h3>
            <p style="white-space: pre-wrap;">${data.specialRequirements}</p>
          </div>
        ` : ''}

        <p style="color: #999; font-size: 12px; margin-top: 30px;">
          Submitted on ${new Date().toLocaleString()}
        </p>
      </div>
    `
  });
};
