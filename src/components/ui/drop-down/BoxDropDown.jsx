'use client';

import { useState } from 'react';

function ArrowIcon({ isOpen }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={`${isOpen ? 'rotate-180' : ''}`}
    >
      <path d="M12.2 14.2L8 10H16.4L12.2 14.2Z" fill="white" />
    </svg>
  );
}

export default function BoxDropDown({ items, size = 'lg' }) {
  const [open, setOpen] = useState(false); // 드롭다운 옵션 모달
  const [selected, setSelected] = useState(null); // 드롭다운 제목

  const sizeStyle = {
    sm: { container: 'w-[130px] h-[35px] text-[12px]', btn: 'px-[15px] py-[10px]' },
    md: { container: 'w-[140px] h-[45px] text-[14px]', btn: 'px-[15px] py-[10px]' },
    lg: { container: 'w-[180px] h-[50px] text-[16px]', btn: 'px-[20px] py-[13px]' },
  };

  const sizeClass = sizeStyle[size];

  const handleSelect = (item) => {
    setSelected(item);
    setOpen(false);
  };

  return (
    <div className={`inline-flex flex-col gap-[5px] text-white font-normal ${sizeClass.container}`}>
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex justify-between items-center border-[1px] cursor-pointer ${sizeClass.btn}`}
      >
        <span>{selected ? selected.label : '낮은 가격 순'}</span>
        <ArrowIcon isOpen={open} />
      </button>

      {open && (
        <ul className="z-99 w-full flex flex-col justify-center items-start gap-[15px] px-[20px] py-[15px] border-[1px] border-gray-200 bg-black rounded-[2px] text-4 font-normal cursor-pointer">
          {items.map((item) => (
            <li key={item.value} onClick={() => handleSelect(item)}>
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
