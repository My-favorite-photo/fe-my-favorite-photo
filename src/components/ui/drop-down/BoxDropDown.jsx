'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useFilter } from '@/providers/FilterProvider';
import ic_arrow from '@/assets/icons/Ic_arrow.svg';

export default function BoxDropDown({ items, filterKey, isMobile }) {
  const [open, setOpen] = useState(false);

  const { desktopFilter, setDesktopFilter, mobileFilter, setMobileFilter } = useFilter();

  const handleSelect = (item) => {
    setOpen(false);
    if (isMobile) {
      setMobileFilter((prev) => ({
        ...prev,
        [filterKey]: item,
      }));
    } else {
      setDesktopFilter((prev) => ({
        ...prev,
        [filterKey]: item,
      }));
    }
  };

  const selected = desktopFilter[filterKey] || null;

  return (
    <div className="inline-flex flex-col gap-[5px] text-white font-normal sm:w-[130px] h-[35px] text-[12px] md:w-[140px] md:h-[45px] md:text-[14px] lg:w-[180px] lg:h-[50px] lg:text-[16px]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center border-[1px] cursor-pointer sm:px-[15px] py-[10px] md:px-[15px] md:py-[10px] lg:px-[20px] lg:py-[13px]"
      >
        <span>{selected || '낮은 가격 순'}</span>
        <Image
          src={ic_arrow}
          alt="드롭다운"
          width={24}
          height={24}
          className={`${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <ul className="z-99 w-full flex flex-col justify-center items-start gap-[15px] px-[20px] py-[15px] border-[1px] border-gray-200 bg-black rounded-[2px] text-4 font-normal cursor-pointer">
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
