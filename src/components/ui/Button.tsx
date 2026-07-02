import Link from 'next/link';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-sm font-medium transition-all duration-200 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60';

const variants: Record<Variant, string> = {
  primary:
    'bg-signal text-paper hover:bg-signal-deep active:translate-y-px shadow-[0_10px_24px_-12px_rgba(236,90,33,0.7)]',
  secondary:
    'border-2 border-ink bg-transparent text-ink hover:bg-ink hover:text-paper active:translate-y-px',
  ghost: 'text-ink hover:text-signal',
};

const sizes: Record<Size, string> = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
}

type ButtonAsButton = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { href: string };

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = 'primary', size = 'md', className, children, ...rest } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if ('href' in props && props.href !== undefined) {
    const { href, ...anchorRest } = rest as ButtonAsLink;
    return (
      <Link href={href} className={classes} {...anchorRest}>
        {children}
      </Link>
    );
  }

  const buttonRest = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={classes} {...buttonRest}>
      {children}
    </button>
  );
}
