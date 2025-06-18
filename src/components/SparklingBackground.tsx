
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
  twinkleSpeed: number;
  color: string;
  floatDirection: number;
  floatSpeed: number;
}

const SparklingBackground = () => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [time, setTime] = useState(0);

  const sparkleColors = ['#ffffff', '#e3f2fd', '#f3e5f5', '#e8f5e8', '#fff8e1'];

  const generateSparkles = useMemo(() => {
    const newSparkles: Sparkle[] = [];
    for (let i = 0; i < 35; i++) {
      const baseX = Math.random() * 100;
      const baseY = Math.random() * 100;
      newSparkles.push({
        id: i,
        x: baseX,
        y: baseY,
        baseX,
        baseY,
        size: Math.random() * 3 + 1.5,
        opacity: Math.random() * 0.8 + 0.2,
        animationDelay: Math.random() * 4,
        glowIntensity: Math.random() * 1 + 0.5,
        twinkleSpeed: Math.random() * 2 + 1,
        color: sparkleColors[Math.floor(Math.random() * sparkleColors.length)],
        floatDirection: Math.random() * Math.PI * 2,
        floatSpeed: Math.random() * 0.5 + 0.2,
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

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => prev + 0.016);
    }, 16);
    return () => clearInterval(interval);
  }, []);

  const updatedSparkles = useMemo(() => {
    return sparkles.map(sparkle => {
      const distanceX = mousePosition.x - sparkle.baseX;
      const distanceY = mousePosition.y - sparkle.baseY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      
      const maxDistance = 30;
      const influence = Math.max(0, 1 - distance / maxDistance);
      const moveX = distanceX * influence * 0.2;
      const moveY = distanceY * influence * 0.2;
      
      // Add floating animation
      const floatX = Math.sin(time * sparkle.floatSpeed + sparkle.floatDirection) * 2;
      const floatY = Math.cos(time * sparkle.floatSpeed + sparkle.floatDirection) * 1.5;
      
      // Dynamic opacity based on time
      const twinkleOpacity = (Math.sin(time * sparkle.twinkleSpeed + sparkle.animationDelay) + 1) * 0.5;
      const finalOpacity = sparkle.opacity * (0.4 + twinkleOpacity * 0.6);
      
      return {
        ...sparkle,
        x: sparkle.baseX + moveX + floatX,
        y: sparkle.baseY + moveY + floatY,
        opacity: finalOpacity,
      };
    });
  }, [sparkles, mousePosition, time]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {updatedSparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            opacity: sparkle.opacity,
            transform: 'translate(-50%, -50%)',
            willChange: 'transform, opacity',
          }}
        >
          <div 
            className="w-full h-full rounded-full"
            style={{
              backgroundColor: sparkle.color,
              boxShadow: `
                0 0 ${6 + sparkle.glowIntensity * 8}px ${sparkle.color},
                0 0 ${12 + sparkle.glowIntensity * 16}px ${sparkle.color}40,
                0 0 ${20 + sparkle.glowIntensity * 25}px ${sparkle.color}20
              `,
              filter: `blur(${sparkle.size * 0.1}px)`,
            }}
          />
          {/* Secondary glow layer */}
          <div 
            className="absolute inset-0 w-full h-full rounded-full"
            style={{
              backgroundColor: sparkle.color,
              opacity: 0.6,
              filter: `blur(${sparkle.size * 0.3}px)`,
              boxShadow: `0 0 ${sparkle.size * 4}px ${sparkle.color}80`,
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default SparklingBackground;
