import type { LessonPackage } from '@/types';
import { Button } from '@/components/ui/Button';
import { Check, ArrowRight } from '@/components/ui/icons';
import { formatEuro } from '@/lib/utils';
import { cn } from '@/lib/utils';

/**
 * Lesson package card. The CTA links to the registration form with the
 * package preselected via the ?pakket= query parameter.
 */
export function PackageCard({ pkg }: { pkg: LessonPackage }) {
  const isPopular = pkg.popular;
  return (
    <article
      className={cn(
        'relative flex flex-col rounded-card border p-6 transition-transform duration-300 hover:-translate-y-1 sm:p-8',
        isPopular
          ? 'border-ink bg-ink text-paper shadow-lift'
          : 'border-ink/15 bg-paper-soft text-ink',
      )}
    >
      {isPopular && (
        <span className="plate absolute -top-3 left-6 !border-ink !bg-signal !text-paper">
          Meest gekozen
        </span>
      )}

      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-display text-2xl font-semibold">{pkg.name}</h3>
        <span className={cn('font-mono text-sm', isPopular ? 'text-paper/60' : 'text-asphalt')}>
          {pkg.lessonCount} lessen
        </span>
      </div>

      <p className={cn('mt-2 text-sm', isPopular ? 'text-paper/70' : 'text-asphalt')}>
        {pkg.tagline}
      </p>

      <div className="mt-6 flex items-end gap-2">
        <span className="font-display text-4xl font-bold sm:text-5xl">{formatEuro(pkg.price)}</span>
      </div>
      <p className={cn('mt-1 text-sm font-medium', isPopular ? 'text-plate' : 'text-signal')}>
        Voordeel: {formatEuro(pkg.saving)} t.o.v. losse lessen
      </p>

      <ul className="mt-6 space-y-3 text-sm">
        {pkg.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5">
            <Check
              className={cn('mt-0.5 shrink-0', isPopular ? 'text-signal-soft' : 'text-signal')}
              width={18}
              height={18}
            />
            <span className={isPopular ? 'text-paper/90' : 'text-ink/80'}>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8 pt-2">
        <Button
          href={`/contact?pakket=${pkg.slug}`}
          variant={isPopular ? 'primary' : 'secondary'}
          className="w-full"
        >
          Kies dit pakket
          <ArrowRight width={18} height={18} />
        </Button>
      </div>
    </article>
  );
}
