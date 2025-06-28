import React from 'react';

/**
 * Gaming-tech background v2
 * – Dense animated grid + glow blobs
 * – Light-patch overlay gives random opacity variation
 * – pointer-events-none & -z-10 keep it totally unobtrusive
 */
const BackgroundNeo: React.FC = () => (
  <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-black">
    {/* Moving grid layer */}
    <div className="absolute inset-0 bg-grid-mask animate-pan-grid" />

    {/* Light-patch overlay for random opacity shifts */}
    <div className="absolute inset-0 bg-grid-variations
                    animate-pan-variations animate-opacity-shift" />

    {/* Accent glow blobs */}
    <div className="absolute -top-[20%] -left-[15%] w-[45vw] h-[45vw] rounded-full
                    bg-[#810D0A]/10 blur-[200px] animate-blob-soft" />

    <div className="absolute -bottom-[20%] -right-[15%] w-[45vw] h-[45vw] rounded-full
                    bg-[#810D0A]/10 blur-[200px] animate-blob-soft animation-delay-4000" />

    {/* Central white glow */}
    <div className="absolute top-[35%] left-1/2 w-[60vw] h-[60vw] -translate-x-1/2
                    rounded-full bg-white/4 blur-[260px] animate-blob-slower" />
  </div>
);

export default BackgroundNeo; 