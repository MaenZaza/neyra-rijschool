import Link from 'next/link';
import { cn } from '@/lib/utils';

/**
 * Text-based logo for Neyra Rijschool.
 * "NEYRA" is set in the display face; a small licence-plate style "NL" badge
 * ties it to the driving-school theme without relying on an image asset.
 */
export function Logo({ className, tone = 'ink' }: { className?: string; tone?: 'ink' | 'paper' }) {
  return (
    <Link
      href="/"
      aria-label="Neyra Rijschool — naar de homepage"
      className={cn('group inline-flex items-center gap-2.5', className)}
    >
      <span
        aria-hidden
        className="flex h-8 items-center rounded-sm border-2 border-current bg-plate px-1.5 font-mono text-xs font-bold tracking-widest text-ink"
      >
        NL
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'font-display text-lg font-bold tracking-tight',
            tone === 'paper' ? 'text-paper' : 'text-ink',
          )}
        >
          Neyra
        </span>
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-signal">
          Rijschool
        </span>
      </span>
    </Link>
  );
}
