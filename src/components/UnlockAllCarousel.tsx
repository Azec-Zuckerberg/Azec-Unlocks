import React from 'react';
import Carousel from './Carousel';

const unlockAllItems = [
  {
    id: 1,
    title: "Product Bundle",
    description: "Complete unlock package",
    image: "/lovable-uploads/Product-bundle.png",
  },
  {
    id: 2,
    title: "Weapon Skins",
    description: "Premium weapon skins collection",
    image: "/Carroussel/Unlock all/skins.PNG",
  },
  {
    id: 3,
    title: "Skins Collection",
    description: "Extended skins library",
    image: "/Carroussel/Unlock all/skins2.PNG",
  },
  {
    id: 4,
    title: "Weapons Arsenal",
    description: "All weapons unlocked",
    image: "/Carroussel/Unlock all/Weapons.PNG",
  },
  {
    id: 5,
    title: "Inspect Features",
    description: "Advanced inspection tools",
    image: "/Carroussel/Unlock all/Inspect.PNG",
  },
  {
    id: 6,
    title: "Badges Collection",
    description: "Exclusive badges and rewards",
    image: "/Carroussel/Unlock all/Badges.PNG",
  },
  {
    id: 7,
    title: "Emblems Gallery",
    description: "Premium emblems collection",
    image: "/Carroussel/Unlock all/emblems.PNG",
  },
];

export default function UnlockAllCarousel() {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <Carousel
        items={unlockAllItems}
        baseWidth={500}
        autoplay={true}
        autoplayDelay={5000}
        pauseOnHover={true}
        loop={true}
        round={false}
      />
    </div>
  );
} 