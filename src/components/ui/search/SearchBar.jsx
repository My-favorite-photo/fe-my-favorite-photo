'use client';

import Image from 'next/image';
import { useState } from 'react';
import { usePhotoCards } from '@/providers/PhotoCardProvider';
import ic_search from '@/assets/icons/Ic_search.svg';

export default function SearchBar() {
  const { searchKeyword, setSearchKeyword } = usePhotoCards();
  const [keyword, setKeyword] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setKeyword(value);
    setSearchKeyword(value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  return (
    <div className="relative w-full">
      <input
        value={keyword}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="검색"
        className="lg:w-[320px] lg:h-[24px] md:w-[180px] md:h-[23px] sm:w-full sm:h-[23px] px-[15px] py-[22px] border border-gray-200 rounded-[2px] text-gray-200 text-4 font-light"
      />
      <Image
        src={ic_search}
        alt="검색"
        width={24}
        height={24}
        className="absolute top-[11px] right-[20px]"
      />
    </div>
  );
}
