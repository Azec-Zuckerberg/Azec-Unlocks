/* ------------------------------------------------------------------
   DynamicGridBackground.tsx – moving grey grid squares with varying opacity
   Works in ANY React/TSX setup (Create-React-App, Vite, Next, etc.)
------------------------------------------------------------------- */
import React, { useEffect, useState, useCallback, useMemo } from 'react';

interface GridSquare {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
<<<<<<< HEAD
  speed: number;
  direction: { x: number; y: number };
}

const SparklingBackground: React.FC = () => {
  const [squares, setSquares] = useState<GridSquare[]>([]);
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
=======
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
>>>>>>> dff5db48600e7c726ef8925d2405710ec8f464f0

  // Handle mouse movement for interactive effects
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMouse({
      x: (e.clientX / window.innerWidth) * 100,
      y: (e.clientY / window.innerHeight) * 100,
    });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

<<<<<<< HEAD
  // Initialize grid squares
  useEffect(() => {
    const newSquares: GridSquare[] = [];
    const gridSize = 60; // Number of squares
    const squareSize = 80; // Size of each square
=======
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
>>>>>>> dff5db48600e7c726ef8925d2405710ec8f464f0

    for (let i = 0; i < gridSize; i++) {
      newSquares.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: squareSize + Math.random() * 40, // Vary size slightly
        opacity: Math.random() * 0.3 + 0.1, // Low opacity range
        speed: Math.random() * 0.5 + 0.1, // Varying speeds
        direction: {
          x: (Math.random() - 0.5) * 2, // Random direction
          y: (Math.random() - 0.5) * 2,
        },
      });
    }
    setSquares(newSquares);
  }, []);

  // Animate squares
  useEffect(() => {
    const interval = setInterval(() => {
      setSquares(prevSquares => 
        prevSquares.map(square => {
          let newX = square.x + square.direction.x * square.speed;
          let newY = square.y + square.direction.y * square.speed;

          // Bounce off edges
          if (newX <= 0 || newX >= 100) {
            square.direction.x *= -1;
            newX = Math.max(0, Math.min(100, newX));
          }
          if (newY <= 0 || newY >= 100) {
            square.direction.y *= -1;
            newY = Math.max(0, Math.min(100, newY));
          }

          // Vary opacity based on position and mouse
          const distanceFromMouse = Math.hypot(
            Math.abs(newX - mouse.x),
            Math.abs(newY - mouse.y)
          );
          const mouseInfluence = Math.max(0, 1 - distanceFromMouse / 30) * 0.2;
          const baseOpacity = square.opacity;
          const finalOpacity = Math.min(0.4, baseOpacity + mouseInfluence);

          return {
            ...square,
            x: newX,
            y: newY,
            opacity: finalOpacity,
          };
        })
      );
    }, 50); // Update every 50ms for smooth animation

    return () => clearInterval(interval);
  }, [mouse]);

  /* ---------- render ---------- */
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      {/* Static grid background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(128,128,128,0.1) 1px, transparent 1px),' +
            'linear-gradient(to bottom, rgba(128,128,128,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Moving squares */}
      {squares.map((square) => (
        <div
<<<<<<< HEAD
          key={square.id}
          className="absolute border border-gray-500/30"
          style={{
            left: `${square.x}%`,
            top: `${square.y}%`,
            width: `${square.size}px`,
            height: `${square.size}px`,
            opacity: square.opacity,
=======
          key={sparkle.id}
          className="absolute"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            opacity: sparkle.opacity,
>>>>>>> dff5db48600e7c726ef8925d2405710ec8f464f0
            transform: 'translate(-50%, -50%)',
            transition: 'opacity 0.3s ease-out',
          }}
<<<<<<< HEAD
        />
=======
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
>>>>>>> dff5db48600e7c726ef8925d2405710ec8f464f0
      ))}

      {/* Additional subtle grid overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(128,128,128,0.05) 1px, transparent 1px),' +
            'linear-gradient(to bottom, rgba(128,128,128,0.05) 1px, transparent 1px)',
          backgroundSize: '120px 120px',
        }}
      />
    </div>
  );
};

export default SparklingBackground;
