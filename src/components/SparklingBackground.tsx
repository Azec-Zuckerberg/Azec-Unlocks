
import { useEffect, useState, useCallback, useMemo } from 'react';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  animationDelay: number;
  baseX: number;
  baseY: number;
  glowIntensity: number;
}

const SparklingBackground = () => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  const generateSparkles = useMemo(() => {
    const newSparkles: Sparkle[] = [];
    for (let i = 0; i < 20; i++) { // Further reduced for better performance
      const baseX = Math.random() * 100;
      const baseY = Math.random() * 100;
      newSparkles.push({
        id: i,
        x: baseX,
        y: baseY,
        baseX,
        baseY,
        size: Math.random() * 4 + 2, // Slightly bigger sparkles
        opacity: Math.random() * 0.9 + 0.3, // Higher opacity
        animationDelay: Math.random() * 4,
        glowIntensity: Math.random() * 0.8 + 0.4,
      });
    }
    return newSparkles;
  }, []);

  useEffect(() => {
    setSparkles(generateSparkles);
  }, [generateSparkles]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    setMousePosition({ x, y });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  const updatedSparkles = useMemo(() => {
    return sparkles.map(sparkle => {
      const distanceX = mousePosition.x - sparkle.baseX;
      const distanceY = mousePosition.y - sparkle.baseY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      
      const maxDistance = 25;
      const influence = Math.max(0, 1 - distance / maxDistance);
      const moveX = distanceX * influence * 0.15;
      const moveY = distanceY * influence * 0.15;
      
      return {
        ...sparkle,
        x: sparkle.baseX + moveX,
        y: sparkle.baseY + moveY,
      };
    });
  }, [sparkles, mousePosition]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {updatedSparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute animate-pulse"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            opacity: sparkle.opacity,
            animationDelay: `${sparkle.animationDelay}s`,
            animationDuration: '2s',
            transform: 'translate(-50%, -50%)',
            willChange: 'transform, opacity',
          }}
        >
          <div 
            className="w-full h-full bg-white rounded-full"
            style={{
              boxShadow: `0 0 ${8 + sparkle.glowIntensity * 12}px rgba(255, 255, 255, ${0.6 + sparkle.glowIntensity * 0.4}), 
                         0 0 ${16 + sparkle.glowIntensity * 20}px rgba(255, 255, 255, ${0.3 + sparkle.glowIntensity * 0.3})`,
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default SparklingBackground;
