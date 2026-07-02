import type { NavItem, OpeningHours } from '@/types';

/**
 * ===========================================================================
 *  CENTRAL BUSINESS INFORMATION  —  DEMO CONTENT
 * ===========================================================================
 *  Every piece of business information (name, contact details, opening hours,
 *  navigation, social links) lives here. Change a value once and it updates
 *  across the whole website, structured data and SEO metadata.
 *
 *  ⚠️  All values below are FICTIONAL demo content for a portfolio project.
 *      Replace them with the real driving school's details before going live.
 * ===========================================================================
 */

export const schoolInfo = {
  name: 'Neyra Rijschool',
  legalName: 'Neyra Rijschool',
  tagline: 'Rijles op jouw tempo.',

  description:
    'Neyra Rijschool is een moderne en persoonlijke rijschool die leerlingen met vertrouwen, rust en duidelijke begeleiding leert autorijden. Lessen in schakel en automaat in Uden, Oss, Den Bosch en omgeving.',

  // --- Contact (fictional) --------------------------------------------------
  phone: '06 12 34 56 78',
  phoneHref: '+31612345678',
  email: 'info@neyrarijschool.nl',

  address: {
    city: 'Uden',
    region: 'Noord-Brabant',
    country: 'Nederland',
    countryCode: 'NL',
  },

  // Where practical exams usually take place.
  examLocation: "'s-Hertogenbosch",

  // --- Opening hours --------------------------------------------------------
  openingHours: [
    { day: 'Maandag', hours: '08:00 – 20:00' },
    { day: 'Dinsdag', hours: '08:00 – 20:00' },
    { day: 'Woensdag', hours: '08:00 – 20:00' },
    { day: 'Donderdag', hours: '08:00 – 20:00' },
    { day: 'Vrijdag', hours: '08:00 – 20:00' },
    { day: 'Zaterdag', hours: '09:00 – 17:00' },
    { day: 'Zondag', hours: 'Gesloten', closed: true },
  ] satisfies OpeningHours[],

  // Condensed version for compact display.
  openingHoursShort: [
    { day: 'Ma – Vr', hours: '08:00 – 20:00' },
    { day: 'Zaterdag', hours: '09:00 – 17:00' },
    { day: 'Zondag', hours: 'Gesloten', closed: true },
  ] satisfies OpeningHours[],

  // --- Instructor (fictional) ----------------------------------------------
  instructor: {
    name: 'Nadia El Amrani',
    role: 'Oprichter & rij-instructeur',
    experienceYears: 9,
    bio: 'Nadia richtte Neyra Rijschool op vanuit één overtuiging: iedereen leert rijden, als de begeleiding maar bij de persoon past. Ze werkt rustig, duidelijk en zonder druk, en past elke les aan op jouw tempo en leerdoelen.',
  },

  // --- Pricing --------------------------------------------------------------
  singleLessonPrice: 60, // euro per hour — DEMO value
  lessonDurationMinutes: 60,

  // --- Social (placeholders) ------------------------------------------------
  social: {
    instagram: 'https://instagram.com/',
    facebook: 'https://facebook.com/',
    whatsapp: 'https://wa.me/31612345678',
  },
} as const;

/** Primary navigation used by the header and footer. */
export const navigation: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Rijlessen', href: '/rijlessen' },
  { label: 'Pakketten', href: '/pakketten' },
  { label: 'Lesgebieden', href: '/lesgebieden' },
  { label: 'Over ons', href: '/over-ons' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

/** Legal links shown in the footer. */
export const legalLinks: NavItem[] = [
  { label: 'Privacyverklaring', href: '/privacyverklaring' },
  { label: 'Algemene voorwaarden', href: '/algemene-voorwaarden' },
  { label: 'Cookiebeleid', href: '/cookiebeleid' },
];

/** Canonical site URL — override with NEXT_PUBLIC_SITE_URL in the environment. */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? 'https://www.neyrarijschool.nl';
