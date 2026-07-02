import { z } from 'zod';
import { packages } from '@/data/packages';

/**
 * Validation schema for the registration / callback form.
 * Shared between the client (react-hook-form resolver) and the server action,
 * so the same rules always apply on both sides.
 */

const packageSlugs = ['geen', ...packages.map((p) => p.slug)] as const;

export const drivingExperienceValues = [
  'geen-ervaring',
  'enkele-lessen',
  'theorie-behaald',
  'eerder-examen',
] as const;

export const availabilityValues = ['ochtend', 'middag', 'avond', 'zaterdag'] as const;

export const transmissionValues = ['schakel', 'automaat'] as const;

const dutchName = z
  .string()
  .trim()
  .min(2, 'Vul minimaal 2 tekens in.')
  .max(60, 'Dit veld is te lang.');

export const registrationSchema = z.object({
  // Honeypot: must stay empty. Bots tend to fill every field.
  company: z.string().max(0, 'Ongeldige invoer.').optional().or(z.literal('')),

  firstName: dutchName,
  lastName: dutchName,

  email: z.string().trim().min(1, 'Vul je e-mailadres in.').email('Vul een geldig e-mailadres in.'),

  phone: z
    .string()
    .trim()
    .min(1, 'Vul je telefoonnummer in.')
    .regex(/^(\+31|0)[\s-]?[1-9](?:[\s-]?\d){8}$/, 'Vul een geldig Nederlands telefoonnummer in.'),

  birthDate: z
    .string()
    .optional()
    .or(z.literal(''))
    .refine((v) => !v || !Number.isNaN(Date.parse(v)), 'Vul een geldige datum in.'),

  city: z.string().trim().min(2, 'Vul je woonplaats in.').max(60),

  postcode: z
    .string()
    .trim()
    .min(1, 'Vul je postcode in.')
    .regex(/^\d{4}\s?[A-Za-z]{2}$/, 'Gebruik het formaat 1234 AB.'),

  transmission: z.enum(transmissionValues, {
    errorMap: () => ({ message: 'Kies schakel of automaat.' }),
  }),

  packageSlug: z.enum(packageSlugs).default('geen'),

  experience: z.enum(drivingExperienceValues, {
    errorMap: () => ({ message: 'Kies je huidige ervaring.' }),
  }),

  availability: z
    .array(z.enum(availabilityValues))
    .min(1, 'Kies minimaal één moment waarop je beschikbaar bent.'),

  startDate: z
    .string()
    .optional()
    .or(z.literal(''))
    .refine((v) => !v || !Number.isNaN(Date.parse(v)), 'Vul een geldige datum in.'),

  message: z
    .string()
    .trim()
    .max(1000, 'Bericht is te lang (max. 1000 tekens).')
    .optional()
    .or(z.literal('')),

  consent: z.literal(true, {
    errorMap: () => ({ message: 'Je moet akkoord gaan met de privacyverklaring.' }),
  }),
});

export type RegistrationInput = z.infer<typeof registrationSchema>;

/** Human-readable Dutch labels for the enum values (used in emails & summaries). */
export const experienceLabels: Record<(typeof drivingExperienceValues)[number], string> = {
  'geen-ervaring': 'Geen ervaring',
  'enkele-lessen': 'Enkele lessen gehad',
  'theorie-behaald': 'Theorie behaald',
  'eerder-examen': 'Eerder examen gedaan',
};

export const availabilityLabels: Record<(typeof availabilityValues)[number], string> = {
  ochtend: 'Ochtend',
  middag: 'Middag',
  avond: 'Avond',
  zaterdag: 'Zaterdag',
};

export const transmissionLabels: Record<(typeof transmissionValues)[number], string> = {
  schakel: 'Schakel',
  automaat: 'Automaat',
};
