'use client';

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type FC,
  type ReactNode,
  type Ref,
} from 'react';
import { cn } from '@/lib/utils';

interface RevealProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** Stagger delay in milliseconds. */
  delay?: number;
}

/**
 * Soft reveal-on-scroll wrapper. Uses IntersectionObserver and adds a class
 * when in view. The CSS (.reveal / .is-visible) fully disables the effect when
 * prefers-reduced-motion is set, so this stays accessible.
 */
export function Reveal({ children, className, as: Tag = 'div', delay = 0 }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Cast the polymorphic tag to a concrete component type. @react-three/fiber
  // augments the global JSX IntrinsicElements, which makes a bare `ElementType`
  // tag union three.js elements and collapse `children` to `never`.
  const Component = Tag as unknown as FC<{
    ref?: Ref<HTMLElement>;
    style?: CSSProperties;
    className?: string;
    children?: ReactNode;
  }>;

  return (
    <Component
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn('reveal', visible && 'is-visible', className)}
    >
      {children}
    </Component>
  );
}
