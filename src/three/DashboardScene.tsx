import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';

interface DashboardSceneProps {
  reducedParticles?: boolean;
}

const productNodes = [
  { name: 'INSIDE', position: [0, 0, 0], color: '#D4AF37', scale: 1.0, status: 'Active' },
  { name: 'KRYX', position: [2.2, 1.2, -0.5], color: '#B8860B', scale: 0.75, status: 'Dev' },
  { name: 'NEXUS', position: [-2.2, 1.2, -0.5], color: '#C29C2E', scale: 0.65, status: 'Planned' },
  { name: 'VAULT', position: [0, -2.2, 0.8], color: '#E5C46A', scale: 0.55, status: 'Roadmap' },
];

const connections = [
  [0, 1],
  [0, 2],
  [0, 3],
  [1, 2],
  [1, 3],
  [2, 3],
];

function ProductNode({
  name,
  position,
  color,
  scale,
  delay,
}: {
  name: string;
  position: [number, number, number];
  color: string;
  scale: number;
  delay: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color,
        metalness: 1,
        roughness: 0.2,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        envMapIntensity: 1.5,
      }),
    [color]
  );

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
      meshRef.current.rotation.x += delta * 0.15;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.2;
      const s = scale * (1.4 + Math.sin(state.clock.elapsedTime * 1.5 + delay) * 0.08);
      ringRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group position={position}>
      <Float speed={2 + delay} rotationIntensity={0.5} floatIntensity={0.4}>
        <mesh ref={meshRef} scale={scale * 0.4}>
          <icosahedronGeometry args={[1, 1]} />
          <primitive object={material} attach="material" />
        </mesh>
        <mesh ref={ringRef} scale={scale * 0.6} rotation={[Math.PI / 2.5, 0, 0]}>
          <torusGeometry args={[1, 0.04, 8, 48]} />
          <primitive object={material} attach="material" />
        </mesh>
        <Text
          position={[0, scale * 0.85, 0]}
          fontSize={0.22}
          color="#1D1D1F"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.008}
          outlineColor="#FFFFFF"
        >
          {name}
        </Text>
      </Float>
    </group>
  );
}

function ConnectionLine({
  start,
  end,
  color = '#D4AF37',
}: {
  start: [number, number, number];
  end: [number, number, number];
  color?: string;
}) {
  const object = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const points = new Float32Array([...start, ...end]);
    geo.setAttribute('position', new THREE.BufferAttribute(points, 3));
    const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.25 });
    return new THREE.Line(geo, mat);
  }, [start, end, color]);

  useFrame((state) => {
    const mat = object.material as THREE.LineBasicMaterial;
    mat.opacity = 0.15 + Math.sin(state.clock.elapsedTime * 1.2) * 0.1;
  });

  return <primitive object={object} />;
}

function FlowingParticles({ count = 60 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const nodeIdx = Math.floor(Math.random() * productNodes.length);
      const targetIdx = (nodeIdx + 1) % productNodes.length;
      const t = Math.random();
      const start = productNodes[nodeIdx].position;
      const end = productNodes[targetIdx].position;
      arr[i * 3] = start[0] + (end[0] - start[0]) * t + (Math.random() - 0.5) * 0.3;
      arr[i * 3 + 1] = start[1] + (end[1] - start[1]) * t + (Math.random() - 0.5) * 0.3;
      arr[i * 3 + 2] = start[2] + (end[2] - start[2]) * t + (Math.random() - 0.5) * 0.3;
    }
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#D4AF37"
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export function DashboardScene({ reducedParticles = false }: DashboardSceneProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {connections.map(([a, b], i) => (
        <ConnectionLine
          key={i}
          start={productNodes[a].position as [number, number, number]}
          end={productNodes[b].position as [number, number, number]}
        />
      ))}
      {productNodes.map((node, i) => (
        <ProductNode
          key={node.name}
          name={node.name}
          position={node.position as [number, number, number]}
          color={node.color}
          scale={node.scale}
          delay={i * 0.5}
        />
      ))}
      <FlowingParticles count={reducedParticles ? 30 : 60} />
    </group>
  );
}
