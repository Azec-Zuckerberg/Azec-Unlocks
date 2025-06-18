import React, { useRef, useState } from "react";

interface GlowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Put anything you want to display inside the glowing card */
  children: React.ReactNode;
}

const GlowCard: React.FC<GlowCardProps> = ({ children, ...rest }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);

  /* --------------------------------------------------------- */
  /*  Cursor-following glow                                    */
  /* --------------------------------------------------------- */
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !glowRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    /* Paint a radial gradient centred on the cursor */
    glowRef.current.style.background = `
      radial-gradient(
        140px circle at ${x}px ${y}px,
        rgba(0,145,255,0.65),   /* bright core   */
        rgba(0,145,255,0.25) 40%,
        transparent 70%
      )
    `;
  };

  const handleMouseEnter = () => {
    setHover(true);
    if (glowRef.current) glowRef.current.style.opacity = "1";
  };

  const handleMouseLeave = () => {
    setHover(false);
    if (glowRef.current) glowRef.current.style.opacity = "0";
  };

  /* --------------------------------------------------------- */
  /*  Render                                                   */
  /* --------------------------------------------------------- */
  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`
        relative overflow-hidden select-none
        rounded-2xl border border-white/12
        bg-[#0c0c0d] transition-transform duration-300
        ${hover ? "scale-[1.015]" : ""}
      `}
      {...rest}
    >
      {/* dynamic glow lives under the border */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-200"
        style={{ mixBlendMode: "screen" }}
      />

      {/* your actual content */}
      <div className="relative z-10 p-6">{children}</div>
    </div>
  );
};

export default GlowCard; 