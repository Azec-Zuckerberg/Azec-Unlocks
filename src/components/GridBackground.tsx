import { useMemo, useEffect, useState } from 'react';

const BALL_COUNT = 12;
const GRID_SIZE = 40;
const BALL_AMPLITUDE = 60;

const GridBackground = () => {
  const [time, setTime] = useState(0);

  // Animated glowing balls (radial gradient + solid core)
  const balls = useMemo(() => {
    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;
    const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 1080;
    // Ensure balls can move fully across the viewport
    return Array.from({ length: BALL_COUNT }).map((_, i) => {
      const size = 1.5 + Math.random() * 2.2; // slightly smaller
      const speed = 0.7 + Math.random() * 0.7;
      const phase = Math.random() * Math.PI * 2;
      // xBase/yBase are now in [0, 1], but we restrict so amplitude doesn't go out of bounds
      const xBase = (BALL_AMPLITUDE + Math.random() * (viewportWidth - 2 * BALL_AMPLITUDE)) / viewportWidth;
      const yBase = (BALL_AMPLITUDE + Math.random() * (viewportHeight - 2 * BALL_AMPLITUDE)) / viewportHeight;
      return { size, speed, phase, xBase, yBase };
    });
  }, []);

  useEffect(() => {
    // 60 FPS for smooth animation
    const interval = setInterval(() => {
      setTime((t) => t + 0.016);
    }, 16);
    return () => clearInterval(interval);
  }, []);

  const gridLines = useMemo(() => {
    const lines = [];
    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;
    const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 1080;
    // Vertical lines
    for (let x = 0; x <= viewportWidth; x += GRID_SIZE) {
      const distanceFromCenter = Math.abs(x - viewportWidth / 2);
      const normalizedDistance = distanceFromCenter / (viewportWidth / 2);
      const phase = x / viewportWidth * Math.PI * 2;
      const animated = 0.7 + 0.3 * Math.sin(time + phase);
      const baseOpacity = 0.4 * (1 - normalizedDistance * 0.6);
      const opacity = Math.max(0.08, baseOpacity * animated);
      lines.push(
        <line
          key={`v-${x}`}
          x1={x}
          y1={0}
          x2={x}
          y2={viewportHeight}
          stroke="#6b7280"
          strokeWidth="0.5"
          opacity={opacity}
          filter="drop-shadow(0 0 2px rgba(107, 114, 128, 0.3))"
        />
      );
    }
    // Horizontal lines
    for (let y = 0; y <= viewportHeight; y += GRID_SIZE) {
      const distanceFromCenter = Math.abs(y - viewportHeight / 2);
      const normalizedDistance = distanceFromCenter / (viewportHeight / 2);
      const phase = y / viewportHeight * Math.PI * 2;
      const animated = 0.7 + 0.3 * Math.sin(time + phase + 1);
      const baseOpacity = 0.4 * (1 - normalizedDistance * 0.6);
      const opacity = Math.max(0.08, baseOpacity * animated);
      lines.push(
        <line
          key={`h-${y}`}
          x1={0}
          y1={y}
          x2={viewportWidth}
          y2={y}
          stroke="#6b7280"
          strokeWidth="0.5"
          opacity={opacity}
          filter="drop-shadow(0 0 2px rgba(107, 114, 128, 0.3))"
        />
      );
    }
    return lines;
  }, [time]);

  const glowingBalls = useMemo(() => {
    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;
    const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 1080;
    return balls.map((ball, i) => {
      const x = ball.xBase * viewportWidth + Math.sin(time * ball.speed + ball.phase) * BALL_AMPLITUDE;
      const y = ball.yBase * viewportHeight + Math.cos(time * ball.speed + ball.phase) * BALL_AMPLITUDE;
      const glowRadius = ball.size * 1.7;
      const coreRadius = ball.size / 2;
      const opacity = 0.5 + 0.5 * Math.sin(time * ball.speed + ball.phase);
      return (
        <g key={i}>
          {/* Glow (radial gradient) */}
          <circle
            cx={x}
            cy={y}
            r={glowRadius}
            fill="url(#ball-glow)"
            opacity={opacity * 0.7}
          />
          {/* Core */}
          <circle
            cx={x}
            cy={y}
            r={coreRadius}
            fill="#fff"
            opacity={opacity}
          />
        </g>
      );
    });
  }, [balls, time]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <svg
        className="w-full h-full"
        style={{
          filter: 'blur(0.2px)',
          transition: 'opacity 0.5s',
        }}
      >
        <defs>
          <radialGradient id="ball-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
        </defs>
        {gridLines}
        {glowingBalls}
      </svg>
    </div>
  );
};

export default GridBackground; 