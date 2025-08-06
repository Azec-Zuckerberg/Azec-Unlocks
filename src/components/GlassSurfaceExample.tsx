import React from 'react';
import GlassSurface from './GlassSurface';

const GlassSurfaceExample: React.FC = () => {
  return (
    <div className="space-y-8 p-8">
      {/* Basic usage */}
      <div>
        <h3 className="text-white mb-4">Basic Glass Surface</h3>
        <GlassSurface 
          width={300} 
          height={200}
          borderRadius={24}
          className="my-custom-class"
        >
          <h2 className="text-white text-xl font-bold">Glass Surface Content</h2>
        </GlassSurface>
      </div>

      {/* Custom displacement effects */}
      <div>
        <h3 className="text-white mb-4">Advanced Glass Distortion</h3>
        <GlassSurface
          width={400}
          height={150}
          displace={15}
          distortionScale={-150}
          redOffset={5}
          greenOffset={15}
          blueOffset={25}
          brightness={60}
          opacity={0.8}
          mixBlendMode="screen"
        >
          <span className="text-white text-lg">Advanced Glass Distortion</span>
        </GlassSurface>
      </div>

      {/* Gaming-style glass */}
      <div>
        <h3 className="text-white mb-4">Gaming Style Glass</h3>
        <GlassSurface
          width={350}
          height={120}
          borderRadius={16}
          brightness={30}
          opacity={0.95}
          blur={12}
          displace={5}
          distortionScale={-80}
          redOffset={10}
          greenOffset={20}
          blueOffset={30}
          mixBlendMode="difference"
        >
          <div className="text-center">
            <h2 className="text-white text-xl font-bold mb-2">Gaming Header</h2>
            <p className="text-white/80 text-sm">Premium glass morphism effect</p>
          </div>
        </GlassSurface>
      </div>
    </div>
  );
};

export default GlassSurfaceExample; 