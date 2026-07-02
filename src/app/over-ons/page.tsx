import type { Metadata } from 'next';
import Image from 'next/image';
import { PageHeader } from '@/components/layout/PageHeader';
import { Section, SectionHeading } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { CtaBand } from '@/components/sections/CtaBand';
import { coreValues } from '@/data/content';
import { schoolInfo } from '@/data/schoolInfo';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Over ons',
  description:
    'Maak kennis met Neyra Rijschool: een persoonlijke rijschool in Uden en omgeving die draait om rust, vertrouwen en duidelijke begeleiding. Leer de instructeur en onze werkwijze kennen.',
  path: '/over-ons',
});

export default function OverOnsPage() {
  const { instructor } = schoolInfo;

  return (
    <>
      <PageHeader
        index="→"
        kicker="Over ons"
        title="Een rijschool met een persoonlijke aanpak"
        intro="Neyra Rijschool ontstond vanuit de overtuiging dat iedereen kan leren rijden, als de begeleiding maar bij de persoon past."
      />

      {/* Story */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div className="max-w-2xl space-y-5 text-lg leading-relaxed text-asphalt">
            <p>
              <strong className="text-ink">Neyra Rijschool</strong> is een moderne en persoonlijke
              rijschool die leerlingen helpt om met vertrouwen, geduld en duidelijke begeleiding te
              leren autorijden.
            </p>
            <p>
              Lessen worden aangepast aan het niveau van elke leerling. Of je nu een complete
              beginner bent, al eerder rijlessen hebt gehad, of eerder een praktijkexamen hebt
              geprobeerd: we sluiten aan waar jij staat.
            </p>
            <p>
              Waar traditioneel lesgeven vaak draait om zo snel mogelijk door de stof, kiezen wij
              voor persoonlijke coaching. We nemen de tijd om te begrijpen wat jij nodig hebt, nemen
              druk weg en bouwen stap voor stap aan zelfvertrouwen. Fouten maken hoort erbij, daar
              leer je juist van.
            </p>
          </div>

          <Reveal className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-card border border-ink/15">
              <Image
                src="/images/instructeur.svg"
                alt={`${instructor.name}, ${instructor.role} bij ${schoolInfo.name}`}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
            <span className="plate absolute -bottom-3 left-5 shadow-plate">NEYRA · NL</span>
          </Reveal>
        </div>
      </Section>

      {/* Instructor */}
      <Section tone="ink">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
          <div className="relative aspect-[3/2] overflow-hidden rounded-card border border-paper/15 lg:aspect-[4/5]">
            <Image
              src="/images/lesauto.svg"
              alt={`De lesauto van ${schoolInfo.name}`}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
          <div>
            <span className="font-mono text-xs uppercase tracking-kicker text-signal">
              De instructeur
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">{instructor.name}</h2>
            <p className="mt-1 font-mono text-sm text-paper/60">
              {instructor.role} · {instructor.experienceYears} jaar ervaring
            </p>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-paper/80">{instructor.bio}</p>
            <p className="mt-4 max-w-xl leading-relaxed text-paper/70">
              Rustig, duidelijk en zonder druk: dat is de rode draad in elke les. Zo wordt leren
              rijden geen stressvolle verplichting, maar een traject waar je met vertrouwen op
              terugkijkt.
            </p>
          </div>
        </div>
      </Section>

      {/* Core values */}
      <Section tone="paper-soft">
        <SectionHeading
          kicker="Onze kernwaarden"
          title="Waar wij voor staan"
          intro="Vier uitgangspunten die je in elke les terugziet."
        />
        <div className="mt-12 grid gap-px overflow-hidden rounded-card border border-ink/15 bg-ink/10 sm:grid-cols-2">
          {coreValues.map((value, i) => (
            <Reveal key={value.title} delay={i * 60} className="bg-paper">
              <div className="flex h-full items-start gap-5 p-7 sm:p-8">
                <span aria-hidden className="font-display text-4xl font-bold text-signal/30">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold">{value.title}</h3>
                  <p className="mt-2 leading-relaxed text-asphalt">{value.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Benieuwd of het klikt?"
        text="De beste manier om kennis te maken is een proefles. Rustig, vrijblijvend en volledig op jouw tempo."
      />
    </>
  );
}
