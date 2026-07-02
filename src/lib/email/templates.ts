import type { RegistrationInput } from '@/lib/validation/registration';
import {
  availabilityLabels,
  experienceLabels,
  transmissionLabels,
} from '@/lib/validation/registration';
import { getPackageBySlug } from '@/data/packages';
import { schoolInfo } from '@/data/schoolInfo';
import { formatDateNL } from '@/lib/utils';

/**
 * Plain-text and HTML email bodies. Kept free of secrets and framework code so
 * they are easy to test and reuse for a future WhatsApp / dashboard channel.
 */

export interface RenderedEmail {
  subject: string;
  text: string;
  html: string;
}

function packageLabel(slug: string): string {
  if (slug === 'geen') return 'Geen pakket gekozen (losse lessen / nog beslissen)';
  return getPackageBySlug(slug)?.name ?? slug;
}

function summaryRows(data: RegistrationInput): Array<[string, string]> {
  const rows: Array<[string, string]> = [
    ['Naam', `${data.firstName} ${data.lastName}`],
    ['E-mail', data.email],
    ['Telefoon', data.phone],
    ['Woonplaats', data.city],
    ['Postcode', data.postcode.toUpperCase()],
    ['Transmissie', transmissionLabels[data.transmission]],
    ['Pakket', packageLabel(data.packageSlug)],
    ['Ervaring', experienceLabels[data.experience]],
    ['Beschikbaarheid', data.availability.map((a) => availabilityLabels[a]).join(', ')],
  ];
  const dob = formatDateNL(data.birthDate);
  if (dob) rows.push(['Geboortedatum', dob]);
  const start = formatDateNL(data.startDate);
  if (start) rows.push(['Gewenste startdatum', start]);
  if (data.message) rows.push(['Opmerkingen', data.message]);
  return rows;
}

function htmlWrap(title: string, inner: string): string {
  return `<!doctype html><html lang="nl"><body style="margin:0;background:#F4EFE6;font-family:Arial,Helvetica,sans-serif;color:#0D1520;">
    <div style="max-width:560px;margin:0 auto;padding:24px;">
      <div style="background:#0D1520;color:#F4EFE6;padding:20px 24px;border-radius:4px 4px 0 0;">
        <div style="font-size:12px;letter-spacing:3px;text-transform:uppercase;color:#EC5A21;">${schoolInfo.name}</div>
        <h1 style="margin:8px 0 0;font-size:20px;">${title}</h1>
      </div>
      <div style="background:#FBF8F1;padding:24px;border:1px solid #EAE2D3;border-top:none;border-radius:0 0 4px 4px;">
        ${inner}
      </div>
      <p style="font-size:12px;color:#4A5568;margin-top:16px;">${schoolInfo.name} · ${schoolInfo.address.city}, ${schoolInfo.address.region} · ${schoolInfo.phone}</p>
    </div>
  </body></html>`;
}

function rowsToHtml(rows: Array<[string, string]>): string {
  return `<table style="width:100%;border-collapse:collapse;font-size:14px;">${rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 0;color:#4A5568;width:40%;vertical-align:top;">${k}</td><td style="padding:8px 0;font-weight:bold;">${escapeHtml(
          v,
        )}</td></tr>`,
    )
    .join('')}</table>`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Notification for the driving school inbox. */
export function renderSchoolEmail(data: RegistrationInput): RenderedEmail {
  const rows = summaryRows(data);
  const text = [`Nieuwe aanmelding via de website`, '', ...rows.map(([k, v]) => `${k}: ${v}`)].join(
    '\n',
  );
  const html = htmlWrap(
    'Nieuwe aanmelding',
    `<p style="margin-top:0;">Er is een nieuwe aanmelding binnengekomen via het contactformulier.</p>${rowsToHtml(
      rows,
    )}`,
  );
  return {
    subject: `Nieuwe aanmelding — ${data.firstName} ${data.lastName} (${data.city})`,
    text,
    html,
  };
}

/** Confirmation for the student. */
export function renderStudentEmail(data: RegistrationInput): RenderedEmail {
  const rows = summaryRows(data);
  const intro = `Beste ${data.firstName},\n\nBedankt voor je aanmelding bij ${schoolInfo.name}. We hebben je gegevens goed ontvangen en nemen zo snel mogelijk contact met je op om je eerste les in te plannen.`;
  const text = [
    intro,
    '',
    'Jouw gegevens:',
    ...rows.map(([k, v]) => `- ${k}: ${v}`),
    '',
    `Met vriendelijke groet,\n${schoolInfo.instructor.name}\n${schoolInfo.name} · ${schoolInfo.phone}`,
  ].join('\n');
  const html = htmlWrap(
    'Bedankt voor je aanmelding',
    `<p style="margin-top:0;">Beste ${escapeHtml(
      data.firstName,
    )},</p><p>Bedankt voor je aanmelding bij <strong>${
      schoolInfo.name
    }</strong>. We hebben je gegevens ontvangen en nemen zo snel mogelijk contact met je op om je eerste les in te plannen.</p>
    <p style="font-weight:bold;margin-bottom:4px;">Jouw gegevens</p>${rowsToHtml(rows)}
    <p>Met vriendelijke groet,<br><strong>${schoolInfo.instructor.name}</strong><br>${schoolInfo.name}</p>`,
  );
  return {
    subject: `We hebben je aanmelding ontvangen — ${schoolInfo.name}`,
    text,
    html,
  };
}
