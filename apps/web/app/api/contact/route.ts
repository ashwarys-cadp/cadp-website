import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  name: string;
  email: string;
  organization?: string;
  inquiryType: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();
    const { name, email, organization, inquiryType, message } = body;

    // Validate required fields
    if (!name || !email || !inquiryType || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Get inquiry type label
    const inquiryLabels: Record<string, string> = {
      training: 'Training Programs',
      advisory: 'Compliance Advisory',
      research: 'Research Collaboration',
      speaking: 'Speaking Engagement',
      other: 'Other',
    };

    const inquiryLabel = inquiryLabels[inquiryType] || inquiryType;

    // Send notification email to CADP team
    await resend.emails.send({
      from: 'CADP Website <noreply@cadp.in>',
      to: process.env.CONTACT_EMAIL || 'contact@cadp.in',
      replyTo: email,
      subject: `New Contact Form Submission: ${inquiryLabel}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Organization:</strong> ${organization || 'Not provided'}</p>
        <p><strong>Inquiry Type:</strong> ${inquiryLabel}</p>
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    // Send confirmation email to the user
    await resend.emails.send({
      from: 'CADP <noreply@cadp.in>',
      to: email,
      subject: 'Thank you for contacting CADP',
      html: `
        <h2>Thank you for reaching out, ${name}!</h2>
        <p>We have received your inquiry about <strong>${inquiryLabel}</strong>.</p>
        <p>Our team will review your message and get back to you within 1-2 business days.</p>
        <h3>Your Message:</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p>Best regards,<br>The CADP Team</p>
        <p style="color: #666; font-size: 12px;">
          Centre for Applied Data Protection<br>
          KLE Law College, Bengaluru
        </p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}
