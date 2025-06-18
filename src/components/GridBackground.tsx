
import { useMemo } from 'react';

const GridBackground = () => {
  const gridLines = useMemo(() => {
    const lines = [];
    const gridSize = 40;
    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;
    const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 1080;
    
    // Vertical lines
    for (let x = 0; x <= viewportWidth; x += gridSize) {
      const distanceFromCenter = Math.abs(x - viewportWidth / 2);
      const normalizedDistance = distanceFromCenter / (viewportWidth / 2);
      const opacity = 0.4 * (1 - normalizedDistance * 0.6);
      
      lines.push(
        <line
          key={`v-${x}`}
          x1={x}
          y1={0}
          x2={x}
          y2={viewportHeight}
          stroke="#6b7280"
          strokeWidth="0.5"
          opacity={Math.max(0.08, opacity)}
        />
      );
    }
    
    // Horizontal lines
    for (let y = 0; y <= viewportHeight; y += gridSize) {
      const distanceFromCenter = Math.abs(y - viewportHeight / 2);
      const normalizedDistance = distanceFromCenter / (viewportHeight / 2);
      const opacity = 0.4 * (1 - normalizedDistance * 0.6);
      
      lines.push(
        <line
          key={`h-${y}`}
          x1={0}
          y1={y}
          x2={viewportWidth}
          y2={y}
          stroke="#6b7280"
          strokeWidth="0.5"
          opacity={Math.max(0.08, opacity)}
        />
      );
    }
    
    return lines;
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <svg
        className="w-full h-full"
        style={{
          filter: 'blur(0.2px)',
        }}
      >
        {gridLines}
      </svg>
    </div>
  );
};

export default GridBackground;
