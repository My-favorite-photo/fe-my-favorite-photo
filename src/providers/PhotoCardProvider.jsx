'use client';

import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useFilter } from './FilterProvider';
import img_card from '@/assets/images/img_card.svg';

const mockCards = [
  {
    id: 1,
    title: '우리집 앞마당 우리집 앞마당 우리집 앞마당 우리집 앞마당',
    genre: '풍경',
    grade: 'COMMON',
    author: '미쓰손',
    price: 4,
    remain: 2,
    total: 5,
    image: img_card,
    created_at: '2025-11-28T10:00:00',
  },
  {
    id: 2,
    title: '아름다운 풍경',
    genre: '여행',
    grade: 'RARE',
    author: '여행자',
    price: 10,
    remain: 1,
    total: 3,
    image: img_card,
    created_at: '2025-11-29T11:00:00',
  },
  {
    id: 3,
    title: '우리집 앞마당 우리집 앞마당 우리집 앞마당 우리집 앞마당',
    genre: '인물',
    grade: 'SUPER_RARE',
    author: '미쓰손',
    price: 8,
    remain: 2,
    total: 5,
    image: img_card,
    created_at: '2025-11-29T10:00:00',
  },
  {
    id: 4,
    title: '아름다운 풍경',
    genre: '여행',
    grade: 'LEGENDARY',
    author: '여행자',
    price: 12,
    remain: 1,
    total: 3,
    image: img_card,
    created_at: '2025-11-28T09:00:00',
  },
  {
    id: 5,
    title: '우리집 앞마당 우리집 앞마당 우리집 앞마당 우리집 앞마당',
    genre: '풍경',
    grade: 'COMMON',
    author: '미쓰손',
    price: 2,
    remain: 2,
    total: 5,
    image: img_card,
    created_at: '2025-11-27T10:00:00',
  },
];

const PhotoCardContext = createContext();

export function PhotoCardProvider({ children }) {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  const { desktopFilter, mobileFilter } = useFilter();

  useEffect(() => {
    setTimeout(() => {
      setCards(mockCards);
      setLoading(false);
    }, 500);
  }, []);

  // Desktop
  const desktopFilteredCards = useMemo(() => {
    let result = [...cards];

    const whiteSpace = (str) => str.replace(' ', '_');

    // DefaultDropDown
    if (desktopFilter.grade)
      result = result.filter((c) => c.grade === whiteSpace(desktopFilter.grade));
    if (desktopFilter.genre) result = result.filter((c) => c.genre === desktopFilter.genre);
    if (desktopFilter.status)
      result = result.filter((c) =>
        desktopFilter.status === '판매 중' ? c.remain > 0 : c.remain === 0,
      );

    // BoxDropDown
    if (desktopFilter.price === '낮은 가격순') result.sort((a, b) => a.price - b.price);
    else if (desktopFilter.price === '높은 가격순') result.sort((a, b) => b.price - a.price);
    else if (desktopFilter.price === '최신순')
      result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    return result;
  }, [cards, desktopFilter]);

  // Mobile
  const mobileFilteredCards = useMemo(() => {
    let result = cards.filter((card) => {
      const matchGrade = mobileFilter.grade.length === 0 || mobileFilter.grade.includes(card.grade);
      const matchGenre = mobileFilter.genre.length === 0 || mobileFilter.genre.includes(card.genre);
      const matchStatus =
        mobileFilter.status.length === 0 ||
        mobileFilter.status.includes(card.remain > 0 ? '판매 중' : '판매 완료');

      return matchGrade && matchGenre && matchStatus;
    });

    // 모바일에서도 가격 정렬 적용
    if (mobileFilter.price === '낮은 가격순') result.sort((a, b) => a.price - b.price);
    else if (mobileFilter.price === '높은 가격순') result.sort((a, b) => b.price - a.price);
    else if (mobileFilter.price === '최신순')
      result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    return result;
  }, [cards, mobileFilter]);

  return (
    <PhotoCardContext.Provider
      value={{
        cards,
        desktopFilteredCards,
        mobileFilteredCards,
        loading,
      }}
    >
      {children}
    </PhotoCardContext.Provider>
  );
}

export const usePhotoCards = () => useContext(PhotoCardContext);
