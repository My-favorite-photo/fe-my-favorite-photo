'use client';

import { useState, useEffect } from 'react';
import PhotoCard from './PhotoCard';
import { Pagination } from '../pagination/Pagination';
import Link from 'next/link';
import { useFetchPhotoCards } from '@/libs/hooks/useFetchPhotoCards';
import { useFilter } from '@/providers/FilterProvider';
import { useFetchSaleCards } from '@/libs/hooks/useFetchSaleCards';

export default function PhotoCardList({
  type,
  showSaleLabel = false,
  isSellingPage = false,
  isGalleryPage = false,
}) {
  const { filter, searchKeyword } = useFilter();
  const { cards, loading, sellingPhotoCards } = useFetchPhotoCards({ searchKeyword, filter });
  const { myLocalSellingCards, saleCardsLoading, sellingCards, isCardSoldOut } = useFetchSaleCards({
    searchKeyword,
    filter,
  });

  // 카드 데이터 = isSellingPage 또는 isGalleryPage ? cards : PhotoCards
  const cardsRenderingType = isSellingPage || isGalleryPage ? myLocalSellingCards : cards;

  // 카드 로딩 상태 = isSellingPage ? cards : PhotoCards
  const isLoading = isSellingPage || isGalleryPage ? saleCardsLoading : loading;

  const [windowWidth, setWindowWidth] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  // 화면 크기 변화 감지
  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  let itemsPerPage = 16;
  if (windowWidth >= 1920) itemsPerPage = 15;

  // cardsRenderingType = cards 또는 PhotoCards
  const totalPages = Math.ceil(cardsRenderingType.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const pagedCards = (cardsRenderingType || []).slice(start, start + itemsPerPage);

  if (isLoading)
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
            // const cardDataStyle = isSellingPage ? card.photoCard : card;

            let soldOutIcon;

            if (windowWidth < 768) {
              soldOutIcon = { width: 112, height: 112 };
            } else if (windowWidth < 1920) {
              soldOutIcon = { width: 200, height: 200 };
            } else {
              soldOutIcon = { width: 230, height: 230 };
            }

            const isLinkDisabled = isGalleryPage || isSellingPage;

            const cardContent = (
              <PhotoCard
                card={card}
                type={type}
                soldOutIcon={soldOutIcon}
                showSaleLabel={showSaleLabel}
                isSellingPage={isSellingPage}
                isGalleryPage={isGalleryPage}
              />
            );

            return isLinkDisabled ? (
              <div key={isSellingPage ? `${card.id}-${card.saleType}` : card.id}>{cardContent}</div>
            ) : (
              <Link
                href={`/market-place/${card.id}`}
                key={isSellingPage ? `${card.id}-${card.saleType}` : card.id}
              >
                {cardContent}
              </Link>
            );
          })}
        </div>
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
}

// const cardContent = isSellingPage ? (
//   <PhotoCard card={card} type={type} soldOutIcon={soldOutIcon} showSaleLabel={showSaleLabel} />
// ) : (
//   <PhotoCard card={card} type={type} soldOutIcon={soldOutIcon} showSaleLabel={showSaleLabel} />
// );
