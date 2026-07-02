import type { Metadata } from 'next';
import { LegalArticle } from '@/components/layout/LegalArticle';
import { schoolInfo } from '@/data/schoolInfo';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Cookiebeleid',
  description:
    'Het cookiebeleid van Neyra Rijschool. Deze website gebruikt in de basis alleen technisch noodzakelijke cookies.',
  path: '/cookiebeleid',
});

export default function CookiePage() {
  return (
    <LegalArticle index="§" title="Cookiebeleid" updated="1 juli 2026">
      <p>
        Deze website van {schoolInfo.name} maakt in de basis uitsluitend gebruik van technisch
        noodzakelijke cookies. Deze cookies zijn nodig om de website goed te laten functioneren en
        vereisen geen toestemming. Er is daarom bewust geen cookiebanner toegevoegd.
      </p>

      <h2>Welke cookies gebruiken wij?</h2>
      <h3>Technisch noodzakelijke cookies</h3>
      <p>
        Deze zorgen ervoor dat de website veilig en correct werkt, bijvoorbeeld voor
        basisfunctionaliteit en het onthouden van voorkeuren tijdens je bezoek. Ze verzamelen geen
        persoonlijke informatie voor marketingdoeleinden.
      </p>

      <h2>Geen tracking of analytics</h2>
      <p>
        In deze demoversie worden geen analytische of marketingcookies geplaatst en wordt geen
        gedrag gevolgd via externe partijen.
      </p>

      <h2>Toekomstige uitbreiding</h2>
      <p>
        Zodra er wél analytics, tracking of niet-essentiële cookies (zoals ingesloten video’s of
        kaarten) worden toegevoegd, wordt een correcte toestemmingsoplossing (cookiebanner)
        geïmplementeerd, zoals de wet vereist.
      </p>

      <h2>Vragen?</h2>
      <p>
        Heb je vragen over dit cookiebeleid? Neem contact op via{' '}
        <a href={`mailto:${schoolInfo.email}`}>{schoolInfo.email}</a>. Zie ook onze{' '}
        <a href="/privacyverklaring">privacyverklaring</a>.
      </p>
    </LegalArticle>
  );
}
