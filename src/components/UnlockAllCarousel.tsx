import React, { useState, useEffect, useRef } from 'react';

const images = [
  '/lovable-uploads/Product-bundle.png',
  '/Carroussel/Unlock all/skins.PNG',
  '/Carroussel/Unlock all/skins2.PNG',
  '/Carroussel/Unlock all/Weapons.PNG',
  '/Carroussel/Unlock all/Inspect.PNG',
  '/Carroussel/Unlock all/Badges.PNG',
  '/Carroussel/Unlock all/emblems.PNG',
];

export default function UnlockAllCarousel() {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-slide every 2 seconds
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setCurrent((c) => (c + 1) % images.length);
    }, 2000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current]);

  const next = () => setCurrent((c) => (c + 1) % images.length);
  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);

  return (
    <div className="relative w-full max-w-xl mx-auto aspect-video rounded-xl sm:rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-black/80 via-[#1a1a1a]/80 to-black/60 border border-white/10 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 z-0" />
      <img
        src={images[current]}
        alt={`Unlock All carousel ${current + 1}`}
        className="w-full h-full object-cover transition-all duration-700 ease-in-out z-10"
        style={{
          objectFit: 'cover',
          maxWidth: '100%',
          maxHeight: '100%',
          boxShadow: '0 4px 32px 0 rgba(31, 38, 135, 0.15)',
        }}
        draggable={false}
      />
      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-1.5 sm:p-2 z-40"
        aria-label="Previous"
        style={{backdropFilter:'blur(4px)'}}
      >
        &#8592;
      </button>
      <button
        onClick={next}
        className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-1.5 sm:p-2 z-40"
        aria-label="Next"
        style={{backdropFilter:'blur(4px)'}}
      >
        &#8594;
      </button>
      {/* Modern Indicators */}
      <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1 sm:gap-2 z-40">
        {images.map((_, i) => (
          <div
            key={i}
            className={`transition-all duration-300 h-1 sm:h-1.5 rounded-full ${i === current ? 'w-6 sm:w-8 bg-white/90 shadow-[0_0_8px_2px_rgba(255,255,255,0.4)]' : 'w-2 sm:w-3 bg-white/30'}`}
            style={{margin: '0 1px sm:2px'}}
          />
        ))}
      </div>
    </div>
  );
} 