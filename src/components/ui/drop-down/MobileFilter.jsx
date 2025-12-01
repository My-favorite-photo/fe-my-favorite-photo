'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { useFilter } from '@/providers/FilterProvider';
import { usePhotoCards } from '@/providers/PhotoCardProvider';
import GradeLabel from '../label/GradeLabel';
import ic_mobileFilter from '@/assets/icons/Ic_mobileFilter.svg';
import ic_close from '@/assets/icons/Ic_close.svg';
import ic_exchange from '@/assets/icons/Ic_recycle.svg';

export default function MobileFilter() {
  const [open, setOpen] = useState(false);

  const { cards } = usePhotoCards();
  const { category, setCategory, filters, mobileFilter, setMobileFilter } = useFilter();

  const menus = [
    { key: 'grade', label: '등급' },
    { key: 'genre', label: '장르' },
    { key: 'status', label: '매진 여부' },
  ];

  const formattedLabel = (label) => {
    return category === 'grade' ? label.replace(' ', '_') : label;
  };

  const dynamicFilters = useMemo(() => {
    const gradeCount = {};
    const genreCount = {};
    const statusCount = { '판매 중': 0, '판매 완료': 0 };

    cards.forEach((card) => {
      gradeCount[card.grade] = (gradeCount[card.grade] || 0) + 1;
      genreCount[card.genre] = (genreCount[card.genre] || 0) + 1;

      // 판매 여부
      const st =
        card.status === 'AVAILABLE' || card.status === 'EXCHANGE_OFFER' ? '판매 중' : '판매 완료';
      statusCount[st] = (statusCount[st] || 0) + 1;
    });

    return {
      grade: filters.grade.map((f) => ({
        label: f.label,
        count: gradeCount[f.label.replace(' ', '_')] || 0,
      })),
      genre: filters.genre.map((f) => ({
        label: f.label,
        count: genreCount[f.label] || 0,
      })),
      status: filters.status.map((f) => ({
        label: f.label,
        count: statusCount[f.label] || 0,
      })),
    };
  }, [cards, filters]);

  const list = dynamicFilters[category];

  // 카테고리 선택(등급, 장르, 매진 여부)
  const handleSelect = (label) => {
    const key = formattedLabel(label);

    setMobileFilter((prev) => {
      const current = prev[category];
      const isSelected = current.includes(key);

      return {
        ...prev,
        [category]: isSelected ? current.filter((item) => item !== key) : [...current, key],
      };
    });
  };

  // 새로고침 버튼
  const resetCategoryFilter = () => {
    setMobileFilter((prev) => ({
      ...prev,
      [category]: [],
    }));
  };

  // n개 포토보기 버튼
  const getPhotoCount = () => {
    const selected = mobileFilter[category];

    // 검색 필터 선택 안 하면 전체 개수
    if (!selected || selected.length === 0) {
      return list.reduce((acc, cur) => acc + cur.count, 0);
    }

    return list
      .filter((item) => selected.includes(formattedLabel(item.label)))
      .reduce((acc, cur) => acc + cur.count, 0);
  };

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-center items-center gap-[10px] p-[7.5px] border border-gray-200 rounded-[2px] bg-black cursor-pointer "
      >
        <Image src={ic_mobileFilter} alt="필터 아이콘" width={20} height={20} />
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
            const formatted = formattedLabel(item.label);
            const isSelected = mobileFilter[category].includes(formatted);

            return (
              <div
                key={item.label}
                onClick={() => handleSelect(item.label)}
                className={`flex justify-between px-8 py-4 cursor-pointer
                  ${isSelected ? 'bg-gray-500' : ''}`}
              >
                <span>
                  {category === 'grade' ? <GradeLabel grade={formatted} size /> : item.label}
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
              onClick={() => setOpen(false)}
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
