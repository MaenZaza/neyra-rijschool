import type { Metadata } from 'next';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Pagina niet gevonden',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-paper">
      <div className="container-page flex min-h-[70vh] flex-col items-start justify-center py-20">
        <span className="plate">404 · NL</span>
        <h1 className="mt-6 font-display text-5xl font-bold leading-none sm:text-7xl">
          Verkeerd afgeslagen.
        </h1>
        <p className="mt-5 max-w-md text-lg text-asphalt">
          Deze pagina bestaat niet (meer). Geen zorgen, we zetten je zo weer op de juiste route.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/">Terug naar home</Button>
          <Button href="/contact" variant="secondary">
            Plan een proefles
          </Button>
        </div>
        <div className="mt-12 w-full max-w-xl">
          <div className="lane-moving text-ink/20" aria-hidden />
        </div>
      </div>
    </section>
  );
}
