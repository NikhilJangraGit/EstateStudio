import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Float } from '@react-three/drei';
import * as THREE from 'three';

const ArchitecturalHouse = () => {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(t / 4) / 4; // Gentle swaying
  });

  // Realistic materials
  const wallMaterial = new THREE.MeshStandardMaterial({ color: '#f5f5f5', roughness: 0.8 });
  const roofMaterial = new THREE.MeshStandardMaterial({ color: '#2d3436', roughness: 0.9 });
  const woodMaterial = new THREE.MeshStandardMaterial({ color: '#E63946', roughness: 0.4 }); // Brand red accent
  const glassMaterial = new THREE.MeshPhysicalMaterial({ 
    color: '#ffffff', 
    transmission: 0.9, 
    opacity: 1, 
    metalness: 0, 
    roughness: 0.1, 
    ior: 1.5, 
    thickness: 0.5 
  });

  return (
    <group ref={groupRef} position={[0, -1, 0]}>
      {/* Main Building Body */}
      <mesh position={[0, 1.5, 0]} material={wallMaterial} castShadow receiveShadow>
        <boxGeometry args={[4, 3, 3]} />
      </mesh>

      {/* Roof */}
      <mesh position={[0, 3.5, 0]} rotation={[0, Math.PI / 4, 0]} material={roofMaterial} castShadow receiveShadow>
        <coneGeometry args={[3.6, 1.5, 4]} />
      </mesh>

      {/* Front Extension */}
      <mesh position={[1, 1, 1.5]} material={wallMaterial} castShadow receiveShadow>
        <boxGeometry args={[2, 2, 1.5]} />
      </mesh>

      {/* Front Extension Roof */}
      <mesh position={[1, 2.1, 1.5]} material={roofMaterial} castShadow receiveShadow>
        <boxGeometry args={[2.2, 0.2, 1.7]} />
      </mesh>

      {/* Large Window on Extension */}
      <mesh position={[1, 1, 2.26]} material={glassMaterial}>
        <boxGeometry args={[1.6, 1.4, 0.05]} />
      </mesh>
      
      {/* Window Frames */}
      <mesh position={[1, 1, 2.27]} material={roofMaterial}>
        <boxGeometry args={[0.05, 1.4, 0.06]} />
      </mesh>
      <mesh position={[1, 1, 2.27]} material={roofMaterial}>
        <boxGeometry args={[1.6, 0.05, 0.06]} />
      </mesh>

      {/* Main Door */}
      <mesh position={[-1, 0.75, 1.51]} material={woodMaterial} castShadow>
        <boxGeometry args={[0.8, 1.5, 0.05]} />
      </mesh>

      {/* Side Window */}
      <mesh position={[-2.01, 1.5, 0]} material={glassMaterial}>
        <boxGeometry args={[0.05, 1.2, 1.5]} />
      </mesh>
      
      {/* Base/Foundation */}
      <mesh position={[0, -0.1, 0]} material={roofMaterial} receiveShadow>
        <boxGeometry args={[5.5, 0.2, 5.5]} />
      </mesh>
    </group>
  );
};

export default function Hero3DRealHouse() {
  return (
    <div className="w-full h-full min-h-[400px] lg:min-h-[600px] relative rounded-3xl overflow-hidden cursor-grab active:cursor-grabbing group bg-transparent">
      {/* Subtle background lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#E63946]/10 blur-[150px] rounded-full pointer-events-none" />
      
      <Canvas shadows camera={{ position: [8, 5, 8], fov: 40 }} className="z-10">
        <color attach="background" args={['transparent']} />
        
        <ambientLight intensity={0.4} />
        <directionalLight 
          castShadow 
          position={[10, 10, 5]} 
          intensity={1.5} 
          shadow-mapSize={[1024, 1024]}
        >
          <orthographicCamera attach="shadow-camera" args={[-10, 10, 10, -10]} />
        </directionalLight>
        
        <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
          <ArchitecturalHouse />
        </Float>

        <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={20} blur={2} far={4} color="#000000" />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate
          autoRotateSpeed={1.0}
          maxPolarAngle={Math.PI / 2 - 0.1}
          minPolarAngle={Math.PI / 4}
        />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
