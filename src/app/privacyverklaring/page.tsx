import type { Metadata } from 'next';
import { LegalArticle } from '@/components/layout/LegalArticle';
import { schoolInfo } from '@/data/schoolInfo';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Privacyverklaring',
  description:
    'Privacyverklaring van Neyra Rijschool: welke persoonsgegevens we verwerken, waarom, hoe lang we ze bewaren en welke rechten je hebt.',
  path: '/privacyverklaring',
});

export default function PrivacyPage() {
  return (
    <LegalArticle index="§" title="Privacyverklaring" updated="1 juli 2026">
      <p>
        {schoolInfo.name} hecht veel waarde aan de bescherming van je persoonsgegevens. In deze
        privacyverklaring leggen we op heldere wijze uit welke gegevens we verwerken en waarom. Deze
        tekst is een demovoorbeeld en dient nog juridisch te worden gecontroleerd.
      </p>

      <h2>Welke gegevens verwerken wij?</h2>
      <p>
        Wanneer je het contact- of aanmeldformulier invult, verwerken wij de gegevens die je zelf
        aan ons verstrekt, zoals:
      </p>
      <ul>
        <li>Voor- en achternaam</li>
        <li>E-mailadres en telefoonnummer</li>
        <li>Woonplaats en postcode</li>
        <li>Voorkeuren voor de rijlessen (schakel/automaat, pakket, beschikbaarheid)</li>
        <li>Eventuele aanvullende opmerkingen die je zelf invult</li>
      </ul>

      <h2>Waarvoor gebruiken wij je gegevens?</h2>
      <p>Wij gebruiken je gegevens uitsluitend om:</p>
      <ul>
        <li>Contact met je op te nemen over je aanmelding of proefles;</li>
        <li>Je rijlessen te plannen en af te stemmen op jouw niveau;</li>
        <li>Onze dienstverlening uit te voeren en te verbeteren.</li>
      </ul>

      <h2>Grondslag en bewaartermijn</h2>
      <p>
        Wij verwerken je gegevens op basis van je toestemming en om uitvoering te geven aan onze
        dienstverlening. We bewaren je gegevens niet langer dan noodzakelijk voor deze doeleinden.
      </p>

      <h2>Delen met derden</h2>
      <p>
        Wij verkopen je gegevens niet aan derden. Gegevens worden alleen gedeeld met partijen die
        nodig zijn voor onze dienstverlening (bijvoorbeeld een e-maildienst), en uitsluitend voor de
        hierboven genoemde doeleinden.
      </p>

      <h2>Jouw rechten</h2>
      <p>
        Je hebt het recht om je gegevens in te zien, te corrigeren of te laten verwijderen. Ook kun
        je bezwaar maken tegen de verwerking. Neem hiervoor contact met ons op via{' '}
        <a href={`mailto:${schoolInfo.email}`}>{schoolInfo.email}</a>.
      </p>

      <h2>Cookies</h2>
      <p>
        Deze website gebruikt in de basis alleen technisch noodzakelijke cookies. Meer informatie
        vind je in ons <a href="/cookiebeleid">cookiebeleid</a>.
      </p>

      <h2>Contact</h2>
      <p>
        Heb je vragen over deze privacyverklaring? Neem dan contact op met {schoolInfo.name} via{' '}
        <a href={`mailto:${schoolInfo.email}`}>{schoolInfo.email}</a> of{' '}
        <a href={`tel:${schoolInfo.phoneHref}`}>{schoolInfo.phone}</a>.
      </p>
    </LegalArticle>
  );
}
