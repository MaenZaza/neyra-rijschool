# Projectstructuur — Neyra Rijschool

Deze gids beschrijft de mappen, de belangrijkste componenten en waar je wat aanpast. Bedoeld voor
ontwikkelaars die het project overnemen of uitbreiden.

## Uitgangspunten

- **Data gescheiden van presentatie.** Alle content leeft in `src/data/`. Componenten zijn "dom":
  ze renderen wat ze binnenkrijgen. Zo kan de databron later een API of database worden zonder de
  UI te herschrijven.
- **Server Components standaard.** Alleen componenten die interactie of browser-API's nodig hebben
  zijn `'use client'` (Header, Accordion, Reveal, PostcodeChecker, RegistrationForm).
- **Kleine, herbruikbare bouwstenen** in plaats van grote paginabestanden.

---

## Mappen

### `src/app/` — App Router

Elke map is een route. `layout.tsx` bevat de globale `<html>`, fonts, header/footer,
skip-link en de `DrivingSchool` structured data. Verder:

- `page.tsx` — homepage (stelt secties samen)
- `rijlessen/`, `pakketten/`, `lesgebieden/`, `over-ons/`, `slagingspercentage/`,
  `ervaringen/`, `faq/`, `contact/` — de hoofdpagina's
- `privacyverklaring/`, `algemene-voorwaarden/`, `cookiebeleid/` — juridische pagina's
- `sitemap.ts`, `robots.ts` — SEO (automatisch gegenereerd)
- `not-found.tsx` — 404-pagina in huisstijl

### `src/components/`

| Map | Inhoud |
| --- | --- |
| `layout/` | `Header` (sticky + mobiel menu), `Footer`, `PageHeader` (interior-header), `LegalArticle` (prose-wrapper) |
| `sections/` | Herbruikbare paginasecties: `Hero`, `LessonTypes`, `WhyUs`, `PackagesPreview`, `AreasOverview`, `AreaMap`, `PostcodeChecker`, `HowItWorks`, `StatsSection`, `TestimonialsSection`, `FaqSection`, `TrustBar`, `CtaBand` |
| `cards/` | `PackageCard`, `TestimonialCard`, `StatCard` |
| `forms/` | `RegistrationForm`, `RegistrationSuccess`, `Field` (labels/errors) |
| `ui/` | `Button`, `Section` + `SectionHeading`, `Accordion`, `StarRating`, `Reveal`, `Logo`, `icons` |

### `src/data/` — alle content

Zie de tabel in de README. Elk bestand heeft een kop met uitleg dat het demo-content betreft.

### `src/lib/`

| Pad | Doel |
| --- | --- |
| `validation/registration.ts` | Zod-schema + Nederlandse labels (gedeeld client/server) |
| `email/templates.ts` | HTML/plain-text templates voor school- en leerlingmail |
| `email/send.ts` | Resend-verzending + `isEmailConfigured()` demo-check |
| `actions/register.ts` | Server Action die het formulier verwerkt |
| `seo.ts` | `buildMetadata()` + `drivingSchoolJsonLd()` |
| `utils.ts` | `cn`, `formatEuro`, `formatDateNL` |

### `src/types/` — gedeelde types

`LessonPackage`, `Testimonial`, `FaqItem`, `ServiceArea`, `Statistic`, `OpeningHours`, `NavItem`.

---

## Belangrijkste componenten

- **`Header`** — sticky, wordt visueel duidelijker na scrollen; toegankelijk mobiel menu met
  Escape-sluiting, scroll-lock en `aria-expanded`.
- **`Hero`** — asymmetrische, editorial hero met dashboard-paneel en bewegende laanlijn.
- **`Accordion`** — WAI-ARIA accordion: `aria-expanded`/`aria-controls`, pijltjestoetsen,
  Home/End, grid-gebaseerde animatie die reduced-motion respecteert.
- **`RegistrationForm`** — het hart van de conversie (zie hieronder).

---

## Waar staat wat?

- **Website-content:** `src/data/`
- **Prijzen wijzigen:** `src/data/packages.ts` (pakketten) en `src/data/schoolInfo.ts`
  (`singleLessonPrice`)
- **Contactgegevens wijzigen:** `src/data/schoolInfo.ts` → `schoolInfo`
- **Kleuren/fonts:** `tailwind.config.ts` respectievelijk `src/app/layout.tsx`

---

## Hoe pakketselectie werkt

1. Elke `PackageCard` linkt naar `/contact?pakket=<slug>` ("Kies dit pakket").
2. Op de contactpagina leest `RegistrationForm` de query via `useSearchParams` en zet het
   pakket als default (`getPackageBySlug`). De contactpagina wrapt het formulier in `<Suspense>`
   (vereist voor `useSearchParams`).
3. De keuze zit in de formulierstate én blijft in de URL staan; wijzigt de URL, dan
   synchroniseert een `useEffect` het `packageSlug`-veld.
4. Bij verzending gaat de slug mee in de payload, validatie en de e-mailsamenvatting.

## Hoe het aanmeldformulier werkt

1. **Client:** React Hook Form met `zodResolver(registrationSchema)`, validatie op `onBlur`.
   Veldfouten worden per veld getoond via het `Field`-component (`role="alert"`, `aria-invalid`).
2. **Anti-spam:** een verborgen honeypot-veld (`company`) buiten beeld; ingevuld → stille "succes"
   zonder verzending. De verzendknop wordt tijdens/na verzending uitgeschakeld (geen dubbele
   submits).
3. **Server:** `submitRegistration` (Server Action) valideert opnieuw met hetzelfde schema,
   rendert de templates en roept `sendRegistrationEmails` aan.
4. **Resultaat:** bij succes toont de UI `RegistrationSuccess` met een samenvatting; bij demomodus
   een duidelijke melding. Persoonsgegevens worden nooit naar de console gelogd.

## Hoe e-mail verzenden werkt

- `sendRegistrationEmails` controleert `isEmailConfigured()`. Zo niet → `{ demo: true }`, geen
  verzending.
- Zo ja → parallelle POST's naar de Resend API: één notificatie naar de school (met `reply_to`
  van de leerling) en één bevestiging naar de leerling.
- Alleen de HTTP-status wordt gelogd bij fouten, nooit de inhoud of ontvanger.

---

## Later een database toevoegen

De databestanden in `src/data/` exporteren simpele arrays/objecten. Vervang de export door een
async data-access-laag (bijv. Prisma):

1. Voeg Prisma + PostgreSQL toe; modelleer `Package`, `Testimonial`, `ServiceArea`, `Statistic`,
   `Registration`.
2. Vervang de imports uit `src/data/*` door async queries in Server Components (of een
   `src/lib/db/*`-laag). De componenten veranderen nauwelijks omdat ze al alleen data ontvangen.
3. Sla in `submitRegistration` de aanmelding op in de database vóór/naast het verzenden van e-mail.

## Later een admin dashboard integreren

- Voeg een `src/app/(admin)/`-routegroep toe met eigen layout en authenticatie (bijv. Auth.js).
- Beheer pakketten, prijzen, lesgebieden en statistieken via CRUD op dezelfde modellen; de
  publieke site leest dezelfde bron.
- Omdat statistieken en content al door één laag gaan, verschijnen wijzigingen direct op de site.
