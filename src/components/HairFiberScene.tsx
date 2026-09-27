import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// Procedural 3D Hair Ribbon Strand Component
function HairStrand({
  curvePoints,
  color,
  thickness = 0.05,
  speed = 1.0,
  roughness = 0.3,
  metalness = 0.7,
}: {
  curvePoints: THREE.Vector3[];
  color: string;
  thickness?: number;
  speed?: number;
  roughness?: number;
  metalness?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialRot = useMemo(() => Math.random() * Math.PI, []);

  // Generate smooth tube geometry along the bezier/catmull-rom spline
  const geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(curvePoints, false, 'centripetal', 0.5);
    return new THREE.TubeGeometry(curve, 64, thickness, 8, false);
  }, [curvePoints, thickness]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime() * speed;
    
    // Wave motion mimicking silk hair flowing in soft breeze
    meshRef.current.rotation.y = initialRot + Math.sin(time * 0.4) * 0.25;
    meshRef.current.rotation.z = Math.cos(time * 0.3) * 0.15;
    meshRef.current.position.y += Math.sin(time * 0.8) * 0.003;
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial
        color={color}
        roughness={roughness}
        metalness={metalness}
        envMapIntensity={1.2}
      />
    </mesh>
  );
}

// 3D Salon Scissors Element in R3F
function FloatingScissors() {
  const groupRef = useRef<THREE.Group>(null);
  const bladeARef = useRef<THREE.Group>(null);
  const bladeBRef = useRef<THREE.Group>(null);

  // Scissor blade geometry
  const bladeGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(0.14, 0.3);
    shape.lineTo(0.06, 2.3);
    shape.lineTo(0.0, 2.5);
    shape.lineTo(-0.05, 2.3);
    shape.lineTo(-0.12, 0.3);
    shape.closePath();

    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.04,
      bevelEnabled: true,
      bevelThickness: 0.015,
      bevelSize: 0.015,
      bevelSegments: 2,
    });
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.3 + state.pointer.x * 0.4;
      groupRef.current.rotation.x = Math.cos(t * 0.4) * 0.2 - state.pointer.y * 0.3;
      groupRef.current.position.y = 0.5 + Math.sin(t * 1.1) * 0.15;
    }
    // Rhythmic salon snip motion
    const snip = Math.sin(t * 2.5) * 0.18 + 0.1;
    if (bladeARef.current) bladeARef.current.rotation.z = -snip;
    if (bladeBRef.current) bladeBRef.current.rotation.z = snip;
  });

  return (
    <group ref={groupRef} position={[2.5, 0.5, 0]} scale={[0.9, 0.9, 0.9]}>
      {/* Blade A */}
      <group ref={bladeARef} position={[0, 0, 0]}>
        <mesh geometry={bladeGeometry} position={[0, 1.2, 0]}>
          <meshStandardMaterial color="#e5e7eb" metalness={0.95} roughness={0.15} />
        </mesh>
        <mesh position={[-0.25, -0.9, 0]}>
          <torusGeometry args={[0.32, 0.06, 16, 32]} />
          <meshStandardMaterial color="#e2b774" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* Blade B */}
      <group ref={bladeBRef} position={[0, 0, 0.05]}>
        <mesh geometry={bladeGeometry} position={[0, 1.2, 0]}>
          <meshStandardMaterial color="#e5e7eb" metalness={0.95} roughness={0.15} />
        </mesh>
        <mesh position={[0.25, -0.9, 0]}>
          <torusGeometry args={[0.32, 0.06, 16, 32]} />
          <meshStandardMaterial color="#e2b774" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* Center Pivot Hinge */}
      <mesh position={[0, 0, 0.04]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.12, 24]} />
        <meshStandardMaterial color="#e2b774" metalness={0.95} roughness={0.15} />
      </mesh>
    </group>
  );
}

// 3D Interactive Hair Strands Cluster with Mouse Follow
function HairCluster() {
  const clusterRef = useRef<THREE.Group>(null);

  // Generate 7 flowing hair strands with distinct curvature and luxury tones
  const strands = useMemo(() => {
    const list = [];
    const colors = ['#FFF0D4', '#E2B774', '#D4AF37', '#9A6B29', '#E5C483', '#795548', '#FFDFC2'];

    for (let i = 0; i < 7; i++) {
      const angle = (i / 7) * Math.PI * 2;
      const radius = 1.2 + (i % 3) * 0.5;
      const height = 4.8 + (i % 2) * 1.2;
      const points: THREE.Vector3[] = [];

      const segments = 16;
      for (let s = 0; s <= segments; s++) {
        const t = s / segments;
        const curAngle = angle + t * Math.PI * 1.8;
        const waveX = Math.sin(t * Math.PI * 2) * 0.6;
        const x = Math.cos(curAngle) * radius + waveX + (i % 2 === 0 ? 0.3 : -0.3);
        const y = (t - 0.5) * height;
        const z = Math.sin(curAngle) * radius * 0.8 + Math.cos(t * 3) * 0.4;
        points.push(new THREE.Vector3(x, y, z));
      }

      list.push({
        points,
        color: colors[i % colors.length],
        thickness: 0.035 + (i % 3) * 0.015,
        speed: 0.7 + (i % 4) * 0.25,
      });
    }
    return list;
  }, []);

  useFrame((state) => {
    if (!clusterRef.current) return;
    // Mouse follow interaction on the hair strands group
    const targetRotY = state.pointer.x * 0.7;
    const targetRotX = -state.pointer.y * 0.5;
    const targetPosX = state.pointer.x * 1.2;
    const targetPosY = state.pointer.y * 0.8;

    clusterRef.current.rotation.y += (targetRotY - clusterRef.current.rotation.y) * 0.05;
    clusterRef.current.rotation.x += (targetRotX - clusterRef.current.rotation.x) * 0.05;
    clusterRef.current.position.x += (targetPosX - clusterRef.current.position.x) * 0.03;
    clusterRef.current.position.y += (targetPosY - clusterRef.current.position.y) * 0.03;
  });

  return (
    <group ref={clusterRef} position={[-0.5, 0, -0.5]}>
      {strands.map((strand, idx) => (
        <HairStrand
          key={idx}
          curvePoints={strand.points}
          color={strand.color}
          thickness={strand.thickness}
          speed={strand.speed}
        />
      ))}

      {/* Floating Golden Glow Orbs */}
      <mesh position={[2.8, 2.2, -1.2]}>
        <sphereGeometry args={[0.22, 24, 24]} />
        <meshStandardMaterial color="#E2B774" metalness={0.9} roughness={0.15} />
      </mesh>
      <mesh position={[-2.6, -1.8, 0.4]}>
        <sphereGeometry args={[0.18, 24, 24]} />
        <meshStandardMaterial color="#FFF0D4" metalness={0.8} roughness={0.25} />
      </mesh>
    </group>
  );
}

export const HairFiberScene: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative w-full h-full pointer-events-none select-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 8.5], fov: 45 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 8.5]} fov={45} />
        
        {/* Studio Lighting Setup */}
        <ambientLight intensity={0.9} color="#fff6e8" />
        <directionalLight position={[6, 8, 8]} intensity={2.8} color="#ffe5b4" />
        <directionalLight position={[-6, -4, -4]} intensity={2.0} color="#d4af37" />
        <pointLight position={[0, 2, 4]} intensity={2.2} color="#e2b774" distance={20} />

        {/* 3D Hair Strands Cluster with Mouse Follow */}
        <HairCluster />

        {/* 3D Scissors with Animated Blades */}
        <Float speed={2} rotationIntensity={0.4} floatIntensity={0.5}>
          <FloatingScissors />
        </Float>

        {/* Floating Beauty & Hair Sparkles */}
        <Sparkles
          count={70}
          scale={[12, 10, 8]}
          size={2.5}
          speed={0.4}
          color="#E2B774"
          opacity={0.65}
        />
      </Canvas>
    </div>
  );
};
