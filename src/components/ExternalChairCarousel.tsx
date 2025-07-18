import React, { useState, useEffect, useRef } from 'react';

const slides = [
  {
    type: 'image',
    src: '/lovable-uploads/Product-external.png',
    alt: 'External Chair Product',
  },
  {
    type: 'video',
    src: 'https://player.vimeo.com/video/1102436930',
    alt: 'External Chair Preview Video',
  },
];

export default function ExternalChairCarousel() {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Auto-slide every 4 seconds
  useEffect(() => {
    // Only auto-slide if current slide is an image
    if (slides[current].type === 'image') {
      timeoutRef.current = setTimeout(() => {
        setCurrent((c) => (c + 1) % slides.length);
      }, 4000);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current]);

  const next = () => setCurrent((c) => (c + 1) % slides.length);
  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);

  // Touch handlers for swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const onTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const diff = touchStartX.current - touchEndX.current;
      if (Math.abs(diff) > 50) {
        if (diff > 0) next(); // swipe left
        else prev(); // swipe right
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div
      className="relative w-full max-w-xl mx-auto aspect-video rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-black/80 via-[#1a1a1a]/80 to-black/60 border border-white/10 flex items-center justify-center"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="absolute inset-0 bg-black/60 z-0" />
      {slides[current].type === 'image' ? (
        <img
          src={slides[current].src}
          alt={slides[current].alt}
          className="w-full h-full object-cover transition-all duration-700 ease-in-out z-10"
          style={{
            objectFit: 'cover',
            maxWidth: '100%',
            maxHeight: '100%',
            boxShadow: '0 4px 32px 0 rgba(31, 38, 135, 0.15)',
          }}
          draggable={false}
        />
      ) : (
        <iframe
          src={slides[current].src}
          title={slides[current].alt}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="w-full h-full object-cover rounded-2xl z-10"
        ></iframe>
      )}
      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-2 z-40"
        aria-label="Previous"
        style={{backdropFilter:'blur(4px)'}}
      >
        &#8592;
      </button>
      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-2 z-40"
        aria-label="Next"
        style={{backdropFilter:'blur(4px)'}}
      >
        &#8594;
      </button>
      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-40">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`transition-all duration-300 h-1.5 rounded-full ${i === current ? 'w-8 bg-white/90 shadow-[0_0_8px_2px_rgba(255,255,255,0.4)]' : 'w-3 bg-white/30'}`}
            style={{margin: '0 2px'}}
          />
        ))}
      </div>
    </div>
  );
} 