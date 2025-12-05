'use client';

import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useFilter } from './FilterProvider';
import { mockCards } from '@/data/mockCards';

const PhotoCardContext = createContext();

export function PhotoCardProvider({ children }) {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState('');
  const { filter } = useFilter();

  useEffect(() => {
    setTimeout(() => {
      setCards(mockCards);
      setLoading(false);
    }, 500);
  }, []);

  // SOLD OUT 계산
  // remain(잔여)이 0일 때 SOLD OUT
  const isCardSoldOut = (card) => {
    const saleRemain = card.saleOptions.find((o) => o.type === 'SALE').remain ?? 0;
    const exchangeRemain = card.saleOptions.find((o) => o.type === 'EXCHANGE').remain ?? 0;
    return saleRemain === 0 || exchangeRemain === 0;
  };

  // 필터 로직
  const filteredCards = useMemo(() => {
    return cards
      .filter((card) => {
        // 매진여부(status) 계산
        // AVAILABLE, EXCHANGE_OFFER = 판매 중 SOLD_OUT = 판매 완료
        const statusLabel = card.saleOptions.every((o) => o.status === 'SOLD_OUT')
          ? '판매 완료'
          : '판매 중';

        // 판매방법(sale) 계산
        const saleLabels = card.saleOptions
          .map((o) => (o.type === 'SALE' ? '판매' : o.type === 'EXCHANGE' ? '교환 제시' : null))
          .filter(Boolean);

        const matchGrade = filter.grade.length === 0 || filter.grade.includes(card.grade);
        const matchGenre = filter.genre.length === 0 || filter.genre.includes(card.genre);
        const matchStatus = filter.status.length === 0 || filter.status.includes(statusLabel);
        const matchSale =
          filter.sale.length === 0 || saleLabels.some((label) => filter.sale.includes(label));

        // 검색 필터
        const matchSearch =
          !searchKeyword || card.title.toLowerCase().includes(searchKeyword.toLowerCase());

        return matchGrade && matchGenre && matchStatus && matchSale && matchSearch;
      })
      .sort((a, b) => {
        if (!filter.price || filter.price === '낮은 가격순') return a.price - b.price;
        if (filter.price === '높은 가격순') return b.price - a.price;
        if (filter.price === '최신순') return new Date(b.created_at) - new Date(a.created_at);
        return 0;
      });
  }, [cards, filter, searchKeyword]);

  // Selling Page: 한 카드에 두 타입 렌더링
  const sellingCards = useMemo(() => {
    return cards.flatMap((card) => {
      const filteredOptions = card.saleOptions.filter((opt) => {
        const statusLabel = opt.status === 'SOLD_OUT' ? '판매 완료' : '판매 중';
        const saleLabel = opt.type === 'SALE' ? '판매' : '교환 제시';

        const matchStatus = filter.status.length === 0 || filter.status.includes(statusLabel);
        const matchSale = filter.sale.length === 0 || filter.sale.includes(saleLabel);

        const matchGrade = filter.grade.length === 0 || filter.grade.includes(card.grade);
        const matchGenre = filter.genre.length === 0 || filter.genre.includes(card.genre);

        // 검색 필터
        const matchSearch =
          !searchKeyword || card.title.toLowerCase().includes(searchKeyword.toLowerCase());

        return matchStatus && matchSale && matchGrade && matchGenre && matchSearch;
      });

      return filteredOptions.map((opt) => ({
        ...card,
        saleType: opt.type,
        remain: opt.remain,
        status: opt.status,
      }));
    });
  }, [cards, filter, searchKeyword]);

  return (
    <PhotoCardContext.Provider
      value={{
        cards,
        filteredCards,
        loading,
        searchKeyword,
        setSearchKeyword,
        isCardSoldOut,
        sellingCards,
      }}
    >
      {children}
    </PhotoCardContext.Provider>
  );
}

export const usePhotoCards = () => useContext(PhotoCardContext);
