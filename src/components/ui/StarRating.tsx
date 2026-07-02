import { Star } from './icons';
import { cn } from '@/lib/utils';

/** Accessible star rating with a text label for screen readers. */
export function StarRating({
  rating,
  className,
  size = 16,
}: {
  rating: number;
  className?: string;
  size?: number;
}) {
  const rounded = Math.round(rating);
  return (
    <span className={cn('inline-flex items-center gap-0.5 text-signal', className)}>
      <span className="sr-only">{rating} van de 5 sterren</span>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} filled={i < rounded} width={size} height={size} aria-hidden />
      ))}
    </span>
  );
}
