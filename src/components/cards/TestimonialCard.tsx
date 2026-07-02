import type { Testimonial } from '@/types';
import { StarRating } from '@/components/ui/StarRating';
import { transmissionLabels } from '@/lib/validation/registration';
import { formatDateNL } from '@/lib/utils';

/** Single student review card. */
export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const date = formatDateNL(testimonial.date);
  return (
    <figure className="flex h-full flex-col rounded-card border border-ink/15 bg-paper-soft p-6 sm:p-7">
      <StarRating rating={testimonial.rating} />
      <blockquote className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-ink/85">
        “{testimonial.quote}”
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-ink/10 pt-4">
        <span
          aria-hidden
          className="flex h-10 w-10 items-center justify-center rounded-full bg-ink font-display text-sm font-bold text-paper"
        >
          {testimonial.name.charAt(0)}
        </span>
        <span className="flex flex-col">
          <span className="font-medium">
            {testimonial.name} <span className="text-asphalt">uit {testimonial.city}</span>
          </span>
          <span className="font-mono text-xs text-asphalt-light">
            {testimonial.transmission && transmissionLabels[testimonial.transmission]}
            {testimonial.transmission && date && ' · '}
            {date}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
