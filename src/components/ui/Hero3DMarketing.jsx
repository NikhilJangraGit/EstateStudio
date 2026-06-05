import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, Sparkles, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

const MarketingElements = () => {
  const groupRef = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.15;
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
  };

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* Smartphone Body */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <group position={[0, 0, 0]}>
          <RoundedBox args={[1.5, 3, 0.15]} radius={0.1} smoothness={4}>
            <meshStandardMaterial {...glassProps} />
          </RoundedBox>
          <RoundedBox args={[1.51, 3.01, 0.16]} radius={0.1} smoothness={4}>
            <meshStandardMaterial {...materialProps} />
          </RoundedBox>
          
          {/* Smartphone Screen Glow */}
          <mesh position={[0, 0, 0.08]}>
            <planeGeometry args={[1.3, 2.8]} />
            <meshStandardMaterial color="#E63946" emissive="#E63946" emissiveIntensity={0.5} transparent opacity={0.1} />
          </mesh>
          
          {/* UI Elements on Screen (App/Content representation) */}
          <mesh position={[0, 1.1, 0.09]}>
            <boxGeometry args={[0.8, 0.3, 0.01]} />
            <meshStandardMaterial color="#ffffff" transparent opacity={0.3} />
          </mesh>
          <mesh position={[0, 0.3, 0.09]}>
            <boxGeometry args={[1.1, 1.1, 0.01]} />
            <meshStandardMaterial color="#E63946" wireframe />
          </mesh>
          <mesh position={[-0.3, -0.6, 0.09]}>
            <boxGeometry args={[0.5, 0.4, 0.01]} />
            <meshStandardMaterial color="#ffffff" transparent opacity={0.2} />
          </mesh>
          <mesh position={[0.3, -0.6, 0.09]}>
            <boxGeometry args={[0.5, 0.4, 0.01]} />
            <meshStandardMaterial color="#ffffff" transparent opacity={0.2} />
          </mesh>
        </group>
      </Float>

      {/* Floating Bar Chart (Leads/Growth) */}
      <Float speed={3} rotationIntensity={0.5} floatIntensity={1} position={[1.5, -0.5, 1]}>
        <group rotation={[0.2, -0.4, 0]}>
          <mesh position={[-0.4, 0, 0]}>
            <boxGeometry args={[0.2, 0.5, 0.2]} />
            <meshStandardMaterial color="#ffffff" transparent opacity={0.4} />
          </mesh>
          <mesh position={[0, 0.25, 0]}>
            <boxGeometry args={[0.2, 1, 0.2]} />
            <meshStandardMaterial color="#E63946" wireframe />
          </mesh>
          <mesh position={[0.4, 0.5, 0]}>
            <boxGeometry args={[0.2, 1.5, 0.2]} />
            <meshStandardMaterial color="#ffffff" transparent opacity={0.4} />
          </mesh>
        </group>
      </Float>

      {/* Floating Play Button (Video Marketing) */}
      <Float speed={2.5} rotationIntensity={1} floatIntensity={1.5} position={[-1.5, 1, 0.5]}>
        <group rotation={[0, Math.PI / 4, 0]}>
          <mesh rotation={[Math.PI / 2, 0, -Math.PI / 2]}>
            <coneGeometry args={[0.4, 0.6, 3]} />
            <meshStandardMaterial color="#E63946" wireframe />
          </mesh>
        </group>
      </Float>
      
      {/* Floating Target/Funnel (Audience) */}
      <Float speed={2} rotationIntensity={0.8} floatIntensity={1} position={[1, 1.5, -1]}>
        <group>
          <mesh rotation={[Math.PI / 4, 0, 0]}>
            <torusGeometry args={[0.4, 0.05, 16, 32]} />
            <meshStandardMaterial color="#ffffff" transparent opacity={0.3} />
          </mesh>
          <mesh rotation={[Math.PI / 4, 0, 0]}>
            <torusGeometry args={[0.2, 0.05, 16, 32]} />
            <meshStandardMaterial color="#E63946" />
          </mesh>
        </group>
      </Float>
    </group>
  );
};

export default function Hero3DMarketing() {
  return (
    <div className="w-full h-full min-h-[400px] lg:min-h-[600px] relative">
      {/* Background glow for the 3D model */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#E63946]/30 blur-[120px] rounded-full pointer-events-none" />
      
      <Canvas camera={{ position: [5, 2, 5], fov: 45 }} className="z-10 cursor-grab active:cursor-grabbing">
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        <MarketingElements />

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
