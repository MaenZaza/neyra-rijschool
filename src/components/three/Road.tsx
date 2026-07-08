'use client';

import { PALETTE } from './palette';

/**
 * Static road surface: a cream ground plane, a navy asphalt strip, and two
 * solid paper edge lines. The moving centre dashes live in <Scenery /> so they
 * can scroll toward the camera for the driving illusion.
 */
export function Road() {
  return (
    <group>
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, -30]} receiveShadow>
        <planeGeometry args={[600, 600]} />
        <meshStandardMaterial color={PALETTE.paperDeep} roughness={1} />
      </mesh>

      {/* Asphalt strip */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -30]} receiveShadow>
        <planeGeometry args={[8, 260]} />
        <meshStandardMaterial color={PALETTE.ink} roughness={0.95} />
      </mesh>

      {/* Solid edge lines */}
      {[-3.6, 3.6].map((x) => (
        <mesh key={x} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.01, -30]}>
          <planeGeometry args={[0.16, 260]} />
          <meshStandardMaterial color={PALETTE.paperSoft} roughness={0.5} />
        </mesh>
      ))}
    </group>
  );
}
