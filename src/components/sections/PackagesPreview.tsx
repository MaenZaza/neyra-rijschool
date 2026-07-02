import { Section, SectionHeading } from '@/components/ui/Section';
import { PackageCard } from '@/components/cards/PackageCard';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { ArrowRight } from '@/components/ui/icons';
import { packages } from '@/data/packages';

/** Packages overview grid. Reused as the homepage packages section. */
export function PackagesPreview({ tone = 'paper-soft' }: { tone?: 'paper' | 'paper-soft' }) {
  return (
    <Section tone={tone} id="pakketten">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <SectionHeading
          kicker="Lespakketten"
          title="Kies een pakket dat bij je past"
          intro="Voordeliger dan losse lessen en met een duidelijk plan. Schakel of automaat, jij kiest."
        />
        <Button href="/pakketten" variant="ghost" className="shrink-0 self-start lg:self-auto">
          Alle pakketten
          <ArrowRight width={18} height={18} />
        </Button>
      </div>

      <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-3">
        {packages.map((pkg, i) => (
          <Reveal key={pkg.slug} delay={i * 70} className="flex">
            <div className="flex w-full">
              <PackageCard pkg={pkg} />
            </div>
          </Reveal>
        ))}
      </div>

      <p className="mt-8 text-sm text-asphalt">
        Alle prijzen zijn demowaarden en centraal aanpasbaar in{' '}
        <code className="rounded-sm bg-ink/5 px-1.5 py-0.5 font-mono text-xs">
          src/data/packages.ts
        </code>
        .
      </p>
    </Section>
  );
}
