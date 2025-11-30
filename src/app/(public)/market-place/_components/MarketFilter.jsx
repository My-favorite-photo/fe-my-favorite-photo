'use client';

import { useEffect, useState } from 'react';
import BoxDropDown from '@/components/ui/drop-down/BoxDropDown';
import DefaultDropDown from '@/components/ui/drop-down/DefaultDropDown';
import MobileFilter from '@/components/ui/drop-down/MobileFilter';
import SearchBar from '@/components/ui/search/SearchBar';

export default function MarketFilter() {
  const gradeData = ['COMMON', 'RARE', 'SUPER RARE', 'LEGENDARY'];
  const genreData = ['여행', '풍경', '인물', '사물'];
  const saleData = ['판매 중', '판매 완료'];
  const priceData = ['낮은 가격순', '높은 가격순', '최신순'];

  const [screenType, setScreenType] = useState('desktop');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) setScreenType('desktop');
      else if (width >= 768) setScreenType('tablet');
      else setScreenType('mobile');
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (screenType === 'mobile') {
    return (
      <div>
        <div className="flex justify-between mb-5">
          <MobileFilter />
          <BoxDropDown items={priceData} filterKey="price" size="sm" />
        </div>
      </div>
    );
  }

  const dropdownSize = screenType === 'tablet' ? 'sm' : undefined;

  return (
    <div className="flex justify-between mb-[60px]">
      <div className="flex items-center">
        <div className="mr-[60px]">
          <SearchBar />
        </div>
        <div className="flex gap-[45px]">
          <DefaultDropDown
            items={gradeData}
            placeholder="등급"
            filterKey="grade"
            size={dropdownSize}
          />
          <DefaultDropDown
            items={genreData}
            placeholder="장르"
            filterKey="genre"
            size={dropdownSize}
          />
          <DefaultDropDown
            items={saleData}
            placeholder="매진여부"
            filterKey="status"
            size={dropdownSize}
          />
        </div>
      </div>
      <BoxDropDown items={priceData} filterKey="price" size={dropdownSize} />
    </div>
  );
}
