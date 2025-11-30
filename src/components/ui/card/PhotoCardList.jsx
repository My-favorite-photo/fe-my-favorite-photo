'use client';

import { useEffect, useState } from 'react';
import { usePhotoCards } from '@/providers/PhotoCardProvider';
import PhotoCard from './PhotoCard';

export default function PhotoCardList() {
  const { desktopFilteredCards, mobileFilteredCards, loading } = usePhotoCards();

  const [windowWidth, setWindowWidth] = useState();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  let cardSize = 'sm';
  let gridCols = 2;

  if (windowWidth >= 1920) {
    cardSize = 'lg';
    gridCols = 3;
  } else if (windowWidth >= 768) {
    cardSize = 'md';
    gridCols = 2;
  }

  if (loading)
    return (
      <p className="flex justify-center items-center h-[80vh] text-white text-3xl font-bold">
        로딩 중...
      </p>
    );

  const displayCards = windowWidth < 768 ? mobileFilteredCards : desktopFilteredCards;

  return (
    <div className="flex justify-center">
      <div
        className={`grid
    ${gridCols === 3 ? 'grid-cols-3 gap-20' : 'grid-cols-2 gap-10'}`}
      >
        {displayCards.map((card) => (
          <PhotoCard key={card.id} card={card} type="remain" size={cardSize} />
        ))}
      </div>
    </div>
  );
}
