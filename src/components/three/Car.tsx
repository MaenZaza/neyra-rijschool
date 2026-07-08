'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import type { Group } from 'three';
import { PALETTE } from './palette';

/**
 * Low-poly stylised hatchback built entirely from primitives — no external
 * model/asset is loaded so the scene stays self-contained and offline-safe.
 * The car faces -Z (down the road toward the horizon); the camera sits behind
 * it at +Z, so we see the glowing orange tail lights.
 */

function Wheel({
  position,
  speed,
}: {
  position: [number, number, number];
  speed: number;
}) {
  const ref = useRef<Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.x += delta * speed * 0.9;
  });
  return (
    <group ref={ref} position={position}>
      {/* Tyre */}
      <mesh castShadow rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.42, 0.42, 0.34, 22]} />
        <meshStandardMaterial color={PALETTE.ink} roughness={0.7} metalness={0.1} />
      </mesh>
      {/* Hub cap in licence-plate yellow */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.17, 0.17, 0.36, 16]} />
        <meshStandardMaterial color={PALETTE.plate} roughness={0.35} metalness={0.5} />
      </mesh>
    </group>
  );
}

export function Car({ speed, active }: { speed: number; active: boolean }) {
  const body = useRef<Group>(null);

  useFrame((state) => {
    if (!body.current || !active) return;
    const t = state.clock.elapsedTime;
    // Subtle suspension bob + steering sway so the car feels alive.
    body.current.position.y = 0.03 * Math.sin(t * 3.2);
    body.current.rotation.z = 0.02 * Math.sin(t * 1.6);
  });

  return (
    <group>
      <group ref={body}>
        {/* Lower body */}
        <RoundedBox
          args={[2, 0.72, 4]}
          radius={0.2}
          smoothness={4}
          position={[0, 0.78, 0]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial color={PALETTE.signal} roughness={0.32} metalness={0.35} />
        </RoundedBox>

        {/* Cabin, nudged toward the rear so the bonnet reads longer */}
        <RoundedBox
          args={[1.72, 0.66, 2]}
          radius={0.16}
          smoothness={4}
          position={[0, 1.36, 0.25]}
          castShadow
        >
          <meshStandardMaterial color={PALETTE.inkSoft} roughness={0.28} metalness={0.25} />
        </RoundedBox>

        {/* Windscreen (front, -Z) */}
        <mesh position={[0, 1.4, -0.78]} rotation={[0.62, 0, 0]}>
          <planeGeometry args={[1.4, 0.56]} />
          <meshStandardMaterial color={PALETTE.paperSoft} roughness={0.08} metalness={0.6} />
        </mesh>
        {/* Rear window (+Z) */}
        <mesh position={[0, 1.4, 1.26]} rotation={[-0.6, 0, 0]}>
          <planeGeometry args={[1.4, 0.5]} />
          <meshStandardMaterial color={PALETTE.paperSoft} roughness={0.08} metalness={0.6} />
        </mesh>
        {/* Side windows */}
        {[-0.87, 0.87].map((x) => (
          <mesh key={x} position={[x, 1.42, 0.25]} rotation={[0, Math.PI / 2, 0]}>
            <planeGeometry args={[1.5, 0.5]} />
            <meshStandardMaterial color={PALETTE.paperSoft} roughness={0.1} metalness={0.5} />
          </mesh>
        ))}

        {/* Head lights (front, -Z) */}
        {[-0.66, 0.66].map((x) => (
          <mesh key={x} position={[x, 0.82, -2.01]}>
            <boxGeometry args={[0.34, 0.18, 0.06]} />
            <meshStandardMaterial
              color={PALETTE.paperSoft}
              emissive={PALETTE.plate}
              emissiveIntensity={2.2}
            />
          </mesh>
        ))}
        {/* Tail lights (rear, +Z — face the camera) */}
        {[-0.66, 0.66].map((x) => (
          <mesh key={x} position={[x, 0.82, 2.01]}>
            <boxGeometry args={[0.36, 0.16, 0.06]} />
            <meshStandardMaterial
              color={PALETTE.signalSoft}
              emissive={PALETTE.signal}
              emissiveIntensity={2.6}
            />
          </mesh>
        ))}

        {/* Roof beacon nod to a learner car */}
        <RoundedBox args={[0.5, 0.26, 0.34]} radius={0.06} smoothness={3} position={[0, 1.82, 0.2]}>
          <meshStandardMaterial color={PALETTE.plate} emissive={PALETTE.plate} emissiveIntensity={0.5} />
        </RoundedBox>
      </group>

      {/* Wheels stay grounded while the body bobs (implied suspension). */}
      <Wheel position={[0.92, 0.42, 1.3]} speed={speed} />
      <Wheel position={[-0.92, 0.42, 1.3]} speed={speed} />
      <Wheel position={[0.92, 0.42, -1.3]} speed={speed} />
      <Wheel position={[-0.92, 0.42, -1.3]} speed={speed} />
    </group>
  );
}
