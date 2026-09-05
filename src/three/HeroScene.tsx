import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows, AdaptiveDpr } from '@react-three/drei';
import { GoldenCore } from './GoldenCore';
import { Particles } from './Particles';
import { useMousePosition } from '@/hooks/useMousePosition';
import { useDeviceDetection } from '@/hooks/useDeviceDetection';

export function HeroScene() {
  const mouse = useMousePosition();
  const { isMobile, isLowPerf } = useDeviceDetection();

  const particleCount = isMobile ? 80 : isLowPerf ? 100 : 200;
  const dpr: [number, number] = isMobile ? [1, 1.5] : [1, 2];

  return (
    <Canvas
      dpr={dpr}
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
    >
      <AdaptiveDpr pixelated={false} />
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#FFFFFF" />
        <pointLight position={[-5, 3, -5]} intensity={0.5} color="#D4AF37" />
        <pointLight position={[0, -3, 3]} intensity={0.3} color="#B8860B" />

        <GoldenCore mouse={mouse} reducedParticles={isMobile || isLowPerf} />
        <Particles count={particleCount} radius={isMobile ? 4 : 5} />

        <Environment preset="studio" />

        {!isMobile && (
          <ContactShadows
            position={[0, -2.5, 0]}
            opacity={0.15}
            scale={8}
            blur={3}
            far={5}
            color="#D4AF37"
          />
        )}
      </Suspense>
    </Canvas>
  );
}
