/**
 * Brand palette mirrored from tailwind.config.ts for use inside the WebGL
 * scene (three.js needs plain hex strings, not Tailwind classes). Keep these
 * in sync with the `colors` block in tailwind.config.ts.
 */
export const PALETTE = {
  ink: '#0D1520',
  inkSoft: '#16202E',
  paper: '#F4EFE6',
  paperSoft: '#FBF8F1',
  paperDeep: '#EAE2D3',
  signal: '#EC5A21',
  signalSoft: '#F47B49',
  plate: '#F5C518',
  plateDeep: '#E0A800',
  asphalt: '#4A5568',
  asphaltLight: '#8A93A2',
} as const;
