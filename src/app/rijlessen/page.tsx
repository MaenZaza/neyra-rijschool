import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { Section, SectionHeading } from '@/components/ui/Section';
import { LessonTypes } from '@/components/sections/LessonTypes';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { CtaBand } from '@/components/sections/CtaBand';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { Check, Clock, Route } from '@/components/ui/icons';
import { lessonIncludes } from '@/data/content';
import { schoolInfo } from '@/data/schoolInfo';
import { formatEuro } from '@/lib/utils';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Rijlessen — schakel & automaat',
  description:
    'Rijlessen in schakel en automaat bij Neyra Rijschool. Persoonlijk lesplan, proefles, ophalen binnen het lesgebied. Losse rijles € 60 per uur in Uden, Oss en Den Bosch.',
  path: '/rijlessen',
});

const evaluationSteps = [
  {
    title: 'Startniveau bepalen',
    description:
      'Tijdens de proefles kijken we samen wat je al kunt en waar je onzeker over bent. Zo weten we precies waar we beginnen.',
  },
  {
    title: 'Persoonlijk lesplan',
    description:
      'Op basis daarvan stellen we een lesplan op met heldere leerdoelen, afgestemd op jouw tempo en agenda.',
  },
  {
    title: 'Voortgang bespreken',
    description:
      'Na elke les weet je wat goed ging en waar we de volgende keer aan werken. Geen giswerk, wel richting.',
  },
];

export default function RijlessenPage() {
  return (
    <>
      <PageHeader
        index="01"
        kicker="Rijlessen"
        title="Leren rijden op een manier die bij jou past"
        intro="Of je nu net begint of al eerder lessen hebt gehad: we sluiten aan op jouw niveau en bouwen rustig op naar zelfstandig en veilig rijden."
      >
        <div className="flex flex-wrap items-center gap-3">
          <Button href="/contact">Plan een proefles</Button>
          <Button href="/pakketten" variant="secondary">
            Bekijk lespakketten
          </Button>
        </div>
      </PageHeader>

      <LessonTypes />

      {/* Price + what's included */}
      <Section tone="ink">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              kicker="Tarief losse rijles"
              title={
                <>
                  <span className="text-signal">{formatEuro(schoolInfo.singleLessonPrice)}</span>{' '}
                  per uur, alles inbegrepen
                </>
              }
              intro="Geen verborgen kosten. Bij elke rijles hoort standaard:"
            />
            <p className="mt-6 inline-flex items-center gap-2 font-mono text-sm text-paper/70">
              <Clock width={16} height={16} className="text-signal" />
              Lesduur: {schoolInfo.lessonDurationMinutes} minuten (langere lessen in overleg)
            </p>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2">
            {lessonIncludes.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-card border border-paper/10 p-4"
              >
                <Check width={20} height={20} className="mt-0.5 shrink-0 text-signal" />
                <span className="text-sm text-paper/90">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Evaluation & lesson plan */}
      <Section tone="paper-soft">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <SectionHeading
            kicker="Jouw lesplan"
            title="Van startniveau naar een persoonlijk plan"
            intro="We meten niet af aan een standaard, maar aan jou. Zo werkt dat in de praktijk."
          />
          <div className="space-y-6">
            {evaluationSteps.map((step, i) => (
              <Reveal
                key={step.title}
                delay={i * 70}
                className="flex gap-5 rounded-card border border-ink/10 bg-paper p-6"
              >
                <span
                  aria-hidden
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink font-mono text-sm font-bold text-paper"
                >
                  0{i + 1}
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold">{step.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-asphalt">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Individual vs packages + registration */}
      <Section>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-card border border-ink/15 p-7 sm:p-8">
            <Route className="text-signal" width={28} height={28} />
            <h2 className="mt-4 font-display text-2xl font-semibold">
              Losse lessen of een pakket?
            </h2>
            <p className="mt-3 leading-relaxed text-asphalt">
              Losse lessen geven maximale flexibiliteit en reken je per keer af. Een pakket is
              voordeliger, geeft structuur en houdt je gemotiveerd richting je examen. Twijfel je?
              Dan bepalen we het samen na de proefles.
            </p>
            <Button href="/pakketten" variant="ghost" className="mt-5">
              Vergelijk de pakketten
            </Button>
          </div>
          <div className="rounded-card border border-ink/15 bg-ink p-7 text-paper sm:p-8">
            <span className="font-mono text-xs uppercase tracking-kicker text-signal">
              Aanmelden
            </span>
            <h2 className="mt-3 font-display text-2xl font-semibold">Zo schrijf je je in</h2>
            <p className="mt-3 leading-relaxed text-paper/75">
              Vul het aanmeldformulier in met je gegevens en voorkeuren. We nemen daarna snel
              contact op om je proefles of eerste les in te plannen. Je zit nergens aan vast.
            </p>
            <Button
              href="/contact"
              variant="secondary"
              className="mt-5 !border-paper !text-paper hover:!bg-paper hover:!text-ink"
            >
              Naar het aanmeldformulier
            </Button>
          </div>
        </div>
      </Section>

      <HowItWorks />
      <CtaBand />
    </>
  );
}
