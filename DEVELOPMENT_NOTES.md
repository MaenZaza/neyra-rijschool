# Ontwikkelnotities — Neyra Rijschool

Documentatie van de belangrijkste ontwerp-, technische en architecturale beslissingen, plus de
status van functies en bekende beperkingen.

---

## Ontwerpbeslissingen

- **Eigen visuele identiteit, geen template-look.** Bewust weg van de generieke AI/SaaS-esthetiek:
  geen gecentreerde hero met plaatje ernaast, geen paarse gradients, geen rijen identieke kaarten.
  In plaats daarvan een editorial, asymmetrische opzet met road/verkeer-motieven.
- **Road-thema als rode draad.** Laanmarkeringen (dashed dividers, bewegende laanlijn),
  kentekenplaat-badges, grote nummers als "afritten", een dashboard/speedometer-paneel in de hero
  en een route-vormige "Zo werkt het".
- **Beperkt, professioneel kleurenpalet.** `ink` (bijna-zwart navy), `paper` (warm gebroken wit),
  `signal` (verkeersbord-oranje, accent/CTA), `plate` (kentekengeel, spaarzaam), plus neutrale
  `asphalt`-grijzen. Gedefinieerd als tokens in `tailwind.config.ts`.
- **Typografie.** Bricolage Grotesque (expressieve display), Inter (leesbare body), Space Mono
  (labels/nummers voor de technische/dashboard-toets). Alle drie ondersteunen Nederlandse tekst.
- **Whitespace en ritme.** Eén gedeelde `Section`-component zorgt voor consistente verticale
  ruimte en containerbreedte over alle pagina's.

## Technische beslissingen

- **Next.js 15 App Router + React 19.** Server Components standaard; client alleen waar nodig.
- **Tailwind CSS 3.4** in plaats van v4: config-gebaseerde theming is voorspelbaarder voor een
  uitgebreid custom design en maximale build-stabiliteit.
- **React Hook Form + Zod.** Eén schema (`registrationSchema`) wordt op client én server gebruikt,
  zodat validatieregels niet uiteenlopen.
- **Resend via REST API** (met `fetch`) in plaats van de SDK — geen extra dependency, en dezelfde
  code path is makkelijk te vervangen door Nodemailer.
- **E-mail demo-fallback** in `send.ts`: ontbrekende credentials leiden tot `{ demo: true }` in
  plaats van een crash. Alleen veilige informatie (HTTP-status) wordt gelogd.
- **Toegankelijkheid vanaf de basis.** Zichtbare focus-ring (globaal `:focus-visible`), skip-link,
  semantische landmarks, `aria-*` op accordion/menu/formulier, en respect voor
  `prefers-reduced-motion` (alle transities/animaties worden dan geneutraliseerd in `globals.css`).
- **Animaties zijn progressive enhancement.** `Reveal` gebruikt IntersectionObserver; zonder JS of
  met reduced-motion is content gewoon zichtbaar.

## Architecturale beslissingen

- **Data-laag losgekoppeld** in `src/data/`. Presentatie ontvangt data als props → later
  vervangbaar door API/DB zonder UI-herbouw.
- **Centrale businessgegevens** in `schoolInfo.ts`; prijzen in `packages.ts`. Eén plek van
  waarheid, ook voor SEO/structured data.
- **SEO-helper** (`buildMetadata`) zorgt voor consistente titels, descriptions, canonical en
  Open Graph per pagina. `DrivingSchool`- en `FAQPage`-JSON-LD zijn aanwezig.
- **Voorbereid op uitbreiding** (zie PROJECT_STRUCTURE.md): database, admin, betalingen,
  meertaligheid en meerdere instructeurs passen in de huidige indeling.

---

## Afgeronde functies

- Alle 12 pagina's inclusief juridische pagina's en 404
- Sticky, toegankelijke header met gepolijst mobiel menu
- Onderscheidende asymmetrische hero
- Lesvormen (schakel/automaat/proefles), why-us, pakketten, lesgebieden + postcodecheck,
  "Zo werkt het", statistieken, ervaringen, FAQ-accordion, CTA-banden
- Aanmeldformulier: validatie, veldfouten, honeypot, dubbel-submit-preventie, succes­samenvatting,
  pakket-preselectie via URL, demo/echte e-mail
- SEO: metadata, sitemap, robots, structured data, favicon
- Volledige lint/typecheck/prettier/productie-build zonder fouten

## Nu nog demo-only

- **E-mail** — draait in demomodus tot Resend-credentials zijn gezet.
- **Content uit databestanden** — statistieken, reviews, pakketten en lesgebieden komen uit
  `src/data/` (geen database/CMS).
- **Statistieken** — interne demowaarden met zichtbare disclaimer; nadrukkelijk niet van het CBR.
- **Lesgebiedenkaart** — illustratieve SVG, geen geografische kaart of geocoding.
- **Postcodecheck** — matcht op een lokale demolijst (eerste twee cijfers / plaatsnaam).
- **Afbeeldingen** — SVG-placeholders (`public/images/`).
- **Juridische teksten** — placeholders; juridische review vereist.

## Bekende beperkingen

- Geen persistente opslag: aanmeldingen worden verstuurd, niet opgeslagen.
- Geen authenticatie of leerlingportaal.
- Eén taal (NL) actief, al is de structuur meertalig-voorbereid.
- De postcodecheck is bewust simpel en niet uitputtend.

## Voorgestelde vervolgstappen

1. Resend-credentials instellen en e-maildomein verifiëren.
2. Echte fotografie plaatsen (zie `public/images/README.md`).
3. Juridische teksten laten controleren.
4. PostgreSQL + Prisma toevoegen; aanmeldingen opslaan in `submitRegistration`.
5. Admin dashboard (`(admin)`-routegroep) voor pakketten, prijzen, statistieken en aanmeldingen.
6. Optioneel: Mollie-betalingen, meertaligheid (NL/EN/AR), meerdere instructeurs, agenda/planning.
