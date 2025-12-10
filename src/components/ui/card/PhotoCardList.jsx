'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { useFetchCards } from '@/libs/hooks/useFetchCards';
import { useFilter } from '@/providers/FilterProvider';
import { usePhotoCards } from '@/providers/PhotoCardProvider';

import { Pagination } from '../pagination/Pagination';

export default function PhotoCardList({
  type,
  showSaleLabel,
  isSellingPage = false,
  isGalleryPage = false,
}) {
  const { searchKeyword } = usePhotoCards();
  const { filter } = useFilter();
  const { cards, sellingCards, loading } = useFetchCards({ searchKeyword, filter });

  // isSellingPage가 true일 때만 sellingCards를 렌더링(한 카드에 두 종류)
  const cardsRenderingType = isSellingPage ? sellingCards : cards;

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

  // cardsRenderingType = filteredCards 또는 sellingCards
  const totalPages = Math.ceil(cardsRenderingType.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const pagedCards = (cardsRenderingType || []).slice(start, start + itemsPerPage);

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
