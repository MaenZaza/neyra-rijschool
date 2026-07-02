import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { Section, SectionHeading } from '@/components/ui/Section';
import { StatCard } from '@/components/cards/StatCard';
import { Reveal } from '@/components/ui/Reveal';
import { CtaBand } from '@/components/sections/CtaBand';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { statistics, statisticsDisclaimer } from '@/data/statistics';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Slagingspercentage & resultaten',
  description:
    'De resultaten van Neyra Rijschool in cijfers: slagingspercentage, tevredenheid en beoordelingen. Gebaseerd op interne resultaten (demodata).',
  path: '/slagingspercentage',
});

export default function SlagingspercentagePage() {
  return (
    <>
      <PageHeader
        index="%"
        kicker="Slagingspercentage"
        title="Onze resultaten in cijfers"
        intro="Resultaat telt, maar hoe je je onderweg voelt net zo goed. Dit zijn onze interne cijfers."
      />

      <Section tone="ink">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {statistics.map((stat, i) => (
            <Reveal key={stat.id} delay={i * 70}>
              <StatCard stat={stat} tone="ink" />
            </Reveal>
          ))}
        </div>

        <div className="mt-14 max-w-3xl rounded-card border border-paper/10 bg-ink-soft p-6 sm:p-8">
          <h2 className="font-display text-xl font-semibold">Hoe komen deze cijfers tot stand?</h2>
          <p className="mt-3 leading-relaxed text-paper/70">
            {statisticsDisclaimer} De cijfers worden intern bijgehouden en zijn bedoeld om een
            indruk te geven van onze aanpak en resultaten. Ze zijn nadrukkelijk{' '}
            <strong className="text-paper">niet afkomstig van het CBR</strong> en worden niet als
            officiële CBR-statistiek gepresenteerd.
          </p>
        </div>
      </Section>

      {/* Technical / portfolio note */}
      <Section tone="paper-soft">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading
            kicker="Voor later"
            title="Klaar om live data te tonen"
            intro="De statistieken komen nu uit één centraal databestand."
          />
          <div className="space-y-4 text-lg leading-relaxed text-asphalt">
            <p>
              In deze demoversie leest de website de cijfers uit{' '}
              <code className="rounded-sm bg-ink/5 px-1.5 py-0.5 font-mono text-sm">
                src/data/statistics.ts
              </code>
              . De presentatielaag is losgekoppeld van de databron.
            </p>
            <p>
              Daardoor kunnen deze waarden later moeiteloos geladen worden uit een API, een database
              of een adminomgeving, zonder dat de pagina zelf herbouwd hoeft te worden.
            </p>
          </div>
        </div>
      </Section>

      <TestimonialsSection limit={3} showLink />
      <CtaBand
        title="Word jij onze volgende geslaagde?"
        text="Plan een proefles en zet de eerste stap naar je rijbewijs."
      />
    </>
  );
}
