import React from 'react';
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
  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-0">
      <Carousel
        items={externalChairItems}
        baseWidth={500}
        autoplay={false}
        autoplayDelay={4000}
        pauseOnHover={true}
        loop={true}
        round={false}
      />
    </div>
  );
} 