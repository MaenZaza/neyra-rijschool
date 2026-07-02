import { Section, SectionHeading } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { howItWorks } from '@/data/content';

/**
 * "Zo werkt het" — the student conversion flow rendered as a vertical route
 * with numbered stops, echoing a navigation instruction list.
 */
export function HowItWorks() {
  return (
    <Section tone="paper-soft" id="zo-werkt-het">
      <SectionHeading
        kicker="Zo werkt het"
        title="Van eerste contact tot rijbewijs"
        intro="Een duidelijke route, zonder verrassingen. Zo ziet jouw traject bij Neyra Rijschool eruit."
      />

      <ol className="relative mt-14 space-y-0">
        {/* Vertical route line */}
        <span
          aria-hidden
          className="absolute bottom-2 left-[27px] top-2 w-px bg-ink/15 sm:left-[31px]"
        />
        {howItWorks.map((step, i) => (
          <Reveal
            as="li"
            key={step.number}
            delay={i * 60}
            className="relative flex gap-5 pb-10 last:pb-0 sm:gap-7"
          >
            <span
              aria-hidden
              className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-paper font-mono text-lg font-bold text-ink sm:h-16 sm:w-16"
            >
              {step.number}
            </span>
            <div className="pt-1.5 sm:pt-2.5">
              <h3 className="font-display text-xl font-semibold sm:text-2xl">{step.title}</h3>
              <p className="mt-2 max-w-xl leading-relaxed text-asphalt">{step.description}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
