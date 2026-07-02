import type { Testimonial } from '@/types';

/**
 * Student reviews — FICTIONAL demo content.
 * Later these can be loaded from a database or a reviews provider.
 */
export const testimonials: Testimonial[] = [
  {
    id: 'sara-uden',
    name: 'Sara',
    city: 'Uden',
    rating: 5,
    quote:
      'Ik voelde me vanaf de eerste les op mijn gemak. Alles werd rustig uitgelegd en ik wist precies waar ik aan moest werken.',
    date: '2026-03-14',
    transmission: 'schakel',
  },
  {
    id: 'youssef-oss',
    name: 'Youssef',
    city: 'Oss',
    rating: 5,
    quote:
      'De lessen waren duidelijk en flexibel in te plannen. Dankzij de persoonlijke begeleiding ben ik in één keer geslaagd.',
    date: '2026-02-02',
    transmission: 'schakel',
  },
  {
    id: 'lina-den-bosch',
    name: 'Lina',
    city: 'Den Bosch',
    rating: 5,
    quote:
      'Ik koos voor automaat en dat was voor mij de beste beslissing. De instructeur gaf mij veel vertrouwen.',
    date: '2026-01-19',
    transmission: 'automaat',
  },
  {
    id: 'daan-veghel',
    name: 'Daan',
    city: 'Veghel',
    rating: 5,
    quote:
      'Na een eerdere afgekeurde poging bij een andere rijschool durfde ik het bijna niet meer. Hier kreeg ik de rust terug en is het alsnog gelukt.',
    date: '2025-12-08',
    transmission: 'schakel',
  },
  {
    id: 'emma-boekel',
    name: 'Emma',
    city: 'Boekel',
    rating: 4,
    quote:
      'Fijne lessen en altijd op tijd opgehaald. Het lesplan hielp me om gericht te oefenen op wat ik nog lastig vond.',
    date: '2025-11-22',
    transmission: 'automaat',
  },
  {
    id: 'thijs-oss',
    name: 'Thijs',
    city: 'Oss',
    rating: 5,
    quote:
      'Geen gedoe, geen verrassingen. Vooraf duidelijk wat het kostte en elke les werd besproken hoe ik ervoor stond.',
    date: '2025-10-30',
    transmission: 'schakel',
  },
];
