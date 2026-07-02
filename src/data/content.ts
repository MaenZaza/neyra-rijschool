import { schoolInfo } from './schoolInfo';

/**
 * Reusable editorial content blocks used across multiple pages
 * (why-us, how-it-works, trust points, lesson types, core values).
 * All copy is Dutch demo content and can be edited freely.
 */

export interface LessonType {
  slug: 'schakel' | 'automaat' | 'proefles';
  name: string;
  short: string;
  description: string;
  points: string[];
}

export const lessonTypes: LessonType[] = [
  {
    slug: 'schakel',
    name: 'Schakelauto',
    short: 'Rijden met versnellingsbak',
    description:
      'Leer rijden in een schakelauto en behaal een rijbewijs waarmee je zowel schakel als automaat mag besturen. Ideaal als je maximale vrijheid wilt in welke auto je later rijdt.',
    points: [
      'Volledige controle over koppeling en versnellingen',
      'Rijbewijs geldig voor schakel én automaat',
      'Stap voor stap opgebouwd, zonder druk',
    ],
  },
  {
    slug: 'automaat',
    name: 'Automaat',
    short: 'Rijden zonder schakelen',
    description:
      'Bij automaatlessen ligt de focus volledig op verkeer, inschatten en zelfvertrouwen, zonder de afleiding van schakelen. Vaak leer je hierdoor sneller zelfstandig rijden.',
    points: [
      'Meer aandacht voor het verkeer om je heen',
      'Vaak sneller zelfstandig rijden',
      'Prettige keuze bij examenspanning of stress',
    ],
  },
  {
    slug: 'proefles',
    name: 'Proefles',
    short: 'Vrijblijvend kennismaken',
    description:
      'Tijdens de proefles maak je kennis met de instructeur en de lesauto, en bepalen we samen je startniveau. Je zit nergens aan vast en weet daarna precies waar je staat.',
    points: [
      'Bepaal samen je startniveau',
      'Ontdek of schakel of automaat bij je past',
      'Persoonlijk advies over een passend lesplan',
    ],
  },
];

export interface WhyPoint {
  number: string;
  title: string;
  description: string;
}

export const whyChooseUs: WhyPoint[] = [
  {
    number: '01',
    title: 'Persoonlijke begeleiding',
    description:
      'Geen standaardaanpak, maar lessen die zich aanpassen aan jouw tempo, doelen en wat jij lastig vindt.',
  },
  {
    number: '02',
    title: 'Rust en vertrouwen',
    description:
      'Een kalme, geduldige instructeur die druk wegneemt. Fouten maken mag, daar leer je juist van.',
  },
  {
    number: '03',
    title: 'Duidelijke tarieven',
    description:
      'Vooraf helder wat je betaalt. Geen verborgen kosten en geen verrassingen achteraf.',
  },
  {
    number: '04',
    title: 'Flexibele planning',
    description:
      'Lessen overdag, ’s avonds of op zaterdag. We plannen rond jouw agenda, niet andersom.',
  },
];

export interface HowStep {
  number: string;
  title: string;
  description: string;
}

/** The "Zo werkt het" student conversion flow (route-inspired). */
export const howItWorks: HowStep[] = [
  {
    number: '01',
    title: 'Plan je proefles',
    description:
      'Vul het formulier in met je gegevens en voorkeuren. Kies schakel of automaat en een eventueel pakket.',
  },
  {
    number: '02',
    title: 'Bepaal je startniveau',
    description: 'Tijdens de eerste les kijken we samen waar je staat en wat je doelen zijn.',
  },
  {
    number: '03',
    title: 'Jouw persoonlijke lesplan',
    description: 'Op basis daarvan stellen we een lesplan op dat past bij jouw tempo en agenda.',
  },
  {
    number: '04',
    title: 'Lessen op jouw tempo',
    description:
      'We oefenen gericht, bespreken elke les je voortgang en bereiden je voor op het examen.',
  },
  {
    number: '05',
    title: 'Op naar je rijbewijs',
    description: 'Goed voorbereid ga je op praktijkexamen in de omgeving van ’s-Hertogenbosch.',
  },
];

/** Short trust points used in badges / trust bars. */
export const trustPoints: string[] = [
  'Persoonlijke begeleiding',
  'Flexibele lestijden',
  'Schakel en automaat',
  'Ophalen in jouw regio',
  'Duidelijke tarieven',
  'Geen verborgen kosten',
  'Moderne lesmethode',
  'Voorbereiding op het praktijkexamen',
];

export interface CoreValue {
  title: string;
  description: string;
}

export const coreValues: CoreValue[] = [
  {
    title: 'Persoonlijke begeleiding',
    description: 'Elke leerling is anders. De les past zich aan, niet de leerling.',
  },
  {
    title: 'Rust en vertrouwen',
    description: 'Leren rijden zonder stress. Vertrouwen groeit met elke les.',
  },
  {
    title: 'Duidelijke communicatie',
    description: 'Je weet altijd waar je staat en wat de volgende stap is.',
  },
  {
    title: 'Flexibele planning',
    description: 'Lessen die passen bij jouw leven, werk en studie.',
  },
];

/** Included in the single-lesson price — referenced on the lessons page. */
export const lessonIncludes: string[] = [
  'Persoonlijke begeleiding',
  'Ophalen en terugbrengen binnen het lesgebied',
  'Persoonlijk lesplan',
  'Voortgangsbespreking',
];

/** Convenience re-export so pages can pull price/duration from one import. */
export const { singleLessonPrice, lessonDurationMinutes } = schoolInfo;
