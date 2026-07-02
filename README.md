# Neyra Rijschool

Een moderne, professionele website voor een (fictieve) Nederlandse rijschool. Gebouwd als
portfolio-case en werkende demo om aan echte rijschoolhouders te laten zien.

> **Let op:** alle bedrijfsgegevens, prijzen, cijfers en juridische teksten zijn **demo-content**.
> Ze zijn centraal aanpasbaar (zie hieronder) en moeten vóór commercieel gebruik worden vervangen
> en juridisch gecontroleerd.

---

## Overzicht

| | |
| --- | --- |
| **Doel** | Rijschool professioneel presenteren, vertrouwen wekken en aanmeldingen verzamelen |
| **Talen** | Nederlands (architectuur voorbereid op meertaligheid) |
| **Type** | Statisch gerenderde marketingsite met één server-action-formulier |
| **Status** | Volledig functioneel; e-mail draait in demomodus tot je credentials instelt |

### Belangrijkste functies

- Onderscheidend, editorial ontwerp met road/verkeer-thema (geen generieke template)
- Volledig responsive (getest van 360px t/m grote desktops)
- Rijlessen, lespakketten, lesgebieden, ervaringen, slagingspercentage, FAQ
- Aanmeldformulier met validatie (React Hook Form + Zod), honeypot en demo-fallback
- Postcodecheck voor lesgebieden (lokale data, geen externe API)
- Toegankelijke accordion, sticky header met mobiel menu, reveal-animaties
- SEO: metadata per pagina, Open Graph, sitemap, robots, `DrivingSchool`- en `FAQPage`-structured data
- Respecteert `prefers-reduced-motion`

---

## Technologie

- **Next.js 15** (App Router) + **React 19**
- **TypeScript** (strict)
- **Tailwind CSS 3.4**
- **React Hook Form** + **Zod** (`@hookform/resolvers`)
- **Resend** (via REST API) voor e-mail, met demo-fallback
- **ESLint** + **Prettier**
- Lettertypen via `next/font` (Bricolage Grotesque, Inter, Space Mono)

---

## Installatie

```bash
# 1. Dependencies installeren
npm install

# 2. (optioneel) e-mail configureren
cp .env.example .env.local   # vul waarden in; zonder waarden draait de site in demomodus

# 3. Development server
npm run dev                  # http://localhost:3000
```

### Commando's

| Commando | Doel |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Productie build |
| `npm run start` | Productie server (na build) |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check zonder output |
| `npm run format` | Prettier: alles formatteren |
| `npm run format:check` | Prettier: alleen controleren |

---

## Content aanpassen

Alle content staat gescheiden van de presentatie in **`src/data/`**. Eén wijziging werkt overal door.

| Wat | Bestand |
| --- | --- |
| **Schoolinformatie** (naam, contact, openingstijden, instructeur, navigatie) | `src/data/schoolInfo.ts` |
| **Pakketten & prijzen** | `src/data/packages.ts` |
| **Losse lesprijs / lesduur** | `src/data/schoolInfo.ts` (`singleLessonPrice`, `lessonDurationMinutes`) |
| **Lesgebieden & postcodecheck** | `src/data/serviceAreas.ts` |
| **Ervaringen / reviews** | `src/data/testimonials.ts` |
| **FAQ** | `src/data/faq.ts` |
| **Slagingscijfers** | `src/data/statistics.ts` |
| **Overige teksten** (why-us, zo werkt het, kernwaarden, lesvormen) | `src/data/content.ts` |

### Contactgegevens wijzigen

Alles staat in `src/data/schoolInfo.ts` onder `schoolInfo` (`phone`, `phoneHref`, `email`,
`address`, `openingHours`). Deze worden ook gebruikt in de footer, het contactformulier en de
structured data.

### Pakketten en prijzen wijzigen

Bewerk `src/data/packages.ts`. Elk pakket heeft een `slug` (blijft stabiel — wordt gebruikt in de
formulier-URL `?pakket=`), `price`, `saving`, `features` en optioneel `popular: true`.

### Kleuren wijzigen

Pas de HEX-waarden aan in `tailwind.config.ts` onder `theme.extend.colors`
(`ink`, `paper`, `signal`, `plate`, `asphalt`). De rest van de site gebruikt deze tokens.

### Lettertypen wijzigen

Wijzig de imports in `src/app/layout.tsx` (`next/font/google`). De CSS-variabelen
`--font-display`, `--font-sans`, `--font-mono` zijn gekoppeld in `tailwind.config.ts`.

---

## E-mail configureren

Het formulier gebruikt een **Next.js Server Action** (`src/lib/actions/register.ts`) die e-mail
verstuurt via de Resend REST API (`src/lib/email/send.ts`).

Zet in `.env.local`:

```bash
RESEND_API_KEY=re_xxxxxxxx          # https://resend.com/api-keys
CONTACT_EMAIL=info@neyrarijschool.nl # inbox van de rijschool
FROM_EMAIL=onboarding@resend.dev     # geverifieerd afzenderadres in Resend
NEXT_PUBLIC_SITE_URL=https://www.neyrarijschool.nl
```

**Demo-fallback:** ontbreken `RESEND_API_KEY` of `FROM_EMAIL`, dan wordt geen e-mail verzonden,
maar het formulier blijft volledig werken en toont een duidelijke demomelding. De site crasht
nooit door ontbrekende configuratie en logt geen persoonlijke gegevens.

---

## Een nieuwe pagina toevoegen

1. Maak `src/app/<pad>/page.tsx`.
2. Exporteer `metadata` via de helper `buildMetadata({ title, description, path })` uit
   `src/lib/seo.ts`.
3. Voeg het pad toe aan `navigation` in `src/data/schoolInfo.ts` (indien in het menu) en aan
   `src/app/sitemap.ts`.
4. Hergebruik `PageHeader`, `Section`/`SectionHeading` en bestaande secties voor consistentie.

---

## Deployen naar Vercel

1. Push de repository naar GitHub/GitLab.
2. Importeer het project in [Vercel](https://vercel.com/new) — het framework wordt automatisch
   herkend als Next.js.
3. Zet de environment variables (zie boven) in **Project Settings → Environment Variables**.
4. Deploy. Vercel voert `npm run build` uit.

---

## Mappenstructuur (kort)

```
src/
  app/            # App Router: pagina's, layout, sitemap, robots
  components/
    layout/       # Header, Footer, PageHeader, LegalArticle
    sections/     # Herbruikbare paginasecties (Hero, HowItWorks, ...)
    cards/        # PackageCard, TestimonialCard, StatCard
    forms/        # RegistrationForm + velden
    ui/           # Button, Section, Accordion, icons, Logo, ...
  data/           # Alle content (schoolInfo, packages, testimonials, ...)
  lib/
    validation/   # Zod-schema's
    email/         # E-mailtemplates + verzending
    actions/       # Server actions
    seo.ts, utils.ts
  types/          # Gedeelde TypeScript-types
```

Zie **`PROJECT_STRUCTURE.md`** voor een uitgebreide toelichting en **`DEVELOPMENT_NOTES.md`** voor
ontwerp- en architectuurbeslissingen.

---

## Huidige demo-beperkingen

- E-mail draait in demomodus tot Resend-credentials zijn ingesteld.
- Statistieken, reviews, pakketten en lesgebieden komen uit lokale databestanden (geen database).
- De lesgebiedenkaart is een illustratie, geen exacte geografische kaart.
- Juridische teksten zijn placeholders en moeten juridisch worden gecontroleerd.
- Afbeeldingen zijn SVG-placeholders (zie `public/images/README.md`).

## Mogelijke uitbreidingen

Admin dashboard, database (PostgreSQL + Prisma), online betalen (Mollie), leerlingportaal,
planning/agenda, meertaligheid (NL/EN/AR), meerdere instructeurs. De architectuur is hierop
voorbereid — zie `DEVELOPMENT_NOTES.md`.
