'use client';

import { createContext, useContext, useState } from 'react';

const FilterContext = createContext();

export function FilterProvider({ children }) {
  const [category, setCategory] = useState('grade');

  const [selectedFilter, setSelectedFilter] = useState({
    grade: [],
    genre: [],
    status: [],
  });

  const [filters] = useState({
    grade: [
      { label: 'COMMON', value: 'common', count: 52 },
      { label: 'RARE', value: 'rare', count: 16 },
      { label: 'SUPER RARE', value: 'super_rare', count: 5 },
      { label: 'LEGENDARY', value: 'legendary', count: 5 },
    ],
    genre: [
      { label: '여행', value: '여행', count: 65 },
      { label: '풍경', value: '풍경', count: 58 },
      { label: '인물', value: '인물', count: 101 },
      { label: '사물', value: '사물', count: 98 },
    ],
    status: [
      { label: '판매 중', value: 'on_sale', count: 212 },
      { label: '판매 완료', value: 'sold_out', count: 58 },
    ],
  });

  return (
    <FilterContext.Provider
      value={{
        category,
        setCategory,
        filters,
        selectedFilter,
        setSelectedFilter,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  return useContext(FilterContext);
}
