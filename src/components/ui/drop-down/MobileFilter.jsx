'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useFilter } from '@/providers/FilterProvider';
import ic_filter from '@/assets/icons/ic_filter.svg';
import ic_close from '@/assets/icons/ic_close.svg';
import ic_exchange from '@/assets/icons/ic_exchange.svg';
import GradeLabel from '../label/GradeLabel';

export default function MobileFilter() {
  const [open, setOpen] = useState(false);

  const { category, setCategory, filters, selectedFilter, setSelectedFilter } = useFilter();

  const menus = [
    { key: 'grade', label: '등급' },
    { key: 'genre', label: '장르' },
    { key: 'status', label: '매진 여부' },
  ];

  const list = filters[category];

  // 카테고리 선택(등급, 장르, 매진 여부)
  const handleSelect = (label) => {
    setSelectedFilter((prev) => {
      const current = prev[category];

      const isSelected = current.includes(label);

      return {
        ...prev,
        [category]: isSelected ? current.filter((item) => item !== label) : [...current, label],
      };
    });
  };

  // 필터 리스트 선택(COMMON, RARE, ...)
  const handleApplyFilter = () => {
    // 아직 검색 기능 없이 모달 닫기만 가능!!!
    setOpen(false);
  };

  // 새로고침 버튼
  const resetCategoryFilter = () => {
    setSelectedFilter((prev) => ({
      ...prev,
      [category]: [],
    }));
  };

  // n개 포토보기 버튼
  const getPhotoCount = () => {
    const selected = selectedFilter[category];

    // 검색 필터 선택 안 하면 전체 개수
    if (!selected || selected.length === 0) {
      return list.reduce((acc, cur) => acc + cur.count, 0);
    }

    return list
      .filter((item) => selected.includes(item.label))
      .reduce((acc, cur) => acc + cur.count, 0);
  };

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-center items-center gap-[10px] p-[7.5px] border border-gray-200 rounded-[2px] bg-black cursor-pointer "
      >
        <Image src={ic_filter} alt="필터 아이콘" width={20} height={20} />
      </button>

      {open && <div onClick={() => setOpen(false)} className="fixed inset-0 bg-black/60 z-40" />}

      {/* 슬라이드 모달 */}
      <div
        className={`
          h-[480px] text-white bg-[#1B1B1B] fixed bottom-0 left-0 right-0 z-50
          rounded-t-[16px] transition-transform duration-300
          ${open ? 'translate-y-0' : 'translate-y-full'}
        `}
      >
        <div className="relative flex justify-center px-[10px] py-[16px] text-gray-400">
          <div className="flex items-center">
            <span className="text-4 font-medium ">필터</span>
            <button onClick={() => setOpen(!open)}>
              <Image
                src={ic_close}
                alt="닫기"
                width={24}
                height={24}
                className="absolute top-[16px] right-[15px] cursor-pointer"
              />
            </button>
          </div>
        </div>

        {/* 필터 카테고리 */}
        <div className="flex items-start gap-6 mx-[24px]">
          {menus.map((menu) => (
            <button
              key={menu.key}
              onClick={() => setCategory(menu.key)}
              className={`p-4 text-[14px] font-medium cursor-pointer ${
                category === menu.key ? 'text-white border-b-[1.5px] border-white' : 'text-gray-400'
              }`}
            >
              {menu.label}
            </button>
          ))}
        </div>

        {/* 카테고리 리스트 */}
        <div className="flex flex-col mt-[19px]">
          {list.map((item) => {
            const isSelected = selectedFilter[category].includes(item.label);

            return (
              <div
                key={item.label}
                onClick={() => handleSelect(item.label)}
                className={`flex justify-between px-8 py-4 cursor-pointer
                  ${isSelected ? 'bg-gray-500' : ''}`}
              >
                <span>
                  {category === 'grade' ? (
                    <GradeLabel grade={item.label.replace(' ', '_')} size="md" fontWeight="bold" />
                  ) : (
                    item.label
                  )}
                </span>
                <span>{item.count}개</span>
              </div>
            );
          })}

          <div className="absolute bottom-[40px] left-0 w-full flex justify-between gap-2 px-[15px]">
            <button onClick={resetCategoryFilter} className="m-[15px] cursor-pointer">
              <Image src={ic_exchange} alt="새로고침" width={24} height={24} />
            </button>
            <button
              onClick={handleApplyFilter}
              className="w-full py-[17px] bg-main rounded-[20x] text-black text-center text-4 font-bold cursor-pointer"
            >
              {getPhotoCount()}개 포토보기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
