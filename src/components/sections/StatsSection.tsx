import { Section, SectionHeading } from '@/components/ui/Section';
import { StatCard } from '@/components/cards/StatCard';
import { Reveal } from '@/components/ui/Reveal';
import { statistics, statisticsDisclaimer } from '@/data/statistics';

/** Success-rate statistics band on the dark surface. Reused on the homepage. */
export function StatsSection() {
  return (
    <Section tone="ink" id="slagingspercentage">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div className="relative">
        <SectionHeading
          kicker="Slagingspercentage"
          title="Cijfers die vertrouwen geven"
          intro="Leren rijden draait om resultaat én om hoe je je onderweg voelt. Dit zijn onze interne cijfers."
        />

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {statistics.map((stat, i) => (
            <Reveal key={stat.id} delay={i * 70}>
              <StatCard stat={stat} tone="ink" />
            </Reveal>
          ))}
        </div>

        <p className="mt-10 max-w-2xl text-sm text-paper/50">{statisticsDisclaimer}</p>
      </div>
    </Section>
  );
}
