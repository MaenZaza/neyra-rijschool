import type { Statistic } from '@/types';

/**
 * ===========================================================================
 *  SUCCESS-RATE STATISTICS — DEMO / INTERNAL DATA
 * ===========================================================================
 *  ⚠️  These figures are DEMO values based on fictional internal results.
 *      They are NOT sourced from the CBR. Do not present them as official
 *      CBR statistics. When a real data source (API, database, admin
 *      dashboard) is added, replace this array — the UI reads from it directly.
 * ===========================================================================
 */

export const statistics: Statistic[] = [
  {
    id: 'slagingspercentage',
    value: '78%',
    label: 'Slagingspercentage',
    description: 'Aandeel leerlingen dat slaagt, gebaseerd op interne resultaten.',
  },
  {
    id: 'tevredenheid',
    value: '96%',
    label: 'Tevreden leerlingen',
    description: 'Leerlingen die de begeleiding als positief beoordelen.',
  },
  {
    id: 'beoordeling',
    value: '4.9/5',
    label: 'Gemiddelde beoordeling',
    description: 'Gemiddelde waardering uit ontvangen ervaringen.',
  },
  {
    id: 'geslaagd',
    value: '140+',
    label: 'Geslaagde leerlingen',
    description: 'Totaal aantal geslaagde leerlingen tot nu toe.',
  },
];

/** Public disclaimer shown near the statistics. */
export const statisticsDisclaimer =
  'De getoonde cijfers zijn gebaseerd op interne resultaten en dienen als demonstratie. Ze zijn niet afkomstig van het CBR.';
