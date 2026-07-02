import type { Statistic } from '@/types';
import { cn } from '@/lib/utils';

/** Large-number statistic tile. */
export function StatCard({ stat, tone = 'ink' }: { stat: Statistic; tone?: 'ink' | 'paper' }) {
  return (
    <div
      className={cn(
        'flex flex-col border-t-2 pt-5',
        tone === 'ink' ? 'border-signal' : 'border-ink',
      )}
    >
      <span
        className={cn(
          'font-display text-5xl font-bold leading-none sm:text-6xl',
          tone === 'ink' ? 'text-paper' : 'text-ink',
        )}
      >
        {stat.value}
      </span>
      <span
        className={cn(
          'mt-3 text-sm font-medium uppercase tracking-wide',
          tone === 'ink' ? 'text-signal-soft' : 'text-signal',
        )}
      >
        {stat.label}
      </span>
      {stat.description && (
        <span
          className={cn(
            'mt-2 text-sm leading-relaxed',
            tone === 'ink' ? 'text-paper/60' : 'text-asphalt',
          )}
        >
          {stat.description}
        </span>
      )}
    </div>
  );
}
