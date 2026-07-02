import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Field wrapper: label + optional hint + error message, wired for accessibility
 * (aria-describedby / aria-invalid are set by the input components).
 */
export function Field({
  label,
  htmlFor,
  error,
  hint,
  required,
  optional,
  className,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  required?: boolean;
  optional?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const errorId = `${htmlFor}-error`;
  const hintId = `${htmlFor}-hint`;
  return (
    <div className={cn('flex flex-col', className)}>
      <label htmlFor={htmlFor} className="mb-1.5 text-sm font-medium text-ink">
        {label}
        {required && <span className="text-signal"> *</span>}
        {optional && <span className="font-normal text-asphalt-light"> (optioneel)</span>}
      </label>
      {hint && (
        <p id={hintId} className="mb-1.5 text-xs text-asphalt">
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-sm font-medium text-signal-deep">
          {error}
        </p>
      )}
    </div>
  );
}

const inputBase =
  'w-full rounded-sm border bg-paper px-3.5 py-2.5 text-ink placeholder:text-asphalt-light transition-colors focus:border-signal disabled:opacity-60';

export function inputClasses(hasError?: boolean) {
  return cn(inputBase, hasError ? 'border-signal-deep' : 'border-ink/20');
}
