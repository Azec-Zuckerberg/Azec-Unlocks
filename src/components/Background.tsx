import React from 'react';

/**
 * Full-screen animated background that sits behind all content.
 * – Dark tech vibe with subtle grid + red/white glow blobs
 * – Pure CSS; no extra JS for performance
 * – pointer-events-none so it never blocks clicks
 */
const Background: React.FC = () => {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#0A0A0A]">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] opacity-60" />

      {/* Red glow blobs */}
      <div className="absolute w-[40vw] h-[40vw] bg-[#ff1744]/10 rounded-full blur-[200px] top-[-20vw] left-[-10vw] animate-blob-slow" />
      <div className="absolute w-[30vw] h-[30vw] bg-[#d50000]/10 rounded-full blur-[200px] bottom-[-15vw] right-[-10vw] animate-blob-medium animation-delay-4000" />

      {/* Faint white central glow */}
      <div className="absolute w-[50vw] h-[50vw] bg-white/5 rounded-full blur-[250px] top-[30%] left-1/2 -translate-x-1/2 animate-blob-slower" />
    </div>
  );
};

export default Background; 