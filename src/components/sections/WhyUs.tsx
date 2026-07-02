import { Section, SectionHeading } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { whyChooseUs } from '@/data/content';

/** "Waarom Neyra" — large-number editorial grid. */
export function WhyUs() {
  return (
    <Section id="waarom">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <SectionHeading
          kicker="Waarom Neyra"
          title="Een rijschool die naast je staat"
          intro="Geen lopende band, maar echte aandacht. We kijken naar wat jij nodig hebt en passen de lessen daarop aan."
        />

        <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {whyChooseUs.map((point, i) => (
            <Reveal key={point.number} delay={i * 60} className="relative">
              <span aria-hidden className="font-display text-5xl font-bold text-signal/25">
                {point.number}
              </span>
              <h3 className="mt-3 font-display text-xl font-semibold">{point.title}</h3>
              <p className="mt-2 leading-relaxed text-asphalt">{point.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
