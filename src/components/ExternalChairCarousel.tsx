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
  const [prev, setPrev] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('left');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Always auto-slide every 4 seconds using setInterval
  useEffect(() => {
    timeoutRef.current = setInterval(() => {
      setPrev(current => {
        setDirection('left');
        setCurrent(c => (c + 1) % slides.length);
        return current;
      });
    }, 4000);
    return () => {
      if (timeoutRef.current) clearInterval(timeoutRef.current);
    };
  }, [current]);

  const next = () => {
    setPrev(current);
    setDirection('left');
    setCurrent((c) => (c + 1) % slides.length);
  };
  const prevSlide = () => {
    setPrev(current);
    setDirection('right');
    setCurrent((c) => (c - 1 + slides.length) % slides.length);
  };

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
        else prevSlide(); // swipe right
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
      <div className="w-full h-full relative">
        {/* Previous Slide (for animation) */}
        {prev !== current && (
          <div
            className={`absolute w-full h-full top-0 left-0 transition-transform duration-700 z-20 ${direction === 'left' ? '-translate-x-full' : 'translate-x-full'}`}
            key={prev}
            style={{ pointerEvents: 'none' }}
          >
            {slides[prev].type === 'image' ? (
              <img
                src={slides[prev].src}
                alt={slides[prev].alt}
                className="w-full h-full object-cover"
                draggable={false}
              />
            ) : (
              <iframe
                src={slides[prev].src}
                title={slides[prev].alt}
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                className="w-full h-full object-cover rounded-2xl"
              ></iframe>
            )}
          </div>
        )}
        {/* Current Slide */}
        <div
          className={`absolute w-full h-full top-0 left-0 transition-transform duration-700 z-30 ${prev !== current ? (direction === 'left' ? 'translate-x-0' : 'translate-x-0') : ''}`}
          key={current}
        >
          {slides[current].type === 'image' ? (
            <img
              src={slides[current].src}
              alt={slides[current].alt}
              className="w-full h-full object-cover"
              draggable={false}
            />
          ) : (
            <iframe
              src={slides[current].src}
              title={slides[current].alt}
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="w-full h-full object-cover rounded-2xl"
            ></iframe>
          )}
        </div>
      </div>
      {/* Arrows */}
      <button
        onClick={prevSlide}
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