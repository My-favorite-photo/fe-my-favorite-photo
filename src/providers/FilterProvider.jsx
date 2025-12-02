'use client';

import { createContext, useContext, useState } from 'react';

const FilterContext = createContext();

export function FilterProvider({ children }) {
  const [category, setCategory] = useState('grade');

  // default 단일 선택
  const [desktopFilter, setDesktopFilter] = useState({
    grade: '',
    genre: '',
    status: '',
    price: '',
    sale: '',
  });

  // Mobile 복수 선택
  const [mobileFilter, setMobileFilter] = useState({
    grade: [],
    genre: [],
    status: [],
  });

  // 필터 옵션
  const filters = {
    grade: [
      { label: 'COMMON', value: 'COMMON' },
      { label: 'RARE', value: 'RARE' },
      { label: 'SUPER RARE', value: 'SUPER_RARE' },
      { label: 'LEGENDARY', value: 'LEGENDARY' },
    ],
    genre: [
      { label: '여행', value: '여행' },
      { label: '풍경', value: '풍경' },
      { label: '인물', value: '인물' },
      { label: '사물', value: '사물' },
    ],
    status: [
      { label: '판매 중', value: '판매 중' },
      { label: '판매 완료', value: '판매 완료' },
    ],
    price: ['낮은 가격순', '높은 가격순', '최신순'],
    sale: ['판매', '교환 제시'],
  };

  const filterLabels = {
    grade: filters.grade.map((f) => f.label),
    genre: filters.genre.map((f) => f.label),
    status: filters.status.map((f) => f.label),
    price: filters.price,
    sale: filters.sale,
  };

  return (
    <FilterContext.Provider
      value={{
        category,
        setCategory,
        filters,
        filterLabels,
        desktopFilter,
        setDesktopFilter,
        mobileFilter,
        setMobileFilter,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  return useContext(FilterContext);
}
