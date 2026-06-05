import React from 'react';
import Spline from '@splinetool/react-spline';

export default function Hero3DColorfulRoom() {
  return (
    <div className="w-full h-full min-h-[400px] lg:min-h-[600px] relative rounded-3xl overflow-hidden group">
      {/* Background glow in case it loads slow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#E63946]/20 blur-[100px] rounded-full pointer-events-none -z-10" />
      
      {/* 
        This uses a famous high-quality public Spline scene of an isometric colorful room.
        It provides a highly realistic, colorful, interactive apartment model.
      */}
      <div className="absolute inset-0 w-full h-full scale-[1.15] lg:scale-125 transform origin-center">
        <Spline scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode" />
      </div>

      {/* Subtle overlay shadow to blend the 3D canvas with the dark theme */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] rounded-3xl z-10 mix-blend-multiply" />
    </div>
  );
}
