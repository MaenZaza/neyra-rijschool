import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/ui/Section';
import { PackageCard } from '@/components/cards/PackageCard';
import { Reveal } from '@/components/ui/Reveal';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { CtaBand } from '@/components/sections/CtaBand';
import { FaqSection } from '@/components/sections/FaqSection';
import { packages } from '@/data/packages';
import { schoolInfo } from '@/data/schoolInfo';
import { formatEuro } from '@/lib/utils';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Lespakketten & tarieven',
  description:
    'Bekijk de rijles-pakketten van Neyra Rijschool: Startpakket, Groeipakket en Compleetpakket. Voordelig lessen in schakel of automaat, met een persoonlijk lesplan.',
  path: '/pakketten',
});

export default function PakkettenPage() {
  return (
    <>
      <PageHeader
        index="02"
        kicker="Lespakketten"
        title="Voordelig lessen met een duidelijk plan"
        intro="Kies het pakket dat past bij jouw ervaring en doelen. Elk pakket kan in schakel of automaat en bevat een persoonlijk lesplan."
      />

      <Section>
        <div className="grid items-stretch gap-6 lg:grid-cols-3">
          {packages.map((pkg, i) => (
            <Reveal key={pkg.slug} delay={i * 70} className="flex">
              <div className="flex w-full">
                <PackageCard pkg={pkg} />
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 rounded-card border border-ink/15 bg-paper-soft p-6 text-sm text-asphalt sm:p-7">
          <p>
            <strong className="text-ink">Losse rijles:</strong>{' '}
            {formatEuro(schoolInfo.singleLessonPrice)} per uur, inclusief persoonlijke begeleiding,
            ophalen binnen het lesgebied, een persoonlijk lesplan en een voortgangsbespreking.
          </p>
          <p className="mt-3">
            Let op: alle genoemde prijzen en voordelen zijn <strong>demowaarden</strong> voor dit
            portfolioproject. Ze zijn centraal aan te passen in{' '}
            <code className="rounded-sm bg-ink/5 px-1.5 py-0.5 font-mono text-xs">
              src/data/packages.ts
            </code>
            . De CBR-examenkosten zijn niet in de pakketten inbegrepen.
          </p>
        </div>
      </Section>

      <HowItWorks />
      <FaqSection limit={5} showLink tone="paper" />
      <CtaBand
        title="Twijfel je welk pakket past?"
        text="Plan een proefles. Op basis van je startniveau adviseren we welk pakket het beste bij je past."
      />
    </>
  );
}
