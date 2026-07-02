import type { ReactNode } from 'react';
import { PageHeader } from './PageHeader';
import { Section } from '@/components/ui/Section';

/**
 * Shared wrapper for the legal pages. Provides consistent prose styling without
 * pulling in the typography plugin.
 *
 * ⚠️  LET OP: de juridische teksten op deze pagina's zijn PLACEHOLDER-content
 *     voor een demoproject. Laat ze juridisch controleren voordat de website
 *     commercieel wordt gebruikt.
 */
export function LegalArticle({
  index,
  title,
  updated,
  children,
}: {
  index: string;
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <PageHeader
        index={index}
        kicker="Juridisch"
        title={title}
        intro={`Laatst bijgewerkt: ${updated}`}
      />
      <Section>
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 rounded-card border border-plate-deep/40 bg-plate/15 px-5 py-4 text-sm text-ink">
            <strong>Demoversie:</strong> dit is voorbeeldtekst voor een portfolioproject. Laat de
            juridische inhoud professioneel controleren voordat de website live gaat.
          </div>
          <div className="space-y-6 leading-relaxed text-asphalt [&_a]:font-medium [&_a]:text-signal [&_a]:underline [&_a]:underline-offset-2 [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-ink [&_h3]:mt-6 [&_h3]:font-display [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-ink [&_li]:ml-1 [&_p]:text-[1.02rem] [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
            {children}
          </div>
        </div>
      </Section>
    </>
  );
}
