/**
 * Shared domain types for Neyra Rijschool.
 * Keeping these in one place makes it trivial to later swap the local data
 * files for a database / API without touching the presentation layer.
 */

export type TransmissionType = 'schakel' | 'automaat';

export interface LessonPackage {
  /** Stable identifier, also used as the value passed to the registration form. */
  slug: string;
  name: string;
  lessonCount: number;
  /** Price in euros (integer). */
  price: number;
  /** Amount saved compared to booking the lessons separately, in euros. */
  saving: number;
  /** Short one-line positioning statement. */
  tagline: string;
  features: string[];
  /** Highlight this package as the recommended option. */
  popular?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  city: string;
  rating: number; // 1–5
  quote: string;
  date?: string; // ISO date, optional
  transmission?: TransmissionType;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface ServiceArea {
  name: string;
  /** Postcode prefixes (first two digits) served in this area. */
  postcodePrefixes: string[];
  /** Whether practical exams are typically taken from this area. */
  examLocation?: boolean;
  /** Relative position on the stylised area map (0–100 %). */
  map: { x: number; y: number };
}

export interface Statistic {
  id: string;
  value: string;
  label: string;
  description?: string;
}

export interface OpeningHours {
  day: string;
  hours: string;
  closed?: boolean;
}

export interface NavItem {
  label: string;
  href: string;
}
