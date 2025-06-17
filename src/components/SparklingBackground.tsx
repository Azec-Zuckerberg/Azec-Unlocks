
import { useEffect, useState } from 'react';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  animationDelay: number;
  baseX: number;
  baseY: number;
}

const SparklingBackground = () => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const generateSparkles = () => {
      const newSparkles: Sparkle[] = [];
      for (let i = 0; i < 25; i++) { // Reduced from 50 to 25
        const baseX = Math.random() * 100;
        const baseY = Math.random() * 100;
        newSparkles.push({
          id: i,
          x: baseX,
          y: baseY,
          baseX,
          baseY,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.8 + 0.2,
          animationDelay: Math.random() * 4,
        });
      }
      setSparkles(newSparkles);
    };

    generateSparkles();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    setSparkles(prevSparkles =>
      prevSparkles.map(sparkle => {
        const distanceX = mousePosition.x - sparkle.baseX;
        const distanceY = mousePosition.y - sparkle.baseY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        
        // Move sparkles slightly towards mouse if it's close
        const maxDistance = 20;
        const influence = Math.max(0, 1 - distance / maxDistance);
        const moveX = distanceX * influence * 0.1;
        const moveY = distanceY * influence * 0.1;
        
        return {
          ...sparkle,
          x: sparkle.baseX + moveX,
          y: sparkle.baseY + moveY,
        };
      })
    );
  }, [mousePosition]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {sparkles.map((sparkle) => (
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
            animationDuration: '3s',
            transition: 'left 0.3s ease-out, top 0.3s ease-out',
          }}
        >
          <div className="w-full h-full bg-white rounded-full shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
        </div>
      ))}
    </div>
  );
};

export default SparklingBackground;
