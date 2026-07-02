import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, Inter, Space_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { schoolInfo, siteUrl } from '@/data/schoolInfo';
import { drivingSchoolJsonLd } from '@/lib/seo';

const display = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const mono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${schoolInfo.name} — Rijles in Uden, Oss, Den Bosch en omgeving`,
    template: `%s · ${schoolInfo.name}`,
  },
  description: schoolInfo.description,
  keywords: [
    'Rijschool Uden',
    'Rijles Oss',
    'Rijschool Den Bosch',
    'Automaat rijles Uden',
    'Schakel rijles Noord-Brabant',
    'Rijles boeken',
    'Rijles pakketten',
  ],
  authors: [{ name: schoolInfo.name }],
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    siteName: schoolInfo.name,
    url: siteUrl,
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: '/favicon.svg',
  },
};

export const viewport: Viewport = {
  themeColor: '#0D1520',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="font-sans">
        {/* eslint-disable-next-line react/no-danger */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(drivingSchoolJsonLd()) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Direct naar inhoud
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
