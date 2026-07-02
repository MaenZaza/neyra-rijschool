import type { RegistrationState } from '@/lib/actions/register';
import {
  availabilityLabels,
  experienceLabels,
  transmissionLabels,
} from '@/lib/validation/registration';
import { getPackageBySlug } from '@/data/packages';
import { Button } from '@/components/ui/Button';
import { Check } from '@/components/ui/icons';
import { formatDateNL } from '@/lib/utils';

/** Confirmation screen shown after a successful submission, with a summary. */
export function RegistrationSuccess({ state }: { state: RegistrationState }) {
  const data = state.summary;
  if (!data) return null;

  const rows: Array<[string, string]> = [
    ['Naam', `${data.firstName} ${data.lastName}`],
    ['E-mail', data.email],
    ['Telefoon', data.phone],
    ['Woonplaats', `${data.city}, ${data.postcode.toUpperCase()}`],
    ['Transmissie', transmissionLabels[data.transmission]],
    [
      'Pakket',
      data.packageSlug === 'geen'
        ? 'Nog geen pakket / losse lessen'
        : (getPackageBySlug(data.packageSlug)?.name ?? data.packageSlug),
    ],
    ['Ervaring', experienceLabels[data.experience]],
    ['Beschikbaarheid', data.availability.map((a) => availabilityLabels[a]).join(', ')],
  ];
  const start = formatDateNL(data.startDate);
  if (start) rows.push(['Gewenste startdatum', start]);

  return (
    <div className="rounded-card border border-signal/30 bg-paper-soft p-7 sm:p-9" role="status">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-signal text-paper">
        <Check width={28} height={28} />
      </span>
      <h2 className="mt-5 font-display text-2xl font-bold sm:text-3xl">
        Bedankt, {data.firstName}!
      </h2>
      <p className="mt-3 max-w-xl leading-relaxed text-asphalt">{state.message}</p>

      {state.demo && (
        <p className="mt-4 rounded-sm border border-ink/15 bg-paper px-4 py-3 text-sm text-asphalt">
          <strong className="text-ink">Demomodus:</strong> er is geen e-mail verstuurd omdat er nog
          geen e-mailconfiguratie is ingesteld. In een live-omgeving ontvangen jij en de rijschool
          automatisch een bevestiging.
        </p>
      )}

      <div className="mt-7">
        <h3 className="font-mono text-xs uppercase tracking-kicker text-signal">Jouw aanmelding</h3>
        <dl className="mt-4 divide-y divide-ink/10 border-y border-ink/10">
          {rows.map(([label, value]) => (
            <div key={label} className="flex flex-col gap-1 py-3 sm:flex-row sm:gap-4">
              <dt className="w-full text-sm text-asphalt sm:w-52">{label}</dt>
              <dd className="text-sm font-medium text-ink">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-7 flex flex-wrap gap-3">
        <Button href="/">Terug naar home</Button>
        <Button href="/rijlessen" variant="secondary">
          Meer over de rijlessen
        </Button>
      </div>
    </div>
  );
}
