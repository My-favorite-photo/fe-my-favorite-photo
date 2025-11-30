'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useFilter } from '@/providers/FilterProvider';
import ic_arrow from '@/assets/icons/Ic_arrow.svg';

export default function DefaultDropDown({ items, placeholder, filterKey, size }) {
  const [open, setOpen] = useState(false);

  const { desktopFilter, setDesktopFilter } = useFilter();

  const sizeStyle = size === 'sm' ? 'text-[14px]' : 'text-[16px]';

  const handleSelect = (item) => {
    setOpen(false);
    setDesktopFilter((prev) => ({
      ...prev,
      [filterKey]: item,
    }));
  };

  const selected = desktopFilter[filterKey] || null;

  return (
    <div className="relative inline-flex flex-col items-start gap-[18px]  text-white">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-start gap-[10px] text-gray-200 cursor-pointer ${sizeStyle}`}
      >
        <span>{selected || placeholder}</span>
        <Image
          src={ic_arrow}
          alt="드롭다운"
          width={24}
          height={24}
          className={`${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <ul
          className={`absolute top-full mt-[18px] left-0 z-99 flex flex-col items-start gap-[15px] px-[20px] py-[15px] border-[1px] border-gray-200 bg-black rounded-[2px] font-normal cursor-pointer whitespace-nowrap ${sizeStyle}`}
        >
          {items.map((item) => (
            <li key={item} onClick={() => handleSelect(item)}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
