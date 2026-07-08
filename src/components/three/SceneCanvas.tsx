'use client';

import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { DrivingScene } from './DrivingScene';

/**
 * Client-only WebGL canvas. Loaded via next/dynamic with `ssr: false`, so it
 * never runs on the server. Honours `prefers-reduced-motion`: when set, the
 * scene renders a single static frame instead of the looping drive.
 */
export default function SceneCanvas() {
  const [motion, setMotion] = useState(true);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setMotion(!query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      frameloop={motion ? 'always' : 'demand'}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 2.35, 7.5], fov: 38 }}
      className="!absolute inset-0"
    >
      <DrivingScene active={motion} />
    </Canvas>
  );
}
