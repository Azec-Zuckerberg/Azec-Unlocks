
import { useEffect, useState } from 'react';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  animationDelay: number;
}

const SparklingBackground = () => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    const generateSparkles = () => {
      const newSparkles: Sparkle[] = [];
      for (let i = 0; i < 50; i++) {
        newSparkles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.8 + 0.2,
          animationDelay: Math.random() * 4,
        });
      }
      setSparkles(newSparkles);
    };

    generateSparkles();
  }, []);

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
          }}
        >
          <div className="w-full h-full bg-white rounded-full shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
        </div>
      ))}
    </div>
  );
};

export default SparklingBackground;
