import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, Icosahedron, Octahedron, Torus, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface GoldenCoreProps {
  mouse: { x: number; y: number };
  reducedParticles?: boolean;
}

export function GoldenCore({ mouse, reducedParticles = false }: GoldenCoreProps) {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  useFrame((state, delta) => {
    if (groupRef.current) {
      const targetX = mouse.x * 0.3;
      const targetY = mouse.y * 0.2;
      groupRef.current.rotation.y += delta * 0.15;
      groupRef.current.rotation.x += (targetY - groupRef.current.rotation.x) * 0.05;
      groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.05;
    }
    if (innerRef.current) {
      innerRef.current.rotation.x += delta * 0.3;
      innerRef.current.rotation.z += delta * 0.2;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      ringRef.current.rotation.z += delta * 0.1;
    }
  });

  const goldMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#D4AF37',
        metalness: 1,
        roughness: 0.15,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        envMapIntensity: 1.5,
      }),
    []
  );

  const glassMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#FFFFFF',
        metalness: 0,
        roughness: 0,
        transmission: 0.9,
        thickness: 1.5,
        ior: 1.5,
        envMapIntensity: 1,
        transparent: true,
        opacity: 0.6,
      }),
    []
  );

  const darkGoldMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#B8860B',
        metalness: 1,
        roughness: 0.25,
        clearcoat: 0.8,
        clearcoatRoughness: 0.2,
      }),
    []
  );

  const orbitingElements = useMemo(() => {
    const count = reducedParticles ? 4 : 8;
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const radius = 2.2 + Math.random() * 0.5;
      const height = (Math.random() - 0.5) * 1.5;
      return { angle, radius, height, scale: 0.08 + Math.random() * 0.06 };
    });
  }, [reducedParticles]);

  return (
    <group ref={groupRef}>
      {/* Central glass icosahedron */}
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
        <Icosahedron args={[1, 0]} material={glassMaterial} />
      </Float>

      {/* Inner golden core */}
      <mesh ref={innerRef} scale={0.55}>
        <icosahedronGeometry args={[1, 1]} />
        <primitive object={goldMaterial} attach="material" />
      </mesh>

      {/* Distorted gold shell */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
        <mesh scale={1.3}>
          <icosahedronGeometry args={[1, 2]} />
          <MeshDistortMaterial
            color="#D4AF37"
            metalness={0.9}
            roughness={0.2}
            distort={0.15}
            speed={1.5}
            wireframe
            transparent
            opacity={0.35}
          />
        </mesh>
      </Float>

      {/* Gold torus ring */}
      <mesh ref={ringRef} scale={1.8} rotation={[Math.PI / 3, 0, 0]}>
        <Torus args={[1, 0.03, 16, 100]} />
        <primitive object={darkGoldMaterial} attach="material" />
      </mesh>

      {/* Second ring */}
      <mesh scale={2.1} rotation={[Math.PI / 4, Math.PI / 3, 0]}>
        <Torus args={[1, 0.02, 16, 100]} />
        <primitive object={goldMaterial} attach="material" />
      </mesh>

      {/* Orbiting golden octahedrons */}
      {orbitingElements.map((el, i) => (
        <Float key={i} speed={2 + i * 0.2} rotationIntensity={1} floatIntensity={0.5}>
          <mesh
            position={[
              Math.cos(el.angle) * el.radius,
              el.height,
              Math.sin(el.angle) * el.radius,
            ]}
            scale={el.scale}
          >
            <octahedronGeometry args={[1, 0]} />
            <primitive object={goldMaterial} attach="material" />
          </mesh>
        </Float>
      ))}

      {/* Small floating glass shards */}
      {!reducedParticles &&
        Array.from({ length: 6 }).map((_, i) => {
          const angle = (i / 6) * Math.PI * 2;
          const r = 2.8;
          return (
            <Float key={`shard-${i}`} speed={1 + i * 0.15} rotationIntensity={2} floatIntensity={0.8}>
              <mesh
                position={[
                  Math.cos(angle) * r,
                  Math.sin(angle) * 0.8,
                  Math.sin(angle) * r,
                ]}
                scale={0.05}
              >
                <octahedronGeometry args={[1, 0]} />
                <primitive object={glassMaterial} attach="material" />
              </mesh>
            </Float>
          );
        })}
    </group>
  );
}
