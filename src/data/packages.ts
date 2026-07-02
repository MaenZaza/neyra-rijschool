import type { LessonPackage } from '@/types';

/**
 * ===========================================================================
 *  LESSON PACKAGES — DEMO PRICING
 * ===========================================================================
 *  All prices and savings below are FICTIONAL demo values. Edit them here and
 *  they update on the packages page, the homepage overview and the structured
 *  data automatically. `slug` is also the value preselected in the registration
 *  form via the ?pakket= query parameter — keep slugs stable.
 * ===========================================================================
 */

export const packages: LessonPackage[] = [
  {
    slug: 'startpakket',
    name: 'Startpakket',
    lessonCount: 5,
    price: 285,
    saving: 15,
    tagline: 'Rustig kennismaken met de weg.',
    features: [
      '5 rijlessen (schakel of automaat)',
      'Persoonlijk lesplan',
      'Voortgangsbespreking',
      'Ophalen binnen het lesgebied',
    ],
  },
  {
    slug: 'groeipakket',
    name: 'Groeipakket',
    lessonCount: 10,
    price: 560,
    saving: 40,
    tagline: 'De populairste keuze om echt door te pakken.',
    popular: true,
    features: [
      '10 rijlessen (schakel of automaat)',
      'Persoonlijk lesplan',
      'Tussentijdse evaluatie',
      'Voortgangsbespreking',
      'Ophalen binnen het lesgebied',
    ],
  },
  {
    slug: 'compleetpakket',
    name: 'Compleetpakket',
    lessonCount: 20,
    price: 1100,
    saving: 100,
    tagline: 'Van eerste les tot examen, volledig begeleid.',
    features: [
      '20 rijlessen (schakel of automaat)',
      'Uitgebreid lesplan',
      'Meerdere evaluatiemomenten',
      'Extra voorbereiding praktijkexamen',
      'Ophalen binnen het lesgebied',
    ],
  },
];

/** Convenience lookup used by the registration form and package pages. */
export function getPackageBySlug(slug?: string | null): LessonPackage | undefined {
  if (!slug) return undefined;
  return packages.find((pkg) => pkg.slug === slug);
}
