'use client';

import { useState, type FormEvent } from 'react';
import { checkServiceArea, type PostcodeCheckResult } from '@/data/serviceAreas';
import { Button } from '@/components/ui/Button';
import { Check, Close, Pin } from '@/components/ui/icons';
import { cn } from '@/lib/utils';

/**
 * Local postcode / city checker. Matches against the demo service-area list in
 * src/data/serviceAreas.ts — no external API. Fully usable via keyboard and
 * announces the result to assistive tech via aria-live.
 */
export function PostcodeChecker() {
  const [value, setValue] = useState('');
  const [result, setResult] = useState<PostcodeCheckResult | null>(null);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    setResult(checkServiceArea(value));
  };

  return (
    <div className="rounded-card border border-ink/15 bg-paper-soft p-6 sm:p-8">
      <span className="kicker">Postcodecheck</span>
      <h3 className="mt-3 font-display text-2xl font-semibold">Geven we les in jouw regio?</h3>
      <p className="mt-2 text-sm text-asphalt">
        Vul je postcode (bijv. 5401 AB) of woonplaats in en check het direct.
      </p>

      <form onSubmit={onSubmit} className="mt-5 flex flex-col gap-3 sm:flex-row">
        <label htmlFor="postcode-check" className="sr-only">
          Postcode of woonplaats
        </label>
        <div className="relative flex-1">
          <Pin
            width={18}
            height={18}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-asphalt"
          />
          <input
            id="postcode-check"
            type="text"
            inputMode="text"
            autoComplete="postal-code"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              if (result) setResult(null);
            }}
            placeholder="5401 AB of Uden"
            className="w-full rounded-sm border border-ink/20 bg-paper py-3 pl-10 pr-4 text-ink placeholder:text-asphalt-light focus:border-signal"
          />
        </div>
        <Button type="submit" size="lg">
          Check
        </Button>
      </form>

      <div aria-live="polite" className="mt-4 min-h-[1.5rem]">
        {result && (
          <div
            className={cn(
              'flex items-start gap-3 rounded-sm border p-4 text-sm',
              result.supported
                ? 'border-signal/30 bg-signal/10 text-ink'
                : 'border-ink/15 bg-paper text-ink',
            )}
          >
            <span
              className={cn(
                'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full',
                result.supported ? 'bg-signal text-paper' : 'bg-ink text-paper',
              )}
            >
              {result.supported ? (
                <Check width={15} height={15} />
              ) : (
                <Close width={15} height={15} />
              )}
            </span>
            <p>
              {result.supported ? (
                <>
                  <strong>Goed nieuws, wij geven rijles in jouw regio.</strong>
                  {result.matchedArea && ` (${result.matchedArea})`}{' '}
                  <a
                    href="/contact"
                    className="font-medium text-signal underline underline-offset-2"
                  >
                    Plan direct een proefles.
                  </a>
                </>
              ) : (
                <>
                  Jouw regio staat nog niet in onze lijst.{' '}
                  <a
                    href="/contact"
                    className="font-medium text-signal underline underline-offset-2"
                  >
                    Neem contact op
                  </a>{' '}
                  om de mogelijkheden te bespreken.
                </>
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
