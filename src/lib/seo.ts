import type { Metadata } from 'next';
import { schoolInfo, siteUrl } from '@/data/schoolInfo';

/**
 * Helper for consistent per-page metadata. Pass a title/description and
 * optional path; the rest (Open Graph, canonical, template) is filled in.
 */
export function buildMetadata({
  title,
  description,
  path = '/',
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const url = `${siteUrl}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} · ${schoolInfo.name}`,
      description,
      url,
      siteName: schoolInfo.name,
      locale: 'nl_NL',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} · ${schoolInfo.name}`,
      description,
    },
  };
}

/**
 * LocalBusiness / DrivingSchool structured data (JSON-LD).
 * Business details are pulled from the central data file to stay consistent.
 */
export function drivingSchoolJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'DrivingSchool',
    name: schoolInfo.name,
    description: schoolInfo.description,
    url: siteUrl,
    telephone: schoolInfo.phoneHref,
    email: schoolInfo.email,
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      addressLocality: schoolInfo.address.city,
      addressRegion: schoolInfo.address.region,
      addressCountry: schoolInfo.address.countryCode,
    },
    areaServed: ['Uden', 'Oss', "'s-Hertogenbosch", 'Veghel', 'Boekel', 'Volkel', 'Noord-Brabant'],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '20:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '17:00',
      },
    ],
  };
}
