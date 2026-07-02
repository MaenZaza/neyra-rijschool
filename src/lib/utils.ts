/** Small shared helpers. Intentionally dependency-free. */

/** Join class names, dropping falsy values. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

/** Format an integer euro amount as "€ 1.234". */
export function formatEuro(amount: number): string {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Format an ISO date string as a Dutch long date, e.g. "14 maart 2026". */
export function formatDateNL(iso?: string): string | undefined {
  if (!iso) return undefined;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return undefined;
  return new Intl.DateTimeFormat('nl-NL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}
