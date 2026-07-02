import { Button } from '@/components/ui/Button';
import { Phone } from '@/components/ui/icons';
import { schoolInfo } from '@/data/schoolInfo';

/** Strong final call-to-action band, reused across pages. */
export function CtaBand({
  title = 'Klaar om te starten met rijden?',
  text = 'Plan een vrijblijvende proefles en ontdek hoe rijles op jouw tempo voelt. We nemen snel contact met je op.',
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="bg-signal text-paper">
      <div className="container-page grid gap-8 py-16 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:py-20">
        <div>
          <h2 className="max-w-2xl font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mt-4 max-w-xl text-paper/90">{text}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-end">
          <Button
            href="/contact"
            variant="secondary"
            size="lg"
            className="!border-paper !text-paper hover:!bg-paper hover:!text-signal"
          >
            Plan een proefles
          </Button>
          <a
            href={`tel:${schoolInfo.phoneHref}`}
            className="inline-flex items-center justify-center gap-2 rounded-sm px-5 py-3 text-sm font-medium text-paper underline-offset-4 hover:underline"
          >
            <Phone width={18} height={18} /> Of bel {schoolInfo.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
