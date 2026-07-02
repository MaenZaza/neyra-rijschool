'use client';

import { useId, useRef, useState, type KeyboardEvent } from 'react';
import { ChevronDown } from './icons';
import { cn } from '@/lib/utils';

export interface AccordionEntry {
  id: string;
  question: string;
  answer: string;
}

/**
 * Accessible accordion.
 * - Buttons use aria-expanded / aria-controls and region semantics.
 * - Arrow Up/Down, Home and End move focus between headers (WAI-ARIA pattern).
 * - Height animation is CSS grid-based and respects prefers-reduced-motion
 *   (transitions are neutralised globally in globals.css).
 */
export function Accordion({ items }: { items: AccordionEntry[] }) {
  const [open, setOpen] = useState<string | null>(null);
  const groupId = useId();
  const buttonsRef = useRef<Array<HTMLButtonElement | null>>([]);

  const toggle = (id: string) => setOpen((cur) => (cur === id ? null : id));

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const { key } = event;
    let next = -1;
    if (key === 'ArrowDown') next = (index + 1) % items.length;
    else if (key === 'ArrowUp') next = (index - 1 + items.length) % items.length;
    else if (key === 'Home') next = 0;
    else if (key === 'End') next = items.length - 1;
    if (next >= 0) {
      event.preventDefault();
      buttonsRef.current[next]?.focus();
    }
  };

  return (
    <div className="divide-y divide-ink/10 border-y border-ink/10">
      {items.map((item, index) => {
        const isOpen = open === item.id;
        const headerId = `${groupId}-h-${item.id}`;
        const panelId = `${groupId}-p-${item.id}`;
        return (
          <div key={item.id}>
            <h3>
              <button
                ref={(el) => {
                  buttonsRef.current[index] = el;
                }}
                id={headerId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                onKeyDown={(e) => onKeyDown(e, index)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-signal"
              >
                <span className="text-base font-medium sm:text-lg">{item.question}</span>
                <ChevronDown
                  className={cn(
                    'shrink-0 text-signal transition-transform duration-300',
                    isOpen && 'rotate-180',
                  )}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={headerId}
              className={cn(
                'grid transition-all duration-300 ease-out',
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl pb-6 pr-8 leading-relaxed text-asphalt">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
