import React, { useState, useEffect, useRef } from 'react';

const slides = [
  {
    type: 'image',
    src: '/lovable-uploads/Product-external.png',
    alt: 'External Chair Product',
  },
  {
    type: 'video',
    src: 'https://player.vimeo.com/video/1102436930?autoplay=1&muted=1&background=1',
    alt: 'External Chair Preview Video',
  },
];

export default function ExternalChairCarousel() {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-slide every 5 seconds, but stop when reaching video
  useEffect(() => {
    // Only auto-advance if we're not on the video slide
    if (current !== 1) { // 1 is the video slide index
      timeoutRef.current = setTimeout(() => {
        setCurrent((c) => (c + 1) % slides.length);
      }, 5000);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current]);

  const next = () => setCurrent((c) => (c + 1) % slides.length);
  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full max-w-xl mx-auto aspect-video rounded-xl overflow-hidden shadow-xl bg-black border border-white/10 flex items-center justify-center">
      {slides[current].type === 'image' ? (
        <img
          src={slides[current].src}
          alt={slides[current].alt}
          className="w-full h-full object-cover transition-all duration-700 ease-in-out"
          draggable={false}
        />
      ) : (
        <iframe
          src={slides[current].src}
          title={slides[current].alt}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
          style={{ border: 'none' }}
        />
      )}
      
      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-1 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/60 text-white rounded-full p-1.5 z-50 transition-all duration-200 text-sm"
        aria-label="Previous"
        style={{backdropFilter:'blur(4px)'}}
      >
        &#8592;
      </button>
      <button
        onClick={next}
        className="absolute right-1 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/60 text-white rounded-full p-1.5 z-50 transition-all duration-200 text-sm"
        aria-label="Next"
        style={{backdropFilter:'blur(4px)'}}
      >
        &#8594;
      </button>
      
      {/* Indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-50">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              i === current 
                ? 'w-8 bg-white/90 shadow-[0_0_8px_2px_rgba(255,255,255,0.4)]' 
                : 'w-3 bg-white/30'
            }`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </div>
  );
} 