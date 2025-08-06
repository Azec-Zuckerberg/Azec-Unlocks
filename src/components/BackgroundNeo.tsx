import React from 'react';
import Beams from './Beams';

/**
 * Gaming-tech background v2 with animated light beams
 * – Beautiful animated light beam effects using WebGL shaders
 * – pointer-events-none & -z-10 keep it totally unobtrusive
 */
const BackgroundNeo: React.FC = () => (
  <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
    <Beams
      beamWidth={2}
      beamHeight={100}
      beamNumber={12}
      lightColor="#ffffff"
      speed={2}
      noiseIntensity={1.75}
      scale={0.2}
      rotation={30}
    />
  </div>
);

export default BackgroundNeo; 