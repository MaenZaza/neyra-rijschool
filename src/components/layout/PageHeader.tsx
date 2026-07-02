import type { ReactNode } from 'react';

/**
 * Consistent interior-page header band with an oversized index number and
 * a lane divider, keeping the editorial road theme across all subpages.
 */
export function PageHeader({
  index,
  kicker,
  title,
  intro,
  children,
}: {
  index: string;
  kicker: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="relative overflow-hidden border-b border-ink/10 bg-paper-soft">
      <span
        aria-hidden
        className="pointer-events-none absolute -right-4 -top-10 select-none font-display text-[9rem] font-bold leading-none text-ink/[0.04] sm:text-[14rem]"
      >
        {index}
      </span>
      <div className="container-page relative py-14 sm:py-20 lg:py-24">
        <span className="kicker">{kicker}</span>
        <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {intro && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-asphalt">{intro}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
      <div className="container-page">
        <div className="lane-divider pb-0 text-ink/15" aria-hidden />
      </div>
    </header>
  );
}
