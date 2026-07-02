'use server';

import { registrationSchema, type RegistrationInput } from '@/lib/validation/registration';
import { renderSchoolEmail, renderStudentEmail } from '@/lib/email/templates';
import { sendRegistrationEmails } from '@/lib/email/send';
import { schoolInfo } from '@/data/schoolInfo';

/**
 * Server Action that handles a registration submission.
 *
 * - Validates the payload with the same Zod schema used on the client.
 * - Honours the honeypot field silently (bots get a fake success).
 * - Sends notification + confirmation emails, or falls back to DEMO MODE
 *   when email is not configured (see src/lib/email/send.ts).
 * - Never logs the submitter's personal data.
 */

export interface RegistrationState {
  status: 'idle' | 'success' | 'error';
  message?: string;
  demo?: boolean;
  /** Field-level errors keyed by field name (server-side safety net). */
  errors?: Record<string, string>;
  /** Echoed back to render an on-page summary of what was submitted. */
  summary?: RegistrationInput;
}

export async function submitRegistration(payload: unknown): Promise<RegistrationState> {
  const parsed = registrationSchema.safeParse(payload);

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path.join('.') || 'form';
      if (!errors[key]) errors[key] = issue.message;
    }
    return {
      status: 'error',
      message: 'Controleer de gemarkeerde velden en probeer het opnieuw.',
      errors,
    };
  }

  const data = parsed.data;

  // Honeypot filled -> silently pretend success, do nothing.
  if (data.company && data.company.length > 0) {
    return { status: 'success', demo: true, message: 'Bedankt voor je aanmelding.' };
  }

  try {
    const result = await sendRegistrationEmails({
      to: process.env.CONTACT_EMAIL ?? schoolInfo.email,
      studentEmail: data.email,
      studentReplyTo: data.email,
      schoolEmail: renderSchoolEmail(data),
      confirmationEmail: renderStudentEmail(data),
    });

    if (!result.demo && !result.delivered) {
      return {
        status: 'error',
        message: 'Er ging iets mis bij het versturen. Probeer het later opnieuw of bel ons direct.',
      };
    }

    return {
      status: 'success',
      demo: result.demo,
      message: result.demo
        ? 'Je aanmelding is ontvangen (demomodus). In een live-omgeving ontvang je een bevestiging per e-mail.'
        : 'Je aanmelding is verstuurd. Je ontvangt een bevestiging per e-mail.',
      summary: data,
    };
  } catch {
    // Do not leak error details or personal data to the client/logs.
    console.error('[register] Unexpected error while processing a submission.');
    return {
      status: 'error',
      message: 'Er ging iets mis. Probeer het later opnieuw of neem telefonisch contact op.',
    };
  }
}
