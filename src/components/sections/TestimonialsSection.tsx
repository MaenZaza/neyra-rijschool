import { Section, SectionHeading } from '@/components/ui/Section';
import { TestimonialCard } from '@/components/cards/TestimonialCard';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { ArrowRight } from '@/components/ui/icons';
import { testimonials } from '@/data/testimonials';

/** Reviews grid. Pass `limit` to show a subset (e.g. on the homepage). */
export function TestimonialsSection({
  limit,
  showLink = false,
}: {
  limit?: number;
  showLink?: boolean;
}) {
  const items = limit ? testimonials.slice(0, limit) : testimonials;

  return (
    <Section id="ervaringen">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <SectionHeading
          kicker="Ervaringen"
          title="Wat leerlingen zeggen"
          intro="Echte verhalen van leerlingen uit Uden, Oss, Den Bosch en omgeving."
        />
        {showLink && (
          <Button href="/ervaringen" variant="ghost" className="shrink-0 self-start lg:self-auto">
            Alle ervaringen
            <ArrowRight width={18} height={18} />
          </Button>
        )}
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((t, i) => (
          <Reveal key={t.id} delay={i * 60} className="flex">
            <TestimonialCard testimonial={t} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
