import type { ServiceArea } from '@/types';

/**
 * ===========================================================================
 *  SERVICE AREAS & POSTCODE CHECK — DEMO DATA
 * ===========================================================================
 *  The postcode checker matches on the first two digits of a Dutch postcode
 *  (e.g. "5401" -> "54"). Add or remove areas / prefixes here. In a later
 *  version this can be replaced by a real geocoding lookup.
 *
 *  `map.x` / `map.y` position each town on the stylised SVG area map
 *  (percentages, 0 = left/top, 100 = right/bottom).
 * ===========================================================================
 */

export const serviceAreas: ServiceArea[] = [
  { name: 'Uden', postcodePrefixes: ['54'], map: { x: 60, y: 34 } },
  { name: 'Oss', postcodePrefixes: ['53'], map: { x: 40, y: 20 } },
  {
    name: "'s-Hertogenbosch",
    postcodePrefixes: ['52'],
    examLocation: true,
    map: { x: 18, y: 30 },
  },
  { name: 'Veghel', postcodePrefixes: ['54', '54'], map: { x: 66, y: 52 } },
  { name: 'Boekel', postcodePrefixes: ['54'], map: { x: 78, y: 44 } },
  { name: 'Volkel', postcodePrefixes: ['54'], map: { x: 72, y: 30 } },
];

/** Full list of served postcode prefixes (first two digits). */
const servedPrefixes = Array.from(new Set(serviceAreas.flatMap((a) => a.postcodePrefixes)));

/** City names (lowercased) that count as served, incl. common aliases. */
const servedCities = new Set(
  [
    ...serviceAreas.map((a) => a.name.toLowerCase()),
    'den bosch',
    'shertogenbosch',
    's-hertogenbosch',
  ].map((c) => c.replace(/[^a-z]/g, '')),
);

export type PostcodeCheckResult = {
  supported: boolean;
  matchedArea?: string;
};

/**
 * Check whether a postcode (e.g. "5401 AB") or city name is within the
 * demo service area. Matching is intentionally forgiving.
 */
export function checkServiceArea(input: string): PostcodeCheckResult {
  const trimmed = input.trim().toLowerCase();
  if (!trimmed) return { supported: false };

  // Dutch postcode: 4 digits, optional space, 2 letters. Match on first 2 digits.
  const digits = trimmed.replace(/\s/g, '').match(/^(\d{4})/);
  if (digits) {
    const prefix = digits[1].slice(0, 2);
    if (servedPrefixes.includes(prefix)) {
      const area = serviceAreas.find((a) => a.postcodePrefixes.includes(prefix));
      return { supported: true, matchedArea: area?.name };
    }
    return { supported: false };
  }

  // Otherwise treat the input as a city name.
  const cityKey = trimmed.replace(/[^a-z]/g, '');
  if (servedCities.has(cityKey)) {
    const area = serviceAreas.find((a) => a.name.toLowerCase().replace(/[^a-z]/g, '') === cityKey);
    return { supported: true, matchedArea: area?.name ?? input.trim() };
  }

  return { supported: false };
}
