'use client';

import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useFilter } from './FilterProvider';
import { mockCards } from '@/data/mockCards';

const PhotoCardContext = createContext();

export function PhotoCardProvider({ children }) {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState('');

  const { desktopFilter, mobileFilter } = useFilter();

  useEffect(() => {
    setTimeout(() => {
      setCards(mockCards);
      setLoading(false);
    }, 500);
  }, []);

  // 판매방법
  const getSaleLabel = (status) => {
    if (status === 'AVAILABLE') return '판매';
    if (status === 'EXCHANGE_OFFER') return '교환 제시';
    return null; // SOLD_OUT 제외
  };

  // Desktop
  const desktopFilteredCards = useMemo(() => {
    let result = [...cards];

    const whiteSpace = (str) => str.replace(' ', '_');

    // 검색 키워드 필터
    if (searchKeyword) {
      result = result.filter((c) => c.title.toLowerCase().includes(searchKeyword.toLowerCase()));
    }

    // DefaultDropDown
    if (desktopFilter.grade)
      result = result.filter((c) => c.grade === whiteSpace(desktopFilter.grade));
    if (desktopFilter.genre) result = result.filter((c) => c.genre === desktopFilter.genre);
    if (desktopFilter.status)
      result = result.filter((c) => {
        const statusLabel =
          c.status === 'AVAILABLE' || c.status === 'EXCHANGE_OFFER' ? '판매 중' : '판매 완료';
        return desktopFilter.status === statusLabel;
      });
    if (desktopFilter.sale)
      result = result.filter((c) => {
        const saleLabel =
          c.status === 'AVAILABLE' ? '판매' : c.status === 'EXCHANGE_OFFER' ? '교환 제시' : null; // SOLD_OUT 제외
        return desktopFilter.sale === saleLabel;
      });

    // BoxDropDown
    if (desktopFilter.price === '낮은 가격순') result.sort((a, b) => a.price - b.price);
    else if (desktopFilter.price === '높은 가격순') result.sort((a, b) => b.price - a.price);
    else if (desktopFilter.price === '최신순')
      result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    return result;
  }, [cards, desktopFilter, searchKeyword]);

  // Mobile
  const mobileFilteredCards = useMemo(() => {
    let result = cards.filter((card) => {
      const matchGrade = mobileFilter.grade.length === 0 || mobileFilter.grade.includes(card.grade);
      const matchGenre = mobileFilter.genre.length === 0 || mobileFilter.genre.includes(card.genre);

      // 판매 여부 status
      const statusLabel =
        card.status === 'AVAILABLE' || card.status === 'EXCHANGE_OFFER' ? '판매 중' : '판매 완료';
      const matchStatus =
        mobileFilter.status.length === 0 || mobileFilter.status.includes(statusLabel);

      return matchGrade && matchGenre && matchStatus;
    });

    // 검색 키워드 필터
    if (searchKeyword) {
      result = result.filter((c) => c.title.toLowerCase().includes(searchKeyword.toLowerCase()));
    }

    // 모바일에서도 가격 정렬 적용
    if (mobileFilter.price === '낮은 가격순') result.sort((a, b) => a.price - b.price);
    else if (mobileFilter.price === '높은 가격순') result.sort((a, b) => b.price - a.price);
    else if (mobileFilter.price === '최신순')
      result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    return result;
  }, [cards, mobileFilter, searchKeyword]);

  return (
    <PhotoCardContext.Provider
      value={{
        cards,
        desktopFilteredCards,
        mobileFilteredCards,
        loading,
        searchKeyword,
        setSearchKeyword,
      }}
    >
      {children}
    </PhotoCardContext.Provider>
  );
}

export const usePhotoCards = () => useContext(PhotoCardContext);
