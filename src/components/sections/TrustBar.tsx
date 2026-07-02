import { trustPoints } from '@/data/content';

/**
 * Horizontal strip of trust points. On the dark surface it reads like a
 * road sign row. Kept static (no marquee) so it works without JavaScript and
 * respects reduced motion.
 */
export function TrustBar() {
  return (
    <div className="border-y border-paper/10 bg-ink text-paper">
      <div className="container-page flex flex-wrap items-center gap-x-8 gap-y-3 py-5">
        {trustPoints.map((point) => (
          <span key={point} className="inline-flex items-center gap-2 text-sm text-paper/80">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-signal" />
            {point}
          </span>
        ))}
      </div>
    </div>
  );
}
