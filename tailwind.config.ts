import type { Config } from 'tailwindcss';

/**
 * Neyra Rijschool design system.
 *
 * Colour palette is intentionally limited:
 *  - ink     : deep near-black navy (primary surface / text)
 *  - paper   : warm off-white background
 *  - signal  : traffic-sign orange (primary accent / CTA)
 *  - plate   : Dutch licence-plate yellow (sparse highlight)
 *  - asphalt : neutral greys for supporting surfaces
 *
 * To rebrand: change the HEX values below. Fonts are wired via CSS variables
 * defined with next/font in src/app/layout.tsx.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0D1520',
          soft: '#16202E',
          muted: '#2A3646',
        },
        paper: {
          DEFAULT: '#F4EFE6',
          soft: '#FBF8F1',
          deep: '#EAE2D3',
        },
        signal: {
          DEFAULT: '#EC5A21',
          soft: '#F47B49',
          deep: '#C7440F',
        },
        plate: {
          DEFAULT: '#F5C518',
          deep: '#E0A800',
        },
        asphalt: {
          DEFAULT: '#4A5568',
          light: '#8A93A2',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        kicker: '0.22em',
      },
      maxWidth: {
        content: '80rem',
      },
      borderRadius: {
        card: '0.25rem',
      },
      boxShadow: {
        lift: '0 24px 60px -28px rgba(13, 21, 32, 0.45)',
        plate: '0 2px 0 0 #0D1520',
      },
      keyframes: {
        'lane-move': {
          from: { backgroundPosition: '0 0' },
          to: { backgroundPosition: '48px 0' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
      },
      animation: {
        'lane-move': 'lane-move 1.4s linear infinite',
        'fade-up': 'fade-up 0.6s ease-out both',
      },
    },
  },
  plugins: [],
};

export default config;
