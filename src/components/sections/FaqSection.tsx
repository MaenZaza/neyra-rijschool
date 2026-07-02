import { Section, SectionHeading } from '@/components/ui/Section';
import { Accordion } from '@/components/ui/Accordion';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from '@/components/ui/icons';
import { faqItems } from '@/data/faq';

/** FAQ accordion section. Pass `limit` for a homepage preview. */
export function FaqSection({
  limit,
  showLink = false,
  tone = 'paper',
}: {
  limit?: number;
  showLink?: boolean;
  tone?: 'paper' | 'paper-soft';
}) {
  const items = limit ? faqItems.slice(0, limit) : faqItems;

  return (
    <Section tone={tone} id="faq">
      <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
        <div>
          <SectionHeading
            kicker="Veelgestelde vragen"
            title="Goed om te weten"
            intro="De meest gestelde vragen over rijlessen, pakketten en aanmelden."
          />
          {showLink && (
            <Button href="/faq" variant="ghost" className="mt-6">
              Alle vragen
              <ArrowRight width={18} height={18} />
            </Button>
          )}
        </div>
        <Accordion items={items} />
      </div>
    </Section>
  );
}
