import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { Phone, Mail, Pin } from '@/components/ui/icons';
import { navigation, legalLinks, schoolInfo } from '@/data/schoolInfo';
import { serviceAreas } from '@/data/serviceAreas';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-paper">
      {/* Lane divider echoing road markings */}
      <div className="container-page">
        <div className="lane-divider text-signal/40" aria-hidden />
      </div>

      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:py-16">
        <div className="lg:col-span-1">
          <Logo tone="paper" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/60">
            Persoonlijke rijlessen in schakel en automaat in Uden, Oss, Den Bosch en omgeving.
            Rustig, duidelijk en op jouw tempo.
          </p>
        </div>

        <nav aria-label="Footer navigatie">
          <h2 className="font-mono text-xs uppercase tracking-kicker text-signal">Menu</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-paper/70 transition-colors hover:text-paper">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-mono text-xs uppercase tracking-kicker text-signal">Contact</h2>
          <ul className="mt-4 space-y-3 text-sm text-paper/70">
            <li>
              <a
                href={`tel:${schoolInfo.phoneHref}`}
                className="inline-flex items-center gap-2 transition-colors hover:text-paper"
              >
                <Phone width={16} height={16} className="text-signal" /> {schoolInfo.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${schoolInfo.email}`}
                className="inline-flex items-center gap-2 transition-colors hover:text-paper"
              >
                <Mail width={16} height={16} className="text-signal" /> {schoolInfo.email}
              </a>
            </li>
            <li className="inline-flex items-center gap-2">
              <Pin width={16} height={16} className="text-signal" /> {schoolInfo.address.city},{' '}
              {schoolInfo.address.region}
            </li>
          </ul>

          <h2 className="mt-6 font-mono text-xs uppercase tracking-kicker text-signal">
            Openingstijden
          </h2>
          <ul className="mt-3 space-y-1.5 text-sm text-paper/70">
            {schoolInfo.openingHoursShort.map((oh) => (
              <li key={oh.day} className="flex justify-between gap-4">
                <span>{oh.day}</span>
                <span className={oh.closed ? 'text-paper/40' : ''}>{oh.hours}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-mono text-xs uppercase tracking-kicker text-signal">Lesgebieden</h2>
          <ul className="mt-4 flex flex-wrap gap-2 text-sm">
            {serviceAreas.map((area) => (
              <li
                key={area.name}
                className="rounded-sm border border-paper/15 px-2.5 py-1 text-paper/70"
              >
                {area.name}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-paper/50">En omliggende plaatsen in Noord-Brabant.</p>
        </div>
      </div>

      <div className="border-t border-paper/10">
        <div className="container-page flex flex-col items-start justify-between gap-4 py-6 text-xs text-paper/50 sm:flex-row sm:items-center">
          <p>
            © {year} {schoolInfo.name}. Alle rechten voorbehouden.{' '}
            <span className="text-paper/30">Demoproject.</span>
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {legalLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-paper">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
