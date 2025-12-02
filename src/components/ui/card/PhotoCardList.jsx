'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePhotoCards } from '@/providers/PhotoCardProvider';
import PhotoCard from './PhotoCard';
import { Pagination } from '../pagination/Pagination';

export default function PhotoCardList() {
  const { cards, desktopFilteredCards, mobileFilteredCards, loading } = usePhotoCards();

  const [windowWidth, setWindowWidth] = useState(0);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;

  // 모바일에선 mobileFilteredCards, 데스크탑에선 desktopFilteredCards
  const displayCards = isMobile ? mobileFilteredCards : desktopFilteredCards;

  // 화면 크기에 따른 한 페이지당 아이템 개수
  const itemsPerPage = useMemo(() => {
    if (windowWidth >= 1920) return 15;
    return 16;
  }, [windowWidth]);

  // 총 페이지 수
  const totalPages = Math.ceil(displayCards.length / itemsPerPage);

  // 현재 페이지에 맞는 카드만 slice
  const pagedCards = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return displayCards.slice(start, end);
  }, [displayCards, currentPage, itemsPerPage]);

  if (loading)
    return (
      <p className="flex justify-center items-center h-[60vh] text-white text-3xl font-bold">
        로딩 중...
      </p>
    );

  return (
    <div>
      <div className="flex justify-center">
        <div className="grid sm:grid-cols-2 sm:gap-[5px] md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-20">
          {pagedCards.map((card) => {
            let cardImage;
            let soldoutIcon;

            if (windowWidth < 768)
              ((cardImage = { width: 150, height: 112 }),
                (soldoutIcon = { width: 112, height: 112 }));
            else if (windowWidth < 1920)
              ((cardImage = { width: 302, height: 227 }),
                (soldoutIcon = { width: 200, height: 200 }));
            else
              ((cardImage = { width: 360, height: 270 }),
                (soldoutIcon = { width: 230, height: 230 }));

            return (
              <PhotoCard
                key={card.id}
                card={card}
                type="remain"
                cardImage={cardImage}
                soldoutIcon={soldoutIcon}
              />
            );
          })}
        </div>
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
}
