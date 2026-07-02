import type { Metadata } from 'next';
import { LegalArticle } from '@/components/layout/LegalArticle';
import { schoolInfo } from '@/data/schoolInfo';
import { formatEuro } from '@/lib/utils';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Algemene voorwaarden',
  description:
    'De algemene voorwaarden van Neyra Rijschool: afspraken over rijlessen, betaling, annuleren en aansprakelijkheid.',
  path: '/algemene-voorwaarden',
});

export default function VoorwaardenPage() {
  return (
    <LegalArticle index="§" title="Algemene voorwaarden" updated="1 juli 2026">
      <p>
        Deze algemene voorwaarden zijn van toepassing op alle rijlessen en pakketten van{' '}
        {schoolInfo.name}. Het betreft demovoorbeeldtekst die nog juridisch gecontroleerd moet
        worden.
      </p>

      <h2>1. Rijlessen</h2>
      <ul>
        <li>
          Een losse rijles duurt {schoolInfo.lessonDurationMinutes} minuten, tenzij anders
          afgesproken.
        </li>
        <li>De lessen worden in overleg ingepland binnen de openingstijden.</li>
        <li>Binnen het lesgebied word je opgehaald en teruggebracht op een afgesproken locatie.</li>
      </ul>

      <h2>2. Tarieven en betaling</h2>
      <ul>
        <li>Een losse rijles kost {formatEuro(schoolInfo.singleLessonPrice)} per uur.</li>
        <li>Pakketten worden vooraf of in overleg in termijnen betaald.</li>
        <li>De examenkosten van het CBR zijn niet in de lespakketten inbegrepen.</li>
      </ul>

      <h2>3. Annuleren en verzetten</h2>
      <p>
        Een les kan kosteloos worden verzet of geannuleerd tot uiterlijk 48 uur van tevoren. Bij
        annulering binnen 48 uur kan de les in rekening worden gebracht, tenzij sprake is van
        overmacht.
      </p>

      <h2>4. Verplichtingen van de leerling</h2>
      <ul>
        <li>Je verschijnt op tijd en uitgerust op de afgesproken leslocatie.</li>
        <li>
          Je bent niet onder invloed van alcohol, drugs of medicijnen die de rijvaardigheid
          beïnvloeden.
        </li>
        <li>Je beschikt over een geldig identiteitsbewijs tijdens de lessen en het examen.</li>
      </ul>

      <h2>5. Aansprakelijkheid</h2>
      <p>
        {schoolInfo.name} spant zich in om je zo goed mogelijk voor te bereiden op het examen, maar
        kan geen slagingsgarantie geven. De rijschool is niet aansprakelijk voor kosten die
        voortvloeien uit het niet halen van een examen.
      </p>

      <h2>6. Slot</h2>
      <p>
        Op deze voorwaarden is Nederlands recht van toepassing. Heb je vragen? Neem contact op via{' '}
        <a href={`mailto:${schoolInfo.email}`}>{schoolInfo.email}</a>.
      </p>
    </LegalArticle>
  );
}
