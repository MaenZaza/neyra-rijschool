import type { Metadata } from 'next';
import { Suspense } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/ui/Section';
import { RegistrationForm } from '@/components/forms/RegistrationForm';
import { Phone, Mail, Pin, Clock, Check } from '@/components/ui/icons';
import { schoolInfo } from '@/data/schoolInfo';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Aanmelden & contact',
  description:
    'Meld je aan bij Neyra Rijschool of plan een proefles. Vul het formulier in met je voorkeuren voor schakel of automaat en we nemen snel contact met je op.',
  path: '/contact',
});

const trustList = [
  'Vrijblijvend aanmelden',
  'Snel persoonlijk contact',
  'Privacyvriendelijk formulier',
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        index="04"
        kicker="Aanmelden"
        title="Plan je proefles of stel je vraag"
        intro="Vul het formulier zo volledig mogelijk in. Hoe meer we vooraf weten, hoe beter we je eerste les kunnen afstemmen op wat jij nodig hebt."
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          {/* Form */}
          <div className="order-2 lg:order-1">
            <Suspense fallback={<p className="text-asphalt">Formulier laden…</p>}>
              <RegistrationForm />
            </Suspense>
          </div>

          {/* Contact sidebar */}
          <aside className="order-1 lg:order-2">
            <div className="lg:sticky lg:top-24">
              <div className="rounded-card border border-ink/15 bg-ink p-6 text-paper sm:p-7">
                <h2 className="font-display text-xl font-semibold">Direct contact</h2>
                <p className="mt-2 text-sm text-paper/70">
                  Liever even bellen of mailen? Dat kan natuurlijk ook.
                </p>
                <ul className="mt-5 space-y-4 text-sm">
                  <li>
                    <a
                      href={`tel:${schoolInfo.phoneHref}`}
                      className="inline-flex items-center gap-3 hover:text-signal-soft"
                    >
                      <Phone width={18} height={18} className="text-signal" />
                      {schoolInfo.phone}
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${schoolInfo.email}`}
                      className="inline-flex items-center gap-3 hover:text-signal-soft"
                    >
                      <Mail width={18} height={18} className="text-signal" />
                      {schoolInfo.email}
                    </a>
                  </li>
                  <li className="inline-flex items-center gap-3">
                    <Pin width={18} height={18} className="text-signal" />
                    {schoolInfo.address.city}, {schoolInfo.address.region}
                  </li>
                </ul>

                <div className="mt-6 border-t border-paper/10 pt-5">
                  <h3 className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-kicker text-signal">
                    <Clock width={14} height={14} /> Openingstijden
                  </h3>
                  <ul className="mt-3 space-y-1.5 text-sm text-paper/75">
                    {schoolInfo.openingHoursShort.map((oh) => (
                      <li key={oh.day} className="flex justify-between gap-4">
                        <span>{oh.day}</span>
                        <span className={oh.closed ? 'text-paper/40' : ''}>{oh.hours}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <ul className="mt-5 space-y-2.5">
                {trustList.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-ink">
                    <Check width={18} height={18} className="text-signal" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
