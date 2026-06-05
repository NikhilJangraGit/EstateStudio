import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

const House = () => {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.15; // Slow continuous rotation
  });

  const materialProps = {
    color: '#E63946',
    wireframe: true,
    transparent: true,
    opacity: 0.8,
  };

  const glassProps = {
    color: '#ffffff',
    transparent: true,
    opacity: 0.05,
    roughness: 0.1,
    metalness: 1,
    side: THREE.DoubleSide,
  };

  return (
    <group ref={groupRef} position={[0, -1, 0]}>
      {/* Base of the house (Glass) */}
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[3, 2, 3]} />
        <meshStandardMaterial {...glassProps} />
      </mesh>
      
      {/* Base Wireframe */}
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[3.01, 2.01, 3.01]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>

      {/* Roof (Glass) */}
      <mesh position={[0, 2.8, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[2.8, 1.8, 4]} />
        <meshStandardMaterial {...glassProps} />
      </mesh>

      {/* Roof Wireframe */}
      <mesh position={[0, 2.8, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[2.81, 1.81, 4]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>

      {/* Door */}
      <mesh position={[0, 0.6, 1.5]}>
        <boxGeometry args={[0.8, 1.2, 0.1]} />
        <meshStandardMaterial color="#E63946" transparent opacity={0.3} />
      </mesh>

      {/* Windows */}
      <mesh position={[-0.8, 1.2, 1.51]}>
        <boxGeometry args={[0.6, 0.6, 0.1]} />
        <meshStandardMaterial color="#E63946" wireframe />
      </mesh>
      <mesh position={[0.8, 1.2, 1.51]}>
        <boxGeometry args={[0.6, 0.6, 0.1]} />
        <meshStandardMaterial color="#E63946" wireframe />
      </mesh>
    </group>
  );
};

export default function Hero3DHouse() {
  return (
    <div className="w-full h-full min-h-[400px] lg:min-h-[600px] relative">
      {/* Background glow for the 3D model */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#E63946]/30 blur-[120px] rounded-full pointer-events-none" />
      
      <Canvas camera={{ position: [6, 4, 6], fov: 45 }} className="z-10 cursor-grab active:cursor-grabbing">
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <House />
        </Float>

        <Sparkles count={80} scale={10} size={2} speed={0.4} opacity={0.4} color="#E63946" />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate={false}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 4}
        />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
