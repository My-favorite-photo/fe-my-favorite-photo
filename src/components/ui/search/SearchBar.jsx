'use client';

import Image from 'next/image';
import { useState } from 'react';
import ic_search from '@/assets/icons/ic_search.svg';

export default function SearchBar({ onSearch, onReset }) {
  const [keyword, setKeyword] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setKeyword(value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  return (
    <div className="relative">
      <input
        value={keyword}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="검색"
        className="w-[320px] h-[50px] px-[13px] py-[20px] border border-gray-200 rounded-[2px] text-gray-200 text-4 font-light"
      />
      <Image
        src={ic_search}
        alt="검색"
        width={24}
        height={24}
        className="absolute top-[13px] right-[20px]"
      />
    </div>
  );
}
