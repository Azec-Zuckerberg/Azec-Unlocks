import React, { useEffect, useState, useCallback } from 'react';

interface GridSquare {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  direction: { x: number; y: number };
}

const DynamicGridBackground: React.FC = () => {
  const [squares, setSquares] = useState<GridSquare[]>([]);
  const [mouse, setMouse] = useState({ x: 50, y: 50 });

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

  // Initialize grid squares
  useEffect(() => {
    const newSquares: GridSquare[] = [];
    const gridSize = 60; // Number of squares
    const squareSize = 80; // Size of each square

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
          key={square.id}
          className="absolute border border-gray-500/30"
          style={{
            left: `${square.x}%`,
            top: `${square.y}%`,
            width: `${square.size}px`,
            height: `${square.size}px`,
            opacity: square.opacity,
            transform: 'translate(-50%, -50%)',
            transition: 'opacity 0.3s ease-out',
          }}
        />
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

export default DynamicGridBackground; 