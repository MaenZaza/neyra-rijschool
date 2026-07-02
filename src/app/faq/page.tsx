import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/ui/Section';
import { Accordion } from '@/components/ui/Accordion';
import { CtaBand } from '@/components/sections/CtaBand';
import { Button } from '@/components/ui/Button';
import { Phone, Mail } from '@/components/ui/icons';
import { faqItems } from '@/data/faq';
import { schoolInfo } from '@/data/schoolInfo';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Veelgestelde vragen',
  description:
    'Antwoorden op veelgestelde vragen over rijlessen bij Neyra Rijschool: tarieven, schakel of automaat, lesgebieden, praktijkexamen, proefles en betalen.',
  path: '/faq',
});

// FAQPage structured data for rich results.
function faqJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd()) }}
      />

      <PageHeader
        index="?"
        kicker="Veelgestelde vragen"
        title="Alles wat je wilt weten"
        intro="Staat je vraag er niet bij? Neem gerust contact op, we helpen je graag verder."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-card border border-ink/15 bg-paper-soft p-6">
              <h2 className="font-display text-xl font-semibold">Nog een vraag?</h2>
              <p className="mt-2 text-sm text-asphalt">
                We beantwoorden je vraag graag persoonlijk.
              </p>
              <div className="mt-5 space-y-2.5 text-sm">
                <a
                  href={`tel:${schoolInfo.phoneHref}`}
                  className="inline-flex items-center gap-2 font-medium text-ink hover:text-signal"
                >
                  <Phone width={16} height={16} className="text-signal" /> {schoolInfo.phone}
                </a>
                <br />
                <a
                  href={`mailto:${schoolInfo.email}`}
                  className="inline-flex items-center gap-2 font-medium text-ink hover:text-signal"
                >
                  <Mail width={16} height={16} className="text-signal" /> {schoolInfo.email}
                </a>
              </div>
              <Button href="/contact" className="mt-6 w-full">
                Plan een proefles
              </Button>
            </div>
          </aside>

          <Accordion items={faqItems} />
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
