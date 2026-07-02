import { Section, SectionHeading } from '@/components/ui/Section';
import { AreaMap } from './AreaMap';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Pin } from '@/components/ui/icons';
import { serviceAreas } from '@/data/serviceAreas';
import { schoolInfo } from '@/data/schoolInfo';

/** Homepage service-area overview: town list + stylised map + CTA. */
export function AreasOverview() {
  return (
    <Section tone="ink" id="lesgebieden">
      <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
        <div>
          <SectionHeading
            kicker="Lesgebieden"
            title="Rijles bij jou in de buurt"
            intro="We geven les in een groot deel van Noord-Brabant en halen je op binnen het lesgebied."
          />

          <ul className="mt-8 flex flex-wrap gap-2.5">
            {serviceAreas.map((area) => (
              <li
                key={area.name}
                className="inline-flex items-center gap-1.5 rounded-sm border border-paper/20 px-3 py-1.5 text-sm text-paper/85"
              >
                <Pin width={14} height={14} className="text-signal" />
                {area.name}
              </li>
            ))}
            <li className="inline-flex items-center rounded-sm border border-dashed border-paper/20 px-3 py-1.5 text-sm text-paper/60">
              + omgeving
            </li>
          </ul>

          <p className="mt-6 text-sm text-paper/60">
            Praktijkexamens vinden doorgaans plaats in de omgeving van {schoolInfo.examLocation}.
          </p>

          <Button
            href="/lesgebieden"
            variant="secondary"
            className="mt-8 !border-paper !text-paper hover:!bg-paper hover:!text-ink"
          >
            Bekijk alle lesgebieden
            <ArrowRight width={18} height={18} />
          </Button>
        </div>

        <AreaMap />
      </div>
    </Section>
  );
}
