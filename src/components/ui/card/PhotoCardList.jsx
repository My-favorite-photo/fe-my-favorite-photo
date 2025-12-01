'use client';

import { usePhotoCards } from '@/providers/PhotoCardProvider';
import PhotoCard from './PhotoCard';

export default function PhotoCardList() {
  const { desktopFilteredCards, mobileFilteredCards, loading } = usePhotoCards();

  if (loading)
    return (
      <p className="flex justify-center items-center h-[60vh] text-white text-3xl font-bold">
        로딩 중...
      </p>
    );

  const displayCards = mobileFilteredCards.length ? mobileFilteredCards : desktopFilteredCards;

  return (
    <div className="flex justify-center">
      <div className="grid sm:grid-cols-2 sm:gap-[5px] md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-20">
        {displayCards.map((card) => (
          <PhotoCard key={card.id} card={card} type="remain" />
        ))}
      </div>
    </div>
  );
}
