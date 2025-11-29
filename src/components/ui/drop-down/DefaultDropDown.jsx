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

export default function DefaultDropDown({ items, placeholder, size }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const sizeStyle = size === 'sm' ? 'text-[14px]' : 'text-[16px]';

  const handleSelect = (item) => {
    setSelected(item);
    setOpen(false);
  };

  return (
    <div className="relative inline-flex flex-col items-start gap-[18px]  text-white">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-start gap-[10px] text-gray-200 cursor-pointer ${sizeStyle}`}
      >
        <span>{selected ? selected.label : placeholder}</span>
        <ArrowIcon isOpen={open} />
      </button>

      {open && (
        <ul
          className={`absolute top-full mt-[18px] left-0 z-99 flex flex-col items-start gap-[15px] px-[20px] py-[15px] border-[1px] border-gray-200 bg-black rounded-[2px] font-normal cursor-pointer whitespace-nowrap ${sizeStyle}`}
        >
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
