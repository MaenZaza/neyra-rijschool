'use client';

import { useMemo, useRef, type ReactNode } from 'react';
import { useFrame } from '@react-three/fiber';
import { CanvasTexture, DoubleSide, type Group } from 'three';
import { PALETTE } from './palette';

/**
 * Everything that scrolls toward the camera to fake forward motion while the
 * car stays centred: centre dashes, cones, street lights, licence-plate signs
 * and an abstract navy skyline. Each element type lives in its own <Scroller>
 * that translates on +Z and wraps by its layout period, so the loop is seamless
 * as long as fog hides the far seam.
 */

function Scroller({
  speed,
  period,
  children,
}: {
  speed: number;
  period: number;
  children: ReactNode;
}) {
  const ref = useRef<Group>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.position.z += speed * delta;
    if (ref.current.position.z >= period) ref.current.position.z -= period;
  });
  return <group ref={ref}>{children}</group>;
}

/* ------------------------------- Centre dashes ------------------------------- */

function Dashes({ speed }: { speed: number }) {
  const gap = 4;
  const count = 26;
  return (
    <Scroller speed={speed} period={gap}>
      {Array.from({ length: count }).map((_, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, -i * gap]}>
          <planeGeometry args={[0.24, 1.8]} />
          <meshStandardMaterial
            color={PALETTE.plate}
            emissive={PALETTE.plate}
            emissiveIntensity={0.35}
            roughness={0.5}
          />
        </mesh>
      ))}
    </Scroller>
  );
}

/* ---------------------------------- Cones ----------------------------------- */

function Cone({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.32, 0]} castShadow>
        <coneGeometry args={[0.22, 0.62, 18]} />
        <meshStandardMaterial color={PALETTE.signal} roughness={0.45} />
      </mesh>
      <mesh position={[0, 0.36, 0]}>
        <cylinderGeometry args={[0.17, 0.2, 0.12, 18, 1, true]} />
        <meshStandardMaterial color={PALETTE.paperSoft} side={DoubleSide} roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.03, 0]} castShadow>
        <boxGeometry args={[0.46, 0.06, 0.46]} />
        <meshStandardMaterial color={PALETTE.inkSoft} roughness={0.6} />
      </mesh>
    </group>
  );
}

function Cones({ speed }: { speed: number }) {
  const period = 8;
  const count = 12;
  return (
    <Scroller speed={speed} period={period}>
      {Array.from({ length: count }).flatMap((_, i) => [
        <Cone key={`l${i}`} position={[-3.1, 0, -i * period]} />,
        <Cone key={`r${i}`} position={[3.1, 0, -i * period + period / 2]} />,
      ])}
    </Scroller>
  );
}

/* ------------------------------ Street lights ------------------------------- */

function StreetLight({ position, flip }: { position: [number, number, number]; flip: boolean }) {
  const dir = flip ? -1 : 1;
  return (
    <group position={position} scale={[dir, 1, 1]}>
      {/* Post */}
      <mesh position={[0, 2.2, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.1, 4.4, 10]} />
        <meshStandardMaterial color={PALETTE.inkSoft} roughness={0.6} metalness={0.3} />
      </mesh>
      {/* Arm */}
      <mesh position={[-0.7, 4.3, 0]} rotation={[0, 0, Math.PI / 2.3]}>
        <cylinderGeometry args={[0.06, 0.06, 1.6, 8]} />
        <meshStandardMaterial color={PALETTE.inkSoft} roughness={0.6} metalness={0.3} />
      </mesh>
      {/* Lamp head */}
      <mesh position={[-1.35, 4.55, 0]}>
        <boxGeometry args={[0.5, 0.16, 0.3]} />
        <meshStandardMaterial
          color={PALETTE.plate}
          emissive={PALETTE.plate}
          emissiveIntensity={1.4}
        />
      </mesh>
    </group>
  );
}

function StreetLights({ speed }: { speed: number }) {
  const period = 26;
  const count = 4;
  return (
    <Scroller speed={speed} period={period}>
      {Array.from({ length: count }).flatMap((_, i) => [
        <StreetLight key={`l${i}`} position={[-5.4, 0, -i * period]} flip={false} />,
        <StreetLight key={`r${i}`} position={[5.4, 0, -i * period + period / 2]} flip />,
      ])}
    </Scroller>
  );
}

/* ---------------------------- Licence-plate signs --------------------------- */

function usePlateTexture(text: string) {
  return useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = PALETTE.plate;
      ctx.fillRect(0, 0, 512, 128);
      ctx.fillStyle = PALETTE.ink;
      ctx.font = 'bold 76px "Courier New", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, 256, 70);
    }
    const texture = new CanvasTexture(canvas);
    texture.anisotropy = 8;
    return texture;
  }, [text]);
}

function PlateSign({ position, texture }: { position: [number, number, number]; texture: CanvasTexture }) {
  return (
    <group position={position}>
      {[-0.75, 0.75].map((x) => (
        <mesh key={x} position={[x, 1.1, 0]} castShadow>
          <cylinderGeometry args={[0.07, 0.07, 2.2, 8]} />
          <meshStandardMaterial color={PALETTE.inkSoft} roughness={0.6} />
        </mesh>
      ))}
      <mesh position={[0, 2.4, 0]} castShadow>
        <boxGeometry args={[2.6, 0.7, 0.12]} />
        <meshStandardMaterial color={PALETTE.ink} roughness={0.7} />
      </mesh>
      <mesh position={[0, 2.4, 0.07]}>
        <planeGeometry args={[2.4, 0.6]} />
        <meshStandardMaterial map={texture} toneMapped={false} />
      </mesh>
    </group>
  );
}

function PlateSigns({ speed }: { speed: number }) {
  const texture = usePlateTexture('NEYRA');
  const period = 34;
  const count = 3;
  return (
    <Scroller speed={speed} period={period}>
      {Array.from({ length: count }).map((_, i) => (
        <group key={i} position={[6.4, 0, -i * period - 6]} rotation={[0, -0.5, 0]}>
          <PlateSign position={[0, 0, 0]} texture={texture} />
        </group>
      ))}
    </Scroller>
  );
}

/* ------------------------------ Navy skyline -------------------------------- */

// Deterministic layout so the skyline reads intentionally, not noisy.
const BUILDINGS: Array<{ x: number; z: number; w: number; h: number; d: number }> = [
  { x: -13, z: -6, w: 4, h: 7, d: 4 },
  { x: -17, z: -14, w: 5, h: 11, d: 5 },
  { x: -12, z: -22, w: 3.5, h: 5, d: 3.5 },
  { x: -16, z: -30, w: 5, h: 9, d: 5 },
  { x: 13, z: -4, w: 4, h: 6, d: 4 },
  { x: 17, z: -12, w: 5, h: 12, d: 5 },
  { x: 12.5, z: -20, w: 3.5, h: 4.5, d: 3.5 },
  { x: 16, z: -28, w: 5, h: 10, d: 5 },
];

function Skyline({ speed }: { speed: number }) {
  const period = 40;
  return (
    <Scroller speed={speed} period={period}>
      {BUILDINGS.map((b, i) => (
        <mesh key={i} position={[b.x, b.h / 2, b.z]} castShadow>
          <boxGeometry args={[b.w, b.h, b.d]} />
          <meshStandardMaterial color={i % 2 === 0 ? PALETTE.ink : PALETTE.inkSoft} roughness={0.85} />
        </mesh>
      ))}
    </Scroller>
  );
}

/* --------------------------------- Export ----------------------------------- */

export function Scenery({ speed }: { speed: number }) {
  return (
    <group>
      <Dashes speed={speed} />
      <Cones speed={speed} />
      <StreetLights speed={speed} />
      <PlateSigns speed={speed} />
      <Skyline speed={speed} />
    </group>
  );
}
