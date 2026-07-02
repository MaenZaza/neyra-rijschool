import type { RenderedEmail } from './templates';

/**
 * Thin Resend wrapper using the REST API directly (no extra dependency).
 *
 * DEMO MODE: if RESEND_API_KEY / FROM_EMAIL are not configured, no email is
 * sent. The caller treats this as a successful "demo" submission so the form
 * keeps working out of the box. Nothing sensitive is logged.
 */

const RESEND_ENDPOINT = 'https://api.resend.com/emails';

export interface SendResult {
  delivered: boolean;
  demo: boolean;
}

export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.FROM_EMAIL);
}

interface SendArgs {
  to: string;
  replyTo?: string;
  email: RenderedEmail;
}

async function sendOne({ to, replyTo, email }: SendArgs): Promise<boolean> {
  const res = await fetch(RESEND_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.FROM_EMAIL,
      to,
      reply_to: replyTo,
      subject: email.subject,
      text: email.text,
      html: email.html,
    }),
  });

  if (!res.ok) {
    // Log only the status — never the recipient or message body.
    console.error(`[email] Resend responded with status ${res.status}`);
    return false;
  }
  return true;
}

/**
 * Deliver the school notification and student confirmation.
 * Returns { demo: true } when email is not configured.
 */
export async function sendRegistrationEmails(args: {
  to: string;
  studentEmail: string;
  studentReplyTo: string;
  schoolEmail: RenderedEmail;
  confirmationEmail: RenderedEmail;
}): Promise<SendResult> {
  if (!isEmailConfigured()) {
    return { delivered: false, demo: true };
  }

  const [schoolOk, studentOk] = await Promise.all([
    sendOne({ to: args.to, replyTo: args.studentReplyTo, email: args.schoolEmail }),
    sendOne({ to: args.studentEmail, email: args.confirmationEmail }),
  ]);

  return { delivered: schoolOk && studentOk, demo: false };
}
