'use client';

import { createContext, useContext, useState } from 'react';

const FilterContext = createContext();

export function FilterProvider({ children }) {
  const [filter, setFilter] = useState({
    grade: [],
    genre: [],
    status: [],
    price: '',
    sale: '',
  });

  const filters = {
    grade: ['COMMON', 'RARE', 'SUPER_RARE', 'LEGENDARY'],
    genre: ['여행', '풍경', '인물', '사물'],
    status: ['판매 중', '판매 완료'],
    price: ['낮은 가격순', '높은 가격순', '최신순'],
    sale: ['판매', '교환 제시'],
  };

  return (
    <FilterContext.Provider value={{ filter, setFilter, filters }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  return useContext(FilterContext);
}
