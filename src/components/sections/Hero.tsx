import { Button } from '@/components/ui/Button';
import { ArrowRight, Steering } from '@/components/ui/icons';
import { statistics } from '@/data/statistics';

/**
 * Homepage hero — deliberately asymmetrical and editorial rather than a
 * centered hero with a side image. Composition uses oversized typography, a
 * licence-plate detail, a moving lane line and a dashboard-style stat panel.
 */
export function Hero() {
  const slaging = statistics[0];

  return (
    <section className="relative overflow-hidden bg-paper">
      {/* Oversized ghost word in the background (decorative). */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-6 top-24 select-none font-display text-[7rem] font-bold leading-none text-ink/[0.03] sm:text-[12rem] lg:text-[16rem]"
      >
        rijbewijs
      </span>

      <div className="container-page relative grid gap-12 pb-16 pt-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 lg:pb-24 lg:pt-20">
        {/* Left: headline + copy + CTAs */}
        <div className="max-w-2xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="plate">NL · UDEN</span>
            <span className="font-mono text-xs uppercase tracking-kicker text-asphalt">
              Rijschool in Noord-Brabant
            </span>
          </div>

          <h1 className="mt-7 font-display text-[2.6rem] font-bold leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
            Rijles op jouw tempo.
            <span className="mt-2 block text-signal">Met vertrouwen naar je rijbewijs.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-asphalt">
            Persoonlijke rijlessen in Uden, Oss, Den Bosch en omgeving. Kies voor schakel of
            automaat en start wanneer het jou uitkomt.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/contact" size="lg">
              Plan een proefles
              <ArrowRight width={18} height={18} />
            </Button>
            <Button href="/pakketten" variant="secondary" size="lg">
              Bekijk lespakketten
            </Button>
          </div>

          <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
            <div>
              <dt className="font-mono text-xs uppercase tracking-wide text-asphalt">
                Transmissie
              </dt>
              <dd className="mt-1 font-display text-lg font-semibold">Schakel &amp; Automaat</dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase tracking-wide text-asphalt">
                Losse rijles
              </dt>
              <dd className="mt-1 font-display text-lg font-semibold">€ 60 per uur</dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase tracking-wide text-asphalt">Ophalen</dt>
              <dd className="mt-1 font-display text-lg font-semibold">In jouw regio</dd>
            </div>
          </dl>
        </div>

        {/* Right: dashboard-style panel */}
        <div className="relative lg:pt-6">
          <div className="relative rounded-card border border-ink bg-ink p-7 text-paper shadow-lift">
            <div className="bg-grid absolute inset-0 rounded-card" aria-hidden />
            <div className="relative">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-kicker text-signal">
                  Dashboard
                </span>
                <Steering className="text-paper/40" width={26} height={26} />
              </div>

              <div className="mt-6">
                <span className="font-display text-6xl font-bold leading-none sm:text-7xl">
                  {slaging.value}
                </span>
                <p className="mt-2 text-sm text-paper/60">
                  {slaging.label} — gebaseerd op interne resultaten
                </p>
              </div>

              {/* Speedometer-style progress arc reference */}
              <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-paper/10">
                <div className="h-full rounded-full bg-signal" style={{ width: '78%' }} />
              </div>

              <div className="mt-7 grid grid-cols-2 gap-3">
                <div className="rounded-sm border border-paper/10 p-3">
                  <p className="font-display text-2xl font-bold">4.9/5</p>
                  <p className="text-xs text-paper/60">Gemiddelde beoordeling</p>
                </div>
                <div className="rounded-sm border border-paper/10 p-3">
                  <p className="font-display text-2xl font-bold">140+</p>
                  <p className="text-xs text-paper/60">Geslaagde leerlingen</p>
                </div>
              </div>
            </div>
          </div>

          {/* Floating licence-plate detail */}
          <div className="absolute -bottom-4 -left-4 hidden sm:block">
            <span className="plate shadow-plate">★ 4.9 · NEYRA</span>
          </div>
        </div>
      </div>

      {/* Moving lane line across the base of the hero */}
      <div className="container-page pb-4">
        <div className="lane-moving text-ink/25" aria-hidden />
      </div>
    </section>
  );
}
