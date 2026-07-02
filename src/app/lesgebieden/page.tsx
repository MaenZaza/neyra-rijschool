import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { Section, SectionHeading } from '@/components/ui/Section';
import { AreaMap } from '@/components/sections/AreaMap';
import { PostcodeChecker } from '@/components/sections/PostcodeChecker';
import { CtaBand } from '@/components/sections/CtaBand';
import { Reveal } from '@/components/ui/Reveal';
import { Pin } from '@/components/ui/icons';
import { serviceAreas } from '@/data/serviceAreas';
import { schoolInfo } from '@/data/schoolInfo';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Lesgebieden in Noord-Brabant',
  description:
    'Neyra Rijschool geeft rijles in Uden, Oss, ’s-Hertogenbosch (Den Bosch), Veghel, Boekel, Volkel en omgeving. Check met de postcodecheck of we ook bij jou lesgeven.',
  path: '/lesgebieden',
});

export default function LesgebiedenPage() {
  return (
    <>
      <PageHeader
        index="03"
        kicker="Lesgebieden"
        title="Rijles in Uden, Oss, Den Bosch en omgeving"
        intro="We geven les in een groot deel van Noord-Brabant en halen je op binnen het lesgebied. Zo verlies je geen kostbare lestijd aan reizen."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-14">
          <div>
            <SectionHeading
              kicker="Onze regio"
              title="Waar wij lesgeven"
              intro="Staat jouw plaats er niet bij, maar woon je in de buurt? Neem gerust contact op, vaak kan er meer dan je denkt."
            />

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {serviceAreas.map((area, i) => (
                <Reveal
                  as="li"
                  key={area.name}
                  delay={i * 50}
                  className="flex items-center justify-between gap-3 rounded-card border border-ink/15 bg-paper-soft px-4 py-3.5"
                >
                  <span className="inline-flex items-center gap-2 font-medium">
                    <Pin width={16} height={16} className="text-signal" />
                    {area.name}
                  </span>
                  {area.examLocation && (
                    <span className="rounded-sm bg-plate px-2 py-0.5 font-mono text-[0.65rem] font-bold uppercase tracking-wide text-ink">
                      Examenomgeving
                    </span>
                  )}
                </Reveal>
              ))}
            </ul>

            <p className="mt-6 rounded-card border border-ink/10 bg-paper-soft p-4 text-sm text-asphalt">
              Praktijkexamens vinden doorgaans plaats in de omgeving van{' '}
              <strong className="text-ink">{schoolInfo.examLocation}</strong>. In de lessen oefenen
              we gericht met de situaties die je daar kunt tegenkomen.
            </p>
          </div>

          <div className="lg:sticky lg:top-24">
            <AreaMap />
            <p className="mt-3 text-xs text-asphalt">
              Illustratieve weergave — geen exacte geografische kaart.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="paper-soft">
        <div className="mx-auto max-w-2xl">
          <PostcodeChecker />
          <p className="mt-4 text-center text-xs text-asphalt">
            De postcodecheck werkt op een lokale demolijst in{' '}
            <code className="rounded-sm bg-ink/5 px-1.5 py-0.5 font-mono">
              src/data/serviceAreas.ts
            </code>{' '}
            en gebruikt geen externe API.
          </p>
        </div>
      </Section>

      <CtaBand
        title="Woon je in ons lesgebied?"
        text="Mooi! Plan een proefles en we halen je gewoon thuis op. Buiten de regio? Neem contact op om de mogelijkheden te bespreken."
      />
    </>
  );
}
