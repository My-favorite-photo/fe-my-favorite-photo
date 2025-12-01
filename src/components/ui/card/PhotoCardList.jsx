'use client';

import { useEffect, useState } from 'react';
import { usePhotoCards } from '@/providers/PhotoCardProvider';
import { useFilter } from '@/providers/FilterProvider';
import PhotoCard from './PhotoCard';

export default function PhotoCardList() {
  const { cards, desktopFilteredCards, mobileFilteredCards, loading } = usePhotoCards();
  const { mobileFilter } = useFilter();

  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const hasMobileFilter = Object.values(mobileFilter).some((arr) => arr.length > 0);

  const displayCards = isMobile
    ? hasMobileFilter
      ? mobileFilteredCards
      : cards
    : desktopFilteredCards;

  if (loading)
    return (
      <p className="flex justify-center items-center h-[60vh] text-white text-3xl font-bold">
        로딩 중...
      </p>
    );

  return (
    <div className="flex justify-center">
      <div className="grid sm:grid-cols-2 sm:gap-[5px] md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-20">
        {displayCards.map((card) => {
          let imageSize;
          if (windowWidth < 768) imageSize = { width: 150, height: 112 };
          else if (windowWidth < 1920) imageSize = { width: 302, height: 227 };
          else imageSize = { width: 360, height: 270 };

          return <PhotoCard key={card.id} card={card} type="remain" imageSize={imageSize} />;
        })}
      </div>
    </div>
  );
}
