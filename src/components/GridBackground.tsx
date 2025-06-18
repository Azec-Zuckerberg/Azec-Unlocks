
import { useMemo } from 'react';

const GridBackground = () => {
  const gridLines = useMemo(() => {
    const lines = [];
    const gridSize = 40;
    const viewportWidth = 1920; // Fixed width to prevent recalculation
    const viewportHeight = 1080; // Fixed height to prevent recalculation
    
    // Vertical lines
    for (let x = 0; x <= viewportWidth; x += gridSize) {
      const distanceFromCenter = Math.abs(x - viewportWidth / 2);
      const normalizedDistance = distanceFromCenter / (viewportWidth / 2);
      const opacity = 0.6 * (1 - normalizedDistance * 0.7);
      
      lines.push(
        <line
          key={`v-${x}`}
          x1={x}
          y1={0}
          x2={x}
          y2={viewportHeight}
          stroke={`url(#gradient-${x})`}
          strokeWidth="0.8"
          opacity={Math.max(0.15, opacity)}
        />
      );
    }
    
    // Horizontal lines
    for (let y = 0; y <= viewportHeight; y += gridSize) {
      const distanceFromCenter = Math.abs(y - viewportHeight / 2);
      const normalizedDistance = distanceFromCenter / (viewportHeight / 2);
      const opacity = 0.6 * (1 - normalizedDistance * 0.7);
      
      lines.push(
        <line
          key={`h-${y}`}
          x1={0}
          y1={y}
          x2={viewportWidth}
          y2={y}
          stroke={`url(#gradient-h-${y})`}
          strokeWidth="0.8"
          opacity={Math.max(0.15, opacity)}
        />
      );
    }
    
    return lines;
  }, []);

  const gradientDefs = useMemo(() => {
    const defs = [];
    const gridSize = 40;
    const viewportWidth = 1920;
    const viewportHeight = 1080;
    
    // Vertical gradients
    for (let x = 0; x <= viewportWidth; x += gridSize) {
      defs.push(
        <linearGradient key={`grad-v-${x}`} id={`gradient-${x}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ff1744" />
          <stop offset="50%" stopColor="#6b7280" />
          <stop offset="100%" stopColor="#f3f4f6" />
        </linearGradient>
      );
    }
    
    // Horizontal gradients
    for (let y = 0; y <= viewportHeight; y += gridSize) {
      defs.push(
        <linearGradient key={`grad-h-${y}`} id={`gradient-h-${y}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ff1744" />
          <stop offset="50%" stopColor="#6b7280" />
          <stop offset="100%" stopColor="#f3f4f6" />
        </linearGradient>
      );
    }
    
    return defs;
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <svg
        className="w-full h-full"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        style={{
          filter: 'blur(0.1px)',
        }}
      >
        <defs>
          {gradientDefs}
        </defs>
        {gridLines}
      </svg>
    </div>
  );
};

export default GridBackground;
