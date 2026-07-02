import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  children: ReactNode;
  className?: string;
  /** Visual tone of the section surface. */
  tone?: 'paper' | 'paper-soft' | 'ink';
  as?: ElementType;
  id?: string;
}

const tones: Record<NonNullable<SectionProps['tone']>, string> = {
  paper: 'bg-paper text-ink',
  'paper-soft': 'bg-paper-soft text-ink',
  ink: 'bg-ink text-paper',
};

/** Full-width section with vertical rhythm; content stays within container-page. */
export function Section({
  children,
  className,
  tone = 'paper',
  as: Tag = 'section',
  id,
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={cn('relative overflow-hidden', tones[tone], 'py-16 sm:py-20 lg:py-28', className)}
    >
      <div className="container-page relative">{children}</div>
    </Tag>
  );
}

interface SectionHeadingProps {
  kicker?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
  as?: 'h1' | 'h2';
}

/** Reusable kicker + heading + intro block. */
export function SectionHeading({
  kicker,
  title,
  intro,
  align = 'left',
  className,
  as: Heading = 'h2',
}: SectionHeadingProps) {
  return (
    <div className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      {kicker && <span className="kicker">{kicker}</span>}
      <Heading className={cn('mt-4 text-3xl font-semibold leading-[1.05] sm:text-4xl lg:text-5xl')}>
        {title}
      </Heading>
      {intro && <p className="mt-5 text-base leading-relaxed text-asphalt sm:text-lg">{intro}</p>}
    </div>
  );
}
