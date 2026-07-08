'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import { PALETTE } from './palette';
import { Road } from './Road';
import { Car } from './Car';
import { Scenery } from './Scenery';

/**
 * Gentle mouse-parallax rig. The camera eases toward a target offset driven by
 * the normalised pointer position and keeps looking at the car. Disabled when
 * `active` is false (reduced-motion / off-screen) so the frame stays static.
 */
function Rig({ active }: { active: boolean }) {
  const { camera, pointer } = useThree();
  useFrame(() => {
    const targetX = active ? pointer.x * 0.9 : 0;
    const targetY = active ? 2.35 - pointer.y * 0.35 : 2.35;
    camera.position.x += (targetX - camera.position.x) * 0.04;
    camera.position.y += (targetY - camera.position.y) * 0.04;
    camera.lookAt(0, 0.95, -6);
  });
  return null;
}

export function DrivingScene({ active }: { active: boolean }) {
  // Metres/second the world scrolls toward the camera. Zero = frozen pose.
  const speed = active ? 7 : 0;

  return (
    <>
      <color attach="background" args={[PALETTE.paperSoft]} />
      <fog attach="fog" args={[PALETTE.paperDeep, 16, 58]} />

      {/* Lighting: soft cream hemisphere fill + a warm key light for shadows. */}
      <hemisphereLight color={PALETTE.paperSoft} groundColor={PALETTE.paperDeep} intensity={0.95} />
      <ambientLight intensity={0.25} />
      <directionalLight
        castShadow
        position={[7, 11, 5]}
        intensity={1.7}
        color="#fff2e0"
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-14}
        shadow-camera-right={14}
        shadow-camera-top={14}
        shadow-camera-bottom={-14}
        shadow-camera-far={40}
        shadow-bias={-0.0002}
      />
      {/* Orange rim glow hugging the car. */}
      <pointLight position={[0, 3, 3.5]} intensity={14} distance={14} color={PALETTE.signal} />

      <Road />
      <Scenery speed={speed} />
      <Car speed={speed} active={active} />

      <ContactShadows
        position={[0, 0.03, 0]}
        opacity={0.4}
        scale={16}
        blur={2.6}
        far={5}
        color={PALETTE.ink}
      />

      <Rig active={active} />
    </>
  );
}
