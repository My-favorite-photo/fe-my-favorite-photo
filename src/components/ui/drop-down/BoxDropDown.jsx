'use client';
import Image from 'next/image';
import { useState } from 'react';
import { useFilter } from '@/providers/FilterProvider';
import ic_arrow from '@/assets/icons/ic_arrow.svg';

export default function BoxDropDown({ items, filterKey, size = 'lg' }) {
  const [open, setOpen] = useState(false);

  const { desktopFilter, setDesktopFilter } = useFilter();

  const sizeStyle = {
    sm: { container: 'w-[130px] h-[35px] text-[12px]', btn: 'px-[15px] py-[10px]' },
    md: { container: 'w-[140px] h-[45px] text-[14px]', btn: 'px-[15px] py-[10px]' },
    lg: { container: 'w-[180px] h-[50px] text-[16px]', btn: 'px-[20px] py-[13px]' },
  };

  const sizeClass = sizeStyle[size];

  const handleSelect = (item) => {
    setOpen(false);
    setDesktopFilter((prev) => ({
      ...prev,
      [filterKey]: item,
    }));
  };

  const selected = desktopFilter[filterKey] || null;

  return (
    <div className={`inline-flex flex-col gap-[5px] text-white font-normal ${sizeClass.container}`}>
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex justify-between items-center border-[1px] cursor-pointer ${sizeClass.btn}`}
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
