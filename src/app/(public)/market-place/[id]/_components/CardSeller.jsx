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
  saleId,
  grade = 'RARE',
  category = '풍경',
  title = '미쓰손',
  description = '우리집 앞마당 포토카드입니다.',
  price = 4,
  remaining = 2,
  total = 5,
  wishGrade = 'RARE',
  wishCategory = '풍경',
  wishDescription = '푸릇푸릇한 여름 풍경...',
  onEdit,
  onUnlist,
  isMyCard = false,
}) {
  const myGrade = GRADE_CONFIG[grade] ?? GRADE_CONFIG.COMMON;
  const wishGradeConfig = GRADE_CONFIG[wishGrade] ?? GRADE_CONFIG.RARE;

  return (
    <div className="w-full h-full bg-[#0a0a0a] text-white flex flex-col">
      <div className="flex-1 px-4 pt-4">
        <header className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className={`text-[20px] font-extrabold ${myGrade.colorClass}`}>
              {myGrade.label}
            </span>
            <span className="h-[18px] w-px bg-white/40" />
            <span className="text-[18px] font-semibold text-white/70">{category}</span>
          </div>

          <span className="text-[22px] font-extrabold underline underline-offset-[6px]">
            {title}
          </span>
        </header>

        <div className="mt-4 h-[1px] bg-white/35" />

        <p className="mt-4 text-[16px] leading-[1.5] text-white">{description}</p>

        <div className="mt-5 h-[1px] bg-white/35" />

        <section className="mt-6 space-y-4">
          <div className="flex justify-between items-end">
            <span className="text-[16px] text-white/60">가격</span>
            <span className="text-[22px] font-extrabold">
              {price} <span className="text-[16px]">P</span>
            </span>
          </div>

          <div className="flex justify-between items-end">
            <span className="text-[16px] text-white/60">잔여</span>
            <span className="text-[22px] font-extrabold">
              {remaining} <span className="text-white/60">/</span> {total}
            </span>
          </div>
        </section>

        <div className="mt-6 flex justify-center">
          <Image
            src={HopeChangeImg}
            alt="교환 희망"
            width={440}
            height={440}
            className="object-contain"
          />
        </div>

        <div className="mt-5 flex items-center gap-2">
          <span className={`text-[20px] font-extrabold ${wishGradeConfig.colorClass}`}>
            {wishGradeConfig.label}
          </span>
          <span className="h-[16px] w-px bg-white/40" />
          <span className="text-[17px] font-semibold text-white/70">{wishCategory}</span>
        </div>

        <div className="mt-4 h-[1px] bg-white/35" />

        <p className="mt-4 text-[16px] leading-[1.5] text-white">{wishDescription}</p>
      </div>

      {isMyCard && (
        <div className="mt-4 px-4 pb-4 flex flex-col gap-3">
          <button
            type="button"
            onClick={() => onEdit?.({ saleId })}
            className="w-full h-[72px] bg-[#faff00] text-black text-[18px] font-extrabold"
          >
            수정하기
          </button>

          <button
            type="button"
            onClick={() => onUnlist?.({ saleId })}
            className="w-full h-[72px] bg-[#0a0a0a] text-white text-[17px] font-bold border border-white/70"
          >
            판매 내리기
          </button>
        </div>
      )}
    </div>
  );
}
