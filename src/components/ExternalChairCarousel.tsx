import React, { useState, useEffect } from 'react';
import Carousel from './Carousel';

const externalChairItems = [
  {
    id: 1,
    title: "External Chair",
    description: "Premium external chair experience",
    image: "/lovable-uploads/Product-external.png",
  },
  {
    id: 2,
    title: "External Chair Video",
    description: "Watch the external chair in action",
    video: "https://player.vimeo.com/video/1102436930?autoplay=1&muted=1&background=1&loop=1",
  },
];

export default function ExternalChairCarousel() {
  const [baseWidth, setBaseWidth] = useState(500);

  // Responsive baseWidth based on screen size
  useEffect(() => {
    const updateBaseWidth = () => {
      const width = window.innerWidth;
      if (width <= 480) {
        setBaseWidth(280); // Mobile
      } else if (width <= 768) {
        setBaseWidth(350); // Tablet
      } else {
        setBaseWidth(500); // Desktop
      }
    };

    updateBaseWidth();
    window.addEventListener('resize', updateBaseWidth);
    return () => window.removeEventListener('resize', updateBaseWidth);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Carousel
        items={externalChairItems}
        baseWidth={baseWidth}
        autoplay={false}
        autoplayDelay={4000}
        pauseOnHover={true}
        loop={true}
        round={false}
      />
    </div>
  );
} 