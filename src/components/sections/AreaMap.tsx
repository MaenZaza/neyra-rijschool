import { serviceAreas } from '@/data/serviceAreas';

/**
 * Stylised, illustrative service-area map. This is NOT a geographic map — it is
 * a road-network inspired diagram positioning each town via its `map` coords.
 * Deliberately dependency-free (no Google Maps) per the brief.
 */
export function AreaMap() {
  return (
    <div className="relative overflow-hidden rounded-card border border-paper/15 bg-ink text-paper">
      <div className="bg-grid absolute inset-0" aria-hidden />
      <svg
        viewBox="0 0 100 70"
        className="relative w-full"
        role="img"
        aria-label="Illustratieve kaart van de lesgebieden in Noord-Brabant met Uden, Oss, 's-Hertogenbosch, Veghel, Boekel en Volkel."
      >
        {/* Road network connecting the towns */}
        <g
          fill="none"
          stroke="#F4EFE6"
          strokeOpacity="0.18"
          strokeWidth="0.6"
          strokeLinecap="round"
        >
          <path d="M18 30 L40 20 L60 34 L78 44" />
          <path d="M40 20 L72 30" />
          <path d="M60 34 L66 52" />
          <path d="M72 30 L78 44" />
        </g>
        {/* Dashed "driving route" highlight */}
        <path
          d="M18 30 L40 20 L60 34 L66 52"
          fill="none"
          stroke="#EC5A21"
          strokeWidth="0.7"
          strokeDasharray="2 2"
          strokeLinecap="round"
        />

        {serviceAreas.map((area) => (
          <g key={area.name} transform={`translate(${area.map.x} ${area.map.y})`}>
            <circle
              r={area.examLocation ? 2 : 1.4}
              fill={area.examLocation ? '#F5C518' : '#EC5A21'}
              stroke="#0D1520"
              strokeWidth="0.4"
            />
            <text
              x={0}
              y={-2.8}
              textAnchor="middle"
              fill="#F4EFE6"
              fontSize="2.6"
              fontFamily="var(--font-mono), monospace"
            >
              {area.name}
            </text>
          </g>
        ))}
      </svg>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-paper/10 px-5 py-4 text-xs text-paper/70">
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-signal" /> Lesgebied
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-plate" /> Examenomgeving
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-0.5 w-5 bg-signal" style={{ borderTop: '1px dashed' }} />{' '}
          Voorbeeldroute
        </span>
      </div>
    </div>
  );
}
