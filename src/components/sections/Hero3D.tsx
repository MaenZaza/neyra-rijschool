'use client';

import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Steering } from '@/components/ui/icons';
import { statistics } from '@/data/statistics';

/**
 * 3D homepage centrepiece. The interactive WebGL driving scene is loaded
 * client-side only (no SSR), sitting behind a real HTML overlay so the H1,
 * copy and CTAs remain fully accessible and indexable. A cream poster shows
 * while the canvas hydrates.
 */

const SceneCanvas = dynamic(() => import('@/components/three/SceneCanvas'), {
  ssr: false,
  loading: () => <ScenePoster />,
});

function ScenePoster() {
  return (
    <div className="absolute inset-0 grid place-items-center bg-paper" aria-hidden>
      <span className="plate animate-pulse shadow-plate">NL · NEYRA</span>
    </div>
  );
}

export function Hero3D() {
  const slaging = statistics[0];

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-paper">
      {/* WebGL scene fills the section behind the content. */}
      <div className="absolute inset-0">
        <SceneCanvas />
      </div>

      {/* Legibility scrims: cream wash on the left for the headline, and a fade
          into the page background at the base. */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-paper/85 via-paper/25 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-paper to-transparent"
        aria-hidden
      />

      {/* Content overlay. pointer-events-none lets pointer-move reach the canvas
          for parallax; interactive children re-enable pointer events. */}
      <div className="pointer-events-none relative z-10 flex min-h-[100svh] flex-col">
        <div className="container-page flex flex-1 flex-col justify-center pt-24 lg:pt-28">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="plate pointer-events-auto shadow-plate">NL · UDEN</span>
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

            <div className="pointer-events-auto mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact" size="lg">
                Plan een proefles
                <ArrowRight width={18} height={18} />
              </Button>
              <Button href="/pakketten" variant="secondary" size="lg">
                Bekijk lespakketten
              </Button>
            </div>
          </div>
        </div>

        {/* Dashboard-style HUD anchored to the base of the scene. */}
        <div className="container-page pb-10">
          <dl className="pointer-events-auto inline-flex flex-wrap items-stretch gap-px overflow-hidden rounded-card border border-ink/10 bg-ink/[0.06] backdrop-blur-md">
            <div className="flex items-center gap-3 bg-ink px-5 py-4 text-paper">
              <Steering className="text-signal" width={22} height={22} />
              <div>
                <p className="font-display text-2xl font-bold leading-none">{slaging.value}</p>
                <p className="mt-1 text-xs text-paper/60">{slaging.label}</p>
              </div>
            </div>
            <div className="bg-paper/70 px-5 py-4">
              <p className="font-mono text-[0.65rem] uppercase tracking-wide text-asphalt">
                Beoordeling
              </p>
              <p className="mt-1 font-display text-xl font-semibold">4.9/5</p>
            </div>
            <div className="bg-paper/70 px-5 py-4">
              <p className="font-mono text-[0.65rem] uppercase tracking-wide text-asphalt">
                Transmissie
              </p>
              <p className="mt-1 font-display text-xl font-semibold">Schakel &amp; Automaat</p>
            </div>
            <div className="bg-paper/70 px-5 py-4">
              <p className="font-mono text-[0.65rem] uppercase tracking-wide text-asphalt">
                Losse rijles
              </p>
              <p className="mt-1 font-display text-xl font-semibold">€ 60 p/u</p>
            </div>
          </dl>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        className="pointer-events-none absolute bottom-4 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-asphalt lg:flex"
        aria-hidden
      >
        <span className="font-mono text-[0.6rem] uppercase tracking-kicker">Scroll</span>
        <span className="h-8 w-px animate-pulse bg-asphalt/50" />
      </div>
    </section>
  );
}
