'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { Menu, Close, Phone } from '@/components/ui/icons';
import { navigation, schoolInfo } from '@/data/schoolInfo';
import { cn } from '@/lib/utils';

/**
 * Sticky, accessible site header with a polished mobile drawer.
 * - Adds a subtle solid background + border after scrolling.
 * - Mobile menu traps focus visually, closes on route change / Escape and
 *   locks body scroll while open.
 */
export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close on navigation.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Escape to close + lock scroll while the drawer is open.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-ink/10 bg-paper/90 backdrop-blur-md'
          : 'border-b border-transparent bg-paper',
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4 lg:h-20">
        <Logo />

        {/* Desktop navigation */}
        <nav aria-label="Hoofdmenu" className="hidden items-center gap-7 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className={cn(
                'link-underline text-sm font-medium transition-colors',
                isActive(item.href) ? 'text-signal' : 'text-ink hover:text-signal',
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button href="/contact" size="md" className="hidden sm:inline-flex">
            Plan een proefles
          </Button>
          <button
            type="button"
            aria-label={menuOpen ? 'Menu sluiten' : 'Menu openen'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((o) => !o)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-ink/15 text-ink lg:hidden"
          >
            {menuOpen ? <Close /> : <Menu />}
            <span className="sr-only">Menu</span>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        className={cn('fixed inset-0 top-16 z-40 lg:hidden', menuOpen ? 'visible' : 'invisible')}
        aria-hidden={!menuOpen}
      >
        <button
          type="button"
          tabIndex={menuOpen ? 0 : -1}
          aria-label="Menu sluiten"
          onClick={() => setMenuOpen(false)}
          className={cn(
            'absolute inset-0 bg-ink/40 transition-opacity duration-300',
            menuOpen ? 'opacity-100' : 'opacity-0',
          )}
        />
        <nav
          aria-label="Mobiel menu"
          className={cn(
            'absolute inset-x-0 top-0 origin-top bg-paper-soft shadow-lift transition-all duration-300',
            menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0',
          )}
        >
          <ul className="container-page flex flex-col divide-y divide-ink/10 py-2">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  tabIndex={menuOpen ? 0 : -1}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={cn(
                    'flex items-center justify-between py-4 text-lg font-medium',
                    isActive(item.href) ? 'text-signal' : 'text-ink',
                  )}
                >
                  {item.label}
                  <span aria-hidden className="font-mono text-xs text-asphalt-light">
                    0{navigation.indexOf(item) + 1}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="container-page flex flex-col gap-3 pb-6 pt-2">
            <Button href="/contact" size="lg" tabIndex={menuOpen ? 0 : -1}>
              Plan een proefles
            </Button>
            <a
              href={`tel:${schoolInfo.phoneHref}`}
              tabIndex={menuOpen ? 0 : -1}
              className="inline-flex items-center justify-center gap-2 text-sm font-medium text-ink"
            >
              <Phone width={16} height={16} /> {schoolInfo.phone}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
