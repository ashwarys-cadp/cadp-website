import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface NewsletterData {
  email: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: NewsletterData = await request.json();
    const { email } = body;

    // Validate email
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Add to Resend audience (if using Resend's audience feature)
    // Or you can integrate with another newsletter service here

    // For now, we'll send a confirmation email and notify the team
    await resend.emails.send({
      from: 'CADP <noreply@cadp.in>',
      to: email,
      subject: 'Welcome to CADP Updates',
      html: `
        <h2>Thank you for subscribing!</h2>
        <p>You've successfully subscribed to CADP updates.</p>
        <p>You'll receive:</p>
        <ul>
          <li>Latest guides and articles on DPDP compliance</li>
          <li>Upcoming event announcements</li>
          <li>New research publications</li>
          <li>Regulatory updates and insights</li>
        </ul>
        <p>We send updates about once or twice a month - no spam, ever.</p>
        <hr>
        <p>Best regards,<br>The CADP Team</p>
        <p style="color: #666; font-size: 12px;">
          Centre for Applied Data Protection<br>
          KLE Law College, Bengaluru<br><br>
          <a href="https://cadp.in/unsubscribe?email=${encodeURIComponent(email)}">Unsubscribe</a>
        </p>
      `,
    });

    // Notify team of new subscriber
    await resend.emails.send({
      from: 'CADP Website <noreply@cadp.in>',
      to: process.env.CONTACT_EMAIL || 'contact@cadp.in',
      subject: 'New Newsletter Subscriber',
      html: `
        <h2>New Newsletter Subscriber</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Date:</strong> ${new Date().toISOString()}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    );
  }
}
