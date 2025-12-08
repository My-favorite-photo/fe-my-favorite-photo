'use client';

import Image from 'next/image';
import HopeChangeImg from '@/assets/images/svg/hopeChange.png';

const GRADE_CONFIG = {
  COMMON: { label: 'COMMON', colorClass: 'text-[#faff00]' },
  RARE: { label: 'RARE', colorClass: 'text-[#46c6ff]' },
  SUPER_RARE: { label: 'SUPER RARE', colorClass: 'text-[#c88bff]' },
  LEGENDARY: { label: 'LEGENDARY', colorClass: 'text-[#ff4c7d]' },
};

export default function CardSeller({
  grade = 'COMMON',
  category = '풍경',
  title = '미쏘손',
  description = '우리집 앞마당 포토카드입니다. 우리집 앞마당 포토카드입니다. 우리집 앞마당 포토카드입니다.',
  price = 4,
  remaining = 2,
  total = 5,
  wishGrade = 'RARE',
  wishCategory = '풍경',
  wishDescription = '푸릇푸릇한 여름 풍경, 눈 많이 내린 겨울 풍경 사진에 관심이 많습니다.',
  onEdit,
  onUnlist,
}) {
  const myGrade = GRADE_CONFIG[grade] ?? GRADE_CONFIG.COMMON;
  const wishGradeConfig = GRADE_CONFIG[wishGrade] ?? GRADE_CONFIG.RARE;

  const cardData = {
    grade,
    category,
    title,
    description,
    price,
    remaining,
    total,
    wishGrade,
    wishCategory,
    wishDescription,
  };

  const handleEdit = () => onEdit?.(cardData);
  const handleUnlist = () => onUnlist?.(cardData);

  return (
    <div className="w-full text-white flex flex-col bg-[#0a0a0a]">
      <div className="flex-1 px-4 pt-6 pb-8">
        <header className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className={`text-[22px] font-extrabold leading-none ${myGrade.colorClass}`}>
              {myGrade.label}
            </span>
            <span className="h-[18px] w-px bg-[#4b5563]" />
            <span className="text-[18px] font-semibold text-[#d1d5db]">{category}</span>
          </div>

          <button
            type="button"
            onClick={handleEdit}
            className="text-[18px] font-extrabold underline underline-offset-[6px] whitespace-nowrap"
          >
            {title}
          </button>
        </header>

        <div className="h-[1px] bg-[#2a2a2a] mt-4" />

        <section className="mt-4 text-[11px] leading-relaxed text-[#e5e7eb]">{description}</section>

        <div className="h-[1px] bg-[#2a2a2a] mt-4" />

        <section className="mt-10 space-y-3 text-[13px]">
          <div className="flex items-center justify-between">
            <span className="text-[#d1d5db]">가격</span>
            <span className="text-[15px] font-bold">
              {price} <span className="text-[11px]">P</span>
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#d1d5db]">잔여</span>
            <span className="text-[15px] font-bold">
              {remaining} / {total}
            </span>
          </div>
        </section>

        <div className="mt-8" />

        <section className="mt-4">
          <Image src={HopeChangeImg} alt="교환 희망 정보" className="h-[30px] w-auto" />
        </section>

        <section className="mt-6">
          <div className="flex items-center gap-3">
            <span
              className={`text-[16px] font-extrabold leading-none ${wishGradeConfig.colorClass}`}
            >
              {wishGradeConfig.label}
            </span>
            <span className="h-[16px] w-px bg-[#4b5563]" />
            <span className="text-[14px] font-semibold text-[#d1d5db]">{wishCategory}</span>
          </div>

          <div className="h-[1px] bg-[#2a2a2a] mt-3" />

          <p className="mt-3 text-[11px] leading-relaxed text-[#e5e7eb]">{wishDescription}</p>
        </section>
      </div>

      <div className="w-full flex flex-col gap-3">
        <button
          type="button"
          onClick={handleEdit}
          className="w-full py-[18px] text-[15px] font-bold bg-[#faff00] text-black"
        >
          수정하기
        </button>
        <button
          type="button"
          onClick={handleUnlist}
          className="w-full py-[18px] text-[14px] font-bold bg-[#0a0a0a] text-white border border-white"
        >
          판매 내리기
        </button>
      </div>
    </div>
  );
}
