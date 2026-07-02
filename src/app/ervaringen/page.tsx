import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/ui/Section';
import { TestimonialCard } from '@/components/cards/TestimonialCard';
import { StarRating } from '@/components/ui/StarRating';
import { Reveal } from '@/components/ui/Reveal';
import { CtaBand } from '@/components/sections/CtaBand';
import { testimonials } from '@/data/testimonials';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Ervaringen van leerlingen',
  description:
    'Lees ervaringen van leerlingen van Neyra Rijschool uit Uden, Oss, Den Bosch en omgeving. Echte verhalen over persoonlijke begeleiding in schakel en automaat.',
  path: '/ervaringen',
});

export default function ErvaringenPage() {
  const avg = testimonials.reduce((sum, t) => sum + t.rating, 0) / (testimonials.length || 1);

  return (
    <>
      <PageHeader
        index="★"
        kicker="Ervaringen"
        title="Verhalen van leerlingen"
        intro="Van eerste les tot geslaagd: dit is hoe leerlingen hun tijd bij Neyra Rijschool hebben ervaren."
      >
        <div className="inline-flex items-center gap-3 rounded-card border border-ink/15 bg-paper px-4 py-3">
          <StarRating rating={avg} size={20} />
          <span className="font-display text-lg font-semibold">{avg.toFixed(1)}/5</span>
          <span className="text-sm text-asphalt">
            op basis van {testimonials.length} ervaringen
          </span>
        </div>
      </PageHeader>

      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.id} delay={i * 50} className="flex">
              <TestimonialCard testimonial={t} />
            </Reveal>
          ))}
        </div>

        <p className="mt-10 text-sm text-asphalt">
          Alle ervaringen zijn fictieve demo-content voor dit portfolioproject en centraal
          aanpasbaar in{' '}
          <code className="rounded-sm bg-ink/5 px-1.5 py-0.5 font-mono text-xs">
            src/data/testimonials.ts
          </code>
          .
        </p>
      </Section>

      <CtaBand
        title="Zelf ervaren hoe het werkt?"
        text="Plan een proefles en merk het verschil van rustige, persoonlijke begeleiding."
      />
    </>
  );
}
